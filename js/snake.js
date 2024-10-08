const snake_sprite_sheet = document.getElementById("snake-sprite");

const sprite_map = {
    snake_head: {
        up: {x: 192, y: 0},
        down: {x: 256, y: 64},
        left: {x: 192, y: 64},
        right: {x: 256, y: 0},
    },
    snake_tail: {
        up: {x: 192, y: 128},
        down: {x: 256, y: 192},
        left: {x: 192, y: 192},
        right: {x: 256, y: 128},
    },
    straight_part: {
        horizontal: {x: 64, y: 0},
        vertical: {x: 128, y: 64}
    },
    bent_part: {
        upLeft: {x: 128, y: 0},
        upRight: {x: 0, y: 0},
        downLeft: {x: 128, y: 128},
        downRight: {x: 0, y: 64},
    },
    food: {x: 0, y: 192}
}


let snake;

// factory function for snake head
const snake_head = function() {
    return {
        pos: {
            x: generateRandomIntBetween(SCREEN_WIDTH/4, SCREEN_WIDTH*3/4),
            y: generateRandomIntBetween(SCREEN_HEIGHT/4, SCREEN_HEIGHT*3/4)
        },
        speed: UNIT,
        vel: {
            x: UNIT,
            y: 0
        },
        size: UNIT,
        color: "rgb(150, 80, 150)",
        next: null, // the next snake_body object
        tail: null, // the end node or snake_body object
        length: 1,
        draw() {
            drawSnakeHead();
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
            new_segment.setPos(this.pos.x-this.vel.x-this.size, this.pos.y-this.vel.y-this.size);
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

            // set the tail as previous of new segment
            if (this.tail == null) new_segment.prev = snake;
            else new_segment.prev = this.tail;
            // make the new segment the tail
            this.tail = new_segment;
        }
    };
}

snake = snake_head();

// draws the snake head
function drawSnakeHead() {
    // source x and y positions
    let s_pos;

    // check snake direction and draw proper sprite
    if (snake.vel.x > 0) {
        s_pos = sprite_map.snake_head.right;
    } else if (snake.vel.x < 0) {
        s_pos = sprite_map.snake_head.left;
    } else if (snake.vel.y < 0) {
        s_pos = sprite_map.snake_head.up;
    } else if (snake.vel.y > 0) {
        s_pos = sprite_map.snake_head.down;
    }
    ctx.drawImage(snake_sprite_sheet, s_pos.x, s_pos.y, 64, 64,
                snake.pos.x, snake.pos.y, snake.size, snake.size);
}


