let listaLimiteNumero = [];
let limite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    }
}

function mensagemInicial () {
    exibirTextoNaTela ('h1', 'Jogo Do Número Secreto!');
    exibirTextoNaTela ('p', `Escolha um número de 1 a ${limite}!`);    
}

mensagemInicial()

function verificarChute () {
   let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'ACERTOU!!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa'
        exibirTextoNaTela ('p', `Parabéns!! Você acertou o Número Secreto com ${tentativas} ${palavraTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else if (chute > numeroSecreto) {
        exibirTextoNaTela ('p', `O Número Secreto é menor que ${chute}`);
    } else {
        exibirTextoNaTela ('p', `O Número Secreto é maior que ${chute}`);
    }
        tentativas++
        limparCampo ();
}


function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let quantidadeDeNumeros = listaLimiteNumero.length;

        if (quantidadeDeNumeros == limite) {
            listaLimiteNumero = [];
        }

        if (listaLimiteNumero.includes(numeroEscolhido)) {
            return gerarNumeroAleatorio ();
        } else {
            listaLimiteNumero.push (numeroEscolhido)
            return numeroEscolhido;
        }
}

function verificarReinicio () {
    numeroSecreto = gerarNumeroAleatorio ();
    limparCampo ();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    mensagemInicial ();
    tentativas = 1
}
