class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }    

    subtr(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    mag() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    scale(value) {
        return new Vector(this.x * value, this.y * value);
    }

    unit() {
        if(this.mag() === 0) {
            return new Vector(0, 0);
        }else {
            return new Vector(this.x / this.mag(), this.y / this.mag());
        }
    }
}