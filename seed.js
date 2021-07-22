import { createUnit } from "./units.js"

export const missions = [{
  id: 1,
  width: 5,
  height: 3,
  enemies: [[0, 3, 0], [4, 3, 1], [2, 3, 2], [1, 4, 0], [3, 4, 2]],
  cantPlace: [[2, 0], [2, 1], [2, 2], [4, 1]],
  money: 1000,
  blockedUnits: [],
}, {
  id: 2,
  width: 5,
  height: 5,
  enemies: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0]],
  cantPlace: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
  money: 399,
  blockedUnits: [0],
}, {
  id: 3,
  width: 5,
  height: 10,
  enemies: [[0, 4, 0], [0, 4, 1], [0, 3, 1], [0, 2, 1], [0, 1, 1], [0, 0, 1], [0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 8], [0, 3, 8], [0, 2, 8], [0, 1, 8], [0, 0, 8], [0, 0, 9], [0, 1, 9], [0, 2, 9], [0, 3, 9], [0, 4, 9]],
  cantPlace: [[4, 7], [3, 7], [2, 7], [1, 7], [0, 7], [4, 2], [3, 2], [2, 2], [1, 2], [0, 2], [0, 6], [0, 3], [4, 3], [4, 6]],
  money: 1300,
  blockedUnits: [],
}, {
  id: 4,
  width: 1,
  height: 7,
  enemies: [[2, 0, 4], [3, 0, 5], [1, 0, 6]],
  cantPlace: [[0, 3]],
  money: 9999,
  blockedUnits: [3],
}, {
  id: 5,
  width: 15,
  height: 15,
  enemies: [[0, 4, 0], [0, 3, 0], [0, 3, 1], [0, 2, 1], [0, 2, 0], [0, 2, 2], [0, 1, 1], [0, 1, 0], [0, 1, 2], [0, 1, 3], [0, 0, 1], [0, 0, 0], [0, 0, 2], [0, 0, 3], [0, 0, 4], [4, 14, 11], [4, 14, 12], [4, 13, 12], [4, 13, 13], [4, 12, 13], [4, 12, 14], [4, 11, 14], [4, 13, 14], [4, 14, 14], [4, 14, 13], [3, 13, 0], [3, 14, 0], [3, 14, 1], [3, 13, 1], [3, 14, 2], [3, 12, 0], [3, 11, 0], [3, 12, 1], [3, 13, 2], [3, 14, 3], [1, 4, 14], [1, 3, 14], [1, 2, 14], [1, 1, 14], [1, 0, 14], [1, 0, 13], [1, 1, 13], [1, 2, 13], [1, 3, 13], [1, 2, 12], [1, 1, 12], [1, 0, 12], [1, 0, 11], [1, 1, 11], [1, 0, 10]],
  cantPlace: [[7, 0], [7, 1], [7, 13], [7, 14], [0, 7], [1, 7], [13, 7], [14, 7], [6, 2], [5, 3], [5, 2], [6, 1], [4, 3], [4, 4], [3, 4], [3, 5], [2, 5], [2, 6], [1, 6], [1, 8], [2, 8], [2, 9], [3, 9], [3, 10], [4, 10], [4, 11], [5, 11], [5, 12], [6, 12], [6, 13], [8, 13], [8, 12], [9, 12], [9, 11], [10, 11], [10, 10], [11, 10], [11, 9], [12, 9], [12, 8], [13, 8], [13, 6], [12, 6], [12, 5], [11, 5], [11, 4], [10, 4], [10, 3], [9, 3], [9, 2], [8, 2], [8, 1], [8, 0], [9, 0], [9, 1], [10, 1], [10, 2], [11, 2], [11, 3], [12, 3], [12, 4], [13, 4], [13, 5], [14, 5], [14, 6], [6, 0], [5, 0], [5, 1], [4, 1], [4, 2], [3, 2], [3, 3], [2, 3], [2, 4], [1, 5], [1, 4], [0, 5], [0, 6], [0, 8], [0, 9], [1, 9], [1, 10], [2, 10], [2, 11], [3, 11], [3, 12], [4, 12], [4, 13], [5, 13], [5, 14], [6, 14], [8, 14], [9, 14], [9, 13], [10, 13], [10, 12], [11, 12], [11, 11], [12, 11], [12, 10], [13, 10], [13, 9], [14, 9], [14, 8], [14, 10], [13, 11], [12, 12], [11, 13], [10, 14], [14, 4], [13, 3], [12, 2], [11, 1], [10, 0], [7, 2], [6, 3], [5, 4], [4, 5], [3, 6], [2, 7], [3, 8], [4, 9], [5, 10], [6, 11], [7, 12], [8, 11], [9, 10], [10, 9], [11, 8], [12, 7], [11, 6], [10, 5], [9, 4], [8, 3]],
  money: 6000,
  blockedUnits: [],
}, {
  id: 6,
  width: 3,
  height: 10,
  enemies: [[0, 2, 1], [0, 0, 1], [1, 2, 0], [1, 1, 0], [1, 0, 0], [2, 1, 2], [1, 1, 1]],
  cantPlace: [[0, 6], [0, 5], [0, 4], [0, 3], [2, 6], [2, 5], [2, 4], [2, 3], [0, 7], [0, 8], [0, 9], [2, 7], [2, 8], [2, 9], [0, 2], [2, 2]],
  money: 700,
  blockedUnits: [],
}, {
  id: 7,
  width: 5,
  height: 5,
  enemies: [[2, 1, 2], [2, 2, 1], [2, 3, 2], [2, 2, 3], [3, 2, 2]],
  cantPlace: [[1, 1], [2, 0], [3, 1], [4, 2], [3, 3], [2, 4], [1, 3], [0, 2]],
  money: 800,
  blockedUnits: [],
}, {
  id: 8,
  width: 10,
  height: 10,
  enemies: [[1, 4, 4], [1, 4, 5], [1, 5, 5], [1, 5, 4], [3, 3, 4], [3, 3, 5], [3, 4, 6], [3, 5, 6], [3, 6, 5], [3, 6, 4], [3, 5, 3], [3, 4, 3], [2, 3, 2], [2, 2, 3], [2, 2, 4], [2, 2, 5], [2, 2, 6], [3, 3, 3], [3, 3, 6], [3, 6, 6], [3, 6, 3], [2, 4, 2], [2, 5, 2], [2, 6, 2], [2, 7, 3], [2, 7, 4], [2, 7, 5], [2, 7, 6], [2, 6, 7], [2, 5, 7], [2, 4, 7], [2, 3, 7], [2, 2, 7], [2, 2, 2], [2, 7, 2], [2, 7, 7]],
  cantPlace: [],
  money: 4900,
  blockedUnits: [],
}, {
  id: 9,
  width: 9,
  height: 9,
  enemies: [[4, 4, 4]],
  cantPlace: [],
  money: 250,
  blockedUnits: [0, 2, 3, 4],
}, {
  id: 10,
  width: 12,
  height: 8,
  enemies: [[2, 8, 0], [2, 7, 0], [2, 7, 1], [2, 7, 2], [2, 7, 3], [2, 7, 4], [2, 7, 5], [2, 7, 6], [2, 7, 7], [2, 8, 7], [1, 10, 6], [1, 10, 5], [1, 10, 4], [1, 10, 3], [1, 10, 2], [1, 10, 1], [1, 11, 0], [1, 11, 1], [1, 11, 2], [1, 11, 3], [1, 11, 4], [1, 11, 5], [1, 11, 6], [1, 11, 7], [3, 9, 0], [3, 8, 1], [3, 8, 2], [3, 8, 3], [3, 8, 4], [3, 8, 5], [3, 8, 6], [3, 9, 7], [1, 10, 0], [1, 9, 1], [1, 9, 2], [1, 9, 3], [1, 9, 4], [1, 9, 5], [1, 9, 6], [1, 10, 7]],
  cantPlace: [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [6, 7], [6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0]],
  money: 5432,
  blockedUnits: [],
}, {
  id: 11,
  width: 8,
  height: 5,
  enemies: [[0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 4], [0, 5, 3], [0, 6, 2], [0, 7, 1], [1, 6, 0], [1, 5, 1], [1, 4, 2], [1, 2, 4], [1, 1, 3], [1, 0, 2], [2, 2, 0], [2, 3, 1], [2, 4, 0], [2, 7, 3], [2, 6, 4], [2, 0, 4]],
  cantPlace: [],
  money: 1400,
  blockedUnits: [2],
}, {
  id: 12,
  width: 5,
  height: 5,
  enemies: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 3, 0], [1, 4, 0], [1, 4, 1], [1, 4, 3], [1, 4, 4], [1, 3, 4], [1, 0, 3], [1, 0, 4], [1, 1, 4]],
  cantPlace: [[0, 2], [2, 0], [2, 4], [4, 2]],
  money: 1500,
  blockedUnits: [1, 2, 4],
}]

