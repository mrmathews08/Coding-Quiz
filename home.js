// first variable is a doozy, it will be an ARRAY that contains my questions. This array will be the focal point for most of the application

var questions = [
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        options: ["<javascript>", "<scripted>", "<script>", "<js>"],
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
// I messed around with different names and such, but ended up confusing myself at one point. 


var score = 0;
var questionIndex = 0;
var displayTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");

// These variables are going to be associated with my timer

var timeLeft = 76;

//Starts at this interval
var holdInterval = 0;

//subtracted from timeLeft
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
    
    //For each method, create new li element, insert text, append to appropriate parent, click event to compare
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
//if the user selects the li with answer, then...
    if (element.matches("li")) {
        
        //new variable, make a div, if you chose right, correct message in new div, 
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        //conditional for correct
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
            //if not correct then this happens
        } else {
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "wrong, the correct answer is: " + questions[questionIndex].answer;
        }
    }
    //keeps track of question array moves up in the array to display a new question
    questionIndex++;

    if (questionIndex >= questions.length) {

        //end of array, run this

        allDone();
        createDiv.textContent = "THE END!!" + "your score is " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    //append to parent, right location
    questionsDiv.appendChild(createDiv);

}

//Append last page through allDone
function allDone() {
    questionsDiv.innerHTML = "";
    displayTime.innerHTML = "";

    //Creating the elements on the last page, after the user has chosen a value through the array loop 5 times

    //Header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    //end of questions

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);

}
    //Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    //Input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    //Submit that
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);




//another click event for initials and local storage for score and initials

createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    //input into the console that the user did not enter intitials
    //if they do enter intitials, console log the final and save the initials and score to localStorage
    //

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
