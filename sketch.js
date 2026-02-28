let ship;
let camera;
let pressedKeys = {};


function setup() {
    // game setup
    let canvas = createCanvas(800, 600);
    canvas.parent(select("#canvasContainer"))

    walls = [new Wall(150, 300, 300, 10, 0)];

    spawnpoint = [200, 300];

    map = new Map(spawnpoint, walls);
    ship = new Ship(map);

    // map maker setup
    const xSpawnInput = select("#x-spawn-input");
    const ySpawnInput = select("#y-spawn-input");

    const xInput = select("#x-input");
    const yInput = select("#y-input");
    const widthInput = select("#width-input");
    const heightInput = select("#height-input");
    const angleInput = select("#angle-input");
    const angleSlider = select("#angle-slider");
    const toggleCollisionsButton = select("#toggle-collisions");
    const removeButton = select("#remove-button");
    
    canvas.mousePressed(() => {
        map.selectedWall = null;
        for (let wall of map.walls) {
            if (isMouseInRotatedWall(mouseX, mouseY, wall)) {
                map.selectedWall = wall;
                updateInputs(wall);
                return;
            }
        }

        let newWall = new Wall(mouseX, mouseY, 200, 10, 0)
        map.walls.push(newWall);
        map.selectedWall = newWall;
        updateInputs(newWall);
    });

    // Handle input changes
    function updateWallFromInputs() {
        if (map.selectedWall) {
            
            map.selectedWall.x = parseFloat(xInput.value());
            map.selectedWall.y = parseFloat(yInput.value());
            map.selectedWall.width = parseFloat(widthInput.value());
            map.selectedWall.height = parseFloat(heightInput.value());
            map.selectedWall.angle = (parseFloat(angleInput.value()) / 180) * Math.PI;
        }
    }

    function updateSpawn() {
        spawnPoint = [parseFloat(xSpawnInput.value()), parseFloat(ySpawnInput.value())];
        map.spawnPoint = spawnPoint;
        ship.spawnPoint = spawnPoint;
        ship.reset();
    }

    xSpawnInput.input(updateSpawn);
    ySpawnInput.input(updateSpawn);

    xInput.input(updateWallFromInputs);
    yInput.input(updateWallFromInputs);
    widthInput.input(updateWallFromInputs);
    heightInput.input(updateWallFromInputs);
    angleInput.input(updateWallFromInputs);
    angleSlider.input(function() {
        select("#angle-input").value(parseFloat(angleSlider.value()));
        updateWallFromInputs();
    });
    

    // Toggle between game and map maker mode
    toggleCollisionsButton.mousePressed(() => {
        ship.collisionEnabled = !ship.collisionEnabled;
        ship.colliding = false;
        toggleCollisionsButton.html(ship.collisionEnabled ? "Disable Collisions" : "Enable Collisions");
    });

    removeButton.mousePressed(() => {
        Object.getOwnPropertyNames(map);
        map.removeSelected();
    });
}

function draw() {
    background(0);
    
    push();
    translate(width / 2 - ship.x, height / 2 - ship.y);
    
    update()
    show()

    pop();

    if (ship.colliding) {
        fill(255, 0, 0);
        text("Colliding :sadge:", 10, 20);
    } else {
        fill(0, 255, 0);
        text("Not collid :POG:", 10, 20);
    }

}

function update() {
    ship.update(pressedKeys, map);
    map.update();
}

function show() {
    ship.show();
    map.show();
}

function keyPressed() {
    pressedKeys[key] = true;
}

function keyReleased() {
    delete pressedKeys[key];
}


// Update HTML inputs with selected wall properties
function updateInputs(wall) {
    if (wall) {
        select("#x-input").value(wall.x);
        select("#y-input").value(wall.y);
        select("#width-input").value(wall.width);
        select("#height-input").value(wall.height);
        select("#angle-input").value(wall.angle);
        select("#angle-slider").value(wall.angle);
    }
}

function isMouseInRotatedWall(mouseX, mouseY, wall) {
    const angle = wall.angle
    if (angle !== 0) {
        const translatedX = mouseX - wall.x;
        const translatedY = mouseY - wall.y;

        // Apply reverse rotation
        const cosAngle = Math.cos(-wall.angle);
        const sinAngle = Math.sin(-wall.angle);

        const localX = translatedX * cosAngle - translatedY * sinAngle;
        const localY = translatedX * sinAngle + translatedY * cosAngle;

        // Check if the local coordinates are within the unrotated wall's bounds
        return (
            localX >= 0 &&
            localX <= wall.width &&
            localY >= 0 &&
            localY <= wall.height
        );
    }
    else {
        return (
            mouseX >= wall.x &&
            mouseX <= wall.x + wall.width &&
            mouseY >= wall.y &&
            mouseY <= wall.y + wall.height
        );
    }
}