// snake head object (consider it a global), It is the snake head object and not the constructor
const snake = {
    pos: {
        x: generateRandomIntBetween(SCREEN_WIDTH/4, SCREEN_WIDTH*3/4) + 10,
        y: generateRandomIntBetween(SCREEN_HEIGHT/4, SCREEN_HEIGHT*3/4) + 10
    },
    speed: UNIT,
    vel: {
        x: UNIT,
        y: 0
    },
    size: UNIT,
    color: "rgb(150, 80, 150)",
    next: null, // the next snake_body object
    tail: this, // the end node or snake_body object
    length: 1,
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
        if (this.next != null) {
            this.next.setPos(this.pos.x, this.pos.y);
        }
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
        Globals.score += 5;
        let new_segment = new snake_body();
        new_segment.setPos(this.pos.x, this.pos.y);
        if (this.next == null) {
            this.next = new_segment;
        } else {
            let curr = this.next;
            while (curr.next != null) {
                curr = curr.next;
            }
            curr.next = new_segment;
        }
        this.length++;
    }
};

// returns the snake body segments as an object
const snake_body = function() {
    return {
        pos: {
            x: snake.pos.x,
            y: snake.pos.y
        },
        size: snake.size,
        color: "rgb(255, 100, 200)",
        next: null,
        prevPos: {
            x: 0,
            y: 0
        },
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                this.pos.x-(this.size/2),
                this.pos.y-(this.size/2),
                this.size,
                this.size
            );
            ctx.fillStyle = snake.color;
            ctx.strokeRect(
                this.pos.x-(this.size/2),
                this.pos.y-(this.size/2),
                this.size,
                this.size
            );
        },
        update() {
            if (this.next != null) {
                this.next.setPos(this.prevPos.x, this.prevPos.y);
            }
        },
        setPos(pos_x, pos_y) {
            this.setPrevPos(this.pos.x, this.pos.y);
            this.pos.x = pos_x;
            this.pos.y = pos_y;
        },
        setPrevPos(pos_x, pos_y) {
            this.prevPos.x = pos_x;
            this.prevPos.y = pos_y;
        }
    }
};

const food = {
    pos: {
        x: generateRandomIntBetween(0, SCREEN_WIDTH) + 10,
        y: generateRandomIntBetween(0, SCREEN_HEIGHT) + 10
    },
    color: "rgb(255, 255, 0)",
    size: UNIT,
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos.x-(this.size/2),
            this.pos.y-(this.size/2),
            this.size,
            this.size
        );
    },
    updatePos() {
        this.pos.x = generateRandomIntBetween(0, SCREEN_WIDTH) + 10;
        this.pos.y = generateRandomIntBetween(0, SCREEN_HEIGHT) + 10;
        // update the position again if the food is generated on the snake body
        if (checkSnakeBodyCollision(this)) {
            console.log("food relocated");
            this.updatePos();
        }
    },
    checkCollision() {
        if (checkCollision(this, snake))
        {
            this.updatePos();
            console.log("Collision at: ", this.pos.x, " ", this.pos.y);
            snake.addBodySegment();
        }
    }
}


// handles user inputs
function keyPressHandler(e) {
    if (e.key == "ArrowUp") {
        if (!(snake.vel.y > 0) || snake.length == 1) {
            snake.setVel(0, -snake.speed);
        }
    } else if (e.key == "ArrowDown") {
        if (!(snake.vel.y < 0) || snake.length == 1) {
            snake.setVel(0, snake.speed);
        }
    }
    
    if (e.key == "ArrowLeft") {
        if (!(snake.vel.x > 0) || snake.length == 1) {
            snake.setVel(-snake.speed, 0);   
        }
    } else if (e.key == "ArrowRight") {
        if (!(snake.vel.x < 0) || snake.length == 1) {
            snake.setVel(snake.speed, 0);
        }
    }
    
    if (e.code == "Space") togglePausePlay();
}
window.addEventListener("keydown", keyPressHandler);


// checks for collision between two entities with pos and size attributes
function checkCollision(a, b) {
    if (Math.abs(a.pos.x - b.pos.x) < (a.size/2 + b.size/2)  &&  Math.abs(a.pos.y - b.pos.y) < (a.size/2 + b.size/2))
    {
        return true;
    } else {
        return false;
    }
}

// check collision of argument entity with the snake body
// returns true if the snake body collides with entity otherwise returns false
function checkSnakeBodyCollision(entity) {
    if (snake.next == null || entity == null) return false;
    let temp = snake.next;
    while (temp != null) {
        if (checkCollision(temp, entity)) return true;
        temp = temp.next;
    }
    return false;
}

// returns true if snake goes out of screen
function checkBoundaryCollision() {
    let snake_x_outside = (snake.pos.x < 0 || snake.pos.x >= SCREEN_WIDTH);
    let snake_y_outside = (snake.pos.y < 0 || snake.pos.y >= SCREEN_HEIGHT);
    return snake_x_outside || snake_y_outside; 
} 