// balanceTests=[width,height,team1,team2,winningTeam]
const balanceTests = [
  [5, 5, [[1, 0, 0], [1, 4, 0]], [[4, 2, 4]], 1],
  [5, 5, [[1, 2, 0], [1, 3, 0]], [[4, 2, 4]], 2],
  [1, 6, [[0, 0, 0]], [[1, 0, 5]], 1],
  [1, 3, [[3, 0, 0]], [[1, 0, 2]], 1],
  [1, 4, [[3, 0, 0]], [[1, 0, 3]], 2],
]

const customWidth = document.getElementById("customWidthValue")
const customHeight = document.getElementById("customHeightValue")

let customSeed = document.getElementById("customSeedValue")

export function generateMap(seed = [], mission = false) {
  let mapWidth = 0
  let mapHeight = 0
  let team1 = []
  let team2 = []
  if (mission == false && seed.length==0) {
    try {
      seed = JSON.parse(customSeed.value)
    } catch {
      console.log("invalid seed")
      mapWidth = 5
      mapHeight = 5
      return [mapWidth, mapHeight, team1, team2]
    }
  }else if(mission == false && seed.length!=0){
    try {
      seed = JSON.parse(seed)
    } catch {
      console.log("invalid seed")
      mapWidth = 5
      mapHeight = 5
      return [mapWidth, mapHeight, team1, team2]
    }
  }

  if (seed.length == 0) {
    mapWidth = parseInt(customWidth.value)
    mapHeight = parseInt(customHeight.value)
    if (mapHeight < 1 || mapWidth < 1) {
      console.log("invalid size")
      mapWidth = 5
      mapHeight = 5
      return [mapWidth, mapHeight, team1, team2]
    }

  } else if (seed[0] == 0) {
    //custom
    if (seed.length == 5) {
      mapWidth = seed[1]
      mapHeight = seed[2]
      for (let i = 0; i < seed[3].length; i++) {
        team1.push(createUnit(seed[3][i][1], seed[3][i][2], seed[3][i][0], team1.length * 2 % 10))
      }
      for (let i = 0; i < seed[4].length; i++) {
        team2.push(createUnit(seed[4][i][1], seed[4][i][2], seed[4][i][0], team2.length * 2 % 10))
      }
    } else {
      console.log("invalid seed")
      mapWidth = 5
      mapHeight = 5
    }

  } else if (seed[0] == 1) {
    //mission
    if (seed[1] < missions.length) {

      let map = missions[seed[1]]
      mapWidth = map.width
      mapHeight = map.height
      for (let i = 0; i < map.enemies.length; i++) {
        team2.push(createUnit(map.enemies[i][1], map.enemies[i][2], map.enemies[i][0], team2.length * 2 % 10))
      }
      let money = map.money
      let blockedUnits = map.blockedUnits
      let cantPlace = map.cantPlace
      return [mapWidth, mapHeight, team2, money, blockedUnits, cantPlace]
    } else {
      console.log("invalid seed")
      mapWidth = 5
      mapHeight = 5
    }




  } else if (seed[0] == 2) {
    //balanceTest 
    if (seed.length == 2 && seed[1] < balanceTests.length) {
      let map = balanceTests[seed[1]]
      mapWidth = map[0]
      mapHeight = map[1]
      for (let i = 0; i < map[2].length; i++) {
        team1.push(createUnit(map[2][i][1], map[2][i][2], map[2][i][0], team1.length * 2 % 10))
      }
      for (let i = 0; i < map[3].length; i++) {
        team2.push(createUnit(map[3][i][1], map[3][i][2], map[3][i][0], team2.length * 2 % 10))
      }
    } else {
      console.log("invalid seed")
      mapWidth = 5
      mapHeight = 5
    }
  } else {
    console.log("invalid seed")
    mapWidth = 5
    mapHeight = 5
  }

  return [mapWidth, mapHeight, team1, team2]
}

customWidth.onkeypress = () => {
  customSeed.value = "[]"
}
customWidth.onchange = () => {
  customSeed.value = "[]"
}
customHeight.onkeypress = () => {
  customSeed.value = "[]"
}
customHeight.onchange = () => {
  customSeed.value = "[]"
}
customSeed.onkeypress = () => {
  customHeight.value = 0
  customWidth.value = 0
}
customSeed.onpaste = () => {
  customSeed.value = ""
}