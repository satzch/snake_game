
// checks if device is touch device
function isTouchDevice() {
    const touch = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
    
    return touch;
}

// checks if the device is smartphone by checking userAgent
function isSmartphone() {
    const isSmartphoneUA = /android|Android|iPhone|iPod|iPad/.test(navigator.userAgent);
    
    return (isTouchDevice() && isSmartphoneUA)
}

// required dom elements for smartphone controls
const rotate_screen = document.getElementById("rotate-smartphone");
const dpad = document.getElementById("ui-controls-dpad");
const ui_keyboard_instructions = document.getElementById("ui-controls-box");

// checks if device is smartphone
// shows and hides dpad controls
function toggleSmartphoneMode() {
    if (isSmartphone()) {
        rotate_screen.classList.remove("hide");
        dpad.classList.remove("hide");
        ui_keyboard_instructions.classList.add("hide");
        // add event listeners to dpad if device is smartphone
        // otherwise it will be hidden anyways
        addDpadListeners();
    } else {
        rotate_screen.classList.add("hide");
        dpad.classList.add("hide");
        ui_keyboard_instructions.classList.remove("hide");
    }
}

// call once initially when the site is loaded
toggleSmartphoneMode();

// check if user is using some kind of emulator for different devices
// and toggle the smartphone mode
window.addEventListener("resize", () => {
    toggleSmartphoneMode();
})

// Add event listeners to the dpad controls that will show in smartphones
function addDpadListeners() {
    const dpad_up = document.getElementById("dpad-up");
    const dpad_down = document.getElementById("dpad-down");
    const dpad_left = document.getElementById("dpad-left");
    const dpad_right = document.getElementById("dpad-right");

    dpad_up.addEventListener("click", () => {
        // pass fake event obj to already implemented eventHandler to reduce redundancy
        debounceKeyHandler({key: "ArrowUp"});
    });
    dpad_down.addEventListener("click", () => {
        // pass fake event obj to already implemented eventHandler to reduce redundancy
        debounceKeyHandler({key: "ArrowDown"});
    });
    dpad_left.addEventListener("click", () => {
        // pass fake event obj to already implemented eventHandler to reduce redundancy
        debounceKeyHandler({key: "ArrowLeft"});
    });
    dpad_right.addEventListener("click", () => {
        // pass fake event obj to already implemented eventHandler to reduce redundancy
        debounceKeyHandler({key: "ArrowRight"});
    });
}