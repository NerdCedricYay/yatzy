document.addEventListener('DOMContentLoaded', () => {
    // Ensure the game instance is created after the DOM is fully loaded
    const game = new YatzyGame();
    console.log('YatzyGame instance created');

    function displayDice(gameState) {
        const diceContainer = document.getElementById('diceContainer');
        diceContainer.innerHTML = '';  // Clear previous results
        gameState.diceValues.forEach((result, index) => {
            const dieElement = document.createElement('img');
            dieElement.className = 'die';
            dieElement.src = `../../docs/dice/dice_${result}.png`;
            dieElement.alt = `Die showing ${result}`;
            dieElement.addEventListener('click', () => {
                game.toggleKeep(index);
                dieElement.classList.toggle('kept');
            });
            if (gameState.diceKeep[index]) {
                dieElement.classList.add('kept');
            }
            diceContainer.appendChild(dieElement);
        });
        console.log('Dice displayed:', gameState.diceValues);
    }

    function updateRollText(currentRoll) {
        const rollText = document.getElementById('currentRollText');
        rollText.textContent = `Current Roll: ${currentRoll}`;
    }

    function updateScoreDisplay(score) {
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function checkGameCompletion() {
        const scoreCells = document.querySelectorAll('#scoresheet div[data-score]');
        const allScored = Array.from(scoreCells).every(cell => cell.classList.contains('scored'));
        if (allScored) {
            const scoreDisplay = document.getElementById('scoreDisplay');
            scoreDisplay.style.backgroundColor = 'yellow';
            alert(`Game Over! Your final score is: ${game.score}`);
        }
    }

    function handleScoreSubmission(scoreBox) {
        if (game.scoreSheet[scoreBox] === undefined) {
            game.scoreTurn(scoreBox);
            updateScoreDisplay(game.score);
            const scoreCell = document.querySelector(`[data-score="${scoreBox}"]`);
            scoreCell.textContent = game.scoreSheet[scoreBox];
            scoreCell.classList.add('scored');
            game.resetGame();
            displayDice(game.getGameState());
            updateRollText(game.currentRoll);
            checkGameCompletion(); 
        }
    }

    document.querySelectorAll('#scoresheet div[data-score]').forEach(cell => {
        cell.addEventListener('click', () => {
            const scoreBox = cell.getAttribute('data-score');
            handleScoreSubmission(scoreBox);
        });
    });

    document.getElementById('rollDiceButton').addEventListener('click', () => {
        game.rollDice();
        displayDice(game.getGameState());
        updateRollText(game.currentRoll);
        console.log('Roll Dice button clicked');
    });

    updateRollText(game.currentRoll);
    updateScoreDisplay(game.score);
});
