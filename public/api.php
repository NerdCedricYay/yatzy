<?php
require_once('_config.php');

use Yatzy\Database;

$db = new Database();
$pdo = $db->getPDO();

header("Content-Type: application/json");

$action = $_GET["action"] ?? "version";
$data = [];

switch ($action) {
    case "submit_score":
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $input['player_name'];
        $score = $input['score'];

        $stmt = $pdo->prepare('INSERT INTO high_scores (player_name, score) VALUES (:player_name, :score)');
        $stmt->execute(['player_name' => $name, 'score' => $score]);
        $data = ["status" => "success"];
        break;

    case "get_high_scores":
        $stmt = $pdo->query('SELECT player_name, score, date_achieved FROM high_scores ORDER BY score DESC, date_achieved ASC LIMIT 10');
        $data = $stmt->fetchAll();
        break;

    default:
        $data = ["version" => "1.0"];
}

echo json_encode($data);
