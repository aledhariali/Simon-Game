var started = false;
var level = 0;
document.querySelector(".start").addEventListener("click", function () {
    if (!started) {
      started = true;
      document.querySelector("h1").innerText = "Level " + level;
      nextSequence();
    }
});
document.addEventListener("keydown", function (Event) {
  var startKey = Event.key;
  if (startKey == "a") {
    if (!started) {
      started = true;
      document.querySelector("h1").innerText = "Level " + level;
      nextSequence();
    }
  }
});
var setColors = ["red", "yellow", "blue", "green"];
var gameSequence = [];
var userSequence = [];
function nextSequence() {
  userSequence = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomGameColor = setColors[randomNumber];
  gameSequence.push(randomGameColor);
  playSound(randomGameColor);
  playAnimation(randomGameColor);
  level++;
  document.querySelector("h1").innerText = "Level " + level;
}
function sequenceCheck(key) {
  if (userSequence[key] == gameSequence[key]) {
    if (userSequence.length == gameSequence.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    setTimeout(() => {
      gameReset();
    }, 3000);
  }
}
var buttons = document.querySelectorAll(".btn");
for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var buttonClick = this.id;
    userSequence.push(buttonClick);
    var userSequenceLastIndex = userSequence.length - 1;
    playSound(buttonClick);
    playAnimation(buttonClick);
    sequenceCheck(userSequenceLastIndex);
  });
}
function playSound(key) {
  switch (key) {
    case "red":
      var redAudio = new Audio("./sounds/red.mp3");
      redAudio.play();
      break;
    case "blue":
      var blueAudio = new Audio("./sounds/blue.mp3");
      blueAudio.play();
      break;
    case "green":
      var greenAudio = new Audio("./sounds/green.mp3");
      greenAudio.play();
      break;
    case "yellow":
      var yellowAudio = new Audio("./sounds/yellow.mp3");
      yellowAudio.play();
      break;
    default: console.log(".");
      break;
  }
}
function playAnimation(key) {
  document.querySelector("#" + key).classList.add("pressed");
  setTimeout(() => {
    document.querySelector("#" + key).classList.remove("pressed");
  }, 100);
}
function gameOver() {
  document.querySelector("h1").innerText = "Game Over";
  document.querySelector("body").classList.add("game-over");
  setTimeout(() => {
    document.querySelector("body").classList.remove("game-over");
  }, 3000);
  var wrong = new Audio("./sounds/wrong.mp3");
  wrong.play();
}
function gameReset() {
  document.querySelector("h1").innerText = "Press A Key to Start";
  started = false;
  level = 0;
  gameSequence = [];
  userSequence = [];
}