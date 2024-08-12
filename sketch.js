const width = 800;
const height = 800;
let moves;
let isX;

class Point { 
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function mouseClicked() {
  markNewQuadrant(new Point(mouseX, mouseY));
}

function setup() {
  moves = [];
  isX = true;
  createCanvas(width, height);
  strokeWeight(5);
}

function markNewQuadrant(point) {
  let newQuadrant = [];
  if(point.x <= 1/3*width) {
      newQuadrant.push(0);
  } else if(point.x > 2/3*width) {
      newQuadrant.push(2);
  } else {
      newQuadrant.push(1);
  }
  
  if(point.y <= 1/3*height) {
    newQuadrant.push(0);
  } else if(point.y > 2/3*height) {
    newQuadrant.push(2);
  } else {
    newQuadrant.push(1);
  }

  moves.push(new Mark(newQuadrant[0], newQuadrant[1], this.isX));
  this.isX = !this.isX;
}


function draw() {
  background(220);
  drawBoard();
  
  if(moves.length > 0) {
    for(const mark of moves) {
      mark.drawMove();
    }
  }
}