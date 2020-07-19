// first variable is a doozy, it will be an ARRAY that contains my questions.

var questions = [
    {
        question: "",
        options: "",
        answer: ""

    },
    {
        question: "",
        options: "",
        answer: ""

    },
    {
        question: "",
        options: "",
        answer: ""

    },
    {
        question: "",
        options: "",
        answer: ""

    },
    {
        question: "",
        options: "",
        answer: ""

    },


];

// Declare some variables here, use the querySelector to target correct elements.


var score = 0;
var questionIndex = 0;

var wrapper = document.querySelector("#wrapper");
var displayTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv");

// These variables are going to be associated with my timer

var timeLeft = 76;

var holdInterval = 0;

var penalty = 10;

var createUl = document.querySelector("ul");

//Timer button

timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeLeft--;
            displayTime.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                displayTime.textContent = "Time is up!";
            }

        }, 1000);
    }
    render(questionIndex);
});


