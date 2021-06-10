export function calulateMove(unitMoving,unitTarget,units,mapWidth,mapHeight){
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