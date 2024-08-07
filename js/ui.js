/*
*  Nearly all UI related DOM manipulations and function codes are here
*/

const score = document.getElementById("score-points");


// this function will be called each frame
function updateUI() {
    updateScore();
}

function updateScore() {
    score.innerText = Globals.score;
}
