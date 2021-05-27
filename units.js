import { calculateClickedCoords } from "./map.js"
import { drawUnits } from "./map.js";
import { assetsStore } from "./assets.js";

class Unit{
    constructor(name,hpMax,damage,speed,range){
        this.name=name
        this.hpMax=hpMax;
        this.hp=hpMax;
        this.dmg=damage;
        this.speed=speed
        this.range=range;
        this.stamina=0
    }
}

const warrior=new Unit("warrior",520,140,20,1)
const archer=new Unit("archer",270,90,22,4)
const ironclad=new Unit("ironclad",1250,100,40,1)

const units=[warrior,archer,ironclad]

function createUnit(x,y,classId,staminaDiff){
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
const readyButtonDiv=document.getElementById("readyButton")
export let unitClassesDiv
export function createUnitClasses(){
    for(let i=0; i<units.length;i++){
        const div=document.createElement("div")
        div.classList.add("unitClass")
        const image=assetsStore.getImage(units[i].name)
        image.style.width="100%"
        image.style.height="100%"
        div.appendChild(image)
        choseUnitsDiv.appendChild(div)
    }
    unitClassesDiv=document.getElementsByClassName("unitClass")
    for(let i=0;i<unitClassesDiv.length;i++){
        unitClassesDiv[i].onclick=()=>{
            chosenUnitId=i
            if(team1AddingUnits==1){
                for(let j=0;j<unitClassesDiv.length;j++){
                    unitClassesDiv[j].style.backgroundColor="rgb(102, 167, 86)"
                } 
                unitClassesDiv[i].style.backgroundColor="rgb(66, 122, 52)"
            }else{
                for(let j=0;j<unitClassesDiv.length;j++){
                    unitClassesDiv[j].style.backgroundColor="rgb(134, 92, 86)"
                } 
                unitClassesDiv[i].style.backgroundColor="rgb(107 65 59)"
            }
        }
    }
}


export let team1AddingUnits=0
export let team2AddingUnits=0
export function startAddingUnits(team,cW,cH,mapWidth,mapHeight,team1,team2){
    choseUnitsDiv.classList.remove("hidden")
    readyButtonDiv.classList.remove("hidden")
    minimalizeDiv.classList.remove("hidden")
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
        let respond=calculateClickedCoords(event,cW,cH,mapWidth,mapHeight)
        clickedX=respond[0]
        clickedY=respond[1]

        let units=team1.concat(team2)
        let blockedFields=[]
        for (let i=0;i<units.length;i++){
            blockedFields.push([units[i].x,units[i].y])
        }
        if(!isBlocked(blockedFields,clickedX,clickedY) && chosenUnitId!=undefined){
            team.push(createUnit(clickedX,clickedY,chosenUnitId,team.length*2%10))  //zmienić jakoś staminaDif
        } 
        drawUnits(team1,team2,mapWidth,mapHeight,cW,cH) 
    }
}
export function stopAddingUnits(){
    team1AddingUnits=0
    team2AddingUnits=0
    canvas.onclick=()=>{}
    minimalizeDiv.classList.add("hidden")
    choseUnitsDiv.classList.add("hidden")
    readyButtonDiv.classList.add("hidden")

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

let minimalized=0
minimalizeDiv.onclick=()=>{
    if (minimalized==0){
        choseUnitsDiv.classList.add("hidden")
        readyButtonDiv.classList.add("hidden")
        minimalized=1
    }else{
        choseUnitsDiv.classList.remove("hidden")
        readyButtonDiv.classList.remove("hidden")
        minimalized=0
    }
}
