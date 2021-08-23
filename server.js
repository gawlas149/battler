const fs = require("fs");
const express = require("express");
const cors = require("cors");


const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("app"));

function startServer() {
    const missions = [{
        id: 1,
        width: 5,
        height: 3,
        enemies: [[0, 3, 0], [4, 3, 1], [2, 3, 2], [1, 4, 0], [3, 4, 2]],
        cantPlace: [[2, 0], [2, 1], [2, 2], [4, 1]],
        money: 1000,
        blockedUnits: [],
      },{
        id: 2,
        width:5,
        height:5,
        enemies: [[4,4,4],[4,0,0],[4,0,4],[4,4,0],[4,2,2]],
        cantPlace: [],
        money: 1000,
        blockedUnits: [5],
      }, {
        id: 3,
        width: 5,
        height: 10,
        enemies: [[0, 4, 0], [0, 4, 1], [0, 3, 1], [0, 2, 1], [0, 1, 1], [0, 0, 1], [0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 8], [0, 3, 8], [0, 2, 8], [0, 1, 8], [0, 0, 8], [0, 0, 9], [0, 1, 9], [0, 2, 9], [0, 3, 9], [0, 4, 9]],
        cantPlace: [[4, 7], [3, 7], [2, 7], [1, 7], [0, 7], [4, 2], [3, 2], [2, 2], [1, 2], [0, 2], [0, 6], [0, 3], [4, 3], [4, 6]],
        money: 1300,
        blockedUnits: [],
      }, {
        id:4,
        width:9,
        height:7,
        enemies: [[0,0,3],[0,0,2],[0,0,1],[0,0,0],[0,1,2],[0,1,1],[0,1,0],[0,2,1],[0,2,0],[0,3,1],[0,3,0],[0,4,1],[0,4,0],[0,5,1],[0,5,0],[0,6,1],[0,6,0],[0,7,2],[0,7,1],[0,7,0],[0,8,3],[0,8,2],[0,8,1],[0,8,0],[0,4,2],[0,4,3]],
        cantPlace: [[3,2],[2,2],[1,3],[0,4],[1,4],[2,3],[3,3],[5,3],[5,2],[6,2],[6,3],[7,3],[7,4],[8,4],[3,4],[4,4],[5,4]],
        money: 1750,
        blockedUnits: [],
      },{
        id: 5,
        width: 5,
        height: 5,
        enemies: [[0, 0, 0], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0]],
        cantPlace: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
        money: 399,
        blockedUnits: [0],
      }, {
        id: 6,
        width: 1,
        height: 7,
        enemies: [[2, 0, 4], [3, 0, 5], [1, 0, 6]],
        cantPlace: [[0, 3]],
        money: 9999,
        blockedUnits: [3],
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
      },{
        id: 10,
        width: 3,
        height: 10,
        enemies: [[0, 2, 1], [0, 0, 1], [1, 2, 0], [1, 1, 0], [1, 0, 0], [2, 1, 2], [1, 1, 1]],
        cantPlace: [[0, 6], [0, 5], [0, 4], [0, 3], [2, 6], [2, 5], [2, 4], [2, 3], [0, 7], [0, 8], [0, 9], [2, 7], [2, 8], [2, 9], [0, 2], [2, 2]],
        money: 700,
        blockedUnits: [],
      }, {
        id: 11,
        width: 15,
        height: 15,
        enemies: [[0, 4, 0], [0, 3, 0], [0, 3, 1], [0, 2, 1], [0, 2, 0], [0, 2, 2], [0, 1, 1], [0, 1, 0], [0, 1, 2], [0, 1, 3], [0, 0, 1], [0, 0, 0], [0, 0, 2], [0, 0, 3], [0, 0, 4], [4, 14, 11], [4, 14, 12], [4, 13, 12], [4, 13, 13], [4, 12, 13], [4, 12, 14], [4, 11, 14], [4, 13, 14], [4, 14, 14], [4, 14, 13], [3, 13, 0], [3, 14, 0], [3, 14, 1], [3, 13, 1], [3, 14, 2], [3, 12, 0], [3, 11, 0], [3, 12, 1], [3, 13, 2], [3, 14, 3], [1, 4, 14], [1, 3, 14], [1, 2, 14], [1, 1, 14], [1, 0, 14], [1, 0, 13], [1, 1, 13], [1, 2, 13], [1, 3, 13], [1, 2, 12], [1, 1, 12], [1, 0, 12], [1, 0, 11], [1, 1, 11], [1, 0, 10]],
        cantPlace: [[7, 0], [7, 1], [7, 13], [7, 14], [0, 7], [1, 7], [13, 7], [14, 7], [6, 2], [5, 3], [5, 2], [6, 1], [4, 3], [4, 4], [3, 4], [3, 5], [2, 5], [2, 6], [1, 6], [1, 8], [2, 8], [2, 9], [3, 9], [3, 10], [4, 10], [4, 11], [5, 11], [5, 12], [6, 12], [6, 13], [8, 13], [8, 12], [9, 12], [9, 11], [10, 11], [10, 10], [11, 10], [11, 9], [12, 9], [12, 8], [13, 8], [13, 6], [12, 6], [12, 5], [11, 5], [11, 4], [10, 4], [10, 3], [9, 3], [9, 2], [8, 2], [8, 1], [8, 0], [9, 0], [9, 1], [10, 1], [10, 2], [11, 2], [11, 3], [12, 3], [12, 4], [13, 4], [13, 5], [14, 5], [14, 6], [6, 0], [5, 0], [5, 1], [4, 1], [4, 2], [3, 2], [3, 3], [2, 3], [2, 4], [1, 5], [1, 4], [0, 5], [0, 6], [0, 8], [0, 9], [1, 9], [1, 10], [2, 10], [2, 11], [3, 11], [3, 12], [4, 12], [4, 13], [5, 13], [5, 14], [6, 14], [8, 14], [9, 14], [9, 13], [10, 13], [10, 12], [11, 12], [11, 11], [12, 11], [12, 10], [13, 10], [13, 9], [14, 9], [14, 8], [14, 10], [13, 11], [12, 12], [11, 13], [10, 14], [14, 4], [13, 3], [12, 2], [11, 1], [10, 0], [7, 2], [6, 3], [5, 4], [4, 5], [3, 6], [2, 7], [3, 8], [4, 9], [5, 10], [6, 11], [7, 12], [8, 11], [9, 10], [10, 9], [11, 8], [12, 7], [11, 6], [10, 5], [9, 4], [8, 3]],
        money: 6000,
        blockedUnits: [],
      }, {
        id: 12,
        width: 12,
        height: 8,
        enemies: [[2, 8, 0], [2, 7, 0], [2, 7, 1], [2, 7, 2], [2, 7, 3], [2, 7, 4], [2, 7, 5], [2, 7, 6], [2, 7, 7], [2, 8, 7], [1, 10, 6], [1, 10, 5], [1, 10, 4], [1, 10, 3], [1, 10, 2], [1, 10, 1], [1, 11, 0], [1, 11, 1], [1, 11, 2], [1, 11, 3], [1, 11, 4], [1, 11, 5], [1, 11, 6], [1, 11, 7], [3, 9, 0], [3, 8, 1], [3, 8, 2], [3, 8, 3], [3, 8, 4], [3, 8, 5], [3, 8, 6], [3, 9, 7], [1, 10, 0], [1, 9, 1], [1, 9, 2], [1, 9, 3], [1, 9, 4], [1, 9, 5], [1, 9, 6], [1, 10, 7]],
        cantPlace: [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [6, 7], [6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0]],
        money: 5432,
        blockedUnits: [],
      }, {
        id: 13,
        width: 8,
        height: 5,
        enemies: [[0, 0, 0], [0, 1, 1], [0, 2, 2], [0, 3, 3], [0, 4, 4], [0, 5, 3], [0, 6, 2], [0, 7, 1], [1, 6, 0], [1, 5, 1], [1, 4, 2], [1, 2, 4], [1, 1, 3], [1, 0, 2], [2, 2, 0], [2, 3, 1], [2, 4, 0], [2, 7, 3], [2, 6, 4], [2, 0, 4]],
        cantPlace: [],
        money: 1400,
        blockedUnits: [2],
      }, {
        id: 14,
        width: 5,
        height: 5,
        enemies: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 3, 0], [1, 4, 0], [1, 4, 1], [1, 4, 3], [1, 4, 4], [1, 3, 4], [1, 0, 3], [1, 0, 4], [1, 1, 4]],
        cantPlace: [[0, 2], [2, 0], [2, 4], [4, 2]],
        money: 1500,
        blockedUnits: [1, 2, 4],
      },{
        id: 15,
        width:5,
        height:10,
        enemies: [[1,0,1],[1,0,0],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,4,1],[1,2,1],[0,0,3],[0,1,3],[0,2,3],[0,3,3],[0,4,3],[2,0,2],[2,1,2],[2,1,1],[2,3,1],[2,3,2],[2,4,2],[4,2,2]],
        cantPlace: [[0,4],[0,5],[1,5],[1,4],[2,5],[2,4],[3,4],[3,5],[4,5],[4,4]],
        money: 1975,
        blockedUnits: [0],
      },{
        id:16,
        width:8,
        height:5,
        enemies: [[2,2,3],[2,2,2],[2,2,1],[4,2,4],[2,1,1],[2,1,3],[1,1,2],[4,1,4],[4,1,0],[4,2,0]],
        cantPlace: [[4,0],[4,4],[5,0],[6,0],[7,0],[5,4],[6,4],[7,4],[3,4],[3,0],[3,1],[3,2],[3,3],[0,1],[0,0],[0,3],[0,4]],
        money: 1475,
        blockedUnits: [],
      },{
        id:17,
        width:10,
        height:10,
        enemies: [[2,9,9],[2,8,9],[2,7,9],[2,6,9],[2,5,9],[2,9,0],[2,8,0],[2,7,0],[2,6,0],[2,5,0],[4,0,2],[4,0,3],[4,0,4],[4,0,5],[4,0,6],[4,0,7],[1,1,2],[1,1,3],[1,1,4],[1,1,5],[1,1,6],[1,1,7],[1,2,2],[1,2,3],[1,2,4],[1,2,5],[1,2,6],[1,2,7],[4,0,8],[4,0,9],[4,0,1],[4,0,0]],
        cantPlace: [[1,0],[1,1],[2,1],[2,0],[3,0],[3,1],[4,0],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[4,2],[3,2],[3,3],[4,3],[4,4],[3,4],[3,5],[4,5],[3,6],[4,6],[4,7],[3,7],[3,8],[4,8],[4,9],[3,9],[2,9],[1,9],[1,8],[2,8],[5,8],[6,8],[7,8],[8,8],[9,8]],
        money: 4000,
        blockedUnits: [],
      },{
        id:18,
        width:10,
        height:10,
        enemies: [[2,2,0],[2,2,1],[2,2,2],[2,2,3],[2,2,4],[2,2,5],[2,2,6],[2,2,7],[2,2,8],[2,2,9],[3,1,0],[3,1,1],[3,1,2],[3,1,3],[3,1,4],[3,1,5],[3,1,6],[3,1,7],[3,1,8],[3,1,9],[1,0,0],[1,0,1],[1,0,2],[1,0,3],[1,0,4],[1,0,5],[1,0,6],[1,0,7],[1,0,8],[1,0,9]],
        cantPlace: [[8,0],[7,1],[9,1],[8,2],[9,3],[7,3],[8,4],[9,5],[7,5],[8,6],[9,7],[7,7],[8,8],[7,9],[9,9],[6,8],[6,6],[6,4],[6,2],[6,0],[5,1],[5,3],[5,5],[5,7],[5,9],[4,8],[4,6],[4,4],[4,2],[4,0],[3,1],[3,3],[3,5],[3,7],[3,9]],
        money: 4050,
        blockedUnits: [],
      },{
        id:19,
        width:3,
        height:7,
        enemies: [[2,0,2],[2,0,4],[2,2,4],[2,2,2],[3,1,3]],
        cantPlace: [[1,2],[2,3],[1,4],[0,3]],
        money: 799,
        blockedUnits: [3,4],
      },{
        id:20,
        width:19,
        height:20,
        enemies: [[0,9,19],[0,8,18],[0,7,17],[0,6,16],[0,10,18],[0,11,17],[0,12,16],[0,13,15],[0,14,14],[0,15,13],[0,15,12],[0,16,11],[0,16,10],[0,17,9],[0,17,8],[0,17,7],[0,5,15],[0,4,14],[0,2,11],[0,1,9],[0,3,12],[0,2,10],[0,1,8],[0,1,7],[0,3,13],[0,1,6],[0,1,5],[0,0,7],[0,0,6],[0,0,5],[0,1,4],[0,17,6],[0,17,5],[0,17,4],[0,18,5],[0,18,6],[0,18,7],[0,2,3],[0,2,2],[0,3,2],[0,3,1],[0,4,1],[0,5,1],[0,5,2],[0,6,2],[0,6,3],[0,7,3],[0,7,4],[0,8,4],[0,9,4],[0,10,4],[0,11,4],[0,11,3],[0,12,3],[0,12,2],[0,13,2],[0,13,1],[0,14,1],[0,15,1],[0,15,2],[0,16,2],[0,16,3],[2,2,4],[2,2,5],[2,2,6],[2,2,7],[2,2,8],[2,2,9],[2,3,10],[2,3,11],[2,4,12],[2,4,13],[2,5,14],[2,6,15],[2,7,16],[2,8,17],[2,9,18],[2,10,17],[2,11,16],[2,12,15],[2,13,14],[2,14,13],[2,14,12],[2,15,11],[2,15,10],[2,16,9],[2,16,8],[2,16,7],[2,16,6],[2,16,5],[2,16,4],[2,15,3],[2,14,2],[2,13,3],[2,12,4],[2,11,5],[2,10,5],[2,9,5],[2,8,5],[2,7,5],[2,6,4],[2,5,3],[2,4,2],[2,3,3],[0,14,3],[0,13,4],[0,12,5],[0,11,6],[0,10,6],[0,9,6],[0,8,6],[0,7,6],[0,6,5],[0,5,4],[0,4,3],[0,3,4],[0,3,5],[0,3,6],[0,3,7],[0,3,8],[0,3,9],[0,4,10],[0,4,11],[0,5,12],[0,5,13],[0,6,14],[0,7,15],[0,8,16],[0,9,17],[0,10,16],[0,11,15],[0,12,14],[0,13,13],[0,13,12],[0,14,11],[0,14,10],[0,15,9],[0,15,8],[0,15,7],[0,15,6],[0,15,5],[0,15,4],[1,14,4],[1,14,5],[1,14,6],[1,14,7],[1,14,8],[1,14,9],[1,4,4],[1,4,5],[1,4,6],[1,4,7],[1,4,8],[1,4,9],[1,9,16],[1,8,15],[1,7,14],[1,6,13],[1,10,15],[1,11,14],[1,12,13],[0,5,5],[0,5,6],[0,5,7],[0,5,8],[0,5,9],[0,13,5],[0,13,6],[0,13,7],[0,13,8],[0,13,9],[0,12,12],[0,11,13],[0,10,14],[0,9,15],[0,8,14],[0,7,13],[0,6,12]],
        cantPlace: [[9,0],[9,1],[9,2],[9,3],[9,7],[9,8],[9,9],[9,10],[9,11],[9,12],[9,13],[9,14]],
        money: 14450,
        blockedUnits: [],
      }]

    function distance(x1,y1,x2,y2){
        return Math.sqrt( (x1 - x2)**2 + (y1 - y2)**2 )
    }
    function calculateMove(unitMoving,unitTarget,units,mapWidth,mapHeight){
        let x1=unitMoving.x;
        let y1=unitMoving.y;
        let x=x1
        let y=y1
        let x2=unitTarget.x;
        let y2=unitTarget.y;

        let blockedFields=[]
        for (let i=0;i<units.length;i++){
            blockedFields.push([units[i].x,units[i].y])
        }

        let xDistance=Math.abs(x2-x1)
        let yDistance=Math.abs(y2-y1)

        if (xDistance>yDistance){
            if (x1<x2){
                x=x1+1
                if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                    x=x1
                    if (y1<=y2){
                        y=y1+1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            y=y1
                        }
                    }
                    if (y==y1 && y1>=y2){
                        y=y1-1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            y=y1
                        }
                    }
                }
            }else{
                x=x1-1
                if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                    x=x1
                    if (y1<=y2){
                        y=y1+1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            y=y1
                        }
                    }
                    if (y==y1 && y1>=y2){
                        y=y1-1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            y=y1
                        }
                    }
                }
            }
        } else{
            if (y1<y2){
                y=y1+1
                if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                    y=y1
                    if (x1<=x2){
                        x=x1+1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            x=x1
                        }
                    }
                    if (x==x1 && x1>=x2){
                        x=x1-1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            x=x1
                        }
                    }
                }
            }else{
                y=y1-1
                if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                    y=y1
                    if (x1<=x2){
                        x=x1+1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            x=x1
                        }
                    }
                    if (x==x1 && x1>=x2){
                        x=x1-1
                        if (isBlocked(blockedFields,x,y,mapWidth,mapHeight)){
                            x=x1
                        }
                    }
                }
            }
        }
        return [x,y]
    }

    function isBlocked(blockedFields,x,y,mapWidth,mapHeight){
        const blocking=blockedFields.find((coords)=>{
            return coords[0]==x && coords[1]==y
        })
        if (blocking){
            return true
        }
        if(x<0 || y<0 || x>=mapWidth || y>=mapHeight){
            return true
        }
        return false 
    }


      function actions(team1,team2,mapHeight,mapWidth,){
        if(team2.length==0){
            return 1
        }
        if(team1.length==0){
            return 2
        }

        for(let i=0;i<team1.length;i++){
            team1[i].stamina+=1
            if (team1[i].stamina>=team1[i].speed){
                team1[i].stamina=0
                let nearestEnemyId=0
                let minDistance=9999
                for(let j=0;j<team2.length;j++){
                    let dist=distance(team1[i].x,team1[i].y,team2[j].x,team2[j].y)
                    if (dist<minDistance){
                        nearestEnemyId=j
                        minDistance=dist
                        if(minDistance==1){
                            break
                        }
                    }
                }
                if(minDistance<=team1[i].range){
                    team2[nearestEnemyId].hp-=team1[i].dmg 
                    if (team2[nearestEnemyId].hp<=0){
                        team2.splice(nearestEnemyId,1)

                        if(team2.length==0){
                            return 1
                        }
                    }
                }else{
                    let newCoords = calculateMove(team1[i],team2[nearestEnemyId],team1.concat(team2),mapWidth,mapHeight)
                    team1[i].x=newCoords[0]
                    team1[i].y=newCoords[1]
                }
            }
        }
        for(let i=0;i<team2.length;i++){
            team2[i].stamina+=1
            if (team2[i].stamina>=team2[i].speed){
                team2[i].stamina=0
                let nearestEnemyId=0
                let minDistance=9999
                for(let j=0;j<team1.length;j++){
                    let dist=distance(team2[i].x,team2[i].y,team1[j].x,team1[j].y)
                    if (dist<minDistance){
                        nearestEnemyId=j
                        minDistance=dist
                        if(minDistance==1){
                            break
                        }
                    }
                }
                if(minDistance<=team2[i].range){
                    team1[nearestEnemyId].hp-=team2[i].dmg 
                    if (team1[nearestEnemyId].hp<=0){
                        team1.splice(nearestEnemyId,1)

                        if(team1.length==0){
                            return 2
                        }
                    } 
                }else{
                    let newCoords = calculateMove(team2[i],team1[nearestEnemyId],team1.concat(team2),mapWidth,mapHeight)
                    team2[i].x=newCoords[0]
                    team2[i].y=newCoords[1]
                }
            }
        }
        return 0
    }

    function createUnit(x, y, classId, staminaDiff) {
        const newUnit = {
            ...units[classId],
            stamina: units[classId].stamina + staminaDiff,
            x: x,
            y: y,
        }
        return newUnit
    }

    class Unit {
        constructor(id, name, hpMax, damage, speed, range, price) {
            this.id = id
            this.name = name
            this.hpMax = hpMax;
            this.hp = hpMax;
            this.dmg = damage;
            this.speed = speed
            this.range = range;
            this.stamina = 0
            this.price = price
        }
    }
    const warrior = new Unit(0, "warrior", 520, 70, 22, 1, 75)
    const archer = new Unit(1, "archer", 290, 55, 18, 4, 125)
    const ironclad = new Unit(2, "ironclad", 1200, 95, 30, 1, 150)
    const mage = new Unit(3, "mage", 250, 400, 38, 2, 200)
    const horse = new Unit(4, "horse", 690, 140, 12, 1, 200)

    const units = [warrior, archer, ironclad, mage, horse]

    function recalculateMoney(team, moneyMax) {
        let money = moneyMax
        for (let i = 0; i < team.length; i++) {
            money -= team[i].price
        }
        return money
    }

    function isBlocked(blockedFields,x,y,mapWidth,mapHeight){
      const blocking=blockedFields.find((coords)=>{
          return coords[0]==x && coords[1]==y
      })
      if (blocking){
          return true
      }
      if(x<0 || y<0 || x>=mapWidth || y>=mapHeight){
          return true
      }
      return false 
    }

    // app.get('/', (req, res) => {
    //     res.sendStatus(200);
    // })

    // app.get('/favicon.ico', (req, res) =>{
    //     res.sendStatus(200)
    // })

    app.get("/getScores" , (req, res) => {
        const file = fs.readFileSync("bestScores.txt");
        res.send(file.toString());
        console.log("Gave records")
    })  

    app.get("/resetScores", (req, res) => {
        let emptyScores="["
        for(let i=0; i<missions.length; i++){
            //missionID nick1 bestMoney team1 nick2 fastestWin team2
            if(i==missions.length-1){
                let level=`[${i},"FIFI",0,[],"FIFI",9999,[]]`
                emptyScores+=level
            }else{
                let level=`[${i},"FIFI",0,[],"FIFI",9999,[]],`
                emptyScores+=level
            }
        }
        emptyScores+="]"
        fs.writeFile("bestScores.txt", emptyScores, ()=>{
            console.log("Reseted scores")
        })
    })

    app.get("/newRecord/:missionID/:name/:team/" , (req, res) => {
        const missionID = req.params.missionID;
        const name = req.params.name;
        const team = req.params.team;
        let teamGood = ""
        for(let i=0; i<team.length; i++){
            if(team[i]=="@"){
                teamGood+="["
            }else if(team[i]=="!"){
                teamGood+="]"
            }else{
                teamGood+=team[i]
            }
        }


        const mapHeight=missions[missionID].height
        const mapWidth=missions[missionID].width

        const team1Seed=JSON.parse(teamGood)
        let team1=[]
        for(let i=0;i<team1Seed.length;i++){
            if(team1Seed[i][1]<0 || team1Seed[i][1]>mapWidth || team1Seed[i][2]<0 || team1Seed[i][2]>mapHeight){
                res.sendStatus(406)
            }
            team1.push(createUnit(team1Seed[i][1], team1Seed[i][2], team1Seed[i][0], team1.length * 2 % 10))
        }
        let team1copy=[...team1]
        if(recalculateMoney(team1,missions[missionID].money)<0){
            res.sendStatus(406)
        }


        const team2Seed=missions[missionID].enemies
        let team2=[]
        for(let i=0;i<team2Seed.length;i++){
            team2.push(createUnit(team2Seed[i][1], team2Seed[i][2], team2Seed[i][0], team2.length * 2 % 10))
        }



        let ticks=0
        let winner=0
        while (winner==0) {
            ticks += 1;
            winner = actions(team1, team2, mapHeight, mapWidth)
        }
        if(winner!=1){
            res.sendStatus(406)
        }

        const file = fs.readFileSync("bestScores.txt");
        let date = file.toString()
        date = JSON.parse(date)
        let moneyLeft=recalculateMoney(team1copy, missions[missionID].money)
        if(date[missionID][2]<moneyLeft){
          console.log(`New money record, Mission ${missionID}, MoneyLeft ${moneyLeft}, Before ${date[missionID][2]}, Name ${name}`)
          date[missionID][2]=moneyLeft
          date[missionID][1]=name
        }
        if(date[missionID][5]>ticks){
          console.log(`New ticks record, Mission ${missionID}, Ticks ${ticks}, Before ${date[missionID][5]}, Name ${name}`)
          date[missionID][5]=ticks
          date[missionID][4]=name
        }
        fs.writeFile("bestScores.txt", JSON.stringify(date), ()=>{
          console.log("New score saved")
        })

        res.send(JSON.stringify(date));
        console.log("Gave records")
    })

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}
startServer()

