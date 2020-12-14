/*

function myKeyDown(event) {
    keyCode = event.which;
    keyStr = event.key;
    console.log(event);
    console.log(keyCode);
    console.log(keyStr);

    if ((keyStr == 'w') || (keyStr == 'W')) {
        circleVel[1] += 1;
    }

    if ((keyStr == 'a') || (keyStr == 'A')) {
        circleVel[0] -= 1;
    }

    if ((keyStr == 'd') || (keyStr == 'D')) {
        circleVel[0] += 1;
    }

    if ((keyStr == 's') || (keyStr == 'S')) {
        circleVel[1] -=1;
    }
}
*/

function drawAll() {
    context.clearRect(0,0, canvas.width, canvas.height);
    // if (basketball.x == 200 && basketball.y == 200) {
        //welcomeMessage = alert("Welcome to my basketball game. Click and drag the ball to shoot\
// it and try to get it in the hoop. Try to score as many baskets as you can in 30 seconds.");
//    }
    basketball.drawCircle(context);
    hoop.drawOval(context);
    basketball.applyGravity();
    basketball.bounceCheck();
    basketball.scoreCheck();
    window.requestAnimationFrame(drawAll);


}


context = defContext();
basketball = new Circle(200, 200, 50);
hoop = new Oval(canvas.width*.95, canvas.height*.8);


// document.addEventListener("keyDown", myKeyDown);

window.requestAnimationFrame(drawAll);