// Factory function
// returns the snake body segments as an object
const snake_body = function() {
    return {
        pos: {
            x: snake.pos.x,
            y: snake.pos.y
        },
        size: snake.size,
        color: "rgb(255, 100, 200)",
        prev: null,
        next: null,
        prevPos: {
            x: 0,
            y: 0
        },
        draw() {
            drawSnakeBody(this);
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

// draws the snake body
function drawSnakeBody(body) {
    // source x and y positions
    let s_pos;

    // store all positions to check in variables and use them
    let currSegmentPos = body.pos;
    let prevSegmentPos = body.prev.pos;
    
    // check if the body segment is the tail
    if (body === snake.tail) {
        if (prevSegmentPos.x < currSegmentPos.x) {
            // if prev segment is on left side
            s_pos = sprite_map.snake_tail.left;
        } else if (prevSegmentPos.x > currSegmentPos.x) {
            // if prev segment is on right side
            s_pos = sprite_map.snake_tail.right;
        } else if (prevSegmentPos.y < currSegmentPos.y) {
            // if prev segment is above
            s_pos = sprite_map.snake_tail.up;
        } else if (prevSegmentPos.y > currSegmentPos.y) {
            // if prev segment is below
            s_pos = sprite_map.snake_tail.down;
        }
    } else {

        // store the next segment pos here
        // it exists only when the current segment is not tail 
        let nextSegmentPos = body.next.pos;
        
        // check for straight body part
        if (prevSegmentPos.x !== nextSegmentPos.x) {
            // if the x coordinate is not same the segment is horizontal
            s_pos = sprite_map.straight_part.horizontal;
        } else if (prevSegmentPos.y !== nextSegmentPos.y){
            // if the y coordinate is not same the segment is vertical
            s_pos = sprite_map.straight_part.vertical;
        }


        // check for bent body part

        // store the directions
        let prevGoingRight = prevSegmentPos.x > currSegmentPos.x;
        let prevGoingLeft = prevSegmentPos.x < currSegmentPos.x;
        let prevGoingUp = prevSegmentPos.y < currSegmentPos.y;
        let prevGoingDown = prevSegmentPos.y > currSegmentPos.y;

        let currGoingRight = nextSegmentPos.x < currSegmentPos.x;
        let currGoingLeft = nextSegmentPos.x > currSegmentPos.x;
        let currGoingUp = nextSegmentPos.y > currSegmentPos.y;
        let currGoingDown = nextSegmentPos.y < currSegmentPos.y;


        if ((currGoingUp && prevGoingRight) || (currGoingLeft && prevGoingDown)) {
            // up and right part
            // it is the same as left and down part
            s_pos = sprite_map.bent_part.upRight;
        } else if ((currGoingDown && prevGoingRight) || (currGoingLeft && prevGoingUp)) {
            // down and right part
            // same as left and up part
            s_pos = sprite_map.bent_part.downRight;
        } else if ((currGoingDown && prevGoingLeft) || (currGoingRight && prevGoingUp)) {
            // down and left part
            // same as right and up part
            s_pos = sprite_map.bent_part.downLeft;
        } else if ((currGoingUp && prevGoingLeft) || (currGoingRight && prevGoingDown)) {
            // up and left part
            // same as right and down part
            s_pos = sprite_map.bent_part.upLeft;
        }
    }

    ctx.drawImage(snake_sprite_sheet, s_pos.x, s_pos.y, 64, 64,
                body.pos.x, body.pos.y, body.size, body.size);
}

const food = {
    pos: {
        x: generateRandomIntBetween(0, SCREEN_WIDTH),
        y: generateRandomIntBetween(0, SCREEN_HEIGHT)
    },
    color: "rgb(255, 255, 0)",
    size: UNIT,
    draw() {
        ctx.drawImage(snake_sprite_sheet, sprite_map.food.x, sprite_map.food.y, 64, 64,
                    this.pos.x, this.pos.y, this.size, this.size);
    },
    updatePos() {
        this.pos.x = generateRandomIntBetween(0, SCREEN_WIDTH);
        this.pos.y = generateRandomIntBetween(0, SCREEN_HEIGHT);
        // update the position again if the food is generated on the snake body
        if (checkSnakeBodyCollision(this)) {
            console.log("food relocated");
            this.updatePos();
        }
    },
    checkCollision() {
        if (checkCollisionBetween(this, snake))
        {
            this.updatePos();
            // console.log("Collision at: ", this.pos.x, " ", this.pos.y);
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

let debounceTime = 150;
let lastKeyPressTime = 0;
function debounceKeyHandler(event) {
    const now = Date.now();
    if (now - lastKeyPressTime > debounceTime) {
        lastKeyPressTime = now;
        keyPressHandler(event);
    }
}
window.addEventListener("keydown", debounceKeyHandler);


// checks for collision between two entities with pos and size attributes
function checkCollisionBetween(a, b) {
    // if distance between two points is less than distance to midpoint of the points, they collide
    let xCollides = Math.abs(a.pos.x - b.pos.x) < (a.size + b.size)/2;
    let yCollides = Math.abs(a.pos.y - b.pos.y) < (a.size + b.size)/2;
    return xCollides && yCollides;
}

// check collision of argument entity with the snake body
// returns true if the snake body collides with entity otherwise returns false
function checkSnakeBodyCollision(entity) {
    if (snake.next == null || entity == null) return false;
    let temp = snake.next;
    while (temp != null) {
        if (checkCollisionBetween(temp, entity)) return true;
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

// add one extra snake body part, for fixing snake graphics
// since with only head it looks like cut head only
snake.addBodySegment();
Globals.score = 0;
