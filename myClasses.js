var score = 0;
var canvas = document.getElementById("mainCanvas");
var clickX = 0;
var clickY = 0;
var xDist = 0;
var yDist = 0;
var distance = 0;
var clickStartVal = [0, 0];
var clickEndVal = [0, 0];
var start = new Date();
var now = new Date();



class Oval {
    constructor(ovalX, ovalY) {
        this.ovalCenter = [ovalX, ovalY];
        this.ovalColor = "#cf7f17";

    }

    drawOval() {
            context.save();
            context.scale(2,1);
            context.beginPath();
            context.arc(this.ovalCenter[0], this.ovalCenter[1], 40, 0, 2*Math.PI);
            context.lineWidth = 6;
            context.strokeStyle = this.ovalColor;
            context.stroke();
            context.restore();
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
        distance = this.calcDistance(hoop.ovalCenter[0] - 20, hoop.ovalCenter[1]);

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

    clickX = event.clientX;
    clickY = event.clientY;
    distance = basketball.calcDistance(clickX, clickY);

    if (distance <= basketball.radius) {
        console.log(distance, clickX, clickY, basketball.x, basketball.y);
        processClick(clickX, clickY);
    }

}

function processClick(x, y) {
    // documents where click began to calculate how far ball will be thrown
    clickStartVal = [x, y];

    // adjusts the x and y coordinates as ball is dragged
    basketball.x = x;
    basketball.y = y;

    // documents how long it has been since click started for
    start = new Date();
}

function processRelease(event) {

    x = event.clientX;
    y = event.clientY;

    xDist = x - basketball.x;
    yDist = y - basketball.y;

    distance = basketball.calcDistance(xDist, yDist);

    if (distance <= basketball.radius) {

        // documents where click ended to calculate how far ball will be thrown
        clickEndVal = [x, y];


        xDist = clickStartVal[0] - clickEndVal[0];
        yDist = clickStartVal[1] - clickEndVal[1];

        distance = basketball.calcDistance(xDist, yDist);

        now = new Date();

        msecs = Math.abs(now.getTime() - start.getTime());

        // write out formula for applying velocity after the release

        basketball.velocity[0] = (distance / msecs);
        basketball.velocity[1] = (distance / msecs);
    }


}
