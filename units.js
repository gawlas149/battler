import { calculateClickedCoords } from "./map.js"
import { drawUnits } from "./map.js";
import { assetsStore } from "./assets.js";

class Unit{
    constructor(id,name,hpMax,damage,speed,range,price){
        this.id=id
        this.name=name
        this.hpMax=hpMax;
        this.hp=hpMax;
        this.dmg=damage;
        this.speed=speed
        this.range=range;
        this.stamina=0
        this.price=price
    }
}

const warrior=new Unit(0,"warrior",520,140,20,1,75)
const archer=new Unit(1,"archer",270,80,22,4,125)
const ironclad=new Unit(2,"ironclad",1250,110,40,1,150)
const mage=new Unit(3,"mage",190,350,50,2,200)
const horse=new Unit(4,"horse",720,110,12,1,200)

const units=[warrior,archer,ironclad,mage,horse]

export function createUnit(x,y,classId,staminaDiff){
        const newUnit={
            ...units[classId],
            stamina:units[classId].stamina+staminaDiff,
            x:x,
            y:y,
        }
        return newUnit
}

export let chosenUnitId=undefined

const canvas=document.getElementById("canvas")
const choseUnitsDiv=document.getElementById("choseUnits")
const minimalizeDiv=document.getElementById("minimalize")
const startButtonDiv=document.getElementById("startButton")
const changeTeamButton=document.getElementById("changeTeamButton")
const deleteUnit=document.getElementById("deleteUnit")

export let unitClassesDiv
export function createUnitClasses(){
    for(let i=0; i<units.length;i++){
        const div=document.createElement("div")
        div.classList.add("unitClass")
        const image=assetsStore.getImage(units[i].name)
        image.style.width="100%"
        image.style.height="78%"
        div.appendChild(image)
        const price=document.createElement("div")
        price.innerText=units[i].price
        price.classList.add("price")
        div.appendChild(price)
        choseUnitsDiv.appendChild(div)
    }
    unitClassesDiv=document.getElementsByClassName("unitClass")
    for(let i=0;i<unitClassesDiv.length;i++){
        unitClassesDiv[i].onmouseover=()=>{
            unitClassesDiv[i].style.cursor="pointer"
        }
        unitClassesDiv[i].onclick=()=>{
            for(let j=0;j<unitClassesDiv.length;j++){
                unitClassesDiv[j].onmouseover=()=>{
                    unitClassesDiv[j].style.cursor="pointer"
                }
            }
            deleteUnit.onmouseover=()=>{
                deleteUnit.style.cursor="pointer"
            }
            chosenUnitId=i
            if(team1AddingUnits==1){
                for(let j=0;j<unitClassesDiv.length;j++){
                    unitClassesDiv[j].style.backgroundColor="rgb(102, 167, 86)"
                    deleteUnit.style.backgroundColor="rgb(102, 167, 86)"
                } 
                unitClassesDiv[i].style.backgroundColor="rgb(66, 122, 52)"
            }else{
                for(let j=0;j<unitClassesDiv.length;j++){
                    unitClassesDiv[j].style.backgroundColor="rgb(134, 92, 86)"
                    deleteUnit.style.backgroundColor="rgb(134, 92, 86)"
                } 
                unitClassesDiv[i].style.backgroundColor="rgb(107 65 59)"
            }
            unitClassesDiv[chosenUnitId].onmouseover=()=>{
                unitClassesDiv[chosenUnitId].style.cursor="default"
            }
        }
    }
}

let minimalized=0
export let team1AddingUnits=0
export let team2AddingUnits=0
export function startAddingUnits(team,cW,cH,mapWidth,mapHeight,team1,team2){
    if (minimalized==0){
        choseUnitsDiv.classList.remove("hidden")
        startButtonDiv.classList.remove("hidden")
        minimalizeDiv.classList.remove("hidden")
    }
    if(team==team1){
        team2AddingUnits=0
        team1AddingUnits=1
        choseUnitsDiv.style.backgroundColor="rgb(102, 167, 86)"

    }else{
        team1AddingUnits=0
        team2AddingUnits=1
        choseUnitsDiv.style.backgroundColor="rgb(134, 92, 86)"
    }

    let clickedX=0
    let clickedY=0
    canvas.onclick=()=>{}
    canvas.onclick=()=>{
        let respond=calculateClickedCoords(event,mapWidth,mapHeight)
        clickedX=respond[0]
        clickedY=respond[1]

        let units=team1.concat(team2)
        let blockedFields=[]
        for (let i=0;i<units.length;i++){
            blockedFields.push([units[i].x,units[i].y])
        }
        if(!isBlocked(blockedFields,clickedX,clickedY) && chosenUnitId!=undefined){
            team.push(createUnit(clickedX,clickedY,chosenUnitId,team.length*2%10)) 
        } else if(chosenUnitId==undefined){
            deleteChosenUnit(clickedX,clickedY,team1,team2,mapWidth,mapHeight,cW,cH)
        }
        // resizeGame(mapWidth,mapHeight,team1,team2)
        drawUnits(team1,team2,mapWidth,mapHeight,cW,cH) 

    }
}
export function stopAddingUnits(){
    team1AddingUnits=0
    team2AddingUnits=0
    canvas.onclick=()=>{}
    minimalizeDiv.classList.add("hidden")
    choseUnitsDiv.classList.add("hidden")
    startButtonDiv.classList.add("hidden")
    changeTeamButton.classList.add("hidden")
}

function isBlocked(blockedFields,x,y){
    const blocking=blockedFields.find((coords)=>{
        return coords[0]==x && coords[1]==y
    })
    if (blocking){
        return true
    }
    return false 
}

minimalizeDiv.onclick=()=>{
    if (minimalized==0){
        choseUnitsDiv.classList.add("hidden")
        startButtonDiv.classList.add("hidden")
        changeTeamButton.classList.add("hidden")
        minimalized=1
    }else{
        choseUnitsDiv.classList.remove("hidden")
        startButtonDiv.classList.remove("hidden")
        changeTeamButton.classList.remove("hidden")
        minimalized=0
    }
}

deleteUnit.onclick=()=>{
    for(let i=0;i<unitClassesDiv.length;i++){
        unitClassesDiv[i].onmouseover=()=>{
            unitClassesDiv[i].style.cursor="pointer"
        }
    }
    deleteUnit.onmouseover=()=>{
        deleteUnit.style.cursor="default"
    }
    if(team1AddingUnits==1){
        if(chosenUnitId!=undefined){
            unitClassesDiv[chosenUnitId].style.backgroundColor="rgb(102, 167, 86)"
        }
        deleteUnit.style.backgroundColor="rgb(66, 122, 52)"
    }else{
        if(chosenUnitId!=undefined){
        unitClassesDiv[chosenUnitId].style.backgroundColor="rgb(134, 92, 86)"
        }
        deleteUnit.style.backgroundColor="rgb(107 65 59)"

    }
    chosenUnitId=undefined
}

let canDeleteEnemies=1
function deleteChosenUnit(x,y,team1,team2,mapWidth,mapHeight,cW,cH){
    for(let i=0;i<team1.length;i++){
        if(team1[i].x==x && team1[i].y==y){
            team1.splice(i,1)
            drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
        }
    }
    if(canDeleteEnemies){
        for(let i=0;i<team2.length;i++){
            if(team2[i].x==x && team2[i].y==y){
                team2.splice(i,1)
                drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
            }
        }
    }
}