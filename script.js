const perguntas = [
    {
        pergunta: "É um comportamento com responsabilidade com os gastos financeiros:",
        respostas: [
            { text: "Anotar apenas pequenas despesas para você não esquecer.", correct: false},
            { text: "Registrar somente as grandes despesas, pois são mais importantes.", correct: false},
            { text: "Anotar tudo que gasta, independentemente do valor.", correct: true},
            { text: "Realizar gastos sem se preocupar com anotações.", correct: false},
        ]
    },
    {
        pergunta: "Qual é o significado da palavra: *receita*, no contexto da educação financeira",
        respostas: [
            { text: "Forma de como se faz algo, como uma receita de bolo.", correct: false},
            { text: "Lugar onde podemos receber o nosso dinheiro.", correct: false},
            { text: "É determinada como a forma da entrada de recursos financeiros.", correct: true},
            { text: "Jeito certo de como devemos gastar nossas economias.", correct: false},
        ]
    },
    {
        pergunta: "Qual é o significado da palavra: *despesa*:",
        respostas: [
            { text: "É a ação de gastar dinheiro com algo comprado ou consumido.", correct: true},
            { text: "É quando alguém guarda dinheiro.", correct: false},
            { text: "Um tipo de compra realizada pela troca de produtos.", correct: false},
            { text: "A pessoa que compra algum produto.", correct: false},
        ]
    },
    {
        pergunta: "Qual das atitudes abaixo revela segurança para se obter um futuro mais tranquilo?",
        respostas: [
            { text: "Investir sem muito risco.", correct: true},
            { text: "Realizar um empréstimo.", correct: false},
            { text: "Comprar tudo que almeja.", correct: false},
            { text: "Não se preocupar com as dívidas.", correct: false},
        ]
    },
    {
        pergunta: "Para ser financeiramente saudável, é necessário que:",
        respostas: [
            { text: "O pagamento de despesas correntes não seja liquidado.", correct: false},
            { text: "As despesas sejam maiores que as receitas.", correct: false},
            { text: "As receitas sejam maiores que as despesas.", correct: true},
            { text: "Jamais realizar compras no cartão de crédito.", correct: false},
        ]
    },
    {
        pergunta: "Antes de realizar uma determinada compra de um sonho de consumo, você deve inicialmente:",
        respostas: [
            { text: "Ir até à loja mais próxima e comprá-lo assim que conseguir o dinheiro necessário.", correct: false},
            { text: "Realizar um levantamento de preço, juros e condições, para futuramente adquiri-lo.", correct: true},
            { text: "Efetuar um empréstimo pessoal e comprá-lo, antes que acabe na loja mais próxima.", correct: false},
            { text: "Ir rapidamente à loja e comprar no cartão de crédito parcelado com juros.", correct: false},
        ]
    },
    {
        pergunta: "Como é chamado o processo pelo qual as pessoas melhoram a sua compreensão em relação aos conceitos e produtos financeiros, tornando-se mais conscientes das oportunidades e riscos?",
        respostas: [
            { text: "Filosofia financeira.", correct: false},
            { text: "Responsabilidade comportamental.", correct: false},
            { text: "Custos financeiros.", correct: false},
            { text: "Educação financeira", correct: true},
        ]
    },
    {
        pergunta: "Por que é importante realizar economias financeiras?",
        respostas: [
            { text: "Pois é legal", correct: false},
            { text: "Nada, pois economias financeiras são inúteis.", correct: false},
            { text: "Para esconder o dinheiro das pessoas.", correct: false},
            { text: "Porque assegura condições para imprevistos financeiros.", correct: true},
        ]
    },
    {
        pergunta: "Sobre a fábula da Formiga e da Cigarra responda: Por que a atitude da Formiga é considerada responsável?",
        respostas: [
            { text: "Pois ela carrega folhas.", correct: false},
            { text: "Porque ela descansa sempre.", correct: false},
            { text: "Pois ela garantiu estabilidade para o futuro.", correct: true},
            { text: "A atitude da Formiga na verdade, está errada.", correct: false},
        ]
    },
    {
        pergunta: "Ainda sobre a fábula: A atitude da Cigarra pode ser considerada _____:",
        respostas: [
            { text: "prudente.", correct: false},
            { text: "esperta.", correct: false},
            { text: "negligente.", correct: true},
            { text: "sensata.", correct: false},
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
    let botaoHide = document.getElementById("show-btn");
    botaoHide.style.display = "none";
    var elementHide = document.getElementById('hide');
    elementHide.removeAttribute('hide');  
    elementHide.setAttribute("id", "");
    startQuiz();
})



