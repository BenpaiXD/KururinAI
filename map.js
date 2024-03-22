class Map {
  constructor(walls) {
    this.walls = walls;
  }

  show() {
    this.walls.forEach(function (wall) {
      wall.show();
    });
  }

  update() {
    this.walls.forEach(function (wall) {
      wall.update();
    });
  }
}

class Wall {
    constructor(x, y, width, height, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
    }
    show() {
        fill(255, 255, 255);
        rectMode(CORNER);
        translate(this.x, this.y);
        rotate(this.angle);
        translate(-this.x, -this.y);
        rect(this.x, this.y, this.width, this.height);
        resetMatrix();
    }

    update() {
        this.angle += 0.01;
        return;
    }

    isColliding(rect) {
        let rect1 = this.getCorners();
        let rect2 = rect.getCorners();

        
        rect1.forEach(function (point) {
            fill(255, 0, 0);
            ellipse(point[0], point[1], 10);
        });

        rect2.forEach(function (point) {
            fill(255, 0, 0);
            ellipse(point[0], point[1], 10);
        });
        

        // console.log(corners2)

        let axes = [

        ];


        axes = [
            //x2 - x1
            [rect1[1][0] - rect1[0][0], rect1[1][1] - rect1[0][1]],
            [rect1[1][0] - rect1[3][0], rect1[1][1] - rect1[3][1]],
            [rect2[1][0] - rect2[0][0], rect2[1][1] - rect2[0][1]],
            [rect2[1][0] - rect2[3][0], rect2[1][1] - rect2[3][1]]
        ];



        stroke(255,0,0);
        console.log(axes[0]);
        translate(50,290);
        line(point[0], point[1], 0,0);

        axes.forEach(function(vector){
            line(vector[0], vector[1], 0,0);
        });

        line(axes[0][0], axes[0][1], 0,0);
        line(axes[2][0], axes[2][1], 0,0);
        line(axes[0][0], axes[0][1], 0,0);
        line(axes[1][0], axes[1][1], 0,0);
        translate(-50,-290);
        stroke(0);
    
        // Function to project vertices onto an axis
        function project(axis, rect) {
            let min = Infinity, max = -Infinity;
            for (let i = 0; i < rect.length; i++) {
                let dotProduct = rect[i][0] * axis[0] + rect[i][1] * axis[1];
                if (dotProduct < min) min = dotProduct;
                if (dotProduct > max) max = dotProduct;
            }
            return { min: min, max: max };
        }
    
        // Check overlap along each axis
        for (let axis of axes) {
            let proj1 = project(axis, rect1);
            let proj2 = project(axis, rect2);
            if (proj1.max < proj2.min || proj2.max < proj1.min) {
                return false; // No overlap along this axis
            }
        }
    
        return true;
    }

    getCorners() {
        let sinAngle = sin(this.angle);
        let cosAngle = cos(this.angle);

        let corners = [
            [
                this.x,
                this.y
            ],
            [
                this.x + this.width * cosAngle,
                this.y + this.width * sinAngle,
            ],
            [
                this.x - this.height * sinAngle,
                this.y + this.height * cosAngle,
            ],
            [
                this.x - this.height * sinAngle + this.width * cosAngle,
                this.y + this.height * cosAngle + this.width * sinAngle,
            ]
        ];

        return corners;
    }

    dotProduct(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    }
}
