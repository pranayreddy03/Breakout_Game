var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');



var x = canvas.width/2;
var y = canvas.height - 30;
var ballRadius = 5;
var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleY = (canvas.height - paddleHeight);

var leftPressed = false;
var rightPressed = false;

var brickWidth = 40;
var brickHeight = 12;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickPadding = 8;
var brickOffsetTop = 15;
var brickOffsetLeft = 30;

var bricks = [];
for(var c = 0; c < brickColumnCount ; c++)
{
    bricks[c] = [];
    for(var r = 0; r < brickRowCount ; r++)
    {
        bricks[c][r] = {
                            x : 0,
                            y : 0,
                            status : 1
                       }
    }
}

function drawBricks()
{
    for(c = 0; c < brickColumnCount; c++)
    {
        for(r=0; r< brickRowCount; r++)
        {
            if(bricks[c][r].status == 1) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "brown";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

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

function collisionDetection()
{
    for(c = 0; c < brickColumnCount; c++)
    {
        for(r = 0; r < brickRowCount; r++)
        {
            var b = bricks[c][r];
            if(b.status == 1)
            {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight)
                {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();

    if( y + dy < ballRadius)
    {
        dy = -dy;
    }
    else if( y + dy > canvas.height - ballRadius)
    {
       if(x > paddleX && x < paddleX + paddleWidth)
        {
            dy = -dy;
        }
        else
       {
        alert('GAME OVER');
        document.location.reload();
       }
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



setInterval(draw,20);