
const voltImage = document.querySelector("#voltImage img");
const productInfo = document.querySelector("#productInfo");
const slideUpDiv = document.getElementById("slideUp");

let progress = 0;
const maxProgress = 1;

function updateAnimation() {
    const isMobile = window.innerWidth <= 768;

    // Zoom
    const scale = 1 - progress * 0.5;

    // Move right on desktop, up on mobile
    const moveX = isMobile ? 0 : progress * 500;
    const moveY = isMobile ? progress * -360 : progress * -20;

    // Rotate from -20deg to 0deg
    const rotation = 0 + progress * 20;

    voltImage.style.transform = `
        translate(${moveX}px, ${moveY}px)
        rotate(${rotation}deg)
        scale(${scale})
    `;

    // Show product information
    productInfo.classList.toggle("visible", progress >= 0.95);

    // Slide-up effect
    slideUpDiv.classList.toggle("remove", progress >= 0.50);
}

// DESKTOP: Mouse wheel
window.addEventListener("wheel", (event) => {
    event.preventDefault();

    progress += event.deltaY * 0.001;
    progress = Math.max(0, Math.min(maxProgress, progress));


    updateAnimation();
}, { passive: false });


// MOBILE: Touch gestures
let lastTouchY = 0;

window.addEventListener("touchstart", (event) => {
    lastTouchY = event.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", (event) => {
    const currentTouchY = event.touches[0].clientY;
    const deltaY = lastTouchY - currentTouchY;

    progress += deltaY * 0.003;
    progress = Math.max(0, Math.min(maxProgress, progress));

    lastTouchY = currentTouchY;


    updateAnimation();
}, { passive: true });
