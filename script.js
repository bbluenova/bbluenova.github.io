// ===============================
// GET ELEMENTS
// ===============================

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");

const message = document.getElementById("message");

const attemptsText = document.getElementById("attempts");
const scoreText = document.getElementById("score");

const restartBtn = document.getElementById("restartBtn");


// ===============================
// GAME VARIABLES
// ===============================

let randomNumber;
let attempts;
let score;
let gameOver;


// ===============================
// START GAME
// ===============================

function startGame() {

    randomNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;

    score = 100;

    gameOver = false;

    attemptsText.innerText = attempts;

    scoreText.innerText = score;

    message.innerText = "Start guessing! 😎";

    guessInput.value = "";

    guessInput.disabled = false;

    guessBtn.disabled = false;

}

startGame();


// ===============================
// CHECK ANSWER
// ===============================

guessBtn.addEventListener("click", function () {

    if (gameOver) {
        return;
    }

    let userGuess = Number(guessInput.value);

    if (userGuess < 1 || userGuess > 100 || !userGuess) {

        message.innerText =
            "⚠️ Enter a number between 1 and 100";

        return;
    }

    attempts++;

    attemptsText.innerText = attempts;

    // Correct Answer
    if (userGuess === randomNumber) {

        message.innerText =
            "🎉 Amazing! You guessed it! Number was " +
            randomNumber;

        gameOver = true;

        guessInput.disabled = true;

        guessBtn.disabled = true;

        return;
    }

    // Wrong Answer

    score -= 10;

    if (score < 0) {
        score = 0;
    }

    scoreText.innerText = score;

    if (userGuess > randomNumber) {

        message.innerText =
            "🔽 Too high! Try a smaller number";

    } else {

        message.innerText =
            "🔼 Too low! Try a bigger number";

    }

    // ===============================
    // HINT SYSTEM
    // ===============================

    if (attempts === 3) {

        message.innerText +=
            " 💡 Hint: Number is " +
            (randomNumber % 2 === 0 ? "Even" : "Odd");

    }

    if (attempts === 5) {

        if (randomNumber <= 50) {

            message.innerText +=
                " 💡 Hint: Number is between 1-50";

        } else {

            message.innerText +=
                " 💡 Hint: Number is between 51-100";

        }

    }

    if (attempts === 7) {

        message.innerText +=
            " 💡 Hint: You are getting close 😉";

    }

    // ===============================
    // MAX 10 ATTEMPTS
    // ===============================

    if (attempts >= 10) {

        message.innerText =
            "😢 Game Over! The number was " +
            randomNumber +
            ". Press Play Again 🔄";

        gameOver = true;

        guessInput.disabled = true;

        guessBtn.disabled = true;

    }

});


// ===============================
// PLAY AGAIN
// ===============================

restartBtn.addEventListener("click", function () {

    startGame();

});


// ===============================
// PWA - SERVICE WORKER
// ===============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {
                console.log("✅ Service Worker Registered");
            })
            .catch((error) => {
                console.log("❌ Service Worker Error:", error);
            });

    });

}