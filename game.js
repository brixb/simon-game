// Array with colours
var buttonColours = ["red", "blue", "green", "yellow"];

//Used to store the randomChosenColour
var gamePattern = [];

//Used to store which id is clicked via userChosenColour
var userClickedPattern = [];

//To keep in track if game has started or not
var started = false;

//Start at level 0
var level = 0;

//If a key has been pressed, start the game. Make started = true.
$(document).keypress(function() {
    if (!started) {
  
      // The h1 title starts out saying "Press A Key to Start", when the game has started, this will now be "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

//Used jquery to check if a button is clicked. When clicked, trigger a function
$(".btn").click(function() {

    //will check which id is clicked, and store it inside userChosenColour
    var userChosenColour = $(this).attr("id");

    //add userChosenColour inside userClickedPattern via push
    userClickedPattern.push(userChosenColour);

    //triggers the sound within the specified colour
    playSound(userChosenColour);

    //plays an animation when user clicks button
    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

  //checks if the most recent user answer is the same as the game pattern.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //Call startOver() if the user gets the sequence wrong
    startOver();
  }

}

//Generate a random number from 0-3, will be used to select arrays
function nextSequence() {

  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];

    //increase level by 1 everytime nextSequence is called
    level++; 

    //Update the h1 to match the level
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    //push into the empty array
    gamePattern.push(randomChosenColour);

    //used jquery to select the button with the same id as the randomChosenColour. Ex. #red > selects the id called "red" inside html
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //triggers the sound within the specified colour
    playSound(randomChosenColour);

}


function playSound(name) {

    //uses the parameter to select the name of the sound to be played
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


function animatePress(currentColor) {

    //Adding pressed class to the button that gets clicked inside animatePress()
    $("#" + currentColor).addClass("pressed");

    //sets a timer on how long the animation will be
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function startOver() {

  //resets the whole level
  level = 0
  gamePattern = [];
  started = false;
}