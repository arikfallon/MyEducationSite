document.addEventListener('DOMContentLoaded', function () {
    mostrarConteudo('minicontos');
});

function mostrarConteudo(id) {
    const secoes = document.querySelectorAll('.conteudo');
    secoes.forEach(secao => secao.style.display = 'none');

    const alvo = document.getElementById(id);
    if (alvo) alvo.style.display = 'block';

    if (id === 'quiz') {
        iniciarQuiz();
    }
}

// --- Array de questões do quiz ---
const questoes = [
    { textoBase: "Minicontos", enunciado: "Quantos caracteres geralmente possui um miniconto?", alternativas: ["Até 150", "Até 300", "Até 600", "Até 1000"], correta: 2 },
    { textoBase: "Microcontos", enunciado: "O microconto tem impacto imediato e emoção concentrada. Qual seu tamanho máximo?", alternativas: ["50 caracteres", "150 caracteres", "300 caracteres", "600 caracteres"], correta: 1 },
    { textoBase: "Nanocontos", enunciado: "O nanoconto é extremamente curto. Geralmente possui:", alternativas: ["1 frase", "1-2 frases", "3-5 frases", "10 frases"], correta: 1 },
    { textoBase: "Próclise", enunciado: "O pronome vem antes do verbo. Exemplo correto?", alternativas: ["Não me diga isso!", "Conte-me a história", "Dar-me-ia uma chance", "Disse-me adeus"], correta: 0 },
    { textoBase: "Ênclise", enunciado: "O pronome vem depois do verbo em qual caso?", alternativas: ["Infinitivo ou futuro", "Passado simples", "Presente do indicativo", "Imperativo afirmativo"], correta: 0 },
    { textoBase: "Mesóclise", enunciado: "O pronome aparece no meio do verbo. Exemplo correto?", alternativas: ["Dar-me-ia uma chance", "Não me diga nada", "Conte-me a história", "Disse-me adeus"], correta: 0 },
    { textoBase: "Minicontos", enunciado: "Qual característica NÃO é típica de um miniconto?", alternativas: ["Personagens", "Clímax", "Narrativa completa", "Extensão longa"], correta: 3 },
    { textoBase: "Microcontos", enunciado: "Qual frase é exemplo de microconto?", alternativas: ["Ela abriu a carta e chorou.", "O mundo mudou sem aviso.", "Dar-me-ia uma chance.", "Não me diga nada!"], correta: 1 },
    { textoBase: "Nanocontos", enunciado: "O nanoconto provoca:", alternativas: ["História longa", "Reflexão imediata", "Muitas personagens", "Clímax complexo"], correta: 1 },
    { textoBase: "Próclise", enunciado: "Quando há palavra atrativa, o pronome vem:", alternativas: ["Antes do verbo", "Depois do verbo", "No meio do verbo", "Não aparece"], correta: 0 },
    { textoBase: "Ênclise", enunciado: "Qual é um exemplo de ênclise?", alternativas: ["Conte-me a história", "Não me diga", "Dar-me-ia uma chance", "Ele se sentiu feliz"], correta: 0 },
    { textoBase: "Mesóclise", enunciado: "A mesóclise ocorre:", alternativas: ["No futuro do presente ou do pretérito", "No passado simples", "No presente do indicativo", "No imperativo"], correta: 0 },
    { textoBase: "Minicontos", enunciado: "O que diferencia miniconto de microconto?", alternativas: ["Número de personagens", "Extensão em caracteres", "Uso de pronomes", "Narrativa fechada"], correta: 1 },
    { textoBase: "Microcontos", enunciado: "Microcontos normalmente causam:", alternativas: ["Longa reflexão", "Impacto imediato", "Clímax complexo", "Narrativa extensa"], correta: 1 },
    { textoBase: "Nanocontos", enunciado: "Nanocontos podem ser comparados a:", alternativas: ["Aforismos", "Romances curtos", "Contos longos", "Novelas"], correta: 0 },
    { textoBase: "Próclise", enunciado: "Escolha a frase com próclise correta:", alternativas: ["Não me conte nada.", "Conte-me a história.", "Dar-me-ia uma chance.", "Ele me disse adeus."], correta: 0 },
    { textoBase: "Ênclise", enunciado: "Escolha o exemplo de ênclise:", alternativas: ["Conte-me a história.", "Não me diga nada!", "Dar-me-ia uma chance.", "Disse-me adeus."], correta: 3 },
    { textoBase: "Mesóclise", enunciado: "Mesóclise é usada geralmente em:", alternativas: ["Futuro do presente e do pretérito", "Presente simples", "Passado composto", "Imperativo"], correta: 0 },
    { textoBase: "Minicontos", enunciado: "Um miniconto deve ter:", alternativas: ["Narrativa completa", "Apenas uma frase", "Sem clímax", "Muitas páginas"], correta: 0 },
    { textoBase: "Microcontos", enunciado: "O microconto se caracteriza por:", alternativas: ["Impacto imediato", "Desenvolvimento extenso", "Vários personagens", "Longo clímax"], correta: 0 }
];

let questoesSelecionadas = [];
let acertos = 0;
let respondidas = 0;

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function iniciarQuiz() {
    acertos = 0;
    respondidas = 0;
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
    document.getElementById("resultado-final").textContent = "";
    document.getElementById("progresso").style.width = "0%";

    // Seleciona 4 questões aleatórias
    questoesSelecionadas = embaralhar([...questoes]).slice(0, 4);

    questoesSelecionadas.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("pergunta");
        div.dataset.respondida = "0";

        if (q.textoBase) {
            const base = document.createElement("p");
            base.innerHTML = `<i>${q.textoBase}</i>`;
            div.appendChild(base);
        }

        const p = document.createElement("p");
        p.innerHTML = `<b>${index + 1}.</b> ${q.enunciado}`;
        div.appendChild(p);

        q.alternativas.forEach((alt, i) => {
            const btn = document.createElement("button");
            btn.textContent = alt;
            btn.onclick = () => verificarResposta(btn, i === q.correta, div, q.correta);
            div.appendChild(btn);
        });

        quizContainer.appendChild(div);
    });
}

function verificarResposta(botao, correto, perguntaDiv, corretaIndex) {
    if (perguntaDiv.dataset.respondida === "1") return;

    const botoes = perguntaDiv.querySelectorAll("button");
    botoes.forEach(b => b.disabled = true);

    if (correto) {
        botao.classList.add("correto");
        acertos++;
    } else {
        botao.classList.add("errado");
        botoes[corretaIndex].classList.add("correto");
    }

    perguntaDiv.dataset.respondida = "1";
    respondidas++;
    document.getElementById("progresso").style.width = `${(respondidas / questoesSelecionadas.length) * 100}%`;
}

function finalizarQuiz() {
    const total = questoesSelecionadas.length;
    const resultado = document.getElementById("resultado-final");
    resultado.textContent = `Você acertou ${acertos} de ${total} perguntas.`;
}

function refazerQuiz() {
    iniciarQuiz();
}
