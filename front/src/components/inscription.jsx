import React, { useState } from 'react';
import '../style/inscription.css';

const Inscription = () => {
    const [prenom, setPrenom] = useState('');
    const [age, setAge] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState('');
    const [genre, setGenre] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPhoto(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let missingFields = [];
        if (!prenom) missingFields.push('Prénom');
        if (!age) missingFields.push('Âge');
        if (!password) missingFields.push('Mot de passe');
        if (!localisation) missingFields.push('Localisation');
        if (!genre) missingFields.push('Genre');

        if (missingFields.length > 0) {
            const message = `Le(s) champ(s) suivant(s) est(sont) requis : ${missingFields.join(', ')}`;
            setMessage(message);
            return;
        }

        // Préparer les données à envoyer
        const data = {
            prenom,
            age,
            localisation,
            photo,
            password,
            genre,
            profilRechercher: "",
        };

        // Envoi des données vers le backend via une requête POST
        try {
            const response = await fetch('http://ton-backend-url.com', { // Remplace l'URL par celle de ton API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Utilisateur ajouté avec succès !");
            } else {
                setMessage(`Erreur : ${result.message || 'Un problème est survenu.'}`);
            }
        } catch (error) {
            setMessage(`Erreur de connexion : ${error.message}`);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />

                <label htmlFor="age">Âge :</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />

                <label htmlFor="localisation">Localisation :</label>
                <input type="text" id="localisation" value={localisation} onChange={(e) => setLocalisation(e.target.value)} />

                <label htmlFor="photo">Photo :</label>
                <div className="photo-container">
                    <input type="file" id="photo" onChange={handleFileChange} accept="image/*" />
                    {photo && (<div className="image-preview"><img src={photo} alt="Aperçu de la photo" /></div>)}
                </div>

                <label htmlFor="genre">Genre :</label>
                <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                    <option value="">Sélectionnez votre genre</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">S'inscrire</button>
            </form>

            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default Inscription;
