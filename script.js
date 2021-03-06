//serve
import { resizeGame, drawUnits } from "./map.js";
import { startAddingUnits, stopAddingUnits, createUnitClasses, deleteUnitClasses, team1AddingUnits, chosenUnitId, resetChosenUnit, chosenDivId, recalculateMoney } from "./units.js"
import { actions } from "./fight.js"
import { assetsStore } from "./assets.js"
import { generateMap, missions } from "./seed.js"

const url = "http://localhost:3000"
// const url = "https://08ed-80-51-121-252.ngrok.io"

const imagesToDownload = [{
    name: "warrior",
    src: "images/warrior.png"
}, {
    name: "archer",
    src: "images/archer.png"
}, {
    name: "ironclad",
    src: "images/ironclad.png"
}, {
    name: "mage",
    src: "images/mage.png"
}, {
    name: "horse",
    src: "images/horse.png"
}, {
    name: "back",
    src: "images/back.png"
}, {
    name: "delete_unit",
    src: "images/delete_unit.png"
}]

let mapWidth = 3;
let mapHeight = 5;
let cW = 0
let cH = 0
let team1 = []
let team2 = []

const loadingScreen = document.getElementById("loadingScreen")
const menu = document.getElementById("menu")
const customButton = document.getElementById("menuCustom")
const playButton = document.getElementById("menuPlay")

assetsStore.onload = () => {
    loadingScreen.classList.add("disappear")
    setInterval(() => {
        loadingScreen.classList.add("hidden")
        customButton.style.zIndex = 2
        playButton.style.zIndex = 2
    }, 2000);
    menu.classList.remove("hidden")
    resizeGame(mapWidth, mapHeight, team1, team2)
}
assetsStore.init(imagesToDownload)



let sizes = resizeGame(mapWidth, mapHeight, team1, team2)
cW = sizes[0]
cH = sizes[1]
window.addEventListener("resize", () => {
    sizes = resizeGame(mapWidth, mapHeight, team1, team2)
    cW = sizes[0]
    cH = sizes[1]
    drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
});
window.addEventListener("orientationchange", () => {
    sizes = resizeGame(mapWidth, mapHeight, team1, team2)
    cW = sizes[0]
    cH = sizes[1]
    drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
});

let ticks = 0;
let tickInterval
let seed = []

let startingSeed=[]
let startingTeam1=[]
let startingMissionId=undefined

function startGame() {
    seed = generateSeed(mapWidth, mapHeight, team1, team2)
    ticks = 0

    if(mission){
        startingSeed=[1,startingMissionId]
        startingTeam1=JSON.stringify(team1);
    }

    tickInterval = setInterval(() => {
        tick();
    }, 50);
}

