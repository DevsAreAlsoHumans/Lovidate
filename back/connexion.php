<?php
include('db.php');

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['prenom']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Prénom et mot de passe requis']);
    exit;
}

$prenom = $data['prenom'];
$password = $data['password'];

$query = "SELECT * FROM utilisateurs WHERE prenom = :prenom LIMIT 1";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':prenom', $prenom);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'Utilisateur introuvable']);
    exit;
}

if (password_verify($password, $user['password'])) {
    echo json_encode(['success' => true, 'message' => 'Connexion réussie', 'user' => $user]);
} else {
    echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect']);
}
?>
