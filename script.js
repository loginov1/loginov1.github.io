
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
    red_pepper: 1.5
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
