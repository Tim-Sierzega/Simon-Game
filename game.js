let colors = ['red', 'blue', 'green', 'yellow'];
let userClickedPattern = [];
let gamePattern = [];
let level = 1;
let started = false;

$(document).keypress(function(){
    if(!started) {
        $('h1').text('Level '+ level);
        nextSequence();
        started = true;
        }
    })

$(".btn").click(function userChosenColor(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {
        $('body').addClass("game-over");
        setTimeout(function () {
          $('body').removeClass("game-over");
        }, 200);
        let wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}


function nextSequence(){
    userClickedPattern = [];
    $('h1').text('Level '+ level);
    level++;
    let randomNumber = Math.floor(Math.random() * 4)
    let randomColorChosen = colors[randomNumber]
    gamePattern.push(randomColorChosen)
    $("." + randomColorChosen).animate({opacity:'-4'}, function(){
        $(this).animate({opacity:'1'})
        playSound(randomColorChosen);
    })  
}


function playSound(name) {
    let audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}


function animatePress(currentColor) {
    $(this).addClass("pressed");
    setTimeout(function () {
      $(this).removeClass("pressed");
    }, 100);
  }

function startOver(){
    level=1;
    gamePattern = [];
    started = false;
}
  

// $("." + randomColorChosen).fadeIn()



