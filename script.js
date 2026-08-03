let enteredPasscode = "";
const CORRECT_PASSCODE = "0408";
let audioPlayed = false;

const audio = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const dots = document.querySelectorAll('.dot');
const errorMsg = document.getElementById('error-msg');
const noBtn = document.getElementById('no-btn');

// Start Music on first interaction across the site
document.body.addEventListener('click', () => {
    if (!audioPlayed) {
        audio.play();
        audioPlayed = true;
        musicToggle.classList.remove('hidden');
    }
});

// Play/Pause button logic
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent body click from re-triggering
    if (audio.paused) {
        audio.play();
        musicToggle.innerText = "⏸️ Pause";
    } else {
        audio.pause();
        musicToggle.innerText = "▶️ Play";
    }
});

// Passcode Logic
function addNumber(num) {
    if (enteredPasscode.length < 4) {
        enteredPasscode += num;
        updateDots();
    }
}

function clearPasscode() {
    enteredPasscode = "";
    updateDots();
    errorMsg.style.opacity = 0;
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < enteredPasscode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function checkPasscode() {
    if (enteredPasscode === CORRECT_PASSCODE) {
        errorMsg.style.opacity = 0;
        nextScreen(2);
    } else {
        errorMsg.style.opacity = 1;
        enteredPasscode = "";
        setTimeout(updateDots, 300); // Small delay before clearing dots visually
    }
}

// Navigation between screens
function nextScreen(screenNumber) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Show target screen
    document.getElementById(`screen-${screenNumber}`).classList.add('active');
}

function restart() {
    clearPasscode();
    nextScreen(1);
}

// The Running "NO" Button Logic
function moveNoButton() {
    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calculate random position keeping it within the window
    const randomX = Math.floor(Math.random() * (viewportWidth - btnWidth));
    const randomY = Math.floor(Math.random() * (viewportHeight - btnHeight));
    
    // Switch to fixed positioning so it moves relative to the screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Triggers for running away (Mouse hover & Touch for mobile)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents clicking the button by tapping fast
    moveNoButton();
});
