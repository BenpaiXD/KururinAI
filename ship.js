class Ship {
    constructor(map) {
        this.spawnPoint = map.spawnPoint;
        this.x = map.spawnPoint[0];
        this.y = map.spawnPoint[1];
        this.vely = 0;
        this.velx = 0;
        this.size = 20;
        this.speed = 5;
        this.colliding = false;
        this.collisionEnabled = true;


        //rectangle data
        this.rectWidth = 10;
        this.rectHeight = 100;
        this.rectX = this.x - this.rectWidth / 2;
        this.rectY = this.y - this.rectHeight / 2;
        this.angle = 0;
    }

    show() {
        //draw rectangle
        push();
        fill(255, 255, 0);
        
        translate(this.x, this.y);
        rotate(this.angle);
        rectMode(CORNER);
        
        //rect(0, 0, this.rectWidth, this.rectHeight);
        rect(-this.rectWidth / 2, -this.rectHeight / 2, this.rectWidth, this.rectHeight);
        resetMatrix();

        pop();
        
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.size);

    }

    update(pressedKeys, map) {
        this.inputReceived(pressedKeys);
        this.checkCollisions(map.walls);
        this.x += this.velx;
        this.y += this.vely;
        
        this.angle += 0.035;
        
        let sinAngle = sin(this.angle);
        let cosAngle = cos(this.angle);
        this.rectX = this.x + cosAngle * (-this.rectWidth / 2) - sinAngle * (-this.rectHeight / 2);
        this.rectY = this.y + sinAngle * (-this.rectWidth / 2) + cosAngle * (-this.rectHeight / 2);
        
        if (this.colliding){
            this.reset();
        }
    }

    checkCollisions(walls) {
        if (!this.collisionEnabled) {
            return;
        }
        let rectAsWall = this.getRectAsWall();
        this.colliding = false;
        walls.forEach((wall) => {
            if(wall.isColliding(rectAsWall)) {
                this.colliding = true;
                return;
            }
        });
    }

    reset() {
        this.x = this.spawnPoint[0]
        this.y = this.spawnPoint[1]
    }

    getRectAsWall() {
        return new Wall(this.rectX,this.rectY, this.rectWidth, this.rectHeight, this.angle);
    }


    inputReceived(pressedKeys) {
        // console.log(pressedKeys);
        if (pressedKeys.a) {
            this.moveLeft();
        }
        if (pressedKeys.d) {
            this.moveRight();
        }
        if (pressedKeys.w) {
            this.moveUp();
        }
        if (pressedKeys.s) {
            this.moveDown();
        }
        if (!pressedKeys.s && !pressedKeys.w) {
            this.vely = 0;
        }
        if (!pressedKeys.a && !pressedKeys.d) {
            this.velx = 0;
        }
    }

    moveLeft() {
        this.velx = -this.speed;
    }
    moveRight() {
        this.velx = this.speed;
    }
    moveUp() {
        this.vely = -this.speed;
    }
    moveDown() {
        this.vely = this.speed;
    }
}
