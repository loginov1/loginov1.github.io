
document.getElementById('calculateIngredients').addEventListener('click', function() {
    const guests = parseInt(document.getElementById('guestsInput').value);
    calculateIngredients(guests);
});

document.getElementById('startCooking').addEventListener('click', function() {
    startCooking();
    document.getElementById('preCooking').classList.add('hidden');
    document.getElementById('duringCooking').classList.remove('hidden');
});

const baseIngredients = {
    rice: 500, // grams for 4 guests
    meat: 500,
    carrots: 500,
    sheep_tail_fat: 150,
    onions: 200,
    garlic_heads: 1,
    pepper: 1.5
};

function calculateIngredients(guests) {
    const factor = guests / 4;
    let ingredientsHtml = '<h3>Ingredients List</h3>';
    for (const [ingredient, quantity] of Object.entries(baseIngredients)) {
        ingredientsHtml += `<p>${ingredient}: ${Math.round(quantity * factor)}g</p>`;
    }
    document.getElementById('ingredientsList').innerHTML = ingredientsHtml;
}

let cookingTimer;
let startTime;
const cookingStages = [
    { stage: "Add onions and stir", duration: 15 },
    { stage: "Add the carrots", duration: 65 },
    { stage: "Add the rice and don't stir", duration: 70 },
    // Additional stages can be added here
];

function startCooking() {
    startTime = new Date();
    currentStage = 0;
    updateCookingStage();
    updateTimer();
}

function updateCookingStage() {
    if (currentStage < cookingStages.length) {
        const stage = cookingStages[currentStage];
        document.getElementById('currentStep').innerHTML = stage.stage;
        document.getElementById('nextStep').innerHTML = 'Next step at ' + formatTime(cookingStages[currentStage + 1].duration) + ' - ' + cookingStages[currentStage + 1].stage;
        cookingTimer = setTimeout(function() {
            currentStage++;
            updateCookingStage();
        }, stage.duration * 60000); // Convert minutes to milliseconds
    } else {
        document.getElementById('currentStep').innerHTML = '<b>Cooking Completed</b>';
        clearTimeout(cookingTimer);
    }
}

function updateTimer() {
    setInterval(function() {
        const now = new Date();
        const elapsed = new Date(now - startTime);
        const formattedTime = formatTime(elapsed.getUTCHours()) + ':' + formatTime(elapsed.getUTCMinutes()) + ':' + formatTime(elapsed.getUTCSeconds());
        document.getElementById('currentTimer').innerHTML = formattedTime;
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}