
// checks if the device is smartphone by checking userAgent
function isSmartphone() {
    const isSmartphoneUA = /android|Android|iPhone|iPod|iPad/.test(navigator.userAgent);
    
    const isTouchDevice = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
    
    return (isTouchDevice && isSmartphoneUA)
}


const rotate_screen = document.getElementById("rotate-smartphone");
const dpad = document.getElementById("ui-controls-dpad");
const ui_keyboard_instructions = document.getElementById("ui-controls-box");

function toggleSmartphoneMode() {
    if (isSmartphone()) {
        rotate_screen.classList.remove("hide");
        dpad.classList.remove("hide");
        ui_keyboard_instructions.classList.add("hide");
    } else {
        rotate_screen.classList.add("hide");
        dpad.classList.add("hide");
        ui_keyboard_instructions.classList.remove("hide");
    }
    addDpadListeners();
}

toggleSmartphoneMode();

window.addEventListener("resize", () => {
    toggleSmartphoneMode();
})


function addDpadListeners() {
    const dpad_up = document.getElementById("dpad-up");
    const dpad_down = document.getElementById("dpad-down");
    const dpad_left = document.getElementById("dpad-left");
    const dpad_right = document.getElementById("dpad-right");

    dpad_up.addEventListener("click", () => {
        debounceKeyHandler({key: "ArrowUp"});
    });
    dpad_down.addEventListener("click", () => {
        debounceKeyHandler({key: "ArrowDown"});
    });
    dpad_left.addEventListener("click", () => {
        debounceKeyHandler({key: "ArrowLeft"});
    });
    dpad_right.addEventListener("click", () => {
        debounceKeyHandler({key: "ArrowRight"});
    });
}