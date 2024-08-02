
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 480;
const SCREEN_HEIGHT = 360;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;



let snake_speed = 20;
const snake = {
    pos: {
        x: Math.floor(Math.random() * (SCREEN_WIDTH/40)) * 20 + SCREEN_WIDTH/4 + 10,
        y: Math.floor(Math.random() * (SCREEN_HEIGHT/40)) * 20 + SCREEN_HEIGHT/4
    },
    vel: {
        x: snake_speed,
        y: 0
    },
    size: 20,
    color: "rgb(255, 100, 200)",
    next: null, // the next snake_body object
    tail: this, // the end node or snake_body object
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos.x-(this.size/2),
            this.pos.y-(this.size/2),
            this.size,
            this.size
        );
    },
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    },
    setPos(pos_x, pos_y) {
        this.pos.x = pos_x;
        this.pos.y = pos_y;
    },
    setVel(vel_x, vel_y) {
        this.vel.x = vel_x;
        this.vel.y = vel_y;
    },
    addBodySegment() {
        let new_segment = Object.create(snake_body); 
        if (this.next == null) {
            this.next = new_segment;
        } else {
            this.tail.next = new_segment;
        }
        this.tail = new_segment;
    }
};

const snake_body = {
    pos: {
        x: snake.pos.x,
        y: snake.pos.y
    },
    vel: snake.vel,
    size: snake.size,
    color: "rgb(255, 100, 200)",
    next: null,
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos.x-(this.size/2),
            this.pos.y-(this.size/2),
            this.size,
            this.size
        );
    },
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    },
    setPos(pos_x, pos_y) {
        this.pos.x = pos_x;
        this.pos.y = pos_y;
    },
    setVel(vel_x, vel_y) {
        this.vel.x = vel_x;
        this.vel.y = vel_y;
    }
};

const food = {
    pos: {
        x: Math.floor(Math.random() * (SCREEN_WIDTH/20)) * 20 + 10,
        y: Math.floor(Math.random() * (SCREEN_HEIGHT/20)) * 20 + 10
    },
    color: "rgb(255, 255, 0)",
    size: 20,
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos.x-(this.size/2),
            this.pos.y-(this.size/2),
            this.size,
            this.size
        );
    },
    update() {
        this.pos.x = Math.floor(Math.random() * (SCREEN_WIDTH/20)) * 20 + 10;
        this.pos.y = Math.floor(Math.random() * (SCREEN_HEIGHT/20)) * 20 + 10;
    },
    checkCollision() {
        if (Math.abs(this.pos.x - snake.pos.x) < 20  &&  Math.abs(this.pos.y - snake.pos.y) < 20)
        {
            this.update();
            snake.addBodySegment();
        }
    }
}

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
        snake.setVel(0, -snake_speed);
    } else if (e.key == "ArrowDown") {
        snake.setVel(0, snake_speed);
    }

    if (e.key == "ArrowLeft") {
        snake.setVel(-snake_speed, 0);   
    } else if (e.key == "ArrowRight") {
        snake.setVel(snake_speed, 0);
    }
});