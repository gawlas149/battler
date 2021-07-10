import { createUnit } from "./units.js"
// missions=[{width,height,team2,money,blockedUnits,cantPlace}]
const missions=[{
  id: 0,
  width: 5,
  height: 5,
  enemies: [[0,0,0]],
  money: 1000,
  blockedUnits: [0,3],
  cantPlace: [[0,1],[3,3]]
}]

// balanceTests=[width,height,team1,team2,winningTeam]
const balanceTests=[
  [5,5,[[1,0,0],[1,4,0]],[[4,2,4]],1],
  [5,5,[[1,2,0],[1,3,0]],[[4,2,4]],2],
  [1,6,[[0,0,0]],[[1,0,5]],1],
  [1,3,[[3,0,0]],[[1,0,2]],1],
  [1,4,[[3,0,0]],[[1,0,3]],2],
]

const customWidth=document.getElementById("customWidthValue")
const customHeight=document.getElementById("customHeightValue")

let customSeed=document.getElementById("customSeedValue")

export function generateMap(){
    let seed=[]
    let mapWidth=0
    let mapHeight=0
    let team1=[]
    let team2=[]

    try{
      seed=eval(customSeed.value)
    } catch{
      console.log("invalid seed")
      mapWidth=5
      mapHeight=5
      return [mapWidth,mapHeight,team1,team2]
    }
    if(seed.length==0){
      mapWidth=parseInt(customWidth.value)
      mapHeight=parseInt(customHeight.value)
      if(mapHeight<1 || mapWidth<1){
        console.log("invalid size")
        mapWidth=5
        mapHeight=5
        return [mapWidth,mapHeight,team1,team2]
      }
 
    }else if(seed[0]==0){
        //custom
        if(seed.length==5){
          mapWidth=seed[1]
          mapHeight=seed[2]
          for(let i=0;i<seed[3].length;i++){
            team1.push(createUnit(seed[3][i][1],seed[3][i][2],seed[3][i][0],team1.length*2%10))
          }
          for(let i=0;i<seed[4].length;i++){
            team2.push(createUnit(seed[4][i][1],seed[4][i][2],seed[4][i][0],team2.length*2%10))
          }
        }else{
          console.log("invalid seed")
          mapWidth=5
          mapHeight=5
        }
        
    }else if(seed[0]==1){
        //mission
        // missions=[{width,height,enemies,money,blockedUnits,cantPlace}]
        if(seed[1]<missions.length){

        let map=missions[seed[1]]
        mapWidth=map.width
        mapHeight=map.height
        for(let i=0;i<map.enemies.length;i++){
          team2.push(createUnit(map.enemies[i][1],map.enemies[i][2],map.enemies[i][0],team2.length*2%10))
        }
        let money=map.money
        let blockedUnits=map.blockedUnits
        let cantPlace=map.cantPlace
        return [mapWidth,mapHeight,team2,money,blockedUnits,cantPlace]
        }else{
          console.log("invalid seed")
          mapWidth=5
          mapHeight=5
        }



        
    }else if(seed[0]==2){
        //balanceTest 
        if(seed.length==2 && seed[1]<balanceTests.length){
          let map=balanceTests[seed[1]]
          mapWidth=map[0]
          mapHeight=map[1]
          for(let i=0;i<map[2].length;i++){
            team1.push(createUnit(map[2][i][1],map[2][i][2],map[2][i][0],team1.length*2%10))
          }
          for(let i=0;i<map[3].length;i++){
            team2.push(createUnit(map[3][i][1],map[3][i][2],map[3][i][0],team2.length*2%10))
          }
        }else{
          console.log("invalid seed")
          mapWidth=5
          mapHeight=5
        }
    }else{
      console.log("invalid seed")
      mapWidth=5
      mapHeight=5
    }

    return [mapWidth,mapHeight,team1,team2]
}

customWidth.onkeypress=()=>{
  customSeed.value="[]"
}
customWidth.onchange=()=>{
  customSeed.value="[]"
}
customHeight.onkeypress=()=>{
  customSeed.value="[]"
}
customHeight.onchange=()=>{
  customSeed.value="[]"
}
customSeed.onkeypress=()=>{
  customHeight.value=0
  customWidth.value=0
}
customSeed.onpaste=(e)=>{
  customSeed.value=""
}