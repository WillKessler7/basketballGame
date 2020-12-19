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
    if (basketball.x == 200 && basketball.y == 500) {
        // writes the welcome message
        welcomeMessage = alert("Welcome to my basketball game. Click and drag the ball to shoot\
 it and try to get it in the hoop. I would reccomend you use a mouse if you have one.\
 Also if you click the spacebar, it will stop the ball from bouncing around.");
    }

    // draws the basketball
    basketball.drawCircle();

    // applys the gravity and velocity to basketball
    basketball.applyGravity();

    // checks if the basketball hits the wall or the hoop
    basketball.bounceCheck();

    // checks if the user made a basket
    // basketball.scoreCheck();

    // draws the hoop
    hoop.drawOval();

    // calls for another animation frame
    window.requestAnimationFrame(drawAll);



}

// defines the context of the canvas
context = defContext();

// creates the basketball object
basketball = new Circle(200, 500, 50);

// createst the hoop object
hoop = new Oval(canvas.width * .4715, canvas.height * .3);

// listens for the mouse click and calls a function if it does
click = document.addEventListener("mousedown", myKeyDown);

// listens for mouse release and calls a function to respond to that
release = document.addEventListener("mouseup", processRelease);

space = document.addEventListener("keydown", spacebarCheck);

// requests another frame to be animated
window.requestAnimationFrame(drawAll);
