import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profil.css';

const Profil = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données de l'API PHP
  useEffect(() => {
    axios.get('http://localhost/lovidate/back/routesn/utilisateurs.php')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  if (users.length === 0) {
    return <p>Aucun utilisateur trouvé.</p>;
  }

  return (
    <div className="profile-container">
      {users.map((user) => (
        <div key={user.id} className="profile-card">
          <img src={user.photo || 'https://via.placeholder.com/300'} alt="Profil" className="profile-photo" />
          <h2>{user.prenom}, {user.age} ans</h2>
          <p className="profile-location">📍 {user.localisation}</p>
        </div>
      ))}
    </div>
  );
};

export default Profil;
