// first variable is a doozy, it will be an ARRAY that contains my questions.

var questions = [
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        options: ["A) <javascript>", "B) <scripted>", "C) <script>", "D) <js>"],
        answer: "<script>"

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

//Set to 0, checking for 0

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

// Need to render the questions to come up.

function render(questionIndex) {
    //Clear it first, empty string

    questionsDiv.innerHTML = "";
    createUl.innerHtml = "";

    //For loop here to search array for information

    for (var i = 0; i < questions.length; i++) {
        //order of information displayed
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].options;
        questionsDiv.textContent = userQuestion;
    }
    
    //For each loop new for each option
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//compare click event

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "creatDiv");
        //conditional for correct
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "wrong, the correct answer is: " + questions[questionsIndex].answer;
        }
    }
    //adds one to the number question that the user is on
    questionIndex++;

    if (questionIndex >= questions.length) {

        allDone();
        createDiv.textContent = "THE END!!" + "your score is " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
