<?php
require __DIR__ . '/db.php';

try {
    $stmt = $pdo->query("SELECT 1");
    echo "Connexion réussie à la base de données PostgreSQL.";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
