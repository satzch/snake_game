
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 480;
const SCREEN_HEIGHT = 360;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;


const snake = {
    pos: {
        x: Math.random() * SCREEN_WIDTH/2 + SCREEN_WIDTH/4,
        y: Math.random() * SCREEN_HEIGHT/2 + SCREEN_HEIGHT/4
    },
    vel: {
        x: 2,
        y: 2
    },
    size: 20,
    color: "rgb(255, 100, 200)",
    setPos(pos_x, pos_y) {
        this.pos.x = pos_x;
        this.pos.y = pos_y;
    },
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos.x-(this.size/2),
            this.pos.y-(this.size/2),
            this.size/2,
            this.size/2
        );
    },
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
};
snake.draw();