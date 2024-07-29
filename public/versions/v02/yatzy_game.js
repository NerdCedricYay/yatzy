function rollDice() {
    $.get('/api.php?action=roll', function(data) {
        if (data.status === 'success') {
            gameState.diceValues = data.diceValues;
            gameState.currentRoll = data.currentRoll;
            updateUI();
        }
    });
}
