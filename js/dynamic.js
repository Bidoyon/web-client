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