const defaultSection = "index"
const sectionsInfos = {
    index: {
        display: "Accueil",
        permission: "index.view",
        visible: true
    },
    login: {
        display: "Connexion",
        permission: "login.view",
        visible: false
    },
    statistics: {
        display: "Statistiques",
        permission: "statistics.view",
        visible: true
    },
    fruits: {
        display: "Fruits",
        permission: "investments.view",
        visible: true
    },
    squeezes: {
        display: "Pressées",
        permission: "production.view",
        visible: true
    },
    storage: {
        display: "Stockage",
        permission: "storage.view",
        visible: true
    },
    administration: {
        display: "Administration",
        permission: "administration.view",
        visible: true
    }
}

let section = ""
let previousPage = ""
let nextPage = ""

const getHash = () => {
    let hash = window.location.hash?.substring(1)
    if (!Object.keys(sectionsInfos).includes(hash)) {
        if (hash === "logout") {
            disconnectUser()
        }
        window.location.hash = defaultSection
        hash = defaultSection
    }
    return hash
}

const setSection = (newSection) => {
    section = newSection

    document.title = sectionsInfos[section]["display"] + " - Bidoyon"

    const sectionElements = document.getElementsByTagName("section")
    for (const sectionElement of sectionElements) {
        sectionElement.classList.remove("visible")
    }

    const sectionElement = document.getElementById(section)
    sectionElement.classList.add("visible")

    document.location.hash = section
    actualizeNavigation()
}

const setSectionFromHash = () => {
    setSection(getHash())
}


const createSectionTitle = () => {
    const sectionTitle = document.createElement("h2")
    sectionTitle.classList.add("title")
    sectionTitle.appendChild(document.createTextNode(sectionsInfos[section]["display"].toUpperCase()))
    return sectionTitle
}

const createPreviousElement = () => {
    const previousElement = document.createElement("a")
    previousElement.classList.add("previous-page")
    previousElement.setAttribute("href", "#" + previousPage)
    previousElement.appendChild(document.createTextNode("«"))
    return previousElement
}

const createNextElement = () => {
    const nextElement = document.createElement("a")
    nextElement.classList.add("next-page")
    nextElement.setAttribute("href", "#" + nextPage)
    nextElement.appendChild(document.createTextNode("»"))
    return nextElement
}

const createLinkElement = (sectionName) => {
    const linkElement = document.createElement("h3")
    linkElement.classList.add("link")

    const link = document.createElement("a")
    link.appendChild(document.createTextNode(sectionsInfos[sectionName]["display"].toUpperCase()))
    link.setAttribute("href", "#" + sectionName)

    linkElement.appendChild(link)
    return linkElement
}

const getVisibleSectionNames = () => {
    const sectionsNames = []
    for (const [sectionName, sectionInfos] of Object.entries(sectionsInfos)) {
        if (sectionInfos["visible"]) {
            sectionsNames.push(sectionName)
        }
    }
    return sectionsNames
}

const updatePreviousAndNext = () => {
    const sectionNames = getVisibleSectionNames()
    const sectionIndex = sectionNames.indexOf(section)

    let previousPageIndex = sectionIndex - 1
    if (previousPageIndex < 0) {
        previousPageIndex = sectionNames.length - 1
    }

    let nextPageIndex = sectionIndex + 1
    if (nextPageIndex > sectionNames.length - 1) {
        nextPageIndex = 0
    }

    previousPage = sectionNames[previousPageIndex]
    nextPage = sectionNames[nextPageIndex]
}

const actualizeNavigation = () => {
    updatePreviousAndNext()

    const navigationBars = document.getElementsByClassName("navigation")

    for (const navigationBar of navigationBars) {
        navigationBar.innerHTML = ""

        const links = []

        for (const sectionName of getVisibleSectionNames()) {
            if (sectionName !== section) {
                links.push(createLinkElement(sectionName))
            }
        }

        navigationBar.appendChild(createPreviousElement())
        navigationBar.appendChild(createSectionTitle())
        navigationBar.appendChild(createNextElement())

        for (const link of links) {
            navigationBar.appendChild(link)
        }
    }
}

window.addEventListener('load', setSectionFromHash)
window.addEventListener("hashchange", setSectionFromHash)
