import { drawLine, drawRect, clear, drawImage } from "./canvasDrawing.js";
import { startAddingUnits, team1AddingUnits, team2AddingUnits } from "./units.js"

const gameArea = document.getElementById("gameArea")
const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
const choseUnitsDiv=document.getElementById("choseUnits")
const minimalize=document.getElementById("minimalize")
const changeTeamButton=document.getElementById("changeTeamButton")
const startButton=document.getElementById("startButton")
const deleteUnit=document.getElementById("deleteUnit")
const loadingSign=document.getElementById("loadingSign")
const menuPlay=document.getElementById("menuPlay")
const menuCustom=document.getElementById("menuCustom")
const customDiv=document.getElementById("custom")
const customWidthValue=document.getElementById("customWidthValue")
const customHeightValue=document.getElementById("customHeightValue")
const customSeedValue=document.getElementById("customSeedValue")



export function resizeGame(mapWidth,mapHeight,team1,team2) {
    let widthToHeight = mapWidth*1.5 / mapHeight;
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameArea.style.height = newHeight + "px";
      gameArea.style.width = newWidth + "px";
      gameArea.style.borderLeft= "black solid 2px";
      gameArea.style.borderRight= "black solid 2px";
      gameArea.style.borderTop= "";
      gameArea.style.borderBottom= "";

      

    } else {
      newHeight = newWidth / widthToHeight;
      gameArea.style.width = newWidth + "px";
      gameArea.style.height = newHeight + "px";
      gameArea.style.borderTop= "black solid 2px";
      gameArea.style.borderBottom= "black solid 2px";
      gameArea.style.borderLeft= "";
      gameArea.style.borderRight= "";

    }

    let cW=newWidth;

    let cH=newHeight;
    canvas.width = newWidth;
    canvas.height = newHeight;

    customDiv.style.fontSize=cH/13
    customWidthValue.style.fontSize=cH/13
    customHeightValue.style.fontSize=cH/13
    customSeedValue.style.fontSize=cH/13

  
    gameArea.style.marginTop = -newHeight / 2 + "px";
    gameArea.style.marginLeft = -newWidth / 2 + "px";


    if(team1AddingUnits==1){
      startAddingUnits(team1,cW,cH,mapWidth,mapHeight,team1,team2)
    }else if(team2AddingUnits==1){
      startAddingUnits(team2,cW,cH,mapWidth,mapHeight,team1,team2)
    }


    
    let choseUnitsHeight=cW/7
    let choseUnitsWidth=cH/7
    const unitsClassDiv=document.getElementsByClassName("unitClass")
    const priceDivs=document.getElementsByClassName("price")
    if(cH>=cW){
      minimalize.style.width=cW/12
      minimalize.style.height=cW/18
      minimalize.style.fontSize=cW/20

      startButton.style.fontSize=cW/15

      changeTeamButton.style.width=cW/12
      changeTeamButton.style.height=cW/18
      changeTeamButton.style.fontSize=cW/20
      changeTeamButton.style.right=cW/12

      deleteUnit.style.width=cW/20
      deleteUnit.style.height=cW/20

      choseUnitsDiv.style.flexDirection="row"
      choseUnitsDiv.style.height=1.28*choseUnitsHeight
      choseUnitsDiv.style.width=cW
      for(let i=0;i<unitsClassDiv.length;i++){
        unitsClassDiv[i].style.width=choseUnitsHeight;
        unitsClassDiv[i].style.height=1.28*choseUnitsHeight; 
        unitsClassDiv[i].style.borderBottom=""; 
        unitsClassDiv[i].style.borderRight="solid 1px black"; 

        priceDivs[i].style.fontSize=choseUnitsHeight/3

      }
      choseUnitsDiv.style.borderRight="solid 1px black"

      loadingSign.style.fontSize=cH/10
      menuPlay.style.fontSize=cH/20
      menuCustom.style.fontSize=cH/20
    }else{
      minimalize.style.width=cH/10
      minimalize.style.height=cH/15
      minimalize.style.fontSize=cH/8

      startButton.style.fontSize=cH/10

      changeTeamButton.style.width=cH/10
      changeTeamButton.style.height=cH/15
      changeTeamButton.style.fontSize=cH/17
      changeTeamButton.style.right=cH/10

      deleteUnit.style.width=cH/15
      deleteUnit.style.height=cH/15

      choseUnitsDiv.style.flexDirection="column"
      choseUnitsDiv.style.height=cH
      choseUnitsDiv.style.width=choseUnitsWidth
      for(let i=0;i<unitsClassDiv.length;i++){
        unitsClassDiv[i].style.width=choseUnitsWidth;
        unitsClassDiv[i].style.height=1.28*choseUnitsWidth; 
        unitsClassDiv[i].style.borderBottom="solid 1px black"; 
        unitsClassDiv[i].style.borderRight=""; 

        priceDivs[i].style.fontSize=choseUnitsWidth/3

      }
      choseUnitsDiv.style.borderRight="solid 1px black"

      loadingSign.style.fontSize=cW/12
      menuPlay.style.fontSize=cW/20
      menuCustom.style.fontSize=cW/20
    }
    

    makeMap(mapWidth,mapHeight,cW,cH)
    return [cW,cH]
  }

