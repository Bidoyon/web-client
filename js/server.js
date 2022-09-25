let socket
let connected = false
let authed = false

window.addEventListener('load', () => {
    const loginButton = document.querySelector("#login-button")
    loginButton.addEventListener("click", () => {
        const loginUsernameInput = document.getElementById("login-username-input")
        const loginPasswordInput = document.getElementById("login-password-input")
        const loginFailed = document.getElementById("login-failed")
        const loginUsername = loginUsernameInput.value.replace(/[^\x00-\x7F]/g, "")
        const loginPassword = loginPasswordInput.value.replace(/[^\x00-\x7F]/g, "")
        if (loginUsername && loginPassword) {
            emit("auth", {name: loginUsername, password: loginPassword}, (args) => {
                if (args.message === "auth-accepted") {
                    loginFailed.classList.add("invisible")
                    loginUsernameInput.value = ""
                    authed = true
                    showConnected("TestName")
                    setSection("index")
                } else if (args.message === "auth-refused") {
                    loginFailed.classList.remove("invisible")
                }
                loginPasswordInput.value = ""
            })
        } else {
            loginFailed.classList.remove("invisible")
        }

    })
    connect()
})

const connect = () => {
    disconnectSocket()
    showNotConnected()
    socket = new WebSocket("ws://localhost:8080")
    socket.addEventListener("open", (event) => {
        connected = true
    })
    socket.addEventListener("error", (event) => {
        connected = false
        authed = false
        showNotConnected()
    })
    socket.addEventListener("close", (event) => {
        connected = false
        authed = false
        showNotConnected()
    })
    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data.toString())
        const eventToDispatch = new Event("server-" + data["event"])
        eventToDispatch.args = data["args"]
        window.dispatchEvent(eventToDispatch)
    })
}

const disconnectSocket = () => {
    if (socket) {
        socket.close()
    }
}

const disconnectUser = () => {
    if (socket) {
        emit("deauth")
        authed = false
        showNotConnected()
    }
}

const emit = (event, args, callback) => {
    const eventData = {}
    eventData.event = event
    eventData.args = args || {}
    const code = Math.floor(Math.random()*10000)
    eventData.args.code = code

    socket.send(JSON.stringify(eventData))

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
