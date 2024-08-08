
function gameLoop()
{
    // clear screen  
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    console.log("refresh")
    
    // draw the grid
    if (Settings.gridOn) drawGrid("black");
    
    // update and draw the snake
    if (!Globals.gameOver) snake.update();
    let temp = snake;
    temp.draw();
    while (temp.next != null) {
        temp = temp.next;
        if (!Globals.gameOver)
            temp.update();
        temp.draw();
    }

    // check for game over state
    Globals.gameOver = checkSnakeBodyCollision(snake) || checkBoundaryCollision();

    // update and draw the food
    food.checkCollision();
    food.draw();
    
    // update the UI
    updateUI();

    if (Globals.gameOver) {
        pauseGame();
        play_pause_btn.removeEventListener("click", togglePausePlay);
        window.removeEventListener("keydown", keyPressHandler);
    }
    
    // check for game pause state
    if (!Globals.continueGame) {
        pauseLoop();
        return;
    }

    // call and loop the function
    setTimeout(gameLoop, 60); // for debugging
    // requestAnimationFrame(gameLoop);
}

function pauseLoop() {
    if (Globals.continueGame) {
        gameLoop();
        return;
    }
    requestAnimationFrame(pauseLoop);
}

gameLoop();