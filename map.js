import { drawLine, drawRect, clear, drawImage } from "./canvasDrawing.js";
import { startAddingUnits, team1AddingUnits, team2AddingUnits } from "./units.js"
import { mission, cantPlace } from "./script.js";


const gameArea = document.getElementById("gameArea")
const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
const choseUnitsDiv = document.getElementById("choseUnits")
const minimalize = document.getElementById("minimalize")
const changeTeamButton = document.getElementById("changeTeamButton")
const startButton = document.getElementById("startButton")
const teamPrice = document.getElementById("teamPrice")
const loadingSign = document.getElementById("loadingSign")
const menuPlay = document.getElementById("menuPlay")
const menuCustom = document.getElementById("menuCustom")
const menuLogo = document.getElementById("menuLogo")
const customDiv = document.getElementById("custom")
const customWidthValue = document.getElementById("customWidthValue")
const customHeightValue = document.getElementById("customHeightValue")
const customSeedValue = document.getElementById("customSeedValue")
const winningScreen = document.getElementById("winningScreen")
const winningOkey = document.getElementById("winningOkey")
const winningSeed = document.getElementById("winningSeed")
const customBack = document.getElementById("customBack")
const missionBack = document.getElementById("missionBack")
const gameBack = document.getElementById("gameBack")


