<?php
require 'back/db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM matchs");
    $matchs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($matchs);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $utilisateur_1_id = $data['utilisateur_1_id'];
    $utilisateur_2_id = $data['utilisateur_2_id'];

    $stmt = $pdo->prepare("INSERT INTO matchs (utilisateur_1_id, utilisateur_2_id) VALUES (?, ?)");
    $stmt->execute([$utilisateur_1_id, $utilisateur_2_id]);

    echo json_encode(["message" => "Match créé avec succès"]);
}
?>
