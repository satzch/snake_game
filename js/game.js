
// continueGame = false;
function gameLoop()
{
    // if (gameOver) return;
    // clear screen
    // if (!Globals.continueGame) requestAnimationFrame(gameLoop);   
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for (let i = 0; i < SCREEN_WIDTH; i++ )
    {
        for (let j = 0; j < SCREEN_HEIGHT; j++)
        {
            ctx.strokeRect(i*20, j*20, 20, 20);
        }
    }
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
    // if (Globals.continueGame)
    // {
        // setTimeout(gameLoop, 200);
        requestAnimationFrame(gameLoop);
    // }
}

gameLoop();