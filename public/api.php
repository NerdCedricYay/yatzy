<?php
require_once('_config.php');

use Yatzy\Dice;
use Yatzy\YatzyGame;
use Yatzy\YatzyEngine;

if (!isset($_SESSION['yatzyGame'])) {
    $_SESSION['yatzyGame'] = new YatzyGame();
    $_SESSION['yatzyEngine'] = new YatzyEngine();
    $_SESSION['leaderboard'] = [];
}

$game = $_SESSION['yatzyGame'];
$engine = $_SESSION['yatzyEngine'];
$action = $_GET['action'] ?? 'version';

$response = ['status' => 'error', 'message' => 'Unknown action'];

switch ($action) {
    case 'roll':
        $game->rollDice();
        $response = ['status' => 'success', 'diceValues' => $game->diceValues, 'currentRoll' => $game->currentRoll];
        break;
    case 'keep':
        $index = $_GET['index'] ?? -1;
        if ($index >= 0 && $index < 5) {
            $game->toggleKeep($index);
            $response = ['status' => 'success', 'diceKeep' => $game->diceKeep];
        }
        break;
    case 'score':
        $scoreBox = $_GET['scoreBox'] ?? '';
        if ($scoreBox) {
            $score = $engine->scoreTurn($game, $scoreBox);
            $response = ['status' => 'success', 'score' => $score];
            // Reset the game state after scoring
            $_SESSION['yatzyGame'] = new YatzyGame();
        }
        break;
    case 'leaderboard':
        $response = ['status' => 'success', 'leaderboard' => $_SESSION['leaderboard']];
        break;
    case 'addScore':
        $score = $_GET['score'] ?? 0;
        $_SESSION['leaderboard'][] = $score;
        rsort($_SESSION['leaderboard']);
        $_SESSION['leaderboard'] = array_slice($_SESSION['leaderboard'], 0, 10);
        $response = ['status' => 'success', 'leaderboard' => $_SESSION['leaderboard']];
        break;
    case 'version':
    default:
        $response = ['status' => 'success', 'version' => '1.0'];
}

header('Content-Type: application/json');
echo json_encode($response);
