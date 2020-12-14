var score = 0;

// this is not a class but to simplify the 'newGame.js' file I thought that I
// would include this function here
function calculateFPS() {
    frames += 1
    if (frames % 300 == 0) {
        now = new Date();
        msecs = Math.abs(now.getTime() - start.getTime());
        console.log("seconds after start: ", msecs / 1000);
        console.log("fps: ", (frames / msecs) * 1000);
    }
}


class Oval {
    constructor(ovalX, ovalY) {
        this.ovalCenter = [ovalX, ovalY];
        this.ovalColor = "#cf7f17";

    }

    drawOval(context) {
            context.beginPath();
            context.scale(2,1);
            context.arc(this.ovalX, this.ovalY, 20, 2*Math.PI, false);
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
        this.acc = [0,-0.25];

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

    }


    scoreCheck() {
            if (this.x - this.radius > this.ovalX - 40 && this.x + this.radius > this.ovalX + 40) {
                if (this.y == this.ovalY) {
                    score += 1;
                    alert("Your score is ", score);
                }

            }
    }

    drawCircle(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
    }

}

function defContext() {
    // console.log("Window is %d by %d" % (windowWidth, windowHeight));

    canvas = document.getElementById("mainCanvas");

    canvas.width = window.innerWidth - 32;
    canvas.height = window.innerHeight - 18;
    canvas.style.border = "1px solid black";

    context = canvas.getContext("2d");
    return context;
}
