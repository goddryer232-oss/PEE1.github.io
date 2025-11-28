const giftBox = document.getElementById("giftBox");
const balloonArea = document.getElementById("balloons");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
const message = document.getElementById("gradMessage"); // เพิ่มตัวนี้

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiPieces = [];
let alreadyOpened = false; // ป้องกันคลิกซ้ำ

giftBox.addEventListener("click", () => {
    if (alreadyOpened) return; // ป้องกันคลิกซ้ำ
    alreadyOpened = true;

    // เล่นเพลง
    const sound = document.getElementById("gradSound");
    sound.currentTime = 0;
    sound.play();

    giftBox.classList.add("shake");

    setTimeout(() => {
        giftBox.classList.remove("shake");
        giftBox.classList.add("open");

        releaseBalloons();
        releaseCaps();
        launchConfetti();

        if (message) message.style.opacity = "1";

        setTimeout(() => {
            window.location.href = "nextpage.html";
        }, 5000);

    }, 400);
});

function releaseBalloons() {
    const colors = ["#000", "#d4a017"];
    for (let i = 0; i < 18; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        const size = Math.random() * 18 + 28;
        balloon.style.width = size + "px";
        balloon.style.height = size * 1.4 + "px";
        balloon.style.left = Math.random() * 160 + "px";
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (Math.random() * 1.5 + 2.5) + "s";
        balloonArea.appendChild(balloon);
        setTimeout(() => balloon.remove(), 4500);
    }
}

function releaseCaps() {
    for (let i = 0; i < 5; i++) {
        const cap = document.createElement("div");
        cap.classList.add("cap");
        cap.innerHTML = "🎓";
        cap.style.left = Math.random() * 160 + "px";
        cap.style.fontSize = (Math.random() * 10 + 28) + "px";
        cap.style.animationDuration = (Math.random() * 1.8 + 2.2) + "s";
        balloonArea.appendChild(cap);
        setTimeout(() => cap.remove(), 4500);
    }
}

function launchConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2 + 40,
            size: Math.random() * 8 + 4,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5 + 2,
            color: ["#ffd700", "#ffea8a", "#c9a100"][Math.floor(Math.random() * 3)]
        });
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed + 1;
        p.angle += 0.02;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    if (confettiPieces.some(p => p.y < window.innerHeight)) {
        requestAnimationFrame(animateConfetti);
    }
}
