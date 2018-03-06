//Setting up the questions and answers array

var questionList = [{
    question: "Who is James Bond's rival in Goldeneye 007?",
    answerList: ["Oddjob", "Alec Trevelyan", "Jaws", "Boris Greshenko"],
    answer: 1
}, {
    question: "Who is the main protagonist in Zelda Ocarina of Time?",
    answerList: ["Zelda", "Mario", "Navi", "Link"],
    answer: 3
}, {
    question: "Who is the main antagonist in Starfox?",
    answerList: ["Sephiroth", "Frieza", "Andross", "Bowser"],
    answer: 2
}, {
    question: "In what game can you fly a hang glider, gyrocopter, and jetpack?",
    answerList: ["Hangtime", "Spyro", "Flying Dragon", "Pilotwings 64"],
    answer: 3
}, {
    question: "What form does the final boss take in Super Smash Brothers 64?",
    answerList: ["Hand", "Hat", "Face", "Spirit"],
    answer: 0
}, {
    question: "In what game does an evil witch attempt to steal the youth and beauty from your younger sister?",
    answerList: ["Majora's Mask", "Banjo-Kazooie", "Conker's Bad Fur Day", "Quest"],
    answer: 1
}, {
    question: "What CIA agent works to stop a terrorist plot while working against an unknwown mole?",
    answerList: ["006", "Ethan Hawk", "James Bond", "Ethan Hunt"],
    answer: 2
}, {
    question: "Who designed Zelda Ocarina of Time?",
    answerList: ["Hideo Kojima", "Shigeru Miyamoto", "Sid Meier", "Will Wright"],
    answer: 1
}, {
    question: "Which is not a racing game on the N64?",
    answerList: ["Driver 64", "Mario Kart 64", "Diddy Kong Racing", "Wave Race 64"],
    answer: 0
}, {
    question: "Which were the first two games released the Nintendo 64??",
    answerList: ["Super Mario 64 & Pilotwings 64", "Super Mario 64 & Mario Kart 64", "Mario Kart 64 & Pilotwings 64", "Super Mario 64 & Wave Racer 64"],
    answer: 0
}];

//Setting up variables

var currentQuestion;
var rightAnswer;
var wrongAnswer;
var userChoice;
var seconds;
var answered;
var notAnswered;
var time;
var seconds;

var messages = {
    right: "Correct!",
    wrong: "Nope.",
    timeOut: "Time is up!",
    done: "Let's see how you did."
}

//making the button start the game
$("#readyBtn").on('click', function () {
    $(this).hide();
    newGame();
});

// setting up the new game function that clears the scoreboard variables and starts the next question function
function newGame() {
    $("#gameover").empty();
    $("#rightAnswers").empty();
    $("#wrongAnswers").empty();
    $("#notAnswered").empty();
    currentQuestion = 0;
    rightAnswer = 0;
    wrongAnswer = 0;
    notanswered = 0;
    nextQuestion();
}

// setting up the next question function that progresses the game and runs through the questions array

function nextQuestion() {
    $("#answerMessage").empty();
    $("#correctAnswer").empty();
    answered = true;


    $(".questions").html(questionList[currentQuestion].question);
    for (var i = 0; i < 4; i++) {
        var choices = $("<div>");
        choices.text(questionList[currentQuestion].answerList[i]);
        choices.attr({
            "data-index": i
        });
        choices.addClass("newClass");
        $(".answers").append(choices);
    }
    //making the timer function start (need to build later)
    timer();
    $(".newClass").on('click', function () {
        userChoice = $(this).data('index');
        clearInterval(time);
        answerDisplay();
    });
}

function timer() {
    seconds = 10;
    $("#timeRemaining").html("Time Remaining: " + seconds);
    answered = true;
    time = setInterval(timeDisplay, 1000);
}

function timeDisplay() {
    seconds--;
    $("#timeRemaining").html("Time Remaining: " + seconds);
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerDisplay();
    }
}

function answerDisplay() {
    $(".newClass").empty();
    $(".questions").empty();

    var rightAnswerMessage = questionList[currentQuestion].answerList[questionList[currentQuestion].answer];
    var rightAnswerIndex = questionList[currentQuestion].answer;

    if ((userChoice == rightAnswerIndex) && (answered == true)) {
        rightAnswer++;
        $("#answerMessage").html(messages.right);
    } else if ((userChoice != rightAnswerIndex) && (answered = true)) {
        wrongAnswer++;
        $("#answerMessage").html(messages.wrong);
        $("#answers").html(rightAnswerMessage);
    } else {
        notAnswered++;
        $("#answerMessage").html(rightAnswerMessage);
        answered = true;
    }
    if(currentQuestion == (questionList.length-1)){
        setTimeout(mainDisplay, 5000)
    } else {
        currentQuestion++;
        setTimeout(nextQuestion, 5000)
    }
}

function mainDispplay(){
    $("#timeRemaining").empty();
    $("#answerMessage").empty();
    $("#correctAnswer").empty();

    $("#gameOver").html(messages.done);
    $("#rightAnswers").html(rightAnswer);
    $("#wrongAnswers").html(wrongAnswer);
    $("#notAnswered").html(notAnswered);

}