export function resizeGame(mapWidth, mapHeight, team1, team2) {
  let widthToHeight = mapWidth * 1.5 / mapHeight;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
    newWidth = newHeight * widthToHeight;
    gameArea.style.height = newHeight + "px";
    gameArea.style.width = newWidth + "px";
    gameArea.style.borderLeft = "black solid 2px";
    gameArea.style.borderRight = "black solid 2px";
    gameArea.style.borderTop = "";
    gameArea.style.borderBottom = "";
  } else {
    newHeight = newWidth / widthToHeight;
    gameArea.style.width = newWidth + "px";
    gameArea.style.height = newHeight + "px";
    gameArea.style.borderTop = "black solid 2px";
    gameArea.style.borderBottom = "black solid 2px";
    gameArea.style.borderLeft = "";
    gameArea.style.borderRight = "";
  }

  let cW = newWidth;
  let cH = newHeight;
  canvas.width = newWidth;
  canvas.height = newHeight;

  customDiv.style.fontSize = cH / 13
  customWidthValue.style.fontSize = cH / 13
  customHeightValue.style.fontSize = cH / 13
  customSeedValue.style.fontSize = cH / 13


  gameArea.style.marginTop = -newHeight / 2 + "px";
  gameArea.style.marginLeft = -newWidth / 2 + "px";


  if (team1AddingUnits == 1) {
    startAddingUnits(team1, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
  } else if (team2AddingUnits == 1) {
    startAddingUnits(team2, cW, cH, mapWidth, mapHeight, team1, team2, cantPlace)
  }



  let choseUnitsHeight = cW / 7
  let choseUnitsWidth = cH / 7
  const unitsClassDiv = document.getElementsByClassName("unitClass")
  const priceDivs = document.getElementsByClassName("price")
  const deleteUnit = document.getElementById("deleteUnit")


  if (cH >= cW) {
    minimalize.style.width = cW / 12
    minimalize.style.height = cW / 18
    minimalize.style.fontSize = cW / 20

    startButton.style.fontSize = cW / 15

    changeTeamButton.style.width = cW / 12
    changeTeamButton.style.height = cW / 18
    changeTeamButton.style.fontSize = cW / 20
    changeTeamButton.style.right = cW / 12

    teamPrice.style.right = cW / 6
    teamPrice.style.height = cW / 18
    teamPrice.style.fontSize = cW / 20
    teamPrice.style.width = cW / 8

    try {
      if (mission == true) {
        changeTeamButton.classList.add("hidden")
        teamPrice.style.right = cW / 12
      }
    } catch { }



    if (deleteUnit) {
      deleteUnit.style.width = cW / 20
      deleteUnit.style.height = cW / 20
    }
    gameBack.style.width = cW / 20
    gameBack.style.height = cW / 20
    customBack.style.width = cW / 10
    customBack.style.height = cW / 10
    missionBack.style.width = cW / 10
    missionBack.style.height = cW / 10



    choseUnitsDiv.style.flexDirection = "row"
    choseUnitsDiv.style.height = 1.28 * choseUnitsHeight
    choseUnitsDiv.style.width = cW
    for (let i = 0; i < unitsClassDiv.length; i++) {
      unitsClassDiv[i].style.width = choseUnitsHeight;
      unitsClassDiv[i].style.height = 1.28 * choseUnitsHeight;
      unitsClassDiv[i].style.borderBottom = "";
      unitsClassDiv[i].style.borderRight = "solid 1px black";

      priceDivs[i].style.fontSize = choseUnitsHeight / 3

    }
    choseUnitsDiv.style.borderRight = "solid 1px black"

    loadingSign.style.fontSize = cW / 6
    menuPlay.style.fontSize = cW / 12
    menuCustom.style.fontSize = cW / 12
    menuPlay.style.width = cW / 2.5
    menuCustom.style.width = cW / 2.5
    menuLogo.style.width = cW

    winningScreen.style.fontSize = cW / 10
    winningOkey.style.width = cW / 3
    winningOkey.style.height = cW / 9
    winningOkey.style.fontSize = cW / 10
    winningSeed.style.width = cW / 3
    winningSeed.style.height = cW / 9
    winningSeed.style.fontSize = cW / 10

    const missionSelectDivs = document.getElementsByClassName("missionSelect")

    for (let i = 0; i < missionSelectDivs.length; i++) {
      missionSelectDivs[i].style.width = cW / 4
      missionSelectDivs[i].style.height = missionSelectDivs[i].style.width * 0.5
      missionSelectDivs[i].style.fontSize = cW / 6

    }


  } else {
    minimalize.style.width = cH / 10
    minimalize.style.height = cH / 15
    minimalize.style.fontSize = cH / 8

    startButton.style.fontSize = cH / 10

    changeTeamButton.style.width = cH / 10
    changeTeamButton.style.height = cH / 15
    changeTeamButton.style.fontSize = cH / 17
    changeTeamButton.style.right = cH / 10

    teamPrice.style.right = cH / 5
    teamPrice.style.height = cH / 15
    teamPrice.style.fontSize = cH / 17
    teamPrice.style.width = cH / 5

    try {
      if (mission == true) {
        changeTeamButton.classList.add("hidden")
        teamPrice.style.right = cH / 10
      }
    } catch { }

    if (deleteUnit) {
      deleteUnit.style.width = cH / 15
      deleteUnit.style.height = cH / 15
    }
    gameBack.style.width = cH / 15
    gameBack.style.height = cH / 15


    choseUnitsDiv.style.flexDirection = "column"
    choseUnitsDiv.style.height = cH
    choseUnitsDiv.style.width = choseUnitsWidth
    for (let i = 0; i < unitsClassDiv.length; i++) {
      unitsClassDiv[i].style.width = choseUnitsWidth;
      unitsClassDiv[i].style.height = 1.28 * choseUnitsWidth;
      unitsClassDiv[i].style.borderBottom = "solid 1px black";
      unitsClassDiv[i].style.borderRight = "";

      priceDivs[i].style.fontSize = choseUnitsWidth / 3

    }
    choseUnitsDiv.style.borderRight = "solid 1px black"


    loadingSign.style.fontSize = cH / 10
    menuPlay.style.fontSize = cH / 20
    menuCustom.style.fontSize = cH / 20

    winningScreen.style.fontSize = cH / 8
    winningOkey.style.width = cH / 3
    winningOkey.style.height = cH / 8
    winningOkey.style.fontSize = cH / 9
    winningSeed.style.width = cH / 3
    winningSeed.style.height = cH / 8
    winningSeed.style.fontSize = cH / 9
  }


  makeMap(mapWidth, mapHeight, cW, cH)
  return [cW, cH]
}

function makeMap(mapWidth, mapHeight, cW, cH) {
  for (let i = 1; i < mapWidth; i++) {
    drawLine(1 / mapWidth * i * cW, 0, 1 / mapWidth * i * cW, cH)
  }
  for (let i = 1; i < mapHeight; i++) {
    drawLine(0, 1 / mapHeight * i * cH, cW, 1 / mapHeight * i * cH)
  }
}

