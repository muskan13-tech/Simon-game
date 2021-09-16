// alert("warning");

var btnColors = ["red" , "blue" , "green" , "yellow"];
var gmPtrn = [];

var userClickedPtn = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSeq();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");

    userClickedPtn.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPtn.length-1);
});

function checkAnswer(curLevel){
    if(gmPtrn[curLevel] === userClickedPtn[curLevel]){
        if(userClickedPtn.length === gmPtrn.length){
            setTimeout(function(){
                nextSeq();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over😥, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSeq(){
    userClickedPtn = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomChooseColor = btnColors[randomNum];

    gmPtrn.push(randomChooseColor);

    $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChooseColor);
}

function animatePress(curColor){
    $("#" + curColor).addClass("pressed");
    setTimeout(function(){
        $("#" + curColor).removeClass("pressed");
    } , 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gmPtrn = [];
    started = false;
}