let continueGame = true;
// continueGame = false;
let gameOver = false;
function gameLoop()
{
    // clear screen
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawGrid("black");
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
    if (continueGame)
    {
        setTimeout(gameLoop, 200);
    }
}

gameLoop();