import { calulateMove } from "./move.js"

function distance(x1,y1,x2,y2){
    return Math.sqrt( (x1 - x2)**2 + (y1 - y2)**2 )
}

export function actions(team1,team2,mapHeight,mapWidth,){
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
                }
            }else{
                let newCoords = calulateMove(team1[i],team2[nearestEnemyId],team1.concat(team2),mapWidth,mapHeight)
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
                } 
            }else{
                let newCoords = calulateMove(team2[i],team1[nearestEnemyId],team1.concat(team2),mapWidth,mapHeight)
                team2[i].x=newCoords[0]
                team2[i].y=newCoords[1]
            }
        }
    }
}