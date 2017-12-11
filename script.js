var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

setInterval(draw,10);

var x = canvas.width/2;
var y = canvas.height - 30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();

    if( y + dy < 0 || y + dy > canvas.height)
    {
        dy = -dy;
    }
    if( x + dx < 0 || x + dx > canvas.width)
    {
        dx = -dx;
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