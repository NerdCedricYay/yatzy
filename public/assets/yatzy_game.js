class YatzyGame {
    constructor() {
        this.resetGame();
        this.scoreSheet = {};
        this.score = 0;
        this.bonus = 0;
        console.log('Game initialized');
    }

    resetGame() {
        this.currentRoll = 0; 
        this.diceValues = [0, 0, 0, 0, 0]; 
        this.diceKeep = [false, false, false, false, false]; 
        console.log('Game reset');
    }

    rollDice() {
        if (this.currentRoll < 3) {
            for (let i = 0; i < 5; i++) {
                if (!this.diceKeep[i]) {
                    this.diceValues[i] = this.rollDie();
                }
            }
            this.currentRoll++;
            console.log('Dice rolled:', this.diceValues);
        } else {
            console.log("No more rolls left in this turn.");
        }
    }

    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }

    toggleKeep(index) {
        if (index >= 0 && index < 5) {
            this.diceKeep[index] = !this.diceKeep[index];
            console.log(`Die ${index} keep state toggled to ${this.diceKeep[index]}`);
        } else {
            console.log("Invalid die index.");
        }
    }

    getGameState() {
        return {
            currentRoll: this.currentRoll,
            diceValues: [...this.diceValues],
            diceKeep: [...this.diceKeep]
        };
    }

    scoreTurn(scoreBox) {
        const score = YatzyEngine.scoreTurn(this, scoreBox);
        this.scoreSheet[scoreBox] = score;
        YatzyEngine.updateOverallScore(this, this.scoreSheet);
        console.log('Score updated:', this.score, 'Bonus:', this.bonus);
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = YatzyGame;
} else {
    window.YatzyGame = YatzyGame;
}
