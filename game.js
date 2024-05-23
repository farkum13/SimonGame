var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        getSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                getSequence();
              }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Gmae Over, Press Any Key to Restart");

        startOver();
    }
}

function getSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);


    var randomNumber=Math.random();
    randomNumber=randomNumber*3;
    randomNumber=Math.ceil(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var aud= new Audio("sounds/"+randomChosenColour+".mp3");
    aud.play();

}

function playSound(name){
    var aud= new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}



function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
//console.log(gamePattern[0]);







