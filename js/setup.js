
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 40 * 20;
const SCREEN_HEIGHT = 40 * 11;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const Globals = {
    score: 0,
    continueGame: false,
    gameOver: false,
}
const Settings = {
    volume: 6,
    gridOn: true,
}

// Draws grid
function drawGrid(color) {
    ctx.fillStyle = "black";
    for (let i = 0; i < SCREEN_WIDTH; i++ )
        {
            for (let j = 0; j < SCREEN_HEIGHT; j++)
            {
                ctx.strokeRect(i*20, j*20, 20, 20);
            }
        }
}

// generate random integer between min and max
function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min)/20) * 20 + min;
} 