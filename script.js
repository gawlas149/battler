//serve
import { resizeGame, drawUnits } from "./map.js";
import { startAddingUnits,stopAddingUnits, createUnitClasses, deleteUnitClasses, team1AddingUnits, chosenUnitId, team2AddingUnits } from "./units.js"
import { actions } from "./fight.js"
import { assetsStore } from "./assets.js"
import { generateMap } from "./seed.js"

const imagesToDownload=[{
    name: "warrior", 
    src: "images/warrior.png"
    },{
    name: "archer",
    src: "images/archer.png"
    },{
    name: "ironclad",
    src: "images/ironclad.png"
    },{
    name: "mage",
    src: "images/mage.png"
    },{
    name: "horse",
    src: "images/horse.png"
    }] 

let mapWidth=3;
let mapHeight=5;
let cW=0
let cH=0
let team1=[]    
let team2=[] 

const loadingScreen=document.getElementById("loadingScreen")
const menu=document.getElementById("menu")
const customButton=document.getElementById("menuCustom")
const playButton=document.getElementById("menuPlay")


assetsStore.onload=()=>{
    loadingScreen.classList.add("disappear")
    setInterval(() => {
        loadingScreen.classList.add("hidden") 
        customButton.style.zIndex=2
        playButton.style.zIndex=2
    }, 2000);
    menu.classList.remove("hidden")
    resizeGame(mapWidth,mapHeight,team1,team2)
}
assetsStore.init(imagesToDownload)



let sizes=resizeGame(mapWidth,mapHeight,team1,team2)
cW=sizes[0]
cH=sizes[1]
window.addEventListener("resize", ()=>{
    sizes=resizeGame(mapWidth,mapHeight,team1,team2)
    cW=sizes[0]
    cH=sizes[1]
    drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
});
window.addEventListener("orientationchange", ()=>{
    sizes=resizeGame(mapWidth,mapHeight,team1,team2)
    cW=sizes[0]
    cH=sizes[1]
    drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
});   

let ticks=0;
let tickInterval
function startGame(){
    generateSeed(mapWidth,mapHeight,team1,team2)
    ticks=0
    tickInterval=setInterval(() => {
        tick();
    }, 50);
}

let winner=0
function tick(){
    if (winner==0){
        ticks+=1;
        winner=actions(team1,team2,mapHeight,mapWidth,cW,cH)
        drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
    }else{
        win(winner)
    }
}

const winningScreen=document.getElementById("winningScreen")
const winningText=document.getElementById("winningText")

function win(winner){
    winningScreen.classList.remove("hidden")
    winningText.innerText=`Team${winner} won!`
    clearInterval(tickInterval)
    deleteUnitClasses()
}

function generateSeed(mapWidth,mapHeight,team1,team2){
    let generatedSeed=[0]
    generatedSeed.push(parseInt(mapWidth))
    generatedSeed.push(parseInt(mapHeight))
    let seedTeam1=[]
    for(let i=0;i<team1.length;i++){
        seedTeam1.push([team1[i].id,team1[i].x,team1[i].y])
    }
    generatedSeed.push(seedTeam1)
    let seedTeam2=[]
    for(let i=0;i<team2.length;i++){
        seedTeam2.push([team2[i].id,team2[i].x,team2[i].y])
    }
    generatedSeed.push(seedTeam2)
    console.log(JSON.stringify(generatedSeed))
}

const startButton=document.getElementById("startButton")
startButton.onclick=()=>{
    stopAddingUnits()
    startGame()
}

const changeTeamButton=document.getElementById("changeTeamButton")

changeTeamButton.onclick=()=>{
    const unitClassesDiv=document.getElementsByClassName("unitClass")
    const deleteUnit=document.getElementById("deleteUnit")

    if(team1AddingUnits==1){
        for(let i=0;i<unitClassesDiv.length;i++){
            unitClassesDiv[i].style.backgroundColor="rgb(134, 92, 86)"
        } 
        deleteUnit.style.backgroundColor="rgb(134, 92, 86)"
        if(chosenUnitId!=undefined){
        unitClassesDiv[chosenUnitId].style.backgroundColor="rgb(107 65 59)"
        }else{
            deleteUnit.style.backgroundColor="rgb(107, 65, 59)"
        }
        changeTeamButton.innerText="T2"
        startAddingUnits(team2,cW,cH,mapWidth,mapHeight,team1,team2)
    }else{
        for(let i=0;i<unitClassesDiv.length;i++){
            unitClassesDiv[i].style.backgroundColor="rgb(102, 167, 86)"
        } 
        deleteUnit.style.backgroundColor="rgb(102, 167, 86)"
        if(chosenUnitId!=undefined){
        unitClassesDiv[chosenUnitId].style.backgroundColor="rgb(66, 122, 52)"
        }else{
            deleteUnit.style.backgroundColor="rgb(66, 122, 52)"
        }
        changeTeamButton.innerText="T1"
        startAddingUnits(team1,cW,cH,mapWidth,mapHeight,team1,team2)
    }
}

const custom=document.getElementById("custom")
customButton.onclick=()=>{
    custom.classList.remove("hidden")
    menu.classList.add("hidden")
}

const customOkeyButton=document.getElementById("customOkey")
const gameArea=document.getElementById("gameArea")
customOkeyButton.onclick=()=>{
    let seedValues=generateMap()
    mapWidth=seedValues[0]
    mapHeight=seedValues[1]
    team1=seedValues[2]
    team2=seedValues[3]

    createUnitClasses()
    startAddingUnits(team1,cW,cH,mapWidth,mapHeight,team1,team2)
    drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)

    custom.classList.add("hidden")
    gameArea.classList.remove("hidden")

    sizes=resizeGame(mapWidth,mapHeight,team1,team2)
    cW=sizes[0]
    cH=sizes[1]
    drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
}

const winningOkey=document.getElementById("winningOkey")
const choseUnitsDiv=document.getElementById("choseUnits")
const minimalizeDiv=document.getElementById("minimalize")
const startButtonDiv=document.getElementById("startButton")
winningOkey.onclick=()=>{
    winningScreen.classList.add("hidden")
    gameArea.classList.add("hidden")

    menu.classList.remove("hidden")
    choseUnitsDiv.classList.remove("hidden")
    startButtonDiv.classList.remove("hidden")
    minimalizeDiv.classList.remove("hidden")
    changeTeamButton.classList.remove("hidden")
    changeTeamButton.innerText="T1"
    ticks=0
    winner=0
    team1=[]
    team2=[]
    mapWidth=3;
    mapHeight=5;
    resizeGame(mapWidth,mapHeight,team1,team2)
}
//kupowanie jednostek poprzez przeciąganie a nie tylko klikanie
