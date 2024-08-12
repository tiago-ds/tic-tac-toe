const width = 800;
const height = 800;
let moves;

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
  
  if(moves.some(move => newQuadrant[0] === move[0] && newQuadrant[1] === move[1])) {
    return;
  }

  moves.push(new Mark(newQuadrant[0], newQuadrant[1], true));
  
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