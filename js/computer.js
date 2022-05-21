class Computer {
    constructor(position, size, spritesheet, ctx, canvas) {
        this.LEFT = false;
        this.UP = false;
        this.RIGHT = false;
        this.DOWN = false;
        this.position = position;
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.acceleration = 1;
        this.friction = 0.05;
        this.spritesheet = spritesheet;
        this.canvas = canvas;
        this.reload = document.getElementById('reload');
        this.backtomenu = document.getElementById('backtomenu');
        this.pause = document.getElementById('pause');
        this.size = size;
        this.spritesheet = spritesheet;
        this.ctx = ctx;
        this.canvas = canvas;
        this.animationTimer = 0;
        this.highScore = 0;
        this.explode = false;
    }

    control() {
        this.canvas.addEventListener('keydown', event => {
            if(event.key === 'a' || event.key === 'ArrowLeft'  || event.key === 'A') {
                this.LEFT = true;
            }
            if(event.key === 'd' || event.key === 'ArrowRight' || event.key === 'D') {
                this.RIGHT = true;
            }
            if(event.key === 'w' || event.key === 'ArrowUp' || event.key === 'W') {
                this.UP = true;
            }
            if(event.key === 's' || event.key === 'ArrowDown' || event.key === 'S') {
                this.DOWN = true;
            }
        });

        this.canvas.addEventListener('keyup', event => {
            if(event.key === 'a' || event.key === 'ArrowLeft'  || event.key === 'A') {
                this.LEFT = false;
            }
            if(event.key === 'd' || event.key === 'ArrowRight' || event.key === 'D') {
                this.RIGHT = false;
            }
            if(event.key === 'w' || event.key === 'ArrowUp' || event.key === 'W') {
                this.UP = false;
            }
            if(event.key === 's' || event.key === 'ArrowDown' || event.key === 'S') {
                this.DOWN = false;
            }
        });

        this.canvas.addEventListener('mousedown', event => {
            let rect = this.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            if(gameOver === false) {
                if(x >= (this.canvas.clientWidth - 50) && x <= this.canvas.clientWidth && y >= 0 && y <= 50) {
                    clickSound.play();
                    restart = true;
                    menu = true;
                }

                if(x >= (this.canvas.clientWidth - 64 - 14) && x <= (this.canvas.clientWidth - 64 - 14 + 32) && y >= 0 && y <= 50 && pauseGame === false) {
                    clickSound.play();
                    pauseGame = true;
                }

                if(pauseGame === true && x >= (this.canvas.clientWidth / 2 - 100) && x <= (this.canvas.clientWidth / 2 - 100 + 200) && y >= (this.canvas.clientHeight / 2 - 100) && y <= (this.canvas.clientHeight / 2 - 100 + 200)) {
                    clickSound.play();
                    pauseGame = false;
                }
            } else {
                if(x >= (this.canvas.clientWidth - 50) && x <= this.canvas.clientWidth && y >= 0 && y <= 50) {
                    clickSound.play();
                    restart = true;
                }

                if(x >= (this.canvas.clientWidth - 64 - 14) && x <= (this.canvas.clientWidth - 64 - 14 + 32) && y >= 0 && y <= 50) {
                    clickSound.play();
                    restart = true;
                    menu = true;
                }
            }
        });
    }

    tick(deltaTime) {
        if(gameOver === false) {
            if(this.LEFT) {
                this.acc.x = -this.acceleration;
            }
            if(this.RIGHT) {
                this.acc.x = this.acceleration;
            }
            if(this.UP) {
                this.acc.y = -this.acceleration;
            }
            if(this.DOWN) {
                this.acc.y = this.acceleration;
            }
            if(!this.UP && !this.DOWN) {
                this.acc.y = 0;
            }
            if(!this.RIGHT && !this.LEFT) {
                this.acc.x = 0;
            }

            this.acc = this.acc.unit().scale(this.acceleration);
            this.vel = this.vel.add(new Vector(this.acc.x * deltaTime, this.acc.y * deltaTime));
            this.vel = this.vel.scale(1 - this.friction * deltaTime);
            this.position = this.position.add(new Vector(this.vel.x * deltaTime, this.vel.y * deltaTime));

            if(this.position.x >= this.canvas.clientWidth + 100 || this.position.x <= -100 || this.position.y >= this.canvas.clientHeight + 100 || this.position.y <= -100) {
                gameOver = true;
            }

        } else {
            this.animationTimer += deltaTime / 70;
        }
    }

    render() {
        let offset = 32 * this.size;
        this.ctx.drawImage(
            this.spritesheet,
            0, 0,
            32, 32,
            this.position.x - offset / 2, this.position.y - offset / 2,
            offset, offset
        );
    }

    renderGamePause() {
        if(gameOver === false) {
            this.ctx.drawImage(
                this.backtomenu,
                this.canvas.clientWidth - 32 - 7, 7,
                32, 32
            );
            
            if(pauseGame === true) {
                this.ctx.drawImage(
                    this.pause,
                    this.canvas.clientWidth / 2 - 100, this.canvas.clientHeight / 2 - 100,
                    200, 200  
                );
            } else {
                this.ctx.drawImage(
                    this.pause,
                    this.canvas.clientWidth - 64 - 14, 7,
                    32, 32
                );
            }
        }
    }

    renderGameOver() {
        let offset = 32 * this.size;
        if(gameOver === true && this.animationTimer > 2) {
            if(this.explode === false) {
                explosionSound.play();
                this.explode = true;
            }
            let tileCoords = Math.floor(this.animationTimer % 3);
            this.ctx.drawImage(
                this.spritesheet,
                tileCoords * 32, 96,
                32, 32,
                this.position.x - offset / 2, this.position.y - offset / 2,
                offset, offset
            )
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Game Over", 7, 32);
            this.ctx.fillText("Highscore: " + this.highScore, 7, 64);
            
            this.ctx.drawImage(
                this.reload,
                this.canvas.clientWidth - 32 - 7, 7,
                32, 32
            );

            this.ctx.drawImage(
                this.backtomenu,
                this.canvas.clientWidth - 64 - 14, 7,
                32, 32
            );
                

        }
    }
}