const perguntas = [
    {
        pergunta: "Which is larget animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        pergunta: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Shri Lanka", correct: false},
        ]
    },
    {
        pergunta: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        pergunta: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    }  
];

const perguntaElement = document.getElementById("pergunta");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentPerguntaIndex = 0;
let score = 0;

function startQuiz(){
    currentPerguntaIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showPergunta();
}

function showPergunta(){
    resetState();
    let currentPergunta = perguntas[currentPerguntaIndex];
    let perguntaNo = currentPerguntaIndex + 1;
    perguntaElement.innerHTML = perguntaNo + ". " + currentPergunta.pergunta;

    currentPergunta.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    perguntaElement.innerHTML = `You scored ${score} out of ${perguntas.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentPerguntaIndex++;
    if(currentPerguntaIndex < perguntas.length){
        showPergunta();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentPerguntaIndex < perguntas.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();