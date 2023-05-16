const perguntas = [
    {
        pergunta: "pergunta........",
        respostas: [
            { text: "A", correct: false},
            { text: "A", correct: true},
            { text: "A", correct: false},
            { text: "A", correct: false},
        ]
    },
    {
        pergunta: "pergunta........",
        respostas: [
            { text: "A", correct: true},
            { text: "A", correct: false},
            { text: "A", correct: false},
            { text: "A", correct: false},
        ]
    },
    {
        pergunta: "pergunta........",
        respostas: [
            { text: "A", correct: false},
            { text: "A", correct: false},
            { text: "A", correct: false},
            { text: "A", correct: true},
        ]
    },
    {
        pergunta: "pergunta........",
        respostas: [
            { text: "A", correct: false},
            { text: "A", correct: true},
            { text: "A", correct: false},
            { text: "A", correct: false},
        ]
    }  
];

const perguntaElement = document.getElementById("pergunta");
const respostaButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let perguntaAtualIndex = 0;
let score = 0;

function startQuiz(){
    perguntaAtualIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo";
    showPergunta();
}

function showPergunta(){
    resetState();

    let perguntaAtual = perguntas[perguntaAtualIndex];
    let perguntaNo = perguntaAtualIndex + 1;
    perguntaElement.innerHTML = perguntaNo + ". " + perguntaAtual.pergunta;

    perguntaAtual.respostas.forEach(resposta => {
        const button = document.createElement("button");
        button.innerHTML = resposta.text;
        button.classList.add("btn");
        respostaButtons.appendChild(button);
        if(resposta.correct){
            button.dataset.correct = resposta.correct;
        }
        button.addEventListener("click", respostaClicada);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(respostaButtons.firstChild){
        respostaButtons.removeChild(respostaButtons.firstChild);
    }
}

function respostaClicada(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(respostaButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    perguntaElement.innerHTML = `Você pontuou ${score} de ${perguntas.length}!`;
    nextButton.innerHTML = "Jogue novamente!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    perguntaAtualIndex++;
    if(perguntaAtualIndex < perguntas.length){
        showPergunta();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(perguntaAtualIndex < perguntas.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

document.getElementById("show-btn").addEventListener("click", function() {
    var elementHide = document.getElementById('hide');
    elementHide.removeAttribute('hide');  
    elementHide.setAttribute("id", "");
    startQuiz();
})



