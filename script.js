
// Array de objetos para armazenar as perguntas, opções e a resposta correta.

 const curiosidades = [
    {
        pergunta: "Qual é o planeta mais próximo do Sol?",
        opcoes: ["Vênus", "Marte", "Mercúrio", "Júpiter"],
        correta: "Mercúrio"
    },
    {
        pergunta: "Qual a estrela mais próxima da Terra?",
        opcoes: ["Alpha Centauri", "Sol", "Sirius", "Proxima Centauri"],
        correta: "Sol"
    },
    {
        pergunta: "Quantos planetas anões existem em nosso Sistema Solar?",
        opcoes: ["3", "5", "8", "9"],
        correta: "5"
    },
    {
        pergunta: "Qual o maior planeta do Sistema Solar?",
        opcoes: ["Saturno", "Netuno", "Júpiter", "Urano"],
        correta: "Júpiter"
    },
    {
        pergunta: "Qual o nome da nossa galáxia?",
        opcoes: ["Andrômeda", "Via Láctea", "Triângulo", "Nuvens de Magalhães"],
        correta: "Via Láctea"
    }
];

let indexPerguntaAtual = 0;
let pontuacao = 0;

// Referências aos elementos do DOM
const quizContent = document.getElementById('quiz-content');
const finalScoreContainer = document.getElementById('final-score');
const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const pontuacaoFinalEl = document.getElementById('pontuacao-final');

// Função para carregar uma nova pergunta
function carregarPergunta() {
    if (indexPerguntaAtual < curiosidades.length) {
        const curiosidadeAtual = curiosidades[indexPerguntaAtual];
        questionEl.textContent = curiosidadeAtual.pergunta;
        optionsContainer.innerHTML = '';
        feedbackEl.textContent = '';
        nextBtn.classList.add('hidden');

        curiosidadeAtual.opcoes.forEach(opcao => {
            const button = document.createElement('button');
            button.textContent = opcao;
            button.classList.add('bg-gray-700', 'hover:bg-gray-600', 'text-white', 'font-bold', 'py-3', 'rounded-xl', 'transition-colors');
            button.addEventListener('click', () => verificarResposta(opcao, curiosidadeAtual.correta, button));
            optionsContainer.appendChild(button);
        });
    } else {
        mostrarResultadoFinal();
    }
}

// Função para verificar se a resposta está correta
function verificarResposta(respostaSelecionada, respostaCorreta, botaoClicado) {
    const botoesOpcoes = document.querySelectorAll('#options-container button');
    let isCorrect = respostaSelecionada === respostaCorreta;

    botoesOpcoes.forEach(button => {
        // Desativa os botões para evitar que o usuário clique novamente
        button.disabled = true;
        if (button.textContent === respostaCorreta) {
            button.classList.add('correct-answer');
            button.classList.remove('bg-gray-700', 'hover:bg-gray-600');
        } else if (button.textContent === respostaSelecionada) {
            button.classList.add('incorrect-answer');
            button.classList.remove('bg-gray-700', 'hover:bg-gray-600');
        }
    });

    if (isCorrect) {
        feedbackEl.textContent = "Certo! Resposta correta!";
        feedbackEl.classList.remove('text-red-500');
        feedbackEl.classList.add('text-green-500');
        pontuacao++;
    } else {
        feedbackEl.textContent = "Errado! A resposta correta era: " + respostaCorreta;
        feedbackEl.classList.remove('text-green-500');
        feedbackEl.classList.add('text-red-500');
    }
    
    nextBtn.classList.remove('hidden');
}

// Função para mostrar o resultado final do quiz
function mostrarResultadoFinal() {
    quizContent.classList.add('hidden');
    finalScoreContainer.classList.remove('hidden');
    pontuacaoFinalEl.textContent = `${pontuacao} de ${curiosidades.length}`;
}

// Função para reiniciar o quiz
function reiniciarQuiz() {
    indexPerguntaAtual = 0;
    pontuacao = 0;
    finalScoreContainer.classList.add('hidden');
    quizContent.classList.remove('hidden');
    carregarPergunta();
}

// Event listener para o botão "Próxima Curiosidade"
nextBtn.addEventListener('click', () => {
    indexPerguntaAtual++;
    carregarPergunta();
});

// Event listener para o botão "Reiniciar"
restartBtn.addEventListener('click', reiniciarQuiz);

// Inicia o quiz
carregarPergunta();