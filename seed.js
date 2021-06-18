import { createUnit } from "./units.js"
// custom seed=[0,7,7,[[1,3,1],[2,3,2]],[[0,0,0],[0,1,1]]]
// units=[warrior,archer,ironclad,mage,horse]

const missions=[{}]
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

//TESTY
// let seed=[0,7,7,[[1,3,1],[2,3,2]],[[0,0,0],[0,1,1]]] //custom
// letseed=[1.......] //mission !!ogarnąć kiedyś
// let seed=[2,4]  //balanceTest
// seed to customSeed.value
// customSeed.value="[2,4]"

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
        console.log("invalid seed")
        mapWidth=5
        mapHeight=5
    }else if(seed[0]==2){
        //balanceTest 
        if(seed.length==2){
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