// fix oval not appearing issue, be able to click multiple times, and click and hold, then create an algorithm to calculate
// how far the ball should be thrown and then make comments

function drawAll() {
/*
    Purpose: This is the function that acts as a 'main' of sorts. It is the primary
    drawing loop
    Parameters: None
    Returns: None
*/

    // clears the canvas so it can draw on a clean frame
    context.clearRect(0,0, canvas.width, canvas.height);

    // if the basketball is in it's original place,
    if (basketball.x == 200 && basketball.y == 200) {
        // write the welcome message
        //welcomeMessage = alert("Welcome to my basketball game. Click and drag the ball to shoot\
    //it and try to get it in the hoop. Try to score as many baskets as you can in 30 seconds.");

    }

    // draws the basketball
    basketball.drawCircle();

    // applys the gravity and velocity to basketball
    basketball.applyGravity();

    // checks if the basketball hits the wall or the hoop
    basketball.bounceCheck();

    // checks if the user made a basket
    basketball.scoreCheck();

    // draws the hoop
    hoop.drawOval();

    // calls for another animation frame
    window.requestAnimationFrame(drawAll);



}

// defines the context of the canvas
context = defContext();

// creates the basketball object
basketball = new Circle(200, 200, 50);

// createst the hoop object
hoop = new Oval(canvas.width * .85, canvas.height * .2);

// listens for the mouse click and calls a function if it does
click = document.addEventListener("mousedown", myKeyDown);

// listens for mouse release and calls a function to respond to that
release = document.addEventListener("mouseup", processRelease);

// requests another frame to be animated
window.requestAnimationFrame(drawAll);
