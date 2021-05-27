import { drawLine, drawRect, clear, drawImage } from "./canvasDrawing.js";
import { startAddingUnits, team1AddingUnits, team2AddingUnits } from "./units.js"

const gameArea = document.getElementById("gameArea")
const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
const choseUnitsDiv=document.getElementById("choseUnits")
const minimalize=document.getElementById("minimalize")
const readyButton=document.getElementById("readyButton")


export function resizeGame(mapWidth,mapHeight,cW,cH,team1,team2) {
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
  
    gameArea.style.marginTop = -newHeight / 2 + "px";
    gameArea.style.marginLeft = -newWidth / 2 + "px";
    canvas.width = newWidth;
    canvas.height = newHeight;
    cW=newWidth;
    cH=newHeight;

    if(team1AddingUnits==1){
      startAddingUnits(team1,cW,cH,mapWidth,mapHeight,team1,team2)
    }else if(team2AddingUnits==1){
      startAddingUnits(team2,cW,cH,mapWidth,mapHeight,team1,team2)
    }


    minimalize.style.fontSize=cW/20
    readyButton.style.fontSize=cW/15
    let choseUnitsHeight=cW/7
    let choseUnitsWidth=cH/7
    const unitsClassDiv=document.getElementsByClassName("unitClass")
    if(cH>=cW){
      minimalize.style.width=cW/12
      minimalize.style.height=cW/18
      choseUnitsDiv.style.height=choseUnitsHeight
      choseUnitsDiv.style.width=cW
      for(let i=0;i<unitsClassDiv.length;i++){
        unitsClassDiv[i].style.width=choseUnitsHeight;
        unitsClassDiv[i].style.height=choseUnitsHeight; 
      }
    }else{
      minimalize.style.width=cH/10
      minimalize.style.height=cH/15
      minimalize.style.fontSize=cH/8
      readyButton.style.fontSize=cH/10
      choseUnitsDiv.style.flexDirection="column"
      choseUnitsDiv.style.height=cH
      choseUnitsDiv.style.width=choseUnitsWidth
      for(let i=0;i<unitsClassDiv.length;i++){
        unitsClassDiv[i].style.width=choseUnitsWidth;
        unitsClassDiv[i].style.height=choseUnitsWidth; 
        unitsClassDiv[i].style.borderBottom="solid 1px black"; 
        unitsClassDiv[i].style.borderRight=""; 
        choseUnitsDiv.style.borderRight="solid 1px black"

      }
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

export function drawHpBar(x,y,hpMax,hp,mapWidth,mapHeight,cW,cH){
    drawRect(x*cW/mapWidth+cW/mapWidth*0.025,y*cH/mapHeight+cH/mapHeight*0.05,cW/mapWidth*0.1,cH/mapHeight*0.9,"white")
    let hpPercent=hp/hpMax
    drawRect(x*cW/mapWidth+cW/mapWidth*0.025,y*cH/mapHeight+cH/mapHeight*0.05+cH/mapHeight*0.9,cW/mapWidth*0.1,-cH/mapHeight*0.9*hpPercent,"red")
}
export function drawStaminaBar(x,y,speed,stamina,mapWidth,mapHeight,cW,cH){
  drawRect(x*cW/mapWidth+cW/mapWidth*0.875,y*cH/mapHeight+cH/mapHeight*0.05,cW/mapWidth*0.1,cH/mapHeight*0.9,"white")
  let staminaPercent=stamina/speed
  drawRect(x*cW/mapWidth+cW/mapWidth*0.875,y*cH/mapHeight+cH/mapHeight*0.05+cH/mapHeight*0.9,cW/mapWidth*0.1,-cH/mapHeight*0.9*staminaPercent,"yellow")
}

function drawUnitImage(x,y,mapWidth,mapHeight,cW,cH,imgName){
    drawImage(x*cW/mapWidth+cW/mapWidth*0.2,y*cH/mapHeight+cH/mapHeight*0.05,cH/mapHeight*0.9,cH/mapHeight*0.9,imgName)
}

export function calculateClickedCoords(event,cW,cH,mapWidth,mapHeight){
  let offsetX = event.offsetX;
  let offsetY = event.offsetY;
  let widthField=cW/mapWidth;
  let heightField=cH/mapHeight;
  let clickedX=Math.floor(offsetX/widthField);
  let clickedY=Math.floor(offsetY/heightField);
  return [clickedX,clickedY]
}
