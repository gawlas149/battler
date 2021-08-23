import { calculateClickedCoords } from "./map.js"
import { drawUnits } from "./map.js";
import { assetsStore } from "./assets.js";
import { mission, cantPlace, moneyMax } from "./script.js";

class Unit {
    constructor(id, name, hpMax, damage, speed, range, price) {
        this.id = id
        this.name = name
        this.hpMax = hpMax;
        this.hp = hpMax;
        this.dmg = damage;
        this.speed = speed
        this.range = range;
        this.stamina = 0
        this.price = price
    }
}

const warrior = new Unit(0, "warrior", 520, 70, 22, 1, 75)
const archer = new Unit(1, "archer", 290, 55, 18, 4, 125)
const ironclad = new Unit(2, "ironclad", 1200, 95, 30, 1, 150)
const mage = new Unit(3, "mage", 250, 400, 38, 2, 200)
const horse = new Unit(4, "horse", 690, 140, 12, 1, 200)

const units = [warrior, archer, ironclad, mage, horse]

export function createUnit(x, y, classId, staminaDiff) {
    const newUnit = {
        ...units[classId],
        stamina: units[classId].stamina + staminaDiff,
        x: x,
        y: y,
    }
    return newUnit
}

export let chosenUnitId = undefined
export let chosenDivId = undefined

const canvas = document.getElementById("canvas")
const choseUnitsDiv = document.getElementById("choseUnits")
const minimalizeDiv = document.getElementById("minimalize")
const startButtonDiv = document.getElementById("startButton")
const changeTeamButton = document.getElementById("changeTeamButton")
const teamPrice = document.getElementById("teamPrice")

export function createUnitClasses(blockedUnits) {
    chosenDivId = undefined
    for (let i = 0, classDivId = -1; i < units.length; i++) {
        try {
            if (blockedUnits.includes(i)) {
                continue
            }
        } catch { }

        classDivId += 1
        const div = document.createElement("div")
        div.classList.add("unitClass")
        const image = assetsStore.getImage(units[i].name)
        image.style.width = "100%"
        image.style.height = "78%"
        div.appendChild(image)
        const price = document.createElement("div")
        price.innerText = units[i].price
        price.classList.add("price")
        div.appendChild(price)

        div.onmouseover = () => {
            div.style.cursor = "pointer"
        }
        div.onclick = () => {
            chosenUnitId = i
            chosenDivId = classDivId

            for (let j = 0; j < unitClassesDiv.length; j++) {
                unitClassesDiv[j].onmouseover = () => {
                    unitClassesDiv[j].style.cursor = "pointer"
                }
            }
            deleteUnit.onmouseover = () => {
                deleteUnit.style.cursor = "pointer"
            }
            if (team1AddingUnits == 1) {
                for (let j = 0; j < unitClassesDiv.length; j++) {
                    unitClassesDiv[j].style.backgroundColor = "rgba(102, 167, 86, 0.1)"
                }
                deleteUnit.style.backgroundColor = "rgba(102, 167, 86, 0.1)"
                unitClassesDiv[chosenDivId].style.backgroundColor = "rgba(66, 122, 52, 0.8)"
            } else {
                for (let j = 0; j < unitClassesDiv.length; j++) {
                    unitClassesDiv[j].style.backgroundColor = "rgba(134, 92, 86, 0.3)"
                }
                deleteUnit.style.backgroundColor = "rgba(134, 92, 86, 0.3)"
                unitClassesDiv[chosenDivId].style.backgroundColor = "rgba(107, 65, 59, 0.8)"
            }
            unitClassesDiv[chosenDivId].onmouseover = () => {
                unitClassesDiv[chosenDivId].style.cursor = "default"
            }
        }

        choseUnitsDiv.appendChild(div)
    }
    let unitClassesDiv = document.getElementsByClassName("unitClass")


    const deleteUnit = document.createElement("div")
    deleteUnit.setAttribute("id", "deleteUnit");
    deleteUnit.style.backgroundColor = "rgba(66, 122, 52, 0.3)"
    choseUnitsDiv.appendChild(deleteUnit)
    deleteUnit.onclick = () => {
        for (let i = 0; i < unitClassesDiv.length; i++) {
            unitClassesDiv[i].onmouseover = () => {
                unitClassesDiv[i].style.cursor = "pointer"
            }
        }
        deleteUnit.onmouseover = () => {
            deleteUnit.style.cursor = "default"
        }
        if (team1AddingUnits == 1) {
            if (chosenUnitId != undefined) {
                unitClassesDiv[chosenDivId].style.backgroundColor = "rgba(102, 167, 86, 0.8)"
            }
            deleteUnit.style.backgroundColor = "rgba(66, 122, 52, 0.3)"
        } else {
            if (chosenUnitId != undefined) {
                unitClassesDiv[chosenDivId].style.backgroundColor = "rgba(134, 92, 86, 0.3)"
            }
            deleteUnit.style.backgroundColor = "rgba(107, 65, 59, 0.3)"

        }
        chosenUnitId = undefined
    }
}
export function deleteUnitClasses() {
    choseUnitsDiv.innerHTML = ""
}

