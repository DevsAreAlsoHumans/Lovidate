import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/inscription.css';
import '../style/connexion.css';

const Connexion = ({ setIsAuthenticated }) => {
    const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!prenom || !password) {
            setMessage('Tous les champs sont obligatoires');
            setMessageType('error');
            return;
        }

        const data = { prenom, password };

        try {
            const response = await fetch('http://localhost/back/connexion.php', {  
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
                localStorage.setItem('user', JSON.stringify(result.user));
                setIsAuthenticated(true);
                navigate('/');
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <button type="submit">Se connecter</button>
            </form>

            {message && <div className={`message ${messageType}`}>{message}</div>}

            <p>Vous n'avez pas de compte ? <Link to="/inscription">Inscrivez-vous ici</Link></p>
        </div>
    );
};

export default Connexion;