function makeMap(mapWidth,mapHeight,cW,cH){
    for(let i=1;i<mapWidth;i++){
        drawLine(1/mapWidth*i*cW,0,1/mapWidth*i*cW,cH)
    }
    for(let i=1;i<mapHeight;i++){
        drawLine(0,1/mapHeight*i*cH,cW,1/mapHeight*i*cH)
    }
}

export function drawUnits(team1,team2,mapWidth,mapHeight,cW,cH){
    let widthToHeight = mapWidth*1.5 / mapHeight;
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    let newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
    } else {
      newHeight = newWidth / widthToHeight;
    }

    cW=newWidth;
    cH=newHeight;
  
    clear(cW,cH)
    makeMap(mapWidth,mapHeight,cW,cH)
    for(let i=0;i<team1.length;i++){
      drawRect(team1[i].x*cW/mapWidth,team1[i].y*cH/mapHeight,cW/mapWidth,cH/mapHeight,"rgb(96, 134, 86)")
      drawHpBar(team1[i].x,team1[i].y,team1[i].hpMax,team1[i].hp,mapWidth,mapHeight,cW,cH)
      drawStaminaBar(team1[i].x,team1[i].y,team1[i].speed,team1[i].stamina,mapWidth,mapHeight,cW,cH)
      drawUnitImage(team1[i].x,team1[i].y,mapWidth,mapHeight,cW,cH,team1[i].name)
    };
    for(let i=0;i<team2.length;i++){
      drawRect(team2[i].x*cW/mapWidth,team2[i].y*cH/mapHeight,cW/mapWidth,cH/mapHeight,"rgb(134, 92, 86)")
      drawHpBar(team2[i].x,team2[i].y,team2[i].hpMax,team2[i].hp,mapWidth,mapHeight,cW,cH)
      drawStaminaBar(team2[i].x,team2[i].y,team2[i].speed,team2[i].stamina,mapWidth,mapHeight,cW,cH)
      drawUnitImage(team2[i].x,team2[i].y,mapWidth,mapHeight,cW,cH,team2[i].name)
  };
}

function drawHpBar(x,y,hpMax,hp,mapWidth,mapHeight,cW,cH){
    drawRect(x*cW/mapWidth+cW/mapWidth*0.025,y*cH/mapHeight+cH/mapHeight*0.05,cW/mapWidth*0.1,cH/mapHeight*0.9,"white")
    let hpPercent=hp/hpMax
    drawRect(x*cW/mapWidth+cW/mapWidth*0.025,y*cH/mapHeight+cH/mapHeight*0.05+cH/mapHeight*0.9,cW/mapWidth*0.1,-cH/mapHeight*0.9*hpPercent,"red")
}
function drawStaminaBar(x,y,speed,stamina,mapWidth,mapHeight,cW,cH){
    drawRect(x*cW/mapWidth+cW/mapWidth*0.875,y*cH/mapHeight+cH/mapHeight*0.05,cW/mapWidth*0.1,cH/mapHeight*0.9,"white")
    let staminaPercent=stamina/speed
    drawRect(x*cW/mapWidth+cW/mapWidth*0.875,y*cH/mapHeight+cH/mapHeight*0.05+cH/mapHeight*0.9,cW/mapWidth*0.1,-cH/mapHeight*0.9*staminaPercent,"yellow")
}

function drawUnitImage(x,y,mapWidth,mapHeight,cW,cH,imgName){
    drawImage(x*cW/mapWidth+cW/mapWidth*0.2,y*cH/mapHeight+cH/mapHeight*0.05,cH/mapHeight*0.9,cH/mapHeight*0.9,imgName)
}

export function calculateClickedCoords(event,mapWidth,mapHeight){
  let widthToHeight = mapWidth*1.5 / mapHeight;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;
  
  if (newWidthToHeight > widthToHeight) {
    newWidth = newHeight * widthToHeight;
  } else {
    newHeight = newWidth / widthToHeight;
  }

  let cW=newWidth;
  let cH=newHeight;
  let offsetX = event.offsetX;
  let offsetY = event.offsetY;
  let widthField=cW/mapWidth;
  let heightField=cH/mapHeight;
  let clickedX=Math.floor(offsetX/widthField);
  let clickedY=Math.floor(offsetY/heightField);
  return [clickedX,clickedY]
}