let minimalized = 0
export let team1AddingUnits = 0
export let team2AddingUnits = 0
export function startAddingUnits(team, cW, cH, mapWidth, mapHeight, team1, team2) {
    if (minimalized == 0) {
        choseUnitsDiv.classList.remove("hidden")
        startButtonDiv.classList.remove("hidden")
        minimalizeDiv.classList.remove("hidden")
        teamPrice.classList.remove("hidden")
        changeTeamButton.classList.remove("hidden")
    }
    if (team == team1) {
        team2AddingUnits = 0
        team1AddingUnits = 1
        choseUnitsDiv.style.backgroundColor = "rgba(102, 167, 86, 0.8)"
        let unitClassesDiv = document.getElementsByClassName("unitClass")
        for (let i = 0; i < unitClassesDiv.length; i++) {
            unitClassesDiv[i].style.backgroundColor = "rgba(102, 167, 86, 0.1)"
        }
        try{deleteUnit.style.backgroundColor = "rgba(102, 167, 86, 0.1)"
        }catch{}
        if (chosenUnitId != undefined) {
            unitClassesDiv[chosenDivId].style.backgroundColor = "rgba(66, 122, 52, 0.8)"
        } else {
            try{deleteUnit.style.backgroundColor = "rgba(66, 122, 52, 0.8)"
            }catch{}
        }
        changeTeamButton.innerText = "T1"
    } else {
        team1AddingUnits = 0
        team2AddingUnits = 1
        choseUnitsDiv.style.backgroundColor = "rgba(134, 92, 86, 0.8)"
    }
    teamPrice.innerText = `${recalculateMoney(team)}$`

    let clickedX = 0
    let clickedY = 0
    canvas.onmousedown = () => { }
    canvas.onmousedown = () => {
        let respond = calculateClickedCoords(event, mapWidth, mapHeight)
        clickedX = respond[0]
        clickedY = respond[1]

        let unitsAll = team1.concat(team2)
        let blockedFields = []
        for (let i = 0; i < cantPlace.length; i++) {
            blockedFields.push(cantPlace[i])
        }
        for (let i = 0; i < unitsAll.length; i++) {
            blockedFields.push([unitsAll[i].x, unitsAll[i].y])
        }
        if (!isBlocked(blockedFields, clickedX, clickedY) && chosenUnitId != undefined && (mission == 0 || recalculateMoney(team) - units[chosenUnitId].price >= 0)) {
            team.push(createUnit(clickedX, clickedY, chosenUnitId, team.length * 2 % 10))
            teamPrice.innerText = `${recalculateMoney(team)}$`
        } else if (chosenUnitId == undefined) {
            deleteChosenUnit(clickedX, clickedY, team1, team2, mapWidth, mapHeight, cW, cH)
            recalculateStamina(team1, team2)
            teamPrice.innerText = `${recalculateMoney(team)}$`
        }

        canvas.onmousemove = () => {
            let respond = calculateClickedCoords(event, mapWidth, mapHeight)
            clickedX = respond[0]
            clickedY = respond[1]

            let unitsAll = team1.concat(team2)
            let blockedFields = []
            for (let i = 0; i < cantPlace.length; i++) {
                blockedFields.push(cantPlace[i])
            }
            for (let i = 0; i < unitsAll.length; i++) {
                blockedFields.push([unitsAll[i].x, unitsAll[i].y])
            }
            if (!isBlocked(blockedFields, clickedX, clickedY) && chosenUnitId != undefined && (mission == 0 || recalculateMoney(team) - units[chosenUnitId].price >= 0)) {
                team.push(createUnit(clickedX, clickedY, chosenUnitId, team.length * 2 % 10))
                teamPrice.innerText = `${recalculateMoney(team)}$`
            } else if (chosenUnitId == undefined) {
                deleteChosenUnit(clickedX, clickedY, team1, team2, mapWidth, mapHeight, cW, cH)
                recalculateStamina(team1, team2)
                teamPrice.innerText = `${recalculateMoney(team)}$`
            }
            drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
        }
        canvas.onmouseout = () => {
            canvas.onmousemove = () => { }
        }
        canvas.onmouseup = () => {
            canvas.onmousemove = () => { }
        }

        drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)

    }
}
export function recalculateMoney(team) {
    let money
    if (mission == false) {
        money = 0
        for (let i = 0; i < team.length; i++) {
            money += team[i].price
        }
    }
    else {
        money = moneyMax
        for (let i = 0; i < team.length; i++) {
            money -= team[i].price
        }
    }
    return money
}

