<?php

require_once '_config.php';

use Yatzy\Dice;
use Yatzy\YatzyGame;
use Yatzy\YatzyEngine;

// Test autoloading
$dice = new Dice();
$yatzyGame = new YatzyGame();
$yatzyEngine = new YatzyEngine();

// Test YatzyGame
echo "<h2>Testing YatzyGame</h2>";

// Roll the dice and display their values
echo "<h3>Initial Roll</h3>";
$yatzyGame->rollDice();
echo "Dice Values: " . implode(', ', $yatzyGame->diceValues) . "<br>";

// Toggle keeping some dice and roll again
$yatzyGame->toggleKeep(0); // Toggle keeping the first dice
$yatzyGame->rollDice();
echo "<h3>After 2nd Roll</h3>";
echo "Dice Values: " . implode(', ', $yatzyGame->diceValues) . "<br>";

// Test YatzyEngine
echo "<h2>Testing YatzyEngine</h2>";

// Test scoring for ones
echo "<h3>Scoring Ones</h3>";
$scoreOnes = $yatzyEngine->scoreTurn($yatzyGame, 'ones');
echo "Score for Ones: {$scoreOnes}<br>";

// Test scoring for full house
echo "<h3>Scoring Full House</h3>";
$yatzyGame->diceValues = [1, 1, 2, 2, 2]; // Simulate dice values for full house
$scoreFullHouse = $yatzyEngine->scoreTurn($yatzyGame, 'fullHouse');
echo "Score for Full House: {$scoreFullHouse}<br>";

// Completion Message
echo "<p>Tests completed successfully!</p>";
