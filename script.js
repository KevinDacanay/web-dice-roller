// Random Number Generator:
function rollDice(sides = 20) {
    const roll = Math.floor(Math.random() * sides) + 1;

    document.getElementById('dice-results').innerHTML =
        `<div class="dice-result dice-rolling">${roll}</div>`;
}
