const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const cleanBtn = document.getElementById("jsClean");

const CANVAS_SIZE = 700;
const DEFAULT_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const X = event.offsetX;
    const Y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(X,Y);
    }else{
        ctx.lineTo(X,Y);
        ctx.stroke();
    }
}

function changeClickColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeBrushSize(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeChange(){
    if(filling===false){
        filling = true;
        modeBtn.innerText = "Paint";
    }else if(filling===true){
        filling = false;
        modeBtn.innerText = "Fill";
    }
}

function fillingCanvas(){
    if(filling===false){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function saveImage(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[image]";
    link.click();
}

function cleanCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

if (canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",fillingCanvas)
}

Array.from(colors).forEach(color=>color.addEventListener("click",changeClickColor));

if(range){
    range.addEventListener("input",changeBrushSize);
}

if(modeBtn){
    modeBtn.addEventListener("click",modeChange);
}

if(saveBtn){
    saveBtn.addEventListener("click",saveImage);
}

if(cleanBtn){
    cleanBtn.addEventListener("click",cleanCanvas)
}