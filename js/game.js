let continueGame = true;
continueGame = false;
function gameLoop()
{
    // clear screen
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for (let i = 0; i < SCREEN_WIDTH; i++ )
    {
        for (let j = 0; j < SCREEN_HEIGHT; j++)
        {
            ctx.strokeRect(i*20, j*20, 20, 20);
        }
    }
    snake.update();
    let temp = snake;
    temp.draw();
    while (temp.next != null) {
        temp = temp.next;
        temp.draw();
    }
    snake.draw();
    // food.update();
    food.checkCollision();
    food.draw();
    if (continueGame)
    {
        setTimeout(gameLoop, 500);
    }
}

gameLoop();