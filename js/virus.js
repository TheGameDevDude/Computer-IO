class Virus {
    constructor(position, size, computer, spritesheet, ctx) {
        this.position = position;
        this.vel = new Vector(0, 0);
        this.acceleration = Math.random() * (1.5 - 0.7) + 0.7;
        this.friction = Math.random() * (0.1 - 0.05) + 0.05;
        this.size = size;
        this.computer = computer;
        this.spritesheet = spritesheet;
        this.ctx = ctx;
        this.timer = 0;
        this.SPRITEPOS = [];
        this.SPRITEPOS.push(new Vector(32, 0)); // hacker face
        this.SPRITEPOS.push(new Vector(64, 0)); // wrong symbol
        this.SPRITEPOS.push(new Vector(96, 0)); // folder error
        this.SPRITEPOS.push(new Vector(0, 32)); // malware
        this.SPRITEPOS.push(new Vector(32, 32)); // pishing
        this.SPRITEPOS.push(new Vector(64, 32)); // no battery
        this.SPRITEPOS.push(new Vector(96, 32)); // no sound
        this.SPRITEPOS.push(new Vector(0, 64)); // infected folder
        this.SPRITEPOS.push(new Vector(32, 64)); // warning
        this.SPRITEPOS.push(new Vector(96, 64)); // uninstall 
        this.coords = this.SPRITEPOS[Math.floor(Math.random() * (this.SPRITEPOS.length - 1))];
        computer.highScore += 10;
        powerUpSound.play();
    }

    tick(deltaTime) {
        if(gameOver === false) {
            // follow player
            let direction = computer.position.subtr(this.position).unit().scale(this.acceleration);
            this.vel = this.vel.add(new Vector(direction.x * deltaTime, direction.y * deltaTime));
            this.vel = this.vel.scale(1 - this.friction * deltaTime);
            this.position = this.position.add(new Vector(this.vel.x * deltaTime, this.vel.y * deltaTime));
            this.timer += deltaTime / 5;
    
            // collision with player
            let length = computer.position.subtr(this.position).mag();
            if(length < 70) {
                gameOver = true;
            }
        }
    }

    render() {
        let offset = 32 * this.size;
        this.ctx.drawImage(
            this.spritesheet,
            this.coords.x, this.coords.y,
            32, 32,
            this.position.x - offset / 2, this.position.y - offset / 2,
            offset, offset
        );
    }
}