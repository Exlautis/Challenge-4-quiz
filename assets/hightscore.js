var highscore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// clear highscore
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

//local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
     
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initals + " " + allScores[i].score;
        highscore.appendChild(createLi);
    
    }
}

// Move Back to index Page
goBack.addEventListener("click", function() {
    window.location.replace("./index.html");
});