function scoreTurn(game, scoreBox) {
    const diceValues = game.diceValues;
    const diceCounts = countDiceValues(diceValues);

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
        case 'threeOfAKind':
            return hasNOfAKind(diceCounts, 3) ? sumDice(diceValues) : 0;
        case 'fourOfAKind':
            return hasNOfAKind(diceCounts, 4) ? sumDice(diceValues) : 0;
        case 'fullHouse':
            return isFullHouse(diceCounts) ? 25 : 0;
        case 'smallStraight':
            return isSmallStraight(diceValues) ? 30 : 0;
        case 'largeStraight':
            return isLargeStraight(diceValues) ? 40 : 0;
        case 'yahtzee':
            return hasNOfAKind(diceCounts, 5) ? 50 : 0;
        case 'chance':
            return sumDice(diceValues);
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

function countDiceValues(diceValues) {
    const counts = Array(6).fill(0);
    diceValues.forEach(value => {
        counts[value - 1]++;
    });
    return counts;
}

function hasNOfAKind(diceCounts, n) {
    return diceCounts.some(count => count >= n);
}

function isFullHouse(diceCounts) {
    return diceCounts.includes(3) && diceCounts.includes(2);
}

function isSmallStraight(diceValues) {
    const sortedValues = [...new Set(diceValues)].sort();
    const straights = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6]
    ];
    return straights.some(straight => straight.every(value => sortedValues.includes(value)));
}

function isLargeStraight(diceValues) {
    const sortedValues = [...new Set(diceValues)].sort();
    const largeStraights = [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6]
    ];
    return largeStraights.some(straight => straight.every(value => sortedValues.includes(value)));
}

function sumDice(diceValues) {
    return diceValues.reduce((acc, value) => acc + value, 0);
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
