// Variables
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// questions 
const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
        
    },
]

// Quizz replacement for the first question
function init() {
    console.log("Iniciou")
    // create first question
    createQuestion(0);
}

// create one question
function createQuestion(i) {

    //clear previous question
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function (btn) {
        btn.remove();
    });

    // change question text
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //put the alternatives
    questions[i].answers.forEach(function (answer, i) {

        // create the quiz button template
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //remove hide and template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // insert alternative on screen
        answersBox.appendChild(answerTemplate);


        answerTemplate.addEventListener("click", function () {
            checkAnswer(this)
        });
    });

    // question number
    actualQuestion++;
}

//checking user response
function checkAnswer(btn) {
    // select all buttons
    const buttons = answersBox.querySelectorAll("button");

    // checking if answer is correct and adds class to the button
    buttons.forEach(function (button) {

        if (button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            //check if the user got the question right
            if (btn === button) {
                // points increment
                points++;
            }

        } else {
            button.classList.add("wrong-answer");
        }

    });

    // show next question
    nextQuestion();

}

//display the next question in the quiz
function nextQuestion() {

    // timer for the user to see the answers
    setTimeout(function () {

        // check if there are still questions
        if (actualQuestion >= questions.length) {
            //displays success message
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion)

    }, 1000)

}

// display the end screen
function showSuccessMessage() {

    hideOrShowQuizz();

    // exchange success screen data

    // calculate score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // change the number of correct questions
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    //change total questions
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;

}

// show or hide the score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");

}

// restart quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function(){

    // clear the game
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

});



// starting quizz 
init()


