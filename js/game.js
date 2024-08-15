let animationFrameId;
let timeoutId;

function gameLoop()
{
    // update the snake properties
    if (!Globals.gameOver) snake.update();
    let temp = snake;
    while (temp.next != null) {
        temp = temp.next;
        if (!Globals.gameOver)
            temp.update();
    }

    // draw the frame
    draw();

    // check for game over state
    Globals.gameOver = checkSnakeBodyCollision(snake) || checkBoundaryCollision();

    // update the UI
    updateUI();

    if (Globals.gameOver) {
        pauseGame();
        play_pause_btn.removeEventListener("click", togglePausePlay);
        window.removeEventListener("keydown", debounceKeyHandler);
        toggleGameOverScreen();
        updateGameOverScreenScore();
    }
    
    // check for game pause state
    if (!Globals.continueGame) {
        pauseLoop();
        return;
    }

    // clear previous animation frames 
    if (timeoutId) clearTimeout(timeoutId);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    // call and loop the function
    timeoutId = setTimeout(gameLoop, 180);
    // requestAnimationFrame(gameLoop);
}

function pauseLoop() {
    if (Globals.continueGame) {
        gameLoop();
        return;
    }
    if (timeoutId) clearTimeout(timeoutId);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(pauseLoop);
}

// draws the frame
function draw() {
    // clear screen  
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    // console.log("refresh")
    
    // draw the grid
    if (Settings.gridOn) drawGrid("black");
    
    // update and draw the snake
    let temp = snake;
    temp.draw();
    while (temp.next != null) {
        temp = temp.next;
        temp.draw();
    }
    snake.draw() // to keep snake head on top after collision

    // update and draw the food
    food.checkCollision();
    food.draw();
}

gameLoop();

// resets the snake properties for new game
function resetSnake() {
    snake.next = null;
    snake.tail = null;
    snake = snake_head();
    snake.addBodySegment();
}