//Declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//Clear click event, clear the high scores
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//gets the value 'allscores' from local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

//puts the initials and high scores from local storage and inputs them in the new Li element
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

goBack.addEventListener("click", function () {
    window.location.replace("home.html");
});