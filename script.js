const $canvas = document.querySelector('.js-canvas')
const context = $canvas.getContext('2d')

//constant

let balls = []

class Ball {
    constructor (x, y, r, value, click) {
        this.x = x
        this.y = y
        this.r = r
        this.value = value
        this.click = click
    }
}



const cursor = {}
cursor.x = 0
cursor.y = 0

let score = 0

let win = 0

let timer = 0

let level = 1
let diffculties = 0

/*
 * Resize+Back effect
*/
let windowWidth = $canvas.width
let windowHeight = $canvas.height
let groundY = (windowHeight/4)*3.5

const resize = () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    $canvas.width = windowWidth
    $canvas.height = windowHeight
    groundY = (windowHeight/4)*3.5
}
window.addEventListener('resize', resize)
resize()

const paintBack = () =>
{
    const gradient = context.createLinearGradient(windowWidth /2, 0, windowWidth /2, windowHeight)


    gradient.addColorStop(0, 'black')
    gradient.addColorStop(0.5, 'grey')
    gradient.addColorStop(1, 'white')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, $canvas.width, $canvas.height)

    context.fillStyle = 'red'
    context.fillRect(0, groundY, windowWidth, windowHeight/4 )
}
paintBack()

//ball gestion

function creationBall()
{
    for (let i = 0; i < 1 ; i++ )
    {
        modificationBall(i)
        paintBall(i)
    }
}
creationBall()

function modificationBall(i)
{
    const ball = new Ball()
    ball.r = (windowWidth/40)*2
    ball.x = Math.floor(Math.random() * (windowWidth - 100)) + 50
    ball.y =  -ball.r
    
    ball.value = 2
    ball.click = 4
    balls[i] = ball
}


function paintBall(i)
{
    context.beginPath()
    context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2, true)
    context.fill()

    context.save()

    const text = balls[i].click
    context.font = balls[i].r/1.5 +'px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = 'blue'
    context.fillText(text, balls[i].x, balls[i].y, 300)
    context.lineWidth = 2

    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

    context.restore()

}

function newBall()
{
    const ball = new Ball()

    ball.value = Math.floor(Math.random() * 4) + 1
    ball.click = ball.value * 2
    ball.r = (windowWidth/40)*ball.value
    
    ball.x = Math.floor(Math.random() * (windowWidth - 100)) + 50
    ball.y =  -ball.r
    
    balls.push(ball)
}

//start print

function startGame()
{
    const text = 'Start?'
    context.font = windowWidth/30 +'px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, (windowWidth/2), 300,windowWidth/4)
    context.lineWidth = 2
}

//score print

function scorePrint()
{
    context.save()
    const text = 'Score : ' + score
    context.font = '40px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = 'green'
    context.fillText(text, 100, 50, 300)
    context.lineWidth = 2
    context.restore()
}
scorePrint()

//end print

function endPrint()
{
    const text = 'LOSE'
    context.font = windowWidth/30 +'px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, (windowWidth/4), 300,windowWidth/4)
    context.lineWidth = 2
    

    const text2 = 'Try again?'
    context.font = windowWidth/30 +'px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text2, (windowWidth/4)*3, 300,(windowWidth/4)*3.5)
    context.lineWidth = 2
}

//difficulties print

function levelPrint()
{
    const textEas = 'Easy'
    context.font = windowWidth/30 +'px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(textEas, (windowWidth/6), 500,windowWidth/4)
    context.lineWidth = 2

    const textHar = 'Hard'
    context.font = windowWidth/30 +'px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(textHar, (windowWidth/6)*3, 500,windowWidth/4)
    context.lineWidth = 2

    const textArg = 'Arg'
    context.font = windowWidth/30 +'px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(textArg, (windowWidth/6)*5, 500,windowWidth/4)
    context.lineWidth = 2
}

