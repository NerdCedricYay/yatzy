function displayDice(gameState) {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = ''; 
    gameState.diceValues.forEach((result, index) => {
        const dieElement = document.createElement('div');
        dieElement.className = 'die';
        dieElement.textContent = result;
        dieElement.addEventListener('click', () => {
            game.toggleKeep(index);
            dieElement.classList.toggle('kept');
        });
        if (gameState.diceKeep[index]) {
            dieElement.classList.add('kept');
        }
        diceContainer.appendChild(dieElement);
    });
}

document.getElementById('rollDiceButton').addEventListener('click', () => {
    game.rollDice();
    displayDice(game.getGameState());
});

const game = new YatzyGame();
