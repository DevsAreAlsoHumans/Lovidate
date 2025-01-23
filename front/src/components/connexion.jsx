import React, { useState } from 'react';
import '../style/inscription.css';
import '../style/connexion.css';

const Connexion = () => {
    // Déclaration des états pour chaque champ du formulaire
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Pour gérer le type de message (succès ou erreur)

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!prenom || !password) {
            setMessage('Tous les champs sont obligatoires');
            setMessageType('error');
            return;
        }

        const data = {
            prenom,
            password,
        };

        // Envoi des données au serveur avec fetch
        try {
            const response = await fetch('connexion.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Connexion réussie !');
                setMessageType('success');
            } else {
                setMessage('Les informations de connexion ne correspondent pas');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Problème de connexion au serveur');
            setMessageType('error');
        }
    };

    return (
        <div className="container">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prénom :</label>
                <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                />

                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Se connecter</button>
            </form>

            {message && <div className={`message ${messageType}`}>{message}</div>}
        </div>
    );
};

export default Connexion;
