document.addEventListener('DOMContentLoaded', () => {
    const game = new YatzyGame();
    console.log('YatzyGame instance created');

    function displayDice(gameState) {
        const diceContainer = document.getElementById('diceContainer');
        diceContainer.innerHTML = '';
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

    function resetScoreBoxes() {
        const scoreCells = document.querySelectorAll('#scoresheet div[data-score]');
        scoreCells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('scored');
        });
    }

    function checkGameCompletion() {
        const scoreCells = document.querySelectorAll('#scoresheet div[data-score]');
        const allScored = Array.from(scoreCells).every(cell => cell.classList.contains('scored'));
        if (allScored) {
            const scoreDisplay = document.getElementById('scoreDisplay');
            alert(`Game Over! Your final score is: ${game.score}`);
            
            // Prompt the user for their name and submit the score
            const playerName = prompt('Enter your name:');
            if (playerName) {
                fetch('api.php?action=submit_score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        player_name: playerName,
                        score: game.score
                    })
                }).then(response => response.json())
                  .then(data => {
                      if (data.status === 'success') {
                          console.log('Score submitted successfully');
                      } else {
                          console.error('Error submitting score:', data.message);
                      }
                  });
            }
    
            // Reset the game state
            game.resetGame();
            displayDice(game.getGameState()); // Ensure the dice are reset
            updateRollText(game.currentRoll); // Reset roll text
            updateScoreDisplay(game.score); // Reset score display
        }
    }
    
    function handleScoreSubmission(scoreBox) {
        if (game.scoreSheet[scoreBox] === undefined) {
            game.scoreTurn(scoreBox);
            updateScoreDisplay(game.score);
            const scoreCell = document.querySelector(`[data-score="${scoreBox}"]`);
            scoreCell.textContent = game.scoreSheet[scoreBox];
            scoreCell.classList.add('scored');
            game.resetRolls(); // Only reset rolls and dice values here
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
