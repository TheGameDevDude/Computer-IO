const spritesheet = document.getElementById('spritesheet');
const play = document.getElementById('play');
const controls = document.getElementById('controls');
const gift = document.getElementById('gift');
const title = document.getElementById('title');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const perfectFrameTime = 1000 / 60;
let clickSound = document.getElementById('click');
let powerUpSound = document.getElementById('powerUp');
let explosionSound = document.getElementById('explosion');
let gameOver = false;
let restart = false;
let menu = true;
let pauseGame = false;

canvas.focus();
ctx.imageSmoothingEnabled = false;

let computer = new Computer(new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2), 3, spritesheet, ctx, canvas);
let HACKERS = [];
let spawner = new Spawner(HACKERS, canvas);
let prevTime = performance.now();

function restartGame() {
    if(restart === true) {
        computer.position = new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2);
        computer.acc = new Vector(0, 0);
        computer.vel = new Vector(0, 0);
        computer.animationTimer = 0;
        computer.explode = false;
        gameOver = false;
        computer.highScore = 0;
        HACKERS = [];
        spawner.timer = 0;
        spawner.threshold = 100;
        restart = false;
        pauseGame = false;
    }
}

function mainLoop() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    let currentTime = performance.now();
    let deltaTime = (currentTime - prevTime) / perfectFrameTime;
    if(pauseGame === true) deltaTime = 0;
    prevTime = currentTime;

    if(menu === false) {
        // tick
        computer.control();
        computer.tick(deltaTime);
        spawner.tick(deltaTime);
        if(gameOver === false)
            HACKERS = HACKERS.filter(hackers => hackers.timer < Math.random() * (350 - 250) + 250);
        HACKERS.forEach(hackers => hackers.tick(deltaTime));
    
        // render
        computer.render();
        HACKERS.forEach(hackers => hackers.render());
    
        // restart only if restart is true
        restartGame();

    } else {
        restartGame();
        ctx.drawImage(
            play,
            (canvas.clientWidth / 2) - 100, (canvas.clientHeight / 2) - 100,
            200, 200
        );

        ctx.drawImage(
            controls,
            (canvas.clientWidth / 2) - 100 - 210, (canvas.clientHeight / 2) - 100,
            200, 200
        );

        ctx.drawImage(
            gift,
            (canvas.clientWidth / 2) + 110, (canvas.clientHeight / 2) - 100,
            200, 200
        );

        ctx.drawImage(
            title,
            (canvas.clientWidth/2) - 400, 90
        );

        canvas.addEventListener('mousedown', event => {
            if(menu === true) {
                let rect = canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;
                let radius = new Vector(x - canvas.clientWidth / 2, y - canvas.clientHeight / 2).mag();
                if(radius <= 90) {  
                    clickSound.play();
                    menu = false;
                }
            }
        });

        ctx.font = "30px Arial";
        ctx.fillStyle = "black"
        ctx.fillText("A gift for Balaji", (canvas.clientWidth / 2) - 110, (canvas.clientHeight / 2) + 150);

        ctx.font = "15px Arial";
        ctx.fillStyle = "black"
        ctx.fillText("by Vijai", canvas.clientWidth - 55, canvas.clientHeight - 10);
    }

    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);