class YatzyGame {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        this.currentRoll = 0
        this.diceValues = [0, 0, 0, 0, 0];
        this.diceKeep = [false, false, false, false, false];
    }

    rollDice() {
        if (this.currentRoll < 3) {
            for (let i = 0; i < 5; i++) {
                if (!this.diceKeep[i]) {
                    this.diceValues[i] = this.rollDie();
                }
            }
            this.currentRoll++;
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
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = YatzyGame;
} else {
    window.YatzyGame = YatzyGame;
}
