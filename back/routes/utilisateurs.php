<?php
require 'back/db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM utilisateurs");
    $utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($utilisateurs);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $prenom = $data['prenom'];
    $age = $data['age'];
    $localisation = $data['localisation'];
    $photo = $data['photo'];
    $password = $data['password']; 
    $genre = $data['genre'];
    $profilRechercher = $data['profilRechercher'];

    $stmt = $pdo->prepare("INSERT INTO utilisateurs (prenom, age, localisation, photo, password, genre, profiRechercher) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$prenom, $age, $localisation, $photo, $password, $genre, $profilRechercher]);

    echo json_encode(["message" => "Utilisateur ajouté avec succès"]);
}
?>
