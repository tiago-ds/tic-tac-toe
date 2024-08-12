class Mark {

    row; //number
    column; //number
    isX; //boolean

    constructor(row, column, isX) {
        this.row = row;
        this.column = column;
        this.isX = isX;
    }

    drawX() {
        line(25, 25, 1/3*height - 25, 1/3*width - 25);
        line(1/3*width - 25, 25, 25 , 1/3*height - 25);
    }

    drawCircle() {
        push();
            translate(width/6, height/6);
            noFill();
            circle(0, 0, (width - 100)/3);
        pop();
    }

    drawMove() {
        push();
            translate((this.row/3)*width, (this.column/3)*height);
            if(this.isX) {
                this.drawX();
            } else {
                this.drawCircle();
            }
        pop();
    }
}

