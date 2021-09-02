// consts
const IMAGE_SRC = './bg.jpg?v=3';
const TEXT_COLOR = "#132726";
const DAYS_COUNT = 3;

const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1080;
const NUMBER_POINT_X = 1105;
const NUMBER_POINT_Y = 295;

const NUMBER_POINT_PERCENTS_X = NUMBER_POINT_X / IMAGE_WIDTH;
const NUMBER_POINT_PERCENTS_Y = NUMBER_POINT_Y / IMAGE_HEIGHT;
const NUMBER_FONT_SIZE_PERCENTS = 100 / IMAGE_WIDTH;

const fontStyles = (pixels) => `700 ${pixels}px cursive`;
const radians = (angle) => (angle * Math.PI / 180);

let canvas, ctx, img; 

function updateCanvasContent() {  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = TEXT_COLOR;
  ctx.textAlign = 'center';

  const ratio = img.width / img.height;
    
  let imgWidth = window.innerWidth;
  let imgHeight = window.innerWidth / ratio;
  let dx = 0;
  let dy = -(imgHeight - window.innerHeight)/2; 
  
  if(imgHeight < window.innerHeight){
    imgHeight = window.innerHeight;
    imgWidth = window.innerHeight * ratio; 
    
    dx = -(imgWidth - window.innerWidth)/2;
    dy = 0; 
  }
    
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, dx, dy, imgWidth, imgHeight);

  const textX = imgWidth * NUMBER_POINT_PERCENTS_X;
  const textY = imgHeight * NUMBER_POINT_PERCENTS_Y;
  const textSize = imgWidth * NUMBER_FONT_SIZE_PERCENTS;

  ctx.font = fontStyles(textSize);
  ctx.translate(textX + dx, textY + dy);
  ctx.rotate(radians(-15));
  ctx.fillText(DAYS_COUNT, 0, 0);

  ctx.restore();
  ctx.resetTransform();
}


function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  img = new Image();
  img.onload = updateCanvasContent;
  img.src = IMAGE_SRC;
}

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", updateCanvasContent);