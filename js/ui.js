/*
*  Nearly all UI related DOM manipulations and function codes are here
*/

const score = document.getElementById("score-points");
const play_pause_btn = document.getElementById("ui-board-play");
const play_img = document.getElementById("play-img");
const pause_img = document.getElementById("pause-img");
const settings_window = document.getElementById("ui-settings");
const credits_window = document.getElementById("ui-credits");
const settings_window_menu_option = document.getElementById("ui-menu-option-settings");
const credits_window_menu_option = document.getElementById("ui-menu-option-credits");
const settings_close_btn = document.getElementById("settings-options-close");
const credits_close_btn = document.getElementById("credits-close");
// const settings_option_sound = document.getElementById("settings-options-sound");
const settings_option_grid = document.getElementById("settings-options-grid");
const game_over_screen = document.getElementById("game-over-screen");
const game_over_screen_score = document.getElementById("game-over-score-points");
const game_over_screen_close = document.getElementById("game-over-screen-close");
const game_over_screen_restart = document.getElementById("game-over-screen-restart");
const game_container = document.getElementById("game-container");


// this function will be called each frame
function updateUI() {
    updateScore();
}

function updateScore() {
    score.innerText = Globals.score;
}

function toggleSettingsWindow() {
    settings_window.classList.toggle("hide");
}

function toggleCreditsWindow() {
    credits_window.classList.toggle("hide");
}

function toggleGameOverScreen() {
    game_over_screen.classList.toggle("hide");
}

function updateGameOverScreenScore() {
    game_over_screen_score.innerText = Globals.score;
}

function togglePausePlay() {
    Globals.continueGame = !Globals.continueGame;
    play_img.classList.toggle("hide");
    pause_img.classList.toggle("hide");
}

function pauseGame() {
    Globals.continueGame = false;
    play_img.classList.remove("hide");
    pause_img.classList.add("hide");
}

// handle restarting the game
function restartGame() {
    toggleGameOverScreen();
    resetSnake();
    Globals.score = 0;
    Globals.continueGame = false;
    Globals.gameOver = false;
    play_pause_btn.addEventListener("click", togglePausePlay);
    window.addEventListener("keydown", debounceKeyHandler);
    gameLoop();
}

play_pause_btn.addEventListener("click", togglePausePlay);

settings_window_menu_option.addEventListener("click", () => {
    toggleSettingsWindow();
    pauseGame();
});
settings_close_btn.addEventListener("click", toggleSettingsWindow);

credits_window_menu_option.addEventListener("click", () => {
    toggleCreditsWindow();
    pauseGame();
});
credits_close_btn.addEventListener("click", toggleCreditsWindow);

// settings_option_sound.addEventListener("change", (e) => {
//     Settings.volume = e.target.value;
// });

settings_option_grid.addEventListener("click", (e) => {
    Settings.gridOn = settings_option_grid.checked;
    draw();
});

game_over_screen_close.addEventListener("click", toggleGameOverScreen);

game_over_screen_restart.addEventListener("click", restartGame);