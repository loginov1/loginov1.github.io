
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
    meat: 400,
    carrots: 300
};

let cookingTimer;
let startTime;
const cookingStages = [
    { stage: "Add onions and stir", duration: 15 },
    { stage: "Add the carrots", duration: 65 },
    { stage: "Add the rice and don't stir", duration: 70 }
];

function startCooking(preCookingDiv, duringCookingDiv) {
    startTime = new Date();
    currentStage = 0;
    preCookingDiv.classList.add('hidden');
    duringCookingDiv.classList.remove('hidden');
    updateCookingStage();
    updateTimer();
}

function updateCookingStage() {
    const currentStepEl = document.getElementById('currentStep');
    const nextStepEl = document.getElementById('nextStep');
    if (currentStage < cookingStages.length) {
        const stage = cookingStages[currentStage];
        if (currentStepEl) currentStepEl.innerHTML = stage.stage;
        if (nextStepEl && cookingStages[currentStage + 1]) {
            nextStepEl.innerHTML = 'Next step at ' + formatTime(cookingStages[currentStage + 1].duration) + ' - ' + cookingStages[currentStage + 1].stage;
        }
        cookingTimer = setTimeout(function() {
            currentStage++;
            updateCookingStage();
        }, stage.duration * 60000); // Convert minutes to milliseconds
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
