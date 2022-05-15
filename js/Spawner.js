class Spawner {
    constructor(HACKERS, canvas, timer, threshold) {
        this.HACKERS = HACKERS;
        this.SPAWNINGPOINTS = [];
        this.SPAWNINGPOINTS.push(new Vector(0 - 32, 0 - 32));
        this.SPAWNINGPOINTS.push(new Vector(canvas.clientWidth, 0));
        this.SPAWNINGPOINTS.push(new Vector(canvas.clientWidth, canvas.clientHeight));
        this.SPAWNINGPOINTS.push(new Vector(0, canvas.clientHeight));
        this.timer = 0;
        this.threshold = 100;
        this.upperlimitAcceleration = -0.08;
        this.firstHacker = true;
    }

    tick(deltaTime) {
        if(gameOver === false) {
            this.timer +=  deltaTime / 5;
            if(this.timer > this.threshold) {
                this.timer = 0;
                this.threshold -= 10;
                if(this.threshold <= 30) this.threshold = 30;
                this.upperlimitAcceleration += 0.1;
                if(this.upperlimitAcceleration >= 1.5) this.upperlimitAcceleration = 1.5;
                HACKERS.push(new Virus(this.SPAWNINGPOINTS[Math.floor(Math.random() * 3)], 2, computer, spritesheet, ctx, this.upperlimitAcceleration, this.firstHacker));
                this.firstHacker = false;   
            }
        }
    }
}