# Yatzy
This project is a collection of multiple implementations of the game "Yahtzee" written in Javascript with HTML/CSS interface. There are three different versions. Version 1 and 3 can be accessed by going to their respective folders and opening Live Server on test.html. Version 2 can be accessed by the running the php -S localhost:8000 

# Version 1 (Assignment 2)

This is a simple implentation of the Yatzy game with Javascript and HTML, here's what some of the classes do

dice.js manages user interactions with the game interface, updates the display, and handles user inputs related to dice rolling and scoring.

- displayDice(gameState): Updates the UI to show the current dice values and their keep status. Adds event listeners to each die image for toggling its keep status.
- updateRollText(currentRoll): Updates the text displaying the current roll count.
- updateScoreDisplay(score): Updates the score display in the UI.
- checkGameCompletion(): Checks if all score boxes are filled and displays a game over alert if the game is complete.
- handleScoreSubmission(scoreBox): Handles the submission of scores to the selected score box, updates the score display, and resets the game if all score boxes are filled.

Event Listeners listens for clicks on score cells to handle score submission and on the roll dice button to trigger dice rolls and update the display.


yatzy_game.js implements the core game logic, including dice rolling and keeping dice. Manages the state of the game.

- constructor(): Initializes the game state, including dice values, keep status, and score.
- resetGame(): Resets the game to its initial state, including dice values, keep status, and roll count.
- rollDice(): Rolls the dice that are not kept, increments the roll count, and updates dice values.
- rollDie(): Generates a random number between 1 and 6 for a single die roll.
- toggleKeep(index): Toggles the keep status of a die at a given index.
- getGameState(): Returns the current state of the game, including dice values and keep status.
- scoreTurn(scoreBox): Calculates and updates the score based on the selected score box using the YatzyEngine.



YatzyEngine Contains the scoring logic and functions to calculate scores based on Yatzy rules.

- scoreTurn(game, scoreBox): Calculates the score for a given score box based on the current dice values and returns it.
- updateOverallScore(game, scoreSheet): Updates the total score and bonus based on the score sheet.
- countDiceValues(diceValues): Counts occurrences of each die value.
- hasNOfAKind(diceCounts, n): Checks if there are 'n' occurrences of a particular die value.
- isFullHouse(diceCounts): Checks if the dice form a full house.
- isSmallStraight(diceValues): Checks if the dice form a small straight.
- isLargeStraight(diceValues): Checks if the dice form a large straight.
- sumDice(diceValues): Sums up the values of all dice.
- calculateUpperSectionScore(scoreSheet): Calculates the score for the upper section of the score sheet.

Finally, test.html provides the HTML structure for the Yatzy game, including buttons, score display, and dice container.

#rollDiceButton: Button to roll the dice.
#currentRollText: Displays the current roll count.
#diceContainer: Container to display the dice images.
#scoresheet: Grid of score cells for different categories.
#scoreDisplay: Displays the current score.

# Verion 2 (Assignment 3)

This version of the game uses AJAX requests to interact with the server for dice rolling and scoring.

dice.js, yatzy_engine, and yatzy_game maintains their rolls but this time sends AJAC requests to the server and handle the response

rollDice(callback): Sends a GET request to /api.php?action=roll to roll the dice. On a successful response, it invokes the callback function with the dice values received from the server.

_config.php provides configuration settings and autoloading for PHP classes.

index.php handles API requests, performs actions based on query parameters, and interacts with the database.

When the "Roll" button is clicked, an event handler is triggered. The event handler makes an asynchronous HTTP request to api.php?action=roll. The PHP script at api.php processes the request, rolls a die, and returns the result as a JSON response. The JavaScript code receives the JSON response and updates the die1 element with the rolled die value.

This setup allows for dynamic interactions with the server using AJAX, updating the game state and UI without needing a full page reload.

# Verion 3 (Assignment 4)



