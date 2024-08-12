function drawBoard() {
    line((1 / 3) * width, 10, (1 / 3) * width, height - 10);
    line((2 / 3) * width, 10, (2 / 3) * width, height - 10);
    line(10, (1 / 3) * height, width - 10, (1 / 3) * height);
    line(10, (2 / 3) * height, width - 10, (2 / 3) * height);
}

function findNewQuadrant(point) {
    let newQuadrant = [];
    if (point.x <= (1 / 3) * width) {
        newQuadrant.push(0);
    } else if (point.x > (2 / 3) * width) {
        newQuadrant.push(2);
    } else {
        newQuadrant.push(1);
    }

    if (point.y <= (1 / 3) * height) {
        newQuadrant.push(0);
    } else if (point.y > (2 / 3) * height) {
        newQuadrant.push(2);
    } else {
        newQuadrant.push(1);
    }

    return newQuadrant;
}
