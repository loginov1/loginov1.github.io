
document.getElementById('calculateIngredients').addEventListener('click', function() {
    const guests = parseInt(document.getElementById('guestsInput').value);
    calculateIngredients(guests);
});

document.getElementById('startCooking').addEventListener('click', function() {
    startCooking();
});

const baseIngredients = {
    rice: 500, // grams for 4 guests
    meat: 400,
    carrots: 300
};

function calculateIngredients(guests) {
    const factor = guests / 4;
    let ingredientsHtml = '<h3>Ingredients List</h3>';
    for (const [ingredient, quantity] of Object.entries(baseIngredients)) {
        ingredientsHtml += `<p>${ingredient}: ${Math.round(quantity * factor)}g</p>`;
    }
    document.getElementById('ingredientsList').innerHTML = ingredientsHtml;
}

// Placeholder for the cooking stages and timer logic
function startCooking() {
    // TODO: Implement timer and cooking instructions logic
}
