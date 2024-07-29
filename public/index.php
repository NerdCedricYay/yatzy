<?php
require_once('_config.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yatzy Game</title>
    <script src="/assets/jquery-3.7.1.min.js"></script>
    <style>
        .dice { display: inline-block; width: 50px; height: 50px; margin: 5px; }
        .checked { background-color: yellow; }
        .leaderboard { margin-top: 20px; }
    </style>
</head>
<body>

<div id="game">
    <div id="dice-container">
        <div id="die1" class="dice">--</div>
        <div id="die2" class="dice">--</div>
        <div id="die3" class="dice">--</div>
        <div id="die4" class="dice">--</div>
        <div id="die5" class="dice">--</div>
    </div>
    <button id="roll">Roll</button>
    <div id="current-roll">Current Roll: 0</div>
    <div id="score-container">
        <div class="score-box" data-score="ones">1's</div>
        <div class="score-box" data-score="twos">2's</div>
        <div class="score-box" data-score="threes">3's</div>
        <div class="score-box" data-score="fours">4's</div>
        <div class="score-box" data-score="fives">5's</div>
        <div class="score-box" data-score="sixes">6's</div>
        <div class="score-box" data-score="threeOfAKind">3 of a Kind</div>
        <div class="score-box" data-score="fourOfAKind">4 of a Kind</div>
        <div class="score-box" data-score="fullHouse">Full House</div>
        <div class="score-box" data-score="smallStraight">Small Straight</div>
        <div class="score-box" data-score="largeStraight">Large Straight</div>
        <div class="score-box" data-score="yahtzee">Yahtzee</div>
        <div class="score-box" data-score="chance">Chance</div>
    </div>
    <div id="leaderboard" class="leaderboard">
        <h2>Leaderboard</h2>
        <div id="leaderboard-scores"></div>
    </div>
</div>

<script>
$(document).ready(function() {
    function updateDice(values) {
        for (let i = 0; i < values.length; i++) {
            $(`#die${i + 1}`).text(values[i]);
        }
    }

    function updateLeaderboard(leaderboard) {
        $('#leaderboard-scores').empty();
        leaderboard.forEach((score, index) => {
            $('#leaderboard-scores').append(`<div>${index + 1}. ${score}</div>`);
        });
    }

    $('#roll').on('click', function() {
        $.get('/api.php?action=roll', function(data) {
            if (data.status === 'success') {
                updateDice(data.diceValues);
                $('#current-roll').text(`Current Roll: ${data.currentRoll}`);
            }
        });
    });

    $('.score-box').on('click', function() {
        const scoreBox = $(this).data('score');
        $.get(`/api.php?action=score&scoreBox=${scoreBox}`, function(data) {
            if (data.status === 'success') {
                $(this).addClass('checked');
                // Reset the game state and update the leaderboard
                $.get('/api.php?action=leaderboard', function(leaderboardData) {
                    if (leaderboardData.status === 'success') {
                        updateLeaderboard(leaderboardData.leaderboard);
                    }
                });
            }
        });
    });

    // Initialize leaderboard on page load
    $.get('/api.php?action=leaderboard', function(leaderboardData) {
        if (leaderboardData.status === 'success') {
            updateLeaderboard(leaderboardData.leaderboard);
        }
    });
});
</script>

</body>
</html>
