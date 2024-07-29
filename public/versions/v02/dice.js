function rollDice(callback) {
    $.get('/api.php?action=roll', function(data) {
        if (data.status === 'success') {
            callback(data.diceValues);
        }
    });
}
