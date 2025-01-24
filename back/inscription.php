<?php
include('db.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['prenom']) || empty($data['age']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis.']);
    exit;
}

$passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

$photoPath = null;

if (isset($_FILES['photo']) && $_FILES['photo']['error'] === 0) {
    $photo = $_FILES['photo'];

    $uploadDir = 'uploads/';

    $photoName = time() . '_' . basename($photo['name']);
    $photoPath = $uploadDir . $photoName;

    if (!move_uploaded_file($photo['tmp_name'], $photoPath)) {
        echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement de la photo.']);
        exit;
    }
}

$query = "INSERT INTO utilisateurs (prenom, age, photo, password, genre, profilRechercher) 
          VALUES (:prenom, :age, :photo, :password, :genre, :profilRechercher)";
$stmt = $pdo->prepare($query);

$stmt->bindParam(':prenom', $data['prenom']);
$stmt->bindParam(':age', $data['age']);
$stmt->bindParam(':photo', $photoPath);
$stmt->bindParam(':password', $passwordHash);
$stmt->bindParam(':genre', $data['genre']);
$stmt->bindParam(':profilRechercher', $data['profilRechercher']);

try {
    $stmt->execute();
    echo json_encode(['success' => true, 'message' => 'Inscription réussie.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription.']);
}
?>
