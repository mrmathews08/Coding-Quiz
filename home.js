// first variable is a doozy, it will be an ARRAY that contains my questions.

var questions = [
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        options: ["A) <javascript>", "B) <scripted>", "C) <script>", "D) <js>"],
        answer: "<script>"

    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"

    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is",
        options: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"

    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"

    },
    {
        question: "Javascript and Java are interchangeable terms...",
        options: ["true", "false"],
        answer: "false"

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
    createUl.innerHTML = "";

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
        createDiv.setAttribute("id", "createDiv");
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

//Append last page through allDone
function allDone() {
    questionsDiv.innerHTML = "";
    displayTime.innerHTML = "";

    //Header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);

}
    //label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    //input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    //submit that
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);




//another click event for initials and local storage for score and initials

createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {

        console.log("No value entered!");

    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        // Travels to final page
        window.location.replace("./highscore.html");
    }
});


}
