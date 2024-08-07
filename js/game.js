
// continueGame = false;
function gameLoop()
{
    // clear screen  
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    if (Settings.gridOn) drawGrid("black");
    if (!Globals.gameOver) snake.update();
    let temp = snake;
    temp.draw();
    while (temp.next != null) {
        temp = temp.next;
        if (!Globals.gameOver) temp.update();
        temp.draw();
    }
    snake.draw();
    Globals.gameOver = checkSnakeBodyCollision(snake);
    food.checkCollision();
    food.draw();
    updateUI();
    // setTimeout(gameLoop, 200);
    if (!Globals.continueGame) {
        pauseLoop();
        return;
    }
    requestAnimationFrame(gameLoop);
}

function pauseLoop() {
    if (Globals.continueGame) {
        gameLoop();
        return;
    }
    requestAnimationFrame(pauseLoop);
}

gameLoop();