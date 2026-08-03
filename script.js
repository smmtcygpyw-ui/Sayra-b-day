let enteredPasscode = "";
const CORRECT_PASSCODE = "0408";
let audioPlayed = false;

const audio = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const dots = document.querySelectorAll('.dot');
const errorMsg = document.getElementById('error-msg');
const noBtn = document.getElementById('no-btn');

// Start Music on First Click
document.body.addEventListener('click', () => {
    if (!audioPlayed) {
        audio.play().catch(() => {});
        audioPlayed = true;
    }
});

// Play/Pause Music Toggle
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
        audio.play();
        musicToggle.innerText = "🎵 Pause";
    } else {
        audio.pause();
        musicToggle.innerText = "▶️ Play";
    }
});

// Passcode Functions
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
        setTimeout(updateDots, 300);
    }
}

// Navigation Between Screens
function nextScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(`screen-${screenNumber}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restart() {
    clearPasscode();
    nextScreen(1);
}

// Running "NO" Button Logic
function moveNoButton() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    const randomX = Math.floor(Math.random() * (viewportWidth - btnWidth - 40)) + 20;
    const randomY = Math.floor(Math.random() * (viewportHeight - btnHeight - 40)) + 20;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

if (noBtn) {
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

// LIGHTBOX (TAP TO ENLARGE PHOTO) LOGIC
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
