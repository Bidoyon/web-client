const showConnected = (name) => {
    const notConnectedElements = document.getElementsByClassName("not-connected")
    for (const notConnectedElement of notConnectedElements) {
        notConnectedElement.classList.add("invisible")
    }

    const connectedElements = document.getElementsByClassName("connected")
    for (const connectedElement of connectedElements) {
        connectedElement.classList.remove("invisible")
        connectedElement.innerHTML = `Vous êtes connecté en tant que <strong>${name}</strong>. <a href="#logout">Déconnexion</a>.`
    }
}

const showNotConnected = () => {
    const notConnectedElements = document.getElementsByClassName("not-connected")
    for (const notConnectedElement of notConnectedElements) {
        notConnectedElement.classList.remove("invisible")
        notConnectedElement.innerHTML = `Vous n'êtes pas connecté. <a href="#login">Connexion</a>.`
    }

    const connectedElements = document.getElementsByClassName("connected")
    for (const connectedElement of connectedElements) {
        connectedElement.classList.add("invisible")
    }
}

const enableMessage = (sectionID, messageID) => {
    disableMessages(sectionID)
    const message = document.querySelector("#" + messageID)
    message.classList.remove("invisible")
}

const disableMessages = (sectionID) => {
    const messages = document.querySelector("#" + sectionID).getElementsByClassName("message")
    for (const message of messages) {
        message.classList.add("invisible")
    }
}

const enablePanel = (sectionID, panelID) => {
    disablePanels(sectionID)
    const panel = document.querySelector("#" + panelID)
    panel.classList.remove("invisible")
}

const disablePanels = (sectionID) => {
    const panels = document.querySelector("#" + sectionID).getElementsByClassName("panel")
    for (const panel of panels) {
        panel.classList.add("invisible")
    }
}

const readInput = (inputID) => {
    const input = document.querySelector("#" + inputID)
    return input.value
}

const writeInput = (inputID, value) => {
    const input = document.querySelector("#" + inputID)
    return input.value = value
}