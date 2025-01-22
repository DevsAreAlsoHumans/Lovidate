<?php
require '../db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $match_id = $_GET['match_id'];
    $stmt = $pdo->prepare("SELECT * FROM messages WHERE match_id = ?");
    $stmt->execute([$match_id]);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($messages);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $match_id = $data['match_id'];
    $utilisateur_id = $data['utilisateur_id'];
    $contenu = $data['contenu'];

    $stmt = $pdo->prepare("INSERT INTO messages (match_id, utilisateur_id, contenu) VALUES (?, ?, ?)");
    $stmt->execute([$match_id, $utilisateur_id, $contenu]);

    echo json_encode(["message" => "Message envoyé avec succès"]);
}
?>
