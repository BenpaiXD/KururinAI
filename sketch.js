let ship;
let pressedKeys = {};

function setup() {
    createCanvas(400, 600);

    ship = new Ship(300, 400);
}

function draw() {
    background(0);

    ship.update(pressedKeys);
    ship.show();
}

function keyPressed() {
    pressedKeys[key] = true;
}

function keyReleased() {
    delete pressedKeys[key];
}

