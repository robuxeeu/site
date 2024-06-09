document.addEventListener('DOMContentLoaded', function () {
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', handleContinue);
});

function handleContinue() {
    const username = document.getElementById('username').value.trim();
    const robuxAmount = parseInt(document.getElementById('robux-amount').value, 10);

    if (username && robuxAmount) {
        navigateToStep('step1', 'step2');
        simulateLoading(username, robuxAmount);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function simulateLoading(username, robuxAmount) {
    const loadingText = document.getElementById('loading-text');
    const robuxCountElement = document.getElementById('final-robux-amount');
    const loader = document.querySelector('.loader');
    const progressBar = document.getElementById('progress-bar');

    const randomPort = Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024;

    const steps = [
        { delay: 2000, message: `Conectando ao servidor<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Validando usuário <span class="highlight">${username}</span><span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Gerando strings de verificação SHA-256<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Validando blocos 1-256<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Validando blocos 257-512<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Conectando ao servidor de jogo<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Conexão bem-sucedida na porta ${randomPort}<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Baixando dados<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Extraindo dados<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Gerando recursos<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Verificando resposta do servidor<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `100% completo<span id="loading-dots" class="loading-dots"></span>` },
        { delay: 2000, message: `Finalizando processo<span id="loading-dots" class="loading-dots"></span>` }
    ];

    let totalTime = 0;

    steps.forEach((step, index) => {
        setTimeout(() => {
            fadeIn(loadingText, step.message);
            if (index === steps.length - 1) {
                robuxCountElement.innerHTML = `<span class="highlight">${robuxAmount} Robux</span>`;
                scheduleFinalTimer(2000);
            }
            updateProgressBar((index + 1) / steps.length);
        }, totalTime);
        totalTime += step.delay;
    });
}

function scheduleFinalTimer(delay) {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.style.display = 'none';
        navigateToStep('step2', 'step3');
        document.getElementById('final-robux-amount').textContent = document.getElementById('robux-amount').value;
        document.getElementById('verify-username').textContent = document.getElementById('username').value;
    }, delay);
}

function updateProgressBar(progress) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress * 100}%`;
}

function navigateToStep(currentStepId, nextStepId) {
    const currentStep = document.getElementById(currentStepId);
    const nextStep = document.getElementById(nextStepId);

    currentStep.classList.add('hidden');
    setTimeout(() => {
        nextStep.classList.remove('hidden');
    }, 550);
}

function fadeIn(element, text) {
    element.innerHTML = text;
    element.style.transition = 'opacity 0.5s ease-in-out';
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 50);
}
