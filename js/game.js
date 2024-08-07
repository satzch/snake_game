
// continueGame = false;
function gameLoop()
{
    // clear screen
    // if (!Globals.continueGame) requestAnimationFrame(gameLoop);   
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawGrid("black");
    if (!gameOver) snake.update();
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
    // if (Globals.continueGame)
    // {
        // setTimeout(gameLoop, 200);
        requestAnimationFrame(gameLoop);
    // }
}

gameLoop();