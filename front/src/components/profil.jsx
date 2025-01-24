import React, { useState, useEffect } from 'react';
import '../style/style.css';
import '../style/footer.css';
const Profil = () => {
    // État pour stocker les utilisateurs récupérés depuis l'API
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [profilRechercher, setProfilRechercher] = useState('');

    // Utiliser useEffect pour récupérer les utilisateurs lors du chargement du composant
    useEffect(() => {
        // Effectuer une requête GET pour récupérer les utilisateurs depuis l'API PHP
        fetch('routes/utilisateurs.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUtilisateurs(data); // Stocke les utilisateurs récupérés
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            });
    }, []);

    // Filtrer les utilisateurs en fonction du profil recherché
    const utilisateursFiltrés = utilisateurs.filter((utilisateur) => {
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
            <ul>
                {utilisateursFiltrés.map((utilisateur) => (
                    <li key={utilisateur.id}>{utilisateur.prenom}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profil;
