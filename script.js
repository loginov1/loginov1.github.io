
document.getElementById('calculateIngredients').addEventListener('click', function() {
    const guests = parseInt(document.getElementById('guestsInput').value);
    calculateIngredients(guests);
});

document.getElementById('startCooking').addEventListener('click', function() {
    startCooking();
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
let currentStage = 0;
const cookingStages = [
    { stage: "Heat Kazan", duration: 5, instruction: "Set fire to medium", nextAction: "Add oil" },
    { stage: "Add Oil", duration: 2, instruction: "Add 200ml of oil", nextAction: "Add meat" },
    { stage: "Add Meat", duration: 10, instruction: "Add the meat and fry", nextAction: "Add carrots" },
    // Additional stages can be added here
];

function startCooking() {
    currentStage = 0;
    updateCookingStage();
}

function updateCookingStage() {
    if (currentStage < cookingStages.length) {
        const stage = cookingStages[currentStage];
        document.getElementById('currentStage').innerHTML = '<b>Current Stage:</b> ' + stage.stage;
        document.getElementById('fireIntensity').innerHTML = '<b>Instructions:</b> ' + stage.instruction;
        cookingTimer = setTimeout(function() {
            alert('Time for the next step: ' + stage.nextAction);
            currentStage++;
            updateCookingStage();
        }, stage.duration * 60000); // Convert minutes to milliseconds
    } else {
        document.getElementById('currentStage').innerHTML = '<b>Cooking Completed</b>';
        clearTimeout(cookingTimer);
    }
}
