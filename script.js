//serve
import { resizeGame, drawUnits } from "./map.js";
import { startAddingUnits,stopAddingUnits, createUnitClasses, team1AddingUnits, unitClassesDiv, chosenUnitId } from "./units.js"
import { actions } from "./fight.js"
import { assetsStore } from "./assets.js"
const imagesToDownload=[{
    name: "warrior", 
    src: "images/warrior.png"
    },{
    name: "archer",
    src: "images/archer.png"
    },{
        name: "ironclad",
        src: "images/ironclad.png"
    }] 

assetsStore.onload=()=>{
    startAddingUnits(team1,cW,cH,mapWidth,mapHeight,team1,team2)
    createUnitClasses()
    resizeGame(mapWidth,mapHeight,cW,cH,team1,team2)
}
assetsStore.init(imagesToDownload)
let team1=[]    
let team2=[] 

let mapWidth=12;
let mapHeight=10;
let cW=0
let cH=0
let sizes=resizeGame(mapWidth,mapHeight,cW,cH,team1,team2)
cW=sizes[0]
cH=sizes[1]
window.addEventListener("resize", ()=>{
    sizes=resizeGame(mapWidth,mapHeight,cW,cH,team1,team2)
    cW=sizes[0]
    cH=sizes[1]
    drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
});
window.addEventListener("orientationchange", ()=>{
    sizes=resizeGame(mapWidth,mapHeight,cW,cH,team1,team2)
    cW=sizes[0]
    cH=sizes[1]
    drawUnits(team1,team2,mapWidth,mapHeight,cW,cH)
});   
drawUnits(team1,team2,mapWidth,mapHeight,cW,cH) 

function startGame(){
    let ticks=0;
    function tick(){
        ticks+=1;
        actions(team1,team2,mapHeight,mapWidth,cW,cH)
    }

    
    setInterval(() => {
        tick();
    }, 50);

}

const readyButton=document.getElementById("readyButton")
readyButton.onclick=()=>{
    if(team1AddingUnits==1){
        for(let i=0;i<unitClassesDiv.length;i++){
            unitClassesDiv[i].style.backgroundColor="rgb(134, 92, 86)"
        } 
        if(chosenUnitId!=undefined){
        unitClassesDiv[chosenUnitId].style.backgroundColor="rgb(107 65 59)"
        }
        startAddingUnits(team2,cW,cH,mapWidth,mapHeight,team1,team2)
    }else{
        stopAddingUnits()
        startGame()
    }
}

    //rysowanie przeciwników
    // team2.push(createUnit(4,5,1,team2.length*2))
    // team2.push(createUnit(4,4,0,team2.length*2))

    // for(let i=0;i<30;i++){
    //     for(let j=19;j<22;j++){
    //         team2.push(createUnit(i,j,1,team2.length*2%30))
    //     }
    // }


//kupowanie jednostek poprzez przeciąganie a nie tylko klikanie