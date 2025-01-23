<?php
include('db.php');

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['prenom']) || empty($data['age']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis.']);
    exit;
}

$passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

$query = "INSERT INTO utilisateurs (prenom, age, localisation, photo, password, genre, profilRechercher) VALUES (:prenom, :age, :localisation, :photo, :password, :genre, :profilRechercher)";
$stmt = $pdo->prepare($query);

// Lier les paramètres
$stmt->bindParam(':prenom', $data['prenom']);
$stmt->bindParam(':age', $data['age']);
$stmt->bindParam(':localisation', $data['localisation']);
$stmt->bindParam(':photo', $data['photo']);
$stmt->bindParam(':password', $passwordHash);
$stmt->bindParam(':genre', $data['genre']);
$stmt->bindParam(':profilRechercher', $data['profilRechercher']);

try {
    $stmt->execute();
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription.']);
}