function recalculateStamina(team1, team2) {
    for (let i = 0; i < team1.length; i++) {
        team1[i].stamina = i * 2 % 10
    }
    for (let i = 0; i < team2.length; i++) {
        team2[i].stamina = i * 2 % 10
    }
}

const winningBestGold = document.getElementById("winningBestGold")
const winningBestTicks = document.getElementById("winningBestTicks")
export function stopAddingUnits() {
    team1AddingUnits = 0
    team2AddingUnits = 0
    canvas.onmousedown = () => { }
    winningBestGold.classList.add("hidden")
    winningBestTicks.classList.add("hidden")
    minimalizeDiv.classList.add("hidden")
    choseUnitsDiv.classList.add("hidden")
    startButtonDiv.classList.add("hidden")
    changeTeamButton.classList.add("hidden")
    teamPrice.classList.add("hidden")
}

function isBlocked(blockedFields, x, y) {
    const blocking = blockedFields.find((coords) => {
        return coords[0] == x && coords[1] == y
    })
    if (blocking) {
        return true
    }
    return false
}

minimalizeDiv.onclick = () => {
    if (minimalized == 0) {
        choseUnitsDiv.classList.add("hidden")
        startButtonDiv.classList.add("hidden")
        changeTeamButton.classList.add("hidden")
        teamPrice.classList.add("hidden")
        minimalized = 1
    } else {
        if (mission == false) {
            changeTeamButton.classList.remove("hidden")
        }
        choseUnitsDiv.classList.remove("hidden")
        startButtonDiv.classList.remove("hidden")
        teamPrice.classList.remove("hidden")
        minimalized = 0
    }
}

function deleteChosenUnit(x, y, team1, team2, mapWidth, mapHeight, cW, cH) {
    for (let i = 0; i < team1.length; i++) {
        if (team1[i].x == x && team1[i].y == y) {
            team1.splice(i, 1)
            drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
        }
    }
    if (mission == false) {
        for (let i = 0; i < team2.length; i++) {
            if (team2[i].x == x && team2[i].y == y) {
                team2.splice(i, 1)
                drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
            }
        }
    }
}

export function resetChosenUnit() {
    chosenUnitId = undefined
}