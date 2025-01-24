import React, { useState } from 'react';
import '../style/inscription.css';

const Inscription = ({ setIsAuthenticated }) => {
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
            setPhoto(file); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!prenom || !age || !password || !localisation || !genre) {
            setMessage('Tous les champs sont requis');
            return;
        }

        const formData = new FormData();
        formData.append('prenom', prenom);
        formData.append('age', age);
        formData.append('localisation', localisation);
        formData.append('photo', photo); 
        formData.append('password', password);
        formData.append('genre', genre);

        try {
            const response = await fetch('http://localhost/back/inscription.php', {  
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setMessage('Inscription réussie !');
                setIsAuthenticated(true);
            } else {
                setMessage(result.message || 'Erreur d\'inscription');
            }
        } catch (error) {
            setMessage('Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />

                <label htmlFor="age">Âge :</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />

                <label htmlFor="photo">Photo :</label>
                <div className="photo-container">
                    <input type="file" id="photo" onChange={handleFileChange} accept="image/*" />
                    {photo && <div className="image-preview"><img src={URL.createObjectURL(photo)} alt="Aperçu de la photo" /></div>}
                </div>

                <label htmlFor="genre">Genre :</label>
                <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
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
