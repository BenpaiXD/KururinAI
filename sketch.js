let ship;
let pressedKeys = {};
let collid = true;

function setup() {
    createCanvas(800, 600);

    ship = new Ship(300, 400);
    walls = [new Wall(150, 300, 300, 10, 0)];
    map = new Map(walls);
}

function draw() {
    background(0);

    if (collid) {
        fill(255, 0, 0);
        text("Colliding :sadge:", 10, 20);
    } else {
        fill(0, 255, 0);
        text("Not collid :POG:", 10, 20);
    }

    ship.update(pressedKeys, map.walls);
    ship.show();
    map.update();
    map.show();
}

function keyPressed() {
    pressedKeys[key] = true;
}

function keyReleased() {
    delete pressedKeys[key];
}
