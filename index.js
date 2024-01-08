function nextNumber() {
    return Math.floor(Math.random() * 10);
}
var val=true;
var level = 1;
var click=new Audio("sounds/click.wav");
var bgsound= new Audio("sounds/bg.mp3");
bgsound.loop=true;

function question(level) {
    var qtiles = [];
    var i = 0;

    var intervalId = setInterval(function () {
        if (i < level) {
            var n = nextNumber();
            
            $("#" + n).fadeIn(100).fadeOut(100).fadeIn(100);
            qtiles.push(n);
            i++;
        } else {
            clearInterval(intervalId);
        }
    }, 1000);

    return qtiles;
}

function collectAns(level) {
    var i = 0;
    var levelAns = [];

    $(".tile").click(function () {
        if (i < level) {
            var l = $(this).attr("id");
            $("#" + l).fadeIn(100).fadeOut(100).fadeIn(100);
            // click.play();
            levelAns.push(l);
            i++;
        }
    });

    return levelAns;
}

function checkAnswer(level) {
    if (level > 10) {
        return;
    }

    var ques = question(level);
    var collectedAnswers = collectAns(level);

    setTimeout(function () {
        for (var i = 0; i < level; i++) {
            if (ques[i] != collectedAnswers[i]) {
                console.log("Incorrect Answer");
                console.log("Collected Answers:", collectedAnswers);
                console.log("Expected Answers:", ques);
                var wrong= new Audio("sounds/wrong.mp3");
                wrong.play();

                $("body").addClass("wrong");

                setTimeout(function(){
                    $("body").removeClass("wrong");

                },200);
                bgsound.pause();

                $("header p").text("Game Over, Press Any Key to Restart");
                return;
            }
        }
        level = level + 1;
        $("header p").text("Correct Answer");
        click.play();
        $("header p").text("Level: " + level);
        checkAnswer(level);
    }, level * 2000 + 1000); 
}


$(document).keypress(function(){
    if(val){
        $("header p").text("Level "+level);
        
        bgsound.play();
    
        checkAnswer(level);
        val=false;
    }
    
});


