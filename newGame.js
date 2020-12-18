// fix oval not appearing issue, be able to click multiple times, and click and hold, then create an algorithm to calculate
// how far the ball should be thrown and then make comments

function drawAll() {
    context.clearRect(0,0, canvas.width, canvas.height);
    if (basketball.x == 200 && basketball.y == 200) {
        document.removeEventListener("click", myKeyDown);
        //welcomeMessage = alert("Welcome to my basketball game. Click and drag the ball to shoot\
    //it and try to get it in the hoop. Try to score as many baskets as you can in 30 seconds.");


    }

    else {
        click = document.addEventListener("click", myKeyDown);
    }

    basketball.drawCircle();
    basketball.applyGravity();
    basketball.bounceCheck();
    basketball.scoreCheck();
    hoop.drawOval();
    window.requestAnimationFrame(drawAll);



}


context = defContext();
basketball = new Circle(200, 200, 50);
hoop = new Oval(canvas.width * .85, canvas.height * .1);

window.requestAnimationFrame(drawAll);
