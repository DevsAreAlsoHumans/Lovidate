<?php
$host = 'localhost';
$port = '5432';
$dbname = 'Lovidate'; 
$user = 'postgres'; 
$password = 'Sk14529856';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Erreur de connexion à la base de données : ' . $e->getMessage();
}
?>
