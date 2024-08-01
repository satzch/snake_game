let continueGame = true;
function gameLoop()
{
    // clear screen
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    snake.update();
    snake.draw();
    if (continueGame)
    {
        setTimeout(gameLoop, 500);
    }
}

gameLoop();