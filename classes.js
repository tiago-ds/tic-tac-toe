class Mark {

    row; //number
    column; //number
    x; //boolean

    constructor(row, column, x) {
        this.row = row;
        this.column = column;
        this.x = x;
    }

    drawMove() {
        push();
            console.log(height)
            translate((this.row/3)*width, (this.column/3)*height);
            line(25, 25, 1/3*height - 25, 1/3*width - 25);
            line(1/3*width - 25, 25, 25 , 1/3*height - 25);
        pop();
    }
}

