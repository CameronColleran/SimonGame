var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

// Next sequence function
function nextSequence() {

  userClickedPattern = [];
  // Changing h1
  $("h1").text("Level " + level);
  level++;

  // Creating random number from 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Getting cooresponding color of random number
  var randomChosenColor = buttonColors[randomNumber];
  // Adding color to game pattern array
  gamePattern.push(randomChosenColor);

  // Selecting cooresponding button with jquery and making it "flash"
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Playing cooresponding audio
  playSound(randomChosenColor);

}

// Button click listener
$("div .btn").click(function() {
  // Find out which color was clicked
  userChosenColor = this.id;
  // Add color to clicked pattern array
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  // Playing audio when user clicks a button
  playSound(userChosenColor);

  // Animating buttonColors
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Play audio function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.volume = 0.1;
  audio.play();
}

// Animate button pressed function
function animatePress(currentColor) {
  // Adding pressed class for 100 ms
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Starting the game
var hasGameStarted = false;
$(document).keydown(function() {

  if (!hasGameStarted) {
    hasGameStarted = true;
    nextSequence();
  }
});

// Check answer function
function checkAnswer(currentLevel) {
  // If user clicked correctly
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    // If the user finished the entire sequence, call nextSequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  // Else user clicked incorrectly
  else {
    console.log("wrong");
    // Play the "wrong" sound
    playSound("wrong");
    // Animate body of website with flash affect for 200 ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Change h1
    $("h1").text("Game Over, Press Any Key to Restart");
    // Indirectly restart the game by resetting vars, especially "hasGameStarted"
    startOver();
  }
}

// Start over function
function startOver() {
  level = 1;
  gamePattern = [];
  hasGameStarted = false;
}
