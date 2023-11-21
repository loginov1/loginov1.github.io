
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

let cookingTimer;
let startTime;
let currentStageIndex = 0;
const cookingStages = [
    { stage: "Add onions and stir", duration: 1 },
    { stage: "test stage 2", duration: 2 },
    { stage: "test stage 333", duration: 3 },
    { stage: "Add the carrots", duration: 65 },
    { stage: "Add the rice and don't stir", duration: 70 }
];

function startCooking(preCookingDiv, duringCookingDiv) {
    startTime = new Date();
    currentStageIndex = 0;
    preCookingDiv.classList.add('hidden');
    duringCookingDiv.classList.remove('hidden');
    updateCookingStage();
    updateTimer();
}

function updateCookingStage() {
    const currentStepEl = document.getElementById('currentStep');
    const nextStepEl = document.getElementById('nextStep');
    if (currentStageIndex < cookingStages.length) {
        const currentStage = cookingStages[currentStageIndex];
        if (currentStepEl) currentStepEl.innerHTML = currentStage.stage;
        if (nextStepEl && cookingStages[currentStageIndex + 1]) {
            nextStepEl.innerHTML = 'Next step at ' + formatTime(currentStage.duration) + ' - ' + cookingStages[currentStageIndex + 1].stage;
        }
        cookingTimer = setTimeout(function() {
            currentStageIndex++;
            updateCookingStage();
        }, currentStage.duration * 60000); // Convert minutes to milliseconds
    } else {
        if (currentStepEl) currentStepEl.innerHTML = '<b>Cooking Completed</b>';
        clearTimeout(cookingTimer);
    }
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
