class Camera {
    constructor(startPoint) {
        this.x = startPoint[0];
        this.y = startPoint[1];
        this.speed = 5;
    }

    update(x, y){
        this.x = x;
        this.y = y;
        translate(-x, -y);
    }
}