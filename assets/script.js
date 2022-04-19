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
var questions = document.querySelector("#questions");
var wrapper = document.querySelector("#wrapper");

//timer section
var secondsLeft = 75;
//interval time
var holdInterval = 0;
// penalty time
var penalty = 10;

var ulCreate = document.createElement("ul");

// start timer
timer.addEventListener("clicl", function() {

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
    questions.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoice = questions[questionIndex].choices;
        questions.textContent = userQuestion;
    }
    // new for each question choice
    userChoice.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questions.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// compare coices with answers
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        
        var create = document.createElement("div");
        create.setAttribute("id", "create");
        //correction condition
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            create.textContent = "Correct! The answer is " + questions[questionIndex].answer;

        } else {
            // deduct 10 seconds
            secondsLeft = secondsLeft - penalty;
            create.textContent = "Wrong! The correct answer is " + questions[questionIndex].answer;
        }
    }
    // determine question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        //append last page with stats
        allDone();
        create.textContent = "End Of Quiz!" + " " + "You got " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questions.appendChild(create);
}

function alldone() {
    questions.innerHTML = "";
    currentTime.innerHTML = "";

    //heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All done!"

    questions.appendChild(createH1);

    // paragraph
    var createPara = document.createElement("p");
    createPara.setAttribute("id", "createPara");

    questions.appendChild(createPara);

    // caculate time reaming and add it to highscore
    if (secondsLeft >= 0 ) {
        var timeRemaning = secondsLeft;
        var createPara2 = document.createElement("p");
        clearInterval(holdInterval);
        createPara.textContent = "Your final score is " + timeRemaning;

        questions.appendChild(createPara2);
    }

    // label
    var createLable = document.createElement("label");
    createLable.setAttribute("id", "createLabel");
    createLable.textContent = "Enter Your initials ";

    questions.appendChild(createLable);

    //input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questions.appendChild(createInput);

    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    questions.appendChild(createSubmit);

    //capture initals in localstorage
    var initials = createInput.value;

    if (initials === null) {
        
        console.log("no value entered!");

    } else {
        var finalScore = {
            initials: initials,
            score: timeRemaning
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
}