const customBack = document.getElementById("customBack")
customBack.onclick = () => {
    custom.classList.add("hidden")
    menu.classList.remove("hidden")
}
const missionBack = document.getElementById("missionBack")
missionBack.onclick = () => {
    missionScreen.classList.add("hidden")
    menu.classList.remove("hidden")
}
const gameBack = document.getElementById("gameBack")
gameBack.onclick = () => {
    winningBestGold.classList.add("hidden")
    winningBestTicks.classList.add("hidden")
    if(ticks!=0){
        clearInterval(tickInterval)
        if(mission){
            let seedValues = generateMap(startingSeed,true)
            team1 = JSON.parse(startingTeam1)
            team2 = seedValues[2]
            moneyMax = seedValues[3]
            blockedUnits = seedValues[4]
            cantPlace = seedValues[5]
            startAddingUnits(team1, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
        }else{
            let seedValues = generateMap(seed)
            moneyMax = 0
            blockedUnits = []
            cantPlace = []
            mapWidth = seedValues[0]
            mapHeight = seedValues[1]
            team1 = seedValues[2]
            team2 = seedValues[3]
            startAddingUnits(team1, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
        }

        ticks=0
        resizeGame(mapWidth, mapHeight, team1, team2)
        drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
    }else{
        clearInterval(tickInterval)
        deleteUnitClasses()

        winningScreen.classList.add("hidden")
        gameArea.classList.add("hidden")

        choseUnitsDiv.classList.remove("hidden")
        startButtonDiv.classList.remove("hidden")
        minimalizeDiv.classList.remove("hidden")
        changeTeamButton.classList.remove("hidden")
        teamPrice.classList.remove("hidden")

        if(mission){
            missionScreen.classList.remove("hidden")
        }else{
            custom.classList.remove("hidden")
        }

        changeTeamButton.innerText = "T1"
        winningSeed.innerText = "Seed"

        ticks = 0
        winner = 0
        mission = false
        team1 = []
        team2 = []
        mapWidth = 3;
        mapHeight = 5;

        resetChosenUnit()
        resizeGame(mapWidth, mapHeight, team1, team2)
    }
    winner=0
    winningScreen.classList.add("hidden")
}

let winner = 0
function tick() {
    if (winner == 0) {
        ticks += 1;
        winner = actions(team1, team2, mapHeight, mapWidth)
        drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
    } else {
        win(winner)
    }
}

const winningScreen = document.getElementById("winningScreen")
const winningText = document.getElementById("winningText")

const dane = [[0,"ABCD",111,[],"EFGH",222,[]],[1,"ABCD",111,[],"EFGH",222,[]],[2,"ABCD",111,[],"EFGH",222,[]],[3,"ABCD",111,[],"EFGH",222,[]],[4,"ABCD",111,[],"EFGH",222,[]],[5,"ABCD",111,[],"EFGH",222,[]],[6,"ABCD",111,[],"EFGH",222,[]],[7,"ABCD",111,[],"EFGH",222,[]],[8,"ABCD",111,[],"EFGH",222,[]],[9,"ABCD",111,[],"EFGH",222,[]],[10,"ABCD",111,[],"EFGH",222,[]],[11,"ABCD",111,[],"EFGH",222,[]],]

function win(winner) {
    winningBestGold.classList.add("hidden")
    winningBestTicks.classList.add("hidden")
    clearInterval(tickInterval)
    winningScreen.classList.remove("hidden")
    if(mission==false){
        winningText.innerHTML = `Team${winner} won! <br /> Time: ${ticks}ticks`
    }else{
        if(winner==1){
            winningText.innerHTML = `You won! <br /> Your Gold: ${remainingMoney}$ <br /> Time: ${ticks}ticks`
            completedMission(startingMissionId)
            try{
                requestBestScores(startingMissionId)
            }catch{console.log("No connection to server")}

        } else{
            winningText.innerHTML = `You lost :c <br />  Time: ${ticks}ticks`
            try{
                requestBestScores(startingMissionId)
            }catch{console.log("No connection to server")}

        }
    }
}

const winningBestGold = document.getElementById("winningBestGold")
const winningBestTicks = document.getElementById("winningBestTicks")

function generateSeed(mapWidth, mapHeight, team1, team2) {
    let generatedSeed = [0]
    generatedSeed.push(parseInt(mapWidth))
    generatedSeed.push(parseInt(mapHeight))
    let seedTeam1 = []
    for (let i = 0; i < team1.length; i++) {
        seedTeam1.push([team1[i].id, team1[i].x, team1[i].y])
    }
    generatedSeed.push(seedTeam1)

    let seedTeam2 = []
    for (let i = 0; i < team2.length; i++) {
        seedTeam2.push([team2[i].id, team2[i].x, team2[i].y])
    }
    generatedSeed.push(seedTeam2)
    return JSON.stringify(generatedSeed)
}

const startButton = document.getElementById("startButton")
let remainingMoney=9999999
startButton.onclick = () => {
    stopAddingUnits()
    remainingMoney = recalculateMoney(team1)
    startGame()
}

const changeTeamButton = document.getElementById("changeTeamButton")

changeTeamButton.onclick = () => {
    const unitClassesDiv = document.getElementsByClassName("unitClass")
    const deleteUnit = document.getElementById("deleteUnit")

    if (team1AddingUnits == 1) {
        for (let i = 0; i < unitClassesDiv.length; i++) {
            unitClassesDiv[i].style.backgroundColor = "rgba(134, 92, 86, 0.3)"
        }
        deleteUnit.style.backgroundColor = "rgba(134, 92, 86, 0.3)"
        if (chosenUnitId != undefined) {
            unitClassesDiv[chosenDivId].style.backgroundColor = "rgba(107, 65, 59, 0.8)"
        } else {
            deleteUnit.style.backgroundColor = "rgba(107, 65, 59, 0.8)"
        }
        changeTeamButton.innerText = "T2"
        startAddingUnits(team2, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
    } else {
        for (let i = 0; i < unitClassesDiv.length; i++) {
            unitClassesDiv[i].style.backgroundColor = "rgba(102, 167, 86, 0.1)"
        }
        deleteUnit.style.backgroundColor = "rgba(102, 167, 86, 0.1)"
        if (chosenUnitId != undefined) {
            unitClassesDiv[chosenDivId].style.backgroundColor = "rgba(66, 122, 52, 0.8)"
        } else {
            deleteUnit.style.backgroundColor = "rgba(66, 122, 52, 0.8)"
        }
        changeTeamButton.innerText = "T1"
        startAddingUnits(team1, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
    }
}

const custom = document.getElementById("custom")
customButton.onclick = () => {
    custom.classList.remove("hidden")
    menu.classList.add("hidden")
}

const customOkeyButton = document.getElementById("customOkey")
const gameArea = document.getElementById("gameArea")

export let mission = false
let blockedUnits = []
export let moneyMax = 0
export let cantPlace = []

customOkeyButton.onclick = () => {
    let seedValues = generateMap()
    mission = false
    moneyMax = 0
    blockedUnits = []
    cantPlace = []
    if (seedValues.length == 4) {
        mapWidth = seedValues[0]
        mapHeight = seedValues[1]
        team1 = seedValues[2]
        team2 = seedValues[3]
    } else {
        //mission
        mission = true
        mapWidth = seedValues[0]
        mapHeight = seedValues[1]
        team1 = []
        team2 = seedValues[2]
        moneyMax = seedValues[3]
        blockedUnits = seedValues[4]
        cantPlace = seedValues[5]
    }

    createUnitClasses(blockedUnits)
    startAddingUnits(team1, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
    drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)

    custom.classList.add("hidden")
    gameArea.classList.remove("hidden")

    sizes = resizeGame(mapWidth, mapHeight, team1, team2)
    cW = sizes[0]
    cH = sizes[1]
    drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
}

const winningOkey = document.getElementById("winningOkey")
const winningSeed = document.getElementById("winningSeed")
const choseUnitsDiv = document.getElementById("choseUnits")
const minimalizeDiv = document.getElementById("minimalize")
const startButtonDiv = document.getElementById("startButton")
const teamPrice = document.getElementById("teamPrice")
winningOkey.onclick = () => {
    winningScreen.classList.add("hidden")
    gameArea.classList.add("hidden")
    winningBestGold.classList.add("hidden")
    winningBestTicks.classList.add("hidden")

    if(mission){
        missionScreen.classList.remove("hidden")
    }else{
        custom.classList.remove("hidden")
    }
    choseUnitsDiv.classList.remove("hidden")
    startButtonDiv.classList.remove("hidden")
    minimalizeDiv.classList.remove("hidden")
    changeTeamButton.classList.remove("hidden")
    teamPrice.classList.remove("hidden")

    changeTeamButton.innerText = "T1"
    winningSeed.innerText = "Seed"

    ticks = 0
    winner = 0
    mission = false
    team1 = []
    team2 = []
    mapWidth = 3;
    mapHeight = 5;

    deleteUnitClasses()
    resetChosenUnit()
    resizeGame(mapWidth, mapHeight, team1, team2)
}

winningSeed.onclick = () => {
    navigator.clipboard.writeText(seed)
    winningSeed.innerText = "Copied"
}

document.onkeypress = (e) => {
    if (e.key == 9) {
        let messageEnemies = [] //enemies
        for (let i = 0; i < team2.length; i++) {
            messageEnemies.push([team2[i].id, team2[i].x, team2[i].y])
        }

        let messageCantPlace = [] //cantPlace
        for (let i = 0; i < team1.length; i++) {
            messageCantPlace.push([team1[i].x, team1[i].y])
        }

        let enemyValue = 0
        for (let i = 0; i < team2.length; i++) {
            enemyValue += team2[i].price
        }

        console.log(`{\n  id:"X",\n  width:${mapWidth},\n  height:${mapHeight},\n  enemies: ${JSON.stringify(messageEnemies)},\n  cantPlace: ${JSON.stringify(messageCantPlace)},\n  money: ${enemyValue},\n  blockedUnits: ["x","x"],\n}`)
    }
}

const missionScreen = document.getElementById("missionScreen")
playButton.onclick = () => {
    missionScreen.classList.remove("hidden")
    menu.classList.add("hidden")
    resizeGame(mapWidth, mapHeight, team1, team2)
}

for (let i = 0; i < missions.length; i++) {
    const missionSelect = document.createElement("div")
    missionSelect.classList.add("missionSelect")
    missionSelect.innerText = i + 1

    missionSelect.onclick = () => {
        let seedValues = generateMap([1, i], true)
        mission = true
        mapWidth = seedValues[0]
        mapHeight = seedValues[1]
        team1 = []
        team2 = seedValues[2]
        moneyMax = seedValues[3]
        blockedUnits = seedValues[4]
        cantPlace = seedValues[5]

        createUnitClasses(blockedUnits)
        startAddingUnits(team1, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
        drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)

        missionScreen.classList.add("hidden")
        gameArea.classList.remove("hidden")

        startingMissionId=i

        sizes = resizeGame(mapWidth, mapHeight, team1, team2)
        cW = sizes[0]
        cH = sizes[1]
        drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace)
    }

    missionScreen.append(missionSelect)

}

const missionSelectDivs=document.getElementsByClassName("missionSelect")


let missionsCompleted=[]
if(localStorage.getItem("missionsCompleted") === null || JSON.parse(localStorage.getItem("missionsCompleted")).length != missions.length){
  for(let i=0; i<missions.length;i++){
    missionsCompleted.push(0)
  }
}else{
  missionsCompleted = JSON.parse(localStorage.getItem("missionsCompleted"));
  loadCompleteSymboles()
}

function completedMission(n){
  missionsCompleted[n]=1
  localStorage.setItem("missionsCompleted", JSON.stringify(missionsCompleted));
  loadCompleteSymboles()
}

function loadCompleteSymboles(){
    for(let i=0; i<missionsCompleted.length;i++){
        missionSelectDivs[i].innerHTML=i+1
        if(missionsCompleted[i]==1){
            const div = document.createElement("div")
            div.classList.add("completeCircle")
            missionSelectDivs[i].appendChild(div)
        }
    }
}

const recordScreen = document.getElementById("recordScreen")
let newRecord=false
function requestBestScores(n){
    try{
        fetch(`${url}/getScores`)
        .then((response) => {
            return response.json();
        })    
        .then((data) => {
            winningBestGold.innerHTML=`Best Gold:<br /><b>${data[n][2]}$</b><br />By:<br /><b>${data[n][1]}</b>`
            winningBestTicks.innerHTML=`Fastest Win:<br /><b>${data[n][5]} ticks</b><br />By:<br /><b>${data[n][4]}</b>`
            winningBestGold.classList.remove("hidden")
            winningBestTicks.classList.remove("hidden")

            if(winner==1 && (data[n][2]<missions[n].money-recalculateMoney(team1) || data[n][5]>ticks)){
                newRecord=true
                winningScreen.classList.add("hidden")
                recordScreen.classList.remove("hidden")
            }
        })
    }catch{
        console.log("No connection to server")
    }
}



const recordButton = document.getElementById("recordButton")
const recordName = document.getElementById("recordName")
recordButton.onclick = () =>{
    recordScreen.classList.add("hidden")
    winningScreen.classList.remove("hidden")
    if(newRecord){
        let name=recordName.value
        if(name=="CHUJ"){
            name="KUPA"
        }
        let team = JSON.parse(seed)[3]
        team = JSON.stringify(team)
        let teamGood=""
        for(let i=0; i<team.length; i++){
            if(team[i]=="["){
                teamGood+="@"
            }else if(team[i]=="]"){
                teamGood+="!"
            }else{
                teamGood+=team[i]
            }
        }
        try{
            fetch(`${url}/newRecord/${startingMissionId}/${name}/${teamGood}`)
            .then((response) => {
                return response.json();
            })    
            .then((data) => {
                winningBestGold.innerHTML=`Best Gold:<br /><b>${data[startingMissionId][2]}$</b><br />By:<br /><b>${data[startingMissionId][1]}</b>`
                winningBestTicks.innerHTML=`Fastest Win:<br /><b>${data[startingMissionId][5]} ticks</b><br />By:<br /><b>${data[startingMissionId][4]}</b>`
            })
        }catch{
            console.log("No connection to server")
        }
    }
}