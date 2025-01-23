import React, { useState } from 'react';

const InscriptionForm = () => {
    // Déclaration des états pour chaque champ du formulaire
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const [genre, setGenre] = useState('');
    const [message, setMessage] = useState('');

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification des champs obligatoires
        if (!prenom || !age || !password || !localisation || !genre || !profilRechercher) {
            setMessage('Tous les champs sont requis');
            return;
        }

        const data = {
            prenom,
            age,
            localisation,
            photo,
            password,
            genre,
            profilRechercher,
        };

        // Envoi des données au serveur avec fetch
        try {
            const response = await fetch('inscription.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Inscription réussie !');
            } else {
                setMessage(result.message || 'Erreur lors de l\'inscription.');
            }
        } catch (error) {
            setMessage('Erreur de connexion au serveur.');
        }
    };

    return (
        <div className="container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prénom :</label>
                <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    required
                />

                <label htmlFor="age">Âge :</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />

                <label htmlFor="localisation">Localisation :</label>
                <input
                    type="text"
                    id="localisation"
                    value={localisation}
                    onChange={(e) => setLocalisation(e.target.value)}
                />

                <label htmlFor="photo">Photo (URL) :</label>
                <input
                    type="text"
                    id="photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />

                <label htmlFor="genre">Genre :</label>
                <select
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="profilRechercher">Profil recherché :</label>
                <select
                    id="profilRechercher"
                    value={profilRechercher}
                    onChange={(e) => setProfilRechercher(e.target.value)}
                    required
                >
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">S'inscrire</button>
            </form>

            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default InscriptionForm;
