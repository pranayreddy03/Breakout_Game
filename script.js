var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');



var x = canvas.width/2;
var y = canvas.height - 30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY = (canvas.height - paddleHeight);

var leftPressed = false;
var rightPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();

    if( y + dy < ballRadius || y + dy > canvas.height-ballRadius)
    {
        dy = -dy;
    }
    if( x + dx < ballRadius || x + dx > canvas.width-ballRadius)
    {
        dx = -dx;
    }

    if(leftPressed && paddleX > 0)
    {
        paddleX -= 7;
    }
    else if(rightPressed && paddleX < canvas.width - paddleWidth)
    {
        paddleX += 7;
    }

    x += dx;
    y +=dy;
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function keyDownHandler(e)
{
    if(e.keyCode == 37)
    {
        console.log('Working');
        leftPressed = true;
    }
    else if(e.keyCode == 39)
    {
        rightPressed = true;
    }
}

function keyUpHandler(e)
{
    if(e.keyCode == 37)
    {
        leftPressed = false;
    }
    else if(e.keyCode == 39)
    {
        rightPressed = false;
    }
}

setInterval(draw,10);