document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', handleContinue);
});

async function handleContinue() {
    const username = document.getElementById('username').value.trim();
    const robuxAmount = parseInt(document.getElementById('robux-amount').value, 10);

    if (username && robuxAmount) {
        navigateToStep('step1', 'step2');
        await simulateLoading(username, robuxAmount);
        finishLoading(username, robuxAmount);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

async function simulateLoading(username, robuxAmount) {
    const loadingText = document.getElementById('loading-text');
    const steps = [
        { delay: 2000, message: 'Conectando ao servidor<span class="loading-dots"></span>' },
        { delay: 2000, message: `Validando usuário <span class="highlight">${username}</span><span class="loading-dots"></span>` },
        { delay: 2000, message: 'Gerando strings de verificação SHA-256<span class="loading-dots"></span>' },
        { delay: 2000, message: 'Validando blocos 1-256<span class="loading-dots"></span>' },
        { delay: 2000, message: 'Validando blocos 257-512<span class="loading-dots"></span>' },
        { delay: 2000, message: 'Conectando ao servidor de jogo<span class="loading-dots"></span>' },
        { delay: 2000, message: `Conexão bem-sucedida na porta ${Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024}<span class="loading-dots"></span>` },
        { delay: 2000, message: 'Baixando dados<span class="loading-dots"></span>' },
        { delay: 2000, message: 'Extraindo dados<span class="loading-dots"></span>' },
        { delay: 2000, message: 'Gerando recursos<span class="loading-dots"></span>' },
        { delay: 2000, message: 'Verificando resposta do servidor<span class="loading-dots"></span>' },
        { delay: 2000, message: '100% completo<span class="loading-dots"></span>' },
        { delay: 2000, message: 'Finalizando processo<span class="loading-dots"></span>' }
    ];

    const totalSteps = steps.length;

    for (let i = 0; i < steps.length; i++) {
        const percentage = Math.round(((i + 1) / totalSteps) * 100);
        await displayStep(loadingText, steps[i].message, steps[i].delay, percentage);
    }
}

async function displayStep(element, text, delay, progress) {
    return new Promise(resolve => {
        fadeIn(element, text);
        updateProgressBar(progress);
        setTimeout(resolve, delay);
    });
}

function finishLoading(username, robuxAmount) {
    navigateToStep('step2', 'step3');
    document.getElementById('final-robux-amount').textContent = robuxAmount;
    document.getElementById('verify-username').textContent = username;
}

function updateProgressBar(progress) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
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
