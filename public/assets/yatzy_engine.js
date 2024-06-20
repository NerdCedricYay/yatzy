// yatzy_engine.js

function scoreTurn(game, scoreBox) {
    const diceValues = game.diceValues;
    switch (scoreBox) {
        case 'ones':
            return diceValues.filter(value => value === 1).length * 1;
        case 'twos':
            return diceValues.filter(value => value === 2).length * 2;
        case 'threes':
            return diceValues.filter(value => value === 3).length * 3;
        case 'fours':
            return diceValues.filter(value => value === 4).length * 4;
        case 'fives':
            return diceValues.filter(value => value === 5).length * 5;
        case 'sixes':
            return diceValues.filter(value => value === 6).length * 6;
        default:
            console.log('Invalid score box');
            return 0;
    }
}

function updateOverallScore(game, scoreSheet) {
    const upperSectionScore = calculateUpperSectionScore(scoreSheet);
    const bonus = upperSectionScore >= 63 ? 35 : 0;

    const totalScore = Object.values(scoreSheet).reduce((acc, score) => acc + (score || 0), 0);
    game.score = totalScore + bonus;
    game.bonus = bonus;
}

function calculateUpperSectionScore(scoreSheet) {
    const upperSectionBoxes = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    return upperSectionBoxes.reduce((acc, box) => acc + (scoreSheet[box] || 0), 0);
}

const YatzyEngine = { scoreTurn, updateOverallScore };

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = YatzyEngine;
} else {
    window.YatzyEngine = YatzyEngine;
}
