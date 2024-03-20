class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vely = 0;
    this.velx = 0;
    this.size = 20;
    this.speed = 5;

    //rectangle data
    this.rectWidth = 10;
    this.rectHeight = 100;
    this.rectX = this.x - this.rectWidth / 2;
    this.recty = this.y - this.rectHeight / 2;
    this.angle = 0;
  }

  show() {
    //draw rectangle
    fill(255, 255, 0);
    translate(this.rectX, this.rectY);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.rectWidth, this.rectHeight);
    resetMatrix();

    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }

  update(pressedKeys) {
    this.inputReceived(pressedKeys);

    this.x += this.velx;
    this.y += this.vely;

    this.angle += 0.03;
    this.rectX = this.x;
    this.rectY = this.y;
  }

  inputReceived(pressedKeys) {
    console.log(pressedKeys);
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
