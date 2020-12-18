var score = 0;
var canvas = document.getElementById("mainCanvas");
var clickX = 0;
var clickY = 0;
var xDist = 0;
var yDist = 0;
var distance = 0;
var clickStartVal = 0;
var clickEndVal = 0;



class Oval {
    constructor(ovalX, ovalY) {
        this.ovalCenter = [ovalX, ovalY];
        this.ovalColor = "#cf7f17";

    }

    drawOval() {
            context.save();
            context.scale(2,1);
            context.beginPath();
            context.arc(this.ovalCenter[0], this.ovalCenter[1], 20, 2*Math.PI, false);
            context.restore();
            context.lineWidth = 6;
            context.strokeStyle = this.ovalColor;
            context.stroke();

    }
}

// creates the circle
class Circle {
    constructor(x, y, radius) {
        this.center = [x, y];
        this.radius = radius;
        this.color = "#a15c5c";
        this.velocity = [0,0];
        this.acc = [0,0.25];

    }
    get x() {
        return this.center[0];
    }

    set x(newX) {
        this.center[0] = newX;
    }

    get y() {
        return this.center[1];
    }

    set y(newY) {
        this.center[1] = newY;
    }


    applyGravity() {
        this.velocity[0] += this.acc[0];
        this.velocity[1] += this.acc[1];
        this.x += this.velocity[0];
        this.y += this.velocity[1];

    }

    bounceCheck() {
        distance = this.calcDistance(hoop.ovalCenter[0] - 40, hoop.ovalCenter[1]);

        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            if (this.velocity[0] > 0) {
                this.velocity[0] *= -.75;
                this.acc[0] *= -.5;
            }
        }

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            if (this.velocity[1] > 0) {
                this.velocity[1] *= -.75;
            }
        }

        if (this.x - this.radius < 0) {
            this.x = 0 + this.radius;
            if (this.velocity[0] < 0) {
                this.velocity[0] *= -.75;
                this.acc[0] *= -.5;
            }
        }

        if (this.y - this.radius < 0) {
            this.y = 0 + this.radius;
            if (this.velocity[1] < 0) {
                this.velocity[1] *= -.75;
            }
        }

        if (distance == this.radius) {
            this.velocity *= -.75;
            this.acc *= -.5;
        }

    }

    calcDistance(x,y) {
        xDist = x - this.x;
        yDist = y - this.y;
        distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        console.log(distance);
        return distance;

    }


    scoreCheck() {
            if (this.x - this.radius > this.ovalX - 40 && this.x + this.radius > this.ovalX + 40) {
                if (this.y == this.ovalY) {
                    score += 1;
                    alert("Your score is ", score);
                }

            }
    }

    drawCircle() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }

}

function defContext() {

    canvas.width = window.innerWidth - 18;
    canvas.height = window.innerHeight - 18;
    canvas.style.border = "1px solid black";

    context = canvas.getContext("2d");
    return context;
}

function myKeyDown(event) {

    console.log(event);
    clickX = MouseEvent.clientX;
    clickY = MouseEvent.clientY;
    distance = basketball.calcDistance(clickX, clickY);
    if (distance <= this.radius) {
        return true;
    }

    else {
        return false;
    }


}

function processClick() {
    msecs = abs(now.getTime() - start.getTime());
}
