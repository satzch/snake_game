// checks if the device is smartphone by checking userAgent
function isSmartphone() {
    const isSmartphoneUA = /android|iPhone|iPod/.test(navigator.userAgent);
    
    const isTouchDevice = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
    
    return (isTouchDevice && isSmartphoneUA)
}

if (isSmartphone()) {
    
}