// below are global variables that will be explained as they appear in code

var score = 0;
var canvas = document.getElementById("mainCanvas");
var clickX = 0;
var clickY = 0;
var xDist = 0;
var yDist = 0;
var distance = 0;
var clickStartVal = [0, 0];
var clickEndVal = [0, 0];
var distX = 0;
var distY = 0;
var leftOvalX = 0;
var rightOvalX = 0;


// this is the oval class, it creates the oval that is the hoop
class Oval {

    constructor(ovalX, ovalY) {
        // the oval center is made up of the inputed x and y values
        this.ovalCenter = [ovalX, ovalY];

        // this defines the oval color as orange in hex
        this.ovalColor = "#cf7f17";

    }

    drawOval() {
        /*
        Purpose: This function draws the oval that is the hoop
        Parameters: None
        Returns: None(just drawing)
        */

        // saves the context of the canvas so it can stretch the canvas soley
        // for the oval and not affecting any of the other points
        context.save();

        // scales the canvas so the circle will become an oval
        context.scale(2,1);
        context.beginPath();
        context.arc(this.ovalCenter[0], this.ovalCenter[1], 40, 0, 2*Math.PI);
        context.lineWidth = 6;
        context.strokeStyle = this.ovalColor;
        context.stroke();
        // restores the context so rest of the canvas will be unaffected
        context.restore();
    }
}

// creates the circle
class Circle {
    constructor(x, y, radius) {
        // defines center as inputed x and y
        this.center = [x, y];
        // does the same with the radius
        this.radius = radius;

        // sets the color as brown
        this.color = "#a15c5c";

        // defines the velocity vector as zero
        this.velocity = [0,0];

        // defines the acceleration vector as zero for the x value but .35 for
        // the y value because the basketball needs to begin with some gravity
        this.acc = [0,0.35];

    }

    // the following  lines get and set attributes for use later
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
        /*
        Purpose: Applies the gravity and adjusts the velocity when someone
        shoots the basketball and if it hits a wall
        Parameters: None
        Returns: None
        */

        // this adds the velocity defined in other functions for purposes listed
        // above to the acceleration
        this.velocity[0] += this.acc[0];
        this.velocity[1] += this.acc[1];

        // adds the velocity to the x and y coords
        this.x += this.velocity[0];
        this.y += this.velocity[1];

    }

    bounceCheck() {
        /*
        Purpose: Checks to see if the basketball bounced off a wall or the hoop
        and if so, it changes the velocity and accleration accordingly
        Parameters: None
        Returns: None
        */

        // calculates the distance of the basketball from the front of the rim
        distance = this.calcDistance((hoop.ovalCenter[0] * 2) - 80, hoop.ovalCenter[1]);

        // if the center of the basketball + the radius of the basketball is
        // greater than the canvas width,
        if (this.x + this.radius > canvas.width) {
            // adjust the x coord of ball to be on the edge of wall
            this.x = canvas.width - this.radius;

            // if the x velocity is making the ball move right,
            if (this.velocity[0] > 0) {
                // make the velocity move left and also take some of the energy away
                this.velocity[0] *= -.75;
                this.acc[0] *= -.5;
            }
        }


        // if the center of the basketball + the radius of the ball is greater
        // than the top of the wall,
        if (this.y + this.radius > canvas.height) {

            // adjust so that the ball is at the top of the wall
            this.y = canvas.height - this.radius;

            // if the x velocity is making the ball move right,
            if (this.velocity[1] > 0) {
                // changes it so that the ball moves down and slows down slightly
                this.velocity[1] *= -.75;
            }
        }

        // does the same thing above except the for the other wall
        if (this.x - this.radius < 0) {
            this.x = 0 + this.radius;
            if (this.velocity[0] < 0) {
                this.velocity[0] *= -.75;
                this.acc[0] *= -.5;
            }
        }

        // does the same thing above except the for the other wall
        if (this.y - this.radius < 0) {
            this.y = 0 + this.radius;
            if (this.velocity[1] < 0) {
                this.velocity[1] *= -.75;
            }
        }

        // if the distance from the front of the rim to the radius is less than
        // or equal to the radius,
        if (distance <= this.radius) {

            // set the velocity x and y to 0
            this.velocity[0,1] = 0;
            // make the ball stop moving horizontally
            this.acc[0] = 0;
            // make the ball fall with gravity
            this.acc[1] = 0.35;
        }

    }

    calcDistance(x,y) {
        /*
        Purpose: Calculates the distance between the inputed point and the
        center of the basketball
        Parameters: x, the x coord of whatever point is being compared to the
        center of the ball, y, the y coord of that same point
        Returns: distance, the distance from the inputed point and the center
        */

        // the distance from the inputed x coord and the center's x coord
        distX = x - this.x;

        // the distance from the inputed y coord and center's y coord
        distY = y - this.y;

        // square root of a^2 + b^2 = c, or in this case the distance
        distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        return distance;

    }

    /* commented this out because of lack of response from if statements
    scoreCheck() {
    */
        /*
        Purpose: checks to see if the user scored by putting ball through the basket
        Parameters: None
        Returns: None
        */
    /*

        // defines left and right oval points + 40 to adjust for the way the canvas was set up
        leftOvalX = (hoop.ovalCenter[0] * 2) - 80 + 40;
        rightOvalX = (hoop.ovalCenter[0] * 2) + 40;

        // if ball is within the radius on both sides of oval,
        if ((this.x - leftOvalX) < 41 && (rightOvalX - this.x) < 41) {
            // if the ball is on the y coord of the oval,
            if (Math.abs(this.y - hoop.ovalCenter[1]) < 1) {

                // accumlates the score
                score += 1;

                // alerts the user
                alert("Your score is " + score + "!");

                // stops the ball from adding speed
                this.velocity[0] = 0;
                this.velocity[1] = 0;

                // sets the x and y to the original coordinates
                this.x = 200;
                this.y = 500;
            }
        }
    }
    */

    drawCircle() {
        /*
        Purpose: To draw the basketball which is a circle
        Parameters: None
        Returns: None(draws a circle)
        */

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }

}

