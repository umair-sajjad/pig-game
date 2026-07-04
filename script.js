"use strict";

const score0El = document.getElementById("score--0");
const currentScore0El = document.getElementById("current--0");
const score1El = document.getElementById("score--1");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const rollBtn = document.querySelector(".btn--roll");
const target = 100;

let scores, currentScore, activePlayer, playing, dice;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add("hidden");
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  activePlayer = activePlayer === 1 ? 0 : 1;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

rollBtn.addEventListener("click", function () {
  if (playing === true) {
    dice = Math.trunc(Math.random() * 6) + 1;

    if (diceEl.classList.contains("hidden")) diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    currentScore = currentScore + dice;
    if (dice === 1) {
      switchPlayer();
    }
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
});

holdBtn.addEventListener("click", function () {
  if (playing === true) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= target) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      playing = false;
      return;
    }
    switchPlayer();
  }
});

newBtn.addEventListener("click", init);
