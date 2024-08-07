/*
*  Nearly all UI related DOM manipulations and function codes are here
*/

const score = document.getElementById("score-points");
const settings_window = document.getElementById("ui-settings");
const credits_window = document.getElementById("ui-credits");
const settings_window_menu_option = document.getElementById("ui-menu-option-settings");
const credits_window_menu_option = document.getElementById("ui-menu-option-credits");
const settings_close_btn = document.getElementById("settings-options-close");
const credits_close_btn = document.getElementById("credits-close");


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

settings_window_menu_option.addEventListener("click", toggleSettingsWindow);
settings_close_btn.addEventListener("click", toggleSettingsWindow);

credits_window_menu_option.addEventListener("click", toggleCreditsWindow);
credits_close_btn.addEventListener("click", toggleCreditsWindow);