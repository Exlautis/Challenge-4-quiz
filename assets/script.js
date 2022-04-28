// Array of questions
var questions = [
{
    title: "Commonly used data types DO NOT include?:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{
    title: "The condition in an if / else statment is enclosed with? ",
    choices: ["quotes", "curly brackets", "curly fries", "paraentheses"],
    answer: "parentheses"
},
{
    title: "Arrays in Javascript can be used to store?",
    choices: ["number of strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
},
{
    title: "String values mus be enclosed witin ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "a cage"],
    answer: "quotes"
},
{
    title: "A very useful tool used in development and debugging",
    choices: ["javascript", "terminal", "google", "console log"],
    answer: "console log"
},

];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionDiv");
var wrapper = document.querySelector("#wrapper");

//timer section
var secondsLeft = 75;
//interval time
var holdInterval = 0;
// penalty time
var penalty = 10;

var ulCreate = document.createElement("ul");

// start timer
timer.addEventListener("click", function() {

    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's Up!";
            }
        }, 1000); 
    }
    render(questionIndex);
});

// render questions
function render(questionIndex) {
    // clear data
        questionsDiv.innerHTML = "";
        ulCreate.innerHTML = "";
       
        for (var i = 0; i < questions.length; i++) {
            var userQuestion = questions[questionIndex].title;
            var userChoices = questions[questionIndex].choices;
            questionsDiv.textContent = userQuestion;
        }
    // new for each question
        userChoices.forEach(function (newItem) {
            var listItem = document.createElement("li");
            listItem.textContent = newItem;
            questionsDiv.appendChild(ulCreate);
            ulCreate.appendChild(listItem);
            listItem.addEventListener("click", (compare));
        })
}
// compare choices with answers
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
// correct condition
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "CORRECT! The answer is:  " + questions[questionIndex].answer;
            
        } else {
// will deduct 10 secs per wrong answer
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "WRONG! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
// determine what question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
// Append last page with stats
        allDone();
        createDiv.textContent = "End of quiz" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionDiv.appendChild(createDiv);

}

function allDone() {
    questionDiv.innerHTML = "";
    currentTime.innerHTML = "";

    //heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "ALL DONE!"

    questionDiv.appendChild(createH1);

    // paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionDiv.appendChild(createP);

    // calculates time remaining and adds it to highscore
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "YOUR FINAL SCORE IS: " + timeRemaining;

        questionDiv.appendChild(createP2);
    }

    // label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "ENTER YOUR INITIALS: ";

    questionDiv.appendChild(createLabel);

    //input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionDiv.appendChild(createInput);

    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionDiv.appendChild(createSubmit);

    //capture initals in localstorage
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

            // goes to the final page
            window.location.replace("./highscore.html");
        }
    });
    

}