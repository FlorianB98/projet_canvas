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

let win = true

let timer = 0

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

    

    const gradient = context.createLinearGradient(windowWidth /2, 0, windowWidth /2, windowHeight)

    gradient.addColorStop(0, 'black')
    gradient.addColorStop(0.5, 'grey')
    gradient.addColorStop(1, 'white')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, $canvas.width, $canvas.height)

    context.fillStyle = 'red'
    context.fillRect(0, groundY, windowWidth, windowHeight/4 )
}
window.addEventListener('resize', resize)
resize()


//ball gestion

function creationball()
{
    for (let i = 0; i < 1 ; i++ )
    {
        modificationball(i)
        paintball(i)
    }
}
creationball()

function modificationball(i)
{
    const ball = new Ball()
    ball.r = 50
    ball.x = Math.floor(Math.random() * (windowWidth - 100)) + 50
    ball.y =  -ball.r
    
    ball.value = 2
    ball.click = 4
    balls[i] = ball
}


function paintball(i)
{
    context.beginPath()
    context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2, true)
    context.lineWidth = 20
    context.fill()

    context.save()

    const text = balls[i].click
    context.font = '40px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = 'blue'
    context.fillText(text, balls[i].x, balls[i].y, 300)
    context.lineWidth = 2
    
    context.restore()

}

function newball()
{
    const ball = new Ball()

    ball.value = Math.floor(Math.random() * 4) + 1
    ball.click = ball.value * 2
    ball.r = ball.value * 30
    
    ball.x = Math.floor(Math.random() * (windowWidth - 100)) + 50
    ball.y =  -ball.r
    
    balls.push(ball)
}

//score print

function scoreprint()
{
    const text = 'Score : ' + score
    context.font = '40px Helvetica'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = 'green'
    context.fillText(text, 100, 50, 300)
    context.lineWidth = 2
}
scoreprint()





//click gestion

$canvas.addEventListener('click', (_event) =>
{

    //game click

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
    if ((index != -1) && (win))
    {
        context.clearRect(0, 0, windowWidth, windowHeight)
        balls[index].click = balls[index].click -1
        if (balls[index].click == 0)
        {
            balls.splice(index, 1)
        }
        resize()
        for(let i = 0 ; i < balls.length ; i++)
        {
            paintball(i)
        }
        scoreprint()
    }

    //retry click

    if (!win)
    {
        if ((_event.clientX>400)&&(_event.clientX<600)){
            if((_event.clientY>250)&&(_event.clientY<350))
            {
                balls = []
                win = true
            }
        }
    }

    
})

//loop

const loop = () =>
{
    window.requestAnimationFrame(loop)

    //timer + ball generation

    timer ++

    if (timer==60)
    {
        newball()
        timer = 0
    }



    //Balls movement

    context.clearRect(0, 0, windowWidth, windowHeight)
    resize()
    for(let i = 0 ; i < balls.length ; i++)
    {
        if (win)
        {
            balls[i].y += 2
            paintball(i)
        }
        

        if (balls[i].y + balls[i].r >= groundY)
        {
            const text = 'LOSE'
            context.font = '40px Helvetica'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(text, 300, 300)
            context.lineWidth = 2
            win = false

            const text2 = 'Try again'
            context.font = '40px Helvetica'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(text2, 500, 300)
            context.lineWidth = 2
            //if (balls)
            //{
            //    balls = []
            //}

        }
        if (!win)
        {
            balls=[]
        }
    }
    scoreprint()
}

loop()
