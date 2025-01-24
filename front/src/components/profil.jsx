import React, { useState, useEffect } from 'react';
import '../style/style.css';
import '../style/footer.css';

const Profil = () => {
    // États pour stocker les utilisateurs, les erreurs et le profil recherché
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [profilRechercher, setProfilRechercher] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Pour afficher les erreurs

    // Utiliser useEffect pour récupérer les utilisateurs lors du chargement du composant
    useEffect(() => {
        // Effectuer une requête GET pour récupérer les utilisateurs depuis l'API PHP
        fetch('routes/utilisateurs.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des utilisateurs');
                }
                return response.json();
            })
            .then((data) => {
                setUtilisateurs(data);
                setErrorMessage('');
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
                setErrorMessage('Impossible de récupérer les utilisateurs. Veuillez réessayer plus tard.');
            });
    }, []);

    const utilisateursFiltres = utilisateurs.filter((utilisateur) => {
        if (profilRechercher === '') return true;
        return utilisateur.genre === profilRechercher;
    });

    return (
        <div>
            <h2>Page Profil</h2>
            <p>Bienvenue sur votre profil.</p>

            <label htmlFor="profil-select">Rechercher par profil: </label>
            <select
                id="profil-select"
                value={profilRechercher}
                onChange={(e) => setProfilRechercher(e.target.value)}
            >
                <option value="">Tous</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autres">Autres</option>
            </select>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <ul>
                {utilisateursFiltres.map((utilisateur) => (
                    <li key={utilisateur.id}>{utilisateur.prenom}{utilisateur.age}{utilisateur.localisation}{utilisateur.photo}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profil;