export function drawUnits(team1, team2, mapWidth, mapHeight, cW, cH, cantPlace) {
  let widthToHeight = mapWidth * 1.5 / mapHeight;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
    newWidth = newHeight * widthToHeight;
  } else {
    newHeight = newWidth / widthToHeight;
  }

  cW = newWidth;
  cH = newHeight;

  clear(cW, cH)
  makeMap(mapWidth, mapHeight, cW, cH)

  if (team1AddingUnits || team2AddingUnits) {
    drawCantPlace(cantPlace, mapWidth, mapHeight, cW, cH)
  }

  for (let i = 0; i < team1.length; i++) {
    drawRect(team1[i].x * cW / mapWidth, team1[i].y * cH / mapHeight, cW / mapWidth, cH / mapHeight, "rgb(96, 134, 86)")
    drawHpBar(team1[i].x, team1[i].y, team1[i].hpMax, team1[i].hp, mapWidth, mapHeight, cW, cH)
    drawStaminaBar(team1[i].x, team1[i].y, team1[i].speed, team1[i].stamina, mapWidth, mapHeight, cW, cH)
    drawUnitImage(team1[i].x, team1[i].y, mapWidth, mapHeight, cW, cH, team1[i].name)
  };
  for (let i = 0; i < team2.length; i++) {
    drawRect(team2[i].x * cW / mapWidth, team2[i].y * cH / mapHeight, cW / mapWidth, cH / mapHeight, "rgb(134, 92, 86)")
    drawHpBar(team2[i].x, team2[i].y, team2[i].hpMax, team2[i].hp, mapWidth, mapHeight, cW, cH)
    drawStaminaBar(team2[i].x, team2[i].y, team2[i].speed, team2[i].stamina, mapWidth, mapHeight, cW, cH)
    drawUnitImage(team2[i].x, team2[i].y, mapWidth, mapHeight, cW, cH, team2[i].name)
  };
}

function drawCantPlace(cantPlace, mapWidth, mapHeight, cW, cH) {
  for (let i = 0; i < cantPlace.length; i++) {
    drawRect(cantPlace[i][0] * cW / mapWidth, cantPlace[i][1] * cH / mapHeight + cH / (mapHeight * 2.5), cW / mapWidth, cH / (mapHeight * 5), "red")
  }
}

function drawHpBar(x, y, hpMax, hp, mapWidth, mapHeight, cW, cH) {
  drawRect(x * cW / mapWidth + cW / mapWidth * 0.025, y * cH / mapHeight + cH / mapHeight * 0.05, cW / mapWidth * 0.1, cH / mapHeight * 0.9, "white")
  let hpPercent = hp / hpMax
  drawRect(x * cW / mapWidth + cW / mapWidth * 0.025, y * cH / mapHeight + cH / mapHeight * 0.05 + cH / mapHeight * 0.9, cW / mapWidth * 0.1, -cH / mapHeight * 0.9 * hpPercent, "red")
}
function drawStaminaBar(x, y, speed, stamina, mapWidth, mapHeight, cW, cH) {
  drawRect(x * cW / mapWidth + cW / mapWidth * 0.875, y * cH / mapHeight + cH / mapHeight * 0.05, cW / mapWidth * 0.1, cH / mapHeight * 0.9, "white")
  let staminaPercent = stamina / speed
  drawRect(x * cW / mapWidth + cW / mapWidth * 0.875, y * cH / mapHeight + cH / mapHeight * 0.05 + cH / mapHeight * 0.9, cW / mapWidth * 0.1, -cH / mapHeight * 0.9 * staminaPercent, "yellow")
}

function drawUnitImage(x, y, mapWidth, mapHeight, cW, cH, imgName) {
  drawImage(x * cW / mapWidth + cW / mapWidth * 0.2, y * cH / mapHeight + cH / mapHeight * 0.05, cH / mapHeight * 0.9, cH / mapHeight * 0.9, imgName)
}

export function calculateClickedCoords(event, mapWidth, mapHeight) {
  let widthToHeight = mapWidth * 1.5 / mapHeight;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
    newWidth = newHeight * widthToHeight;
  } else {
    newHeight = newWidth / widthToHeight;
  }

  let cW = newWidth;
  let cH = newHeight;
  let offsetX = event.offsetX;
  let offsetY = event.offsetY;
  let widthField = cW / mapWidth;
  let heightField = cH / mapHeight;
  let clickedX = Math.floor(offsetX / widthField);
  let clickedY = Math.floor(offsetY / heightField);
  return [clickedX, clickedY]
}
