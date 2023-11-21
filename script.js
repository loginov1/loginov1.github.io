
document.addEventListener('DOMContentLoaded', function() {
    const calculateIngredientsBtn = document.getElementById('calculateIngredients');
    const startCookingBtn = document.getElementById('startCooking');
    const guestsInput = document.getElementById('guestsInput');
    const ingredientsList = document.getElementById('ingredientsList');
    const preCookingDiv = document.getElementById('preCooking');
    const duringCookingDiv = document.getElementById('duringCooking');

    if (calculateIngredientsBtn && guestsInput && ingredientsList) {
        calculateIngredientsBtn.addEventListener('click', function() {
            const guests = parseInt(guestsInput.value);
            calculateIngredients(guests, ingredientsList);
        });
    }

    if (startCookingBtn && preCookingDiv && duringCookingDiv) {
        startCookingBtn.addEventListener('click', function() {
            startCooking(preCookingDiv, duringCookingDiv);
        });
    }
});

function calculateIngredients(guests, ingredientsList) {
    const factor = guests / 4;
    let ingredientsHtml = '<h3>Ingredients List</h3>';
    for (const [ingredient, quantity] of Object.entries(baseIngredients)) {
        ingredientsHtml += `<p>${ingredient}: ${Math.round(quantity * factor)}g</p>`;
    }
    ingredientsList.innerHTML = ingredientsHtml;
}

const baseIngredients = {
    rice: 500, // grams for 4 guests
    meat: 500,
    carrots: 500,
    sheep_tail_fat: 150,
    onions: 200,
    garlic_heads: 1,
    pepper: 1.5
};

    let cookingTimer, countdownTimer;
    let startTime, lastStageTime;
    let currentStageIndex = 0;
    const cookingStages = [
        { stage: "Stage 1", duration: 1 },
        { stage: "Stage 2", duration: 2 },
        { stage: "Stage 3", duration: 3 },
        { stage: "Stage 4", duration: 4 },
        { stage: "Add the rice and don't stir", duration: 10 }
    ];

    function startCooking(preCookingDiv, duringCookingDiv) {
        startTime = new Date();
        lastStageTime = new Date(); // Initial stage time
        currentStageIndex = 0;
        preCookingDiv.classList.add('hidden');
        duringCookingDiv.classList.remove('hidden');
        updateCookingStage();
        updateTimer();
    }

    function updateCookingStage() {
        const previousStepEl = document.getElementById('previousStep');
        const currentStepEl = document.getElementById('currentStep');
        const nextStepEl = document.getElementById('nextStep');

        if (currentStageIndex < cookingStages.length) {
            const currentStage = cookingStages[currentStageIndex];

            if (currentStepEl) currentStepEl.innerHTML = currentStage.stage;
            if (previousStepEl && currentStageIndex > 0) {
                const prevStageTime = convertToCET(lastStageTime);
                previousStepEl.innerHTML = prevStageTime + ' - ' + cookingStages[currentStageIndex - 1].stage;
            }

            if (nextStepEl && cookingStages[currentStageIndex + 1]) {
                updateNextStageCountdown(cookingStages[currentStageIndex + 1], nextStepEl);
            }

            lastStageTime = new Date();
            cookingTimer = setTimeout(function() {
                currentStageIndex++;
                updateCookingStage();
            }, currentStage.duration * 60000);
        } else {
            if (currentStepEl) currentStepEl.innerHTML = '<b>Cooking Completed</b>';
            clearTimeout(cookingTimer);
            clearInterval(countdownTimer);
        }
    }
    function updateNextStageCountdown(nextStage, nextStepEl) {
        if (countdownTimer) clearInterval(countdownTimer);
        countdownTimer = setInterval(function() {
            const now = new Date();
            const timeLeft = (nextStage.duration * 60000) - (now - lastStageTime);
            if (timeLeft > 0) {
                const minutesLeft = Math.ceil(timeLeft / 60000);
                nextStepEl.innerHTML = nextStage.stage + ' in ' + minutesLeft + ' minutes';
            }
        }, 60000);
    }

    function convertToCET(date) {
        const cetOffset = 1; // CET is UTC+1
        const cetDate = new Date(date.getTime() + cetOffset * 3600 * 1000);
        return cetDate.toISOString().split('T')[1].split('.')[0];
    }

function updateTimer() {
    setInterval(function() {
        const now = new Date();
        const elapsed = new Date(now - startTime);
        const formattedTime = formatTime(elapsed.getUTCHours()) + ':' + formatTime(elapsed.getUTCMinutes()) + ':' + formatTime(elapsed.getUTCSeconds());
        const currentTimerEl = document.getElementById('currentTimer');
        if (currentTimerEl) currentTimerEl.innerHTML = formattedTime;
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