function levelChoice(_event)
{
    if ((_event.clientX>(windowWidth/6) - 150)&&(_event.clientX<(windowWidth/6)+150))
    {
        if((_event.clientY>450)&&(_event.clientY<550))
        {
            level = 1
        }
    }

    if ((_event.clientX>((windowWidth/6)*3) - 150)&&(_event.clientX<((windowWidth/6)*3)+150))
    {
        if((_event.clientY>450)&&(_event.clientY<550))
        {
            level = 4
        }
    }

    if ((_event.clientX>((windowWidth/6)*5) - 150)&&(_event.clientX<((windowWidth/6)*5)+150))
    {
        if((_event.clientY>450)&&(_event.clientY<550))
        {
            level = 7
        }
    }
}


function barLevelPrint()
{
    
    if (level == 1)
    {
        context.beginPath
        context.moveTo((windowWidth/6)-150,550);
        context.lineTo((windowWidth/6)+150,550)
        context.stroke();
    }
    if (level == 4)
    {
        context.beginPath
        context.moveTo(((windowWidth/6)*3)-150,550);
        context.lineTo(((windowWidth/6)*3)+150,550)
        context.stroke();
    }
    if (level == 7)
    {
        context.beginPath
        context.moveTo(((windowWidth/6)*5)-150,550);
        context.lineTo(((windowWidth/6)*5)+150,550)
        context.stroke();
    }
}


//click gestion

$canvas.addEventListener('click', (_event) =>
{

    if (win == 0)
    {
        if ((_event.clientX>(windowWidth/2) - 150)&&(_event.clientX<(windowWidth/2)+150)){
            if((_event.clientY>250)&&(_event.clientY<350))
            {
                balls = []
                win = 1
                score= 0
            }
        }
        levelChoice(_event)
        
    }
    

    //game click

    if (win == 1)
    {
        let index = -1
        for (let i = 0; i < balls.length ; i++ )
        {
            const distance = Math.hypot
            (
                _event.clientX - balls[i].x,
                _event.clientY - balls[i].y
            )
            if (distance <= balls[i].r)
            {
                index = i
                score ++
            }
        }
        if ((index != -1) && (win == 1))
        {
            context.clearRect(0, 0, windowWidth, windowHeight)
            balls[index].click = balls[index].click -1
            if (balls[index].click == 0)
            {
                balls.splice(index, 1)
            }
            paintBack()
            for(let i = 0 ; i < balls.length ; i++)
            {
                paintBall(i)
            }
        }
    }
    

    //retry click

    if (win == 2)
    {
        if ((_event.clientX>(windowWidth/4)*3 - 150)&&(_event.clientX<(windowWidth/4)*3.5)){
            if((_event.clientY>250)&&(_event.clientY<350))
            {
                balls = []
                win = 1
                score= 0
            }
        }
        levelChoice(_event)
    }

    
})

//loop


const loop = () =>
{
    window.requestAnimationFrame(loop)

    //Balls movement

    context.clearRect(0, 0, windowWidth, windowHeight)
    paintBack()

    if (win == 0)
    {
        startGame()
        levelPrint()
        barLevelPrint()
    }

    
    
    if (win == 1)
    {

        //timer + ball generation

        timer ++

        if (timer==60)
        {
            newBall()
            timer = 0
        }

        for(let i = 0 ; i < balls.length ; i++)
        {   
            diffculties = 0.2 * level
            console.log(level)
            if (balls[i].value == 1)
            {
                balls[i].y += 1.2 + diffculties
            }
            if (balls[i].value == 2)
            {
                balls[i].y += 1 + diffculties
            }
            if (balls[i].value ==3)
            {
                balls[i].y += 0.8 + diffculties
            }
            if (balls[i].value == 4)
            {
                balls[i].y += 0.6 + diffculties
            }
            paintBall(i)
            if (balls[i].y + balls[i].r >= groundY)
            {
                win = 2
                endPrint()
            }
        }
        scorePrint()
    }

    if (win == 2)
    {
        endPrint()
        levelPrint()
        barLevelPrint()
    } 
}

loop()
