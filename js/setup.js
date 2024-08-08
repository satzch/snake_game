
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


// defining a game unit
const UNIT = 20; // in pixels

const GRID_WIDTH = 40; // in game units
const GRID_HEIGHT = 24; // in game units

const SCREEN_WIDTH = GRID_WIDTH * UNIT; // in pixels
const SCREEN_HEIGHT = GRID_HEIGHT * UNIT; // in pixels

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
    for (let i = 0; i < GRID_WIDTH; i++ )
        {
            for (let j = 0; j < GRID_HEIGHT; j++)
            {
                ctx.strokeRect(i*UNIT, j*UNIT, UNIT, UNIT);
            }
        }
}

// generate random integer between min and max
function generateRandomIntBetween(min, max) {
    return Math.floor(Math.random() * (max-min)/UNIT) * UNIT + min;
} 