function defContext() {
    /*
    Purpose: To define the context of the canvas, or to set the ground rules
    for the canvas to follow
    Parameters: None
    Returns: context, the variable that a lot of the draw functions use
    */

    // gets the width and height of the canvas and subracts it by 18 so there
    // is a little whitespace for aesthetic
    canvas.width = window.innerWidth - 18;
    canvas.height = window.innerHeight - 18;

    // makes the border one pixle with a solid black outline
    canvas.style.border = "1px solid black";

    // defines context as a 2 dimensional object
    context = canvas.getContext("2d");
    return context;
}

function myKeyDown(event) {
    /*
    Purpose: responds to a click event by checking if the click was on the
    basketball
    Parameters: event, a "click" anywhere on the document
    Returns: None(calls another function)
    */

    // defines clickX and Y as the x and y coords of the clicks
    clickX = event.clientX;
    clickY = event.clientY;

    // calculates the distance of the click to the radius of the circle
    distance = basketball.calcDistance(clickX, clickY);


    // if the click was closer to the center than the radius,
    if (distance <= basketball.radius) {
        // call the function that processes the click
        processClick(clickX, clickY);
    }

}

function processClick(x, y) {
    /*
    Purpose: is called when a click is detected on the basketball, declares
    two variables for later
    Parameters: x, the x coord of the click, y the y coord of the click
    Returns: None
    */

    // documents where click began to calculate how far ball will be thrown
    clickStartVal = [x, y];

    // documents how long it has been since click started for
    start = new Date();
}

function processRelease(event) {
    /*
    Purpose: is called when a click is released, calculates how far ball should
    be thrown
    Parameters: event, the release of the mouse
    Returns: None
    */

    // defines the x coord and y coord of the release
    x = event.clientX;
    y = event.clientY;

    // calculates the distance of where the ball started to where it is now
    distance = basketball.calcDistance(clickStartVal[0], clickStartVal[1]);

    // if that distance is less than or equal to the radius,
    if (distance <= basketball.radius) {

        // documents where click ended to calculate how far ball will be thrown
        clickEndVal = [x, y];

        // writes the difference between x and y distances
        // from the end of the drag to the start
        xDist = clickEndVal[0] - clickStartVal[0];
        yDist = clickEndVal[1] - clickStartVal[1];


        // calculates the difference between
        clickDist = basketball.calcDistance(xDist, yDist);

        // changes the x and y velocities to the distance of the click divided
        // by a constant multiplied by the differnce between the start and end val
        basketball.velocity[0] = (clickDist / 20000) * (xDist);
        basketball.velocity[1] = (clickDist / 20000) * (yDist);
    }


}

function spacebarCheck(event) {
    /*
    Purpose: responds to a key click and checks if it was a space and if it was
    it moves the ball to the floor of the canvas
    Parameters: event, the keydown that triggered check to occur
    Returns: None
    */

    // defines which keycode the event was
    keyCode = event.which;

    // if the keycode was a space,
    if (keyCode == "32") {

        // set the x and y velocity to zero
        basketball.velocity[0] = 0;
        basketball.velocity[1] = 0;

        // set the basketball y coord to be at the floor
        basketball.y = canvas.height - 50;

    }
}
