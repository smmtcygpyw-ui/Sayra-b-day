let inputCode = "";
const correctCode = "0408";
let audioPlayed = false;
let bgMusic = document.getElementById("bgMusic");

// Play music on first interaction (Browser requirement)
function startAudio() {
    if (!audioPlayed) {
        bgMusic.play();
        audioPlayed = true;
    }
}

// Toggle Music Button
function toggleMusic() {
    let btn = document.getElementById("musicToggle");
    if (bgMusic.paused) {
        bgMusic.play();
        btn.innerHTML = "🎵 Pause";
    } else {
        bgMusic.pause();
        btn.innerHTML = "🎵 Play";
    }
}

// Passcode Logic
function pressKey(num) {
    startAudio(); // Ensures music starts as soon as they touch the keypad
    
    let errorMsg = document.getElementById("error-msg");
    errorMsg.classList.add("hidden");

    if (inputCode.length < 4) {
        inputCode += num;
        updateDots();
    }

    if (inputCode.length === 4) {
        setTimeout(checkCode, 300);
    }
}

function updateDots() {
    for (let i = 1; i <= 4; i++) {
        let dot = document.getElementById("dot" + i);
        if (i <= inputCode.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }
    }
}

function checkCode() {
    if (inputCode === correctCode) {
        nextScreen(2);
    } else {
        document.getElementById("error-msg").classList.remove("hidden");
        inputCode = "";
        updateDots();
    }
}

// Change Screens
function nextScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('screen' + screenNumber).classList.add('active');
}

// Runaway "NO" Button
function moveButton() {
    let btn = document.getElementById("noBtn");
    
    // Calculates a random position within the container bounds
    let container = document.querySelector("#screen2 .content-box");
    let maxX = container.clientWidth - btn.clientWidth - 20;
    let maxY = container.clientHeight - btn.clientHeight - 20;
    
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    btn.style.position = "absolute";
    btn.style.left = randomX + "px";
    btn.style.top = randomY + "px";
}
