class YatzyGame {
    constructor() {
        this.resetRolls();
        console.log('Game initialized');
        this.scoreSheet = {};
        this.score = 0;
        this.bonus = 0;
    }

    resetRolls() {
        this.currentRoll = 0; 
        this.diceValues = [0, 0, 0, 0, 0]; 
        this.diceKeep = [false, false, false, false, false]; 
        console.log('Game reset');
    }

    resetGame() {
        this.resetRolls();
        console.log('Game initialized');
        this.scoreSheet = {};
        this.score = 0;
        this.bonus = 0;
    
        // Reset the score boxes
        const scoreCells = document.querySelectorAll('#scoresheet div[data-score]');
        scoreCells.forEach(cell => {
            cell.textContent = '';  // Clear any text
            cell.classList.remove('scored');  // Remove the scored class
        });
    
        // Reset the display elements
        document.getElementById('scoreDisplay').textContent = 'Score: 0';
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
