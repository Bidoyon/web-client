class Server {
    address = "ws://localhost:8080"
    connected = false
    authed = false
    socket = undefined

    constructor(host, port) {
        this.address = "ws://" + host + ":" + port
        window.addEventListener('load', () => {
            this.load()
        })
    }

    load() {
        const connectButton = document.querySelector("#connect-button")
        connectButton.addEventListener("click", () => {
            enableMessage("login", "connect-waiting")
            this.connectSocket()
        })

        const loginButton = document.querySelector("#login-button")
        loginButton.addEventListener("click", () => {
            const loginUsername = readInput("login-username-input").replace(/[^\x00-\x7F]/g, "")
            const loginPassword = readInput("login-password-input").replace(/[^\x00-\x7F]/g, "")
            if (loginUsername && loginPassword) {
                this.emit("auth", {name: loginUsername, password: loginPassword}, (args) => {
                    if (args.message === "auth-accepted") {
                        enableMessage("login", "login-failed")
                        writeInput("login-username-input", "")
                        this.authed = true
                        showConnected("TestName")
                        setSection("index")
                    } else if (args.message === "auth-refused") {
                        disableMessages("login")
                    }
                    writeInput("login-password-input", "")
                })
            } else {
                disableMessages("login")
            }

        })
    }

    connectSocket() {
        this.disconnectSocket()
        this.socket = new WebSocket(this.address)
        this.socket.addEventListener("open", () => {
            this.connected = true
            enablePanel("login", "login-panel")
        })
        this.socket.addEventListener("error", () => {})
        this.socket.addEventListener("close", () => {
            setSection("login")
            enablePanel("login", "connect-panel")
            enableMessage("login", "connect-failed")
            this.connected = false
            this.authed = false
        })
        this.socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data.toString())
            const eventToDispatch = new Event("server-" + data["event"])
            eventToDispatch.args = data["args"]
            window.dispatchEvent(eventToDispatch)
        })
    }

    disconnectSocket() {
        this.authed = false
        this.connected = false
        if (this.socket) {
            this.socket.close()
        }
    }

    disconnectUser() {
        if (this.socket) {
            this.emit("deauth")
            this.authed = false
        }
    }

    emit(event, args, callback) {
        const eventData = {}
        eventData.event = event
        eventData.args = args || {}
        const code = Math.floor(Math.random()*10000)
        eventData.args.code = code

        this.socket.send(JSON.stringify(eventData))

        if (callback) {
            const handler = (event) => {
                if (event.args.code !== code) {
                    return
                }

                window.removeEventListener("server-response", handler)
                callback(event.args)
            }

            window.addEventListener("server-response", handler)
        }
    }

}

const server = new Server("localhost", 8080)
