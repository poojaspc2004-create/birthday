/* =========================================
   SCREEN NAVIGATION
========================================= */

let currentScreen = 1;

const totalScreens = 8;

function nextScreen() {

    if (currentScreen >= totalScreens) {
        return;
    }

    document
        .getElementById(`screen${currentScreen}`)
        .classList.remove("active");

    currentScreen++;

    document
        .getElementById(`screen${currentScreen}`)
        .classList.add("active");

    window.scrollTo(0, 0);

    if (currentScreen === 2) {
        startHeartGame();
    }

    if (currentScreen === 4) {
        startTyping();
    }
}


/* =========================================
   HEART GAME
========================================= */

let score = 0;

const heartGame =
    document.getElementById("heartGame");

const catchHeart =
    document.getElementById("catchHeart");

const scoreElement =
    document.getElementById("score");

const gameMessage =
    document.getElementById("gameMessage");


function startHeartGame() {

    score = 0;

    scoreElement.textContent = score;

    moveHeart();

    gameMessage.textContent =
        "Let's see if you can catch it... 😌";
}


function moveHeart() {

    if (!heartGame) return;

    const maxX =
        heartGame.clientWidth - 65;

    const maxY =
        heartGame.clientHeight - 65;

    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;

    catchHeart.style.left =
        randomX + "px";

    catchHeart.style.top =
        randomY + "px";
}


catchHeart.addEventListener(
    "click",
    function () {

        score++;

        scoreElement.textContent =
            score;

        catchHeart.style.transform =
            "scale(0.7)";

        setTimeout(() => {

            catchHeart.style.transform =
                "scale(1)";

        }, 150);

        const messages = [

            "You caught me! ❤️",

            "Okayyy, you're good at this 😌",

            "Halfway there! 💕",

            "Almost there... 👀",

            "You found my heart. 🥹❤️"

        ];

        gameMessage.textContent =
            messages[score - 1];

        if (score >= 5) {

            launchConfetti();

            setTimeout(() => {

                nextScreen();

            }, 1000);

        } else {

            moveHeart();
        }
    }
);


/* =========================================
   GIFT
========================================= */

function openGift() {

    const box =
        document.querySelector(".gift-box");

    const message =
        document.getElementById("giftMessage");

    const button =
        document.getElementById("giftNext");

    box.classList.add("open");

    message.classList.remove("hidden");

    launchConfetti(80);

    setTimeout(() => {

    button.classList.remove("hidden");

}, 1200);
}


/* =========================================
   PERSONAL MESSAGE
========================================= */

const messages = [

    "There is something I don't say enough... ❤️",

    "I'm really grateful that you're in my life.",

    "You make ordinary days feel a little more special.",

    "And today, I just want you to know how much you mean to me. 🥹❤️"

];

let messageIndex = 0;


function startTyping() {

    messageIndex = 0;

    typeMessage(messages[messageIndex]);
}


function typeMessage(text) {

    const element =
        document.getElementById("typingMessage");

    element.textContent = "";

    let index = 0;

    const interval =
        setInterval(() => {

            element.textContent +=
                text[index];

            index++;

            if (index >= text.length) {

                clearInterval(interval);
            }

        }, 35);
}


function nextMessage() {

    messageIndex++;

    if (messageIndex < messages.length) {

        typeMessage(
            messages[messageIndex]
        );

    } else {

        nextScreen();
    }
}


/* =========================================
   QUIZ
========================================= */

function quizAnswer(button) {

    const result =
        document.getElementById("quizResult");

    result.textContent =
        "Correct answer: Everything. Obviously. 😂❤️";

    button.style.background =
        "#ffdce8";

    launchConfetti(40);

    setTimeout(() => {

        nextScreen();

    }, 1200);
}


/* =========================================
   CANDLE
========================================= */

function blowCandle() {

    const flame =
        document.getElementById("flame");

    flame.style.display =
        "none";

    launchConfetti(160);

    setTimeout(() => {

        nextScreen();

    }, 1500);
}


/* =========================================
   CONFETTI
========================================= */

function launchConfetti(
    amount = 120
) {

    confetti({

        particleCount: amount,

        spread: 100,

        startVelocity: 35,

        origin: {
            y: 0.65
        }

    });
}


/* =========================================
   FLOATING HEARTS
========================================= */

function createFloatingHeart() {

    const heart =
        document.createElement("div");

    heart.textContent =
        ["❤️", "💗", "💕", "💖", "💓"][
            Math.floor(
                Math.random() * 5
            )
        ];

    heart.style.position =
        "fixed";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom =
        "-30px";

    heart.style.fontSize =
        15 + Math.random() * 20 + "px";

    heart.style.opacity =
        "0.5";

    heart.style.pointerEvents =
        "none";

    heart.style.zIndex =
        "1";

    const duration =
        5 + Math.random() * 5;

    heart.style.transition =
        `transform ${duration}s linear,
         opacity ${duration}s linear`;

    document.body.appendChild(heart);

    requestAnimationFrame(() => {

        heart.style.transform =
            `translateY(-110vh)
             rotate(360deg)`;

        heart.style.opacity =
            "0";
    });

    setTimeout(() => {

        heart.remove();

    }, duration * 1000);
}


setInterval(
    createFloatingHeart,
    900
);

/* =========================================
   FLOATING LOVE BUBBLES
========================================= */

function createLoveBubble() {

    const bubble =
        document.createElement("div");

    bubble.className =
        "love-bubble";

    bubble.innerHTML =
        Math.random() > 0.5
            ? "♡"
            : "✦";

    bubble.style.left =
        Math.random() * 100 + "vw";

    bubble.style.fontSize =
        10 + Math.random() * 16 + "px";

    bubble.style.animationDuration =
        5 + Math.random() * 5 + "s";

    document.body.appendChild(bubble);

    setTimeout(() => {

        bubble.remove();

    }, 10000);
}


setInterval(
    createLoveBubble,
    700
);

/* =========================================
   FINAL SURPRISE
========================================= */

function finalSurprise() {

    const secret = document.getElementById("finalSecret");

    secret.classList.add("show");

    launchConfetti(220);

    // Create lots of floating hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 120);
    }

    // Extra celebration after the message appears
    setTimeout(() => {
        launchConfetti(120);
    }, 1200);

    setTimeout(() => {
        launchConfetti(120);
    }, 2400);
}