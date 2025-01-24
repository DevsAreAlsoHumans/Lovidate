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
        if (!prenom || !age || !password || !localisation || !genre) {
            setMessage('Tous les champs sont requis');
            return;
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prénom :</label>
                <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>

                <label htmlFor="age">Âge :</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required/>

                <label htmlFor="localisation">Localisation :</label>
                <input type="text" id="localisation" value={localisation} onChange={(e) => setLocalisation(e.target.value)}/>

                <label htmlFor="photo">Photo :</label>
                <div className="photo-container">
                    <input type="file" id="photo" onChange={handleFileChange} accept="image/*"/>
                    {photo && (<div className="image-preview"><img src={photo} alt="Aperçu de la photo"/></div>)}
                </div>


                <label htmlFor="genre">Genre :</label>
                <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                <button type="submit">S'inscrire</button>
            </form>

            {message && <div className="message">{message}</div>}
        </div>
    );
};
export default Inscription;