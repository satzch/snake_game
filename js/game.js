let continueGame = true;
// continueGame = false;
let gameOver = false;
function gameLoop()
{
    // if (gameOver) return;
    // clear screen
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for (let i = 0; i < SCREEN_WIDTH; i++ )
    {
        for (let j = 0; j < SCREEN_HEIGHT; j++)
        {
            ctx.strokeRect(i*20, j*20, 20, 20);
        }
    }
    if (!gameOver) snake.update();
    let temp = snake;
    temp.draw();
    while (temp.next != null) {
        temp = temp.next;
        if (!gameOver) temp.update();
        temp.draw();
    }
    snake.draw();
    gameOver = checkSnakeBodyCollision(snake);
    food.checkCollision();
    food.draw();
    updateUI();
    if (continueGame)
    {
        setTimeout(gameLoop, 200);
    }
}

gameLoop();