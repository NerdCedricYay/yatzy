function calculateScore(scoreType, callback) {
    $.get(`/api.php?action=score&scoreBox=${scoreType}`, function(data) {
        if (data.status === 'success') {
            callback(data.score);
        }
    });
}
