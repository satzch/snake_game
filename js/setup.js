
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 480;
const SCREEN_HEIGHT = 360;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

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