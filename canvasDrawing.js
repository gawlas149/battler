import { assetsStore } from "./assets.js"
import { ctx } from "./map.js"

export function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
  }

export function clear(cW,cH) {
    ctx.clearRect(0, 0, cW, cH);
  }

export function drawImage(x,y,width,height,name){
  const image=assetsStore.getImage(name)
  ctx.drawImage(image,x,y,width,height)
}
