//serve
import { resizeGame, drawUnits } from "./map.js";
import { startAddingUnits,stopAddingUnits, createUnitClasses, team1AddingUnits, unitClassesDiv, chosenUnitId } from "./units.js"
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

// let seed=[0,7,7,[[1,3,1],[2,3,2]],[[0,0,0],[0,1,1]]] //custom
// letseed=[1.......] //mission !!ogarnąć kiedyś
// let seed=[2,4]  //balanceTest
let seed=[]

const loadingScreen=document.getElementById("loadingScreen")
const menu=document.getElementById("menu")
assetsStore.onload=()=>{
    loadingScreen.classList.add("disappear")
    setInterval(() => {
       loadingScreen.classList.add("hidden") 
    }, 3000);
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

function startGame(){
    generateSeed(mapWidth,mapHeight,team1,team2)
    let ticks=0;
    function tick(){
        ticks+=1;
        actions(team1,team2,mapHeight,mapWidth,cW,cH)
        drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
    }

    
    setInterval(() => {
        tick();
    }, 50);

}

function generateSeed(mapWidth,mapHeight,team1,team2){
    let generatedSeed=[0]
    generatedSeed.push(mapWidth)
    generatedSeed.push(mapHeight)
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

const deleteUnit=document.getElementById("deleteUnit")
const changeTeamButton=document.getElementById("changeTeamButton")
changeTeamButton.onclick=()=>{
    if(team1AddingUnits==1){
        for(let i=0;i<unitClassesDiv.length;i++){
            unitClassesDiv[i].style.backgroundColor="rgb(134, 92, 86)"
        } 
        deleteUnit.style.backgroundColor="rgb(134, 92, 86)"
        if(chosenUnitId!=undefined){
        unitClassesDiv[chosenUnitId].style.backgroundColor="rgb(107 65 59)"
        }
        changeTeamButton.innerText="T2"
        startAddingUnits(team2,cW,cH,mapWidth,mapHeight,team1,team2)
    }
    else{
        for(let i=0;i<unitClassesDiv.length;i++){
            unitClassesDiv[i].style.backgroundColor="rgb(102, 167, 86)"
        } 
        deleteUnit.style.backgroundColor="rgb(102, 167, 86)"
        if(chosenUnitId!=undefined){
        unitClassesDiv[chosenUnitId].style.backgroundColor="rgb(66, 122, 52)"
        }
        changeTeamButton.innerText="T1"
        startAddingUnits(team1,cW,cH,mapWidth,mapHeight,team1,team2)
    }
}

const customButton=document.getElementById("menuCustom")
const custom=document.getElementById("custom")
customButton.onclick=()=>{
    custom.classList.remove("hidden")
    menu.classList.add("hidden")
}

const customOkeyButton=document.getElementById("customOkey")
const gameArea=document.getElementById("gameArea")
customOkeyButton.onclick=()=>{
    let seedValues=generateMap(seed,cW,cH)
    console.log(cW)
    mapWidth=seedValues[0]
    mapHeight=seedValues[1]
    team1=seedValues[2]
    team2=seedValues[3]

    createUnitClasses()
    startAddingUnits(team1,cW,cH,mapWidth,mapHeight,team1,team2)
    drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
    resizeGame(mapWidth,mapHeight,team1,team2)

    custom.classList.add("hidden")
    gameArea.classList.remove("hidden")

}

resizeGame(mapWidth,mapHeight,team1,team2)


//kupowanie jednostek poprzez przeciąganie a nie tylko klikanie