import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import '../css/style.css';

const Profil = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      prenom: "Alice",
      age: 28,
      localisation: "Paris, France",
      photo: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      prenom: "Maxime",
      age: 32,
      localisation: "Lyon, France",
      photo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 3,
      prenom: "Sophie",
      age: 25,
      localisation: "Marseille, France",
      photo: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 4,
      prenom: "Lucas",
      age: 30,
      localisation: "Bordeaux, France",
      photo: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ]);
  const [currentUserId] = useState(3);

  // Charger les profils depuis l'API
  useEffect(() => {
    fetch('http://localhost/lovidate/back/routes/utilisateurs.php')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Erreur lors du chargement des profils", error));
  }, []);

   // Fonction pour envoyer un like à l'API
   const sendLikeToAPI = async (userId) => {
    try {
      const response = await fetch('http://localhost/lovidate/back/routes/matchs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          utilisateur_1_id: currentUserId,
          utilisateur_2_id: userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.match) {
          alert(`🎉 C'est un match avec ${users.find(user => user.id === userId).prenom} !`);
        } else {
          alert(`💖 Vous avez liké ${users.find(user => user.id === userId).prenom}`);
        }
      } else {
        alert('Erreur lors de l\'enregistrement du like');
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };
  
  // Fonction pour gérer le swipe vers la droite (like) ou gauche (dislike)
  const swiped = (direction, userId) => {
    if (direction === 'right') {
      alert(`💖 ${users.find(user => user.id === userId).prenom} a été liké ❤️`);
    } else if (direction === 'left') {
      alert(`💔 ${users.find(user => user.id === userId).prenom} a été disliké ❌`);
    }

    // Supprimer le profil de la liste après le swipe
    removeProfile(userId);
  };

  // Gestion du clic Like
  const handleLike = () => {
    if (users.length > 0) {
      const currentUserId = users[users.length - 1].id;
      sendLikeToAPI(currentUserId);
      removeProfile(currentUserId);
    }
  };

  // Gestion du clic Dislike
  const handleDislike = () => {
    if (users.length > 0) {
      const currentUserId = users[users.length - 1].id;
      alert(`💔 ${users.find(user => user.id === currentUserId).prenom} a été disliké ❌`);
      removeProfile(currentUserId);
    }
  };

  // Fonction pour supprimer un profil via ID
  const removeProfile = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };
  
  return (
    <div>
      <div className="profile-container">
        {users.map((user) => (
          <TinderCard
            key={user.id}
            className="swipe"
            onSwipe={(dir) => swiped(dir, user.id)}
            preventSwipe={['up', 'down']}  // Empêche le swipe haut/bas
          >
            <div 
              className="profile-content"
              style={{ backgroundImage: `url(${user.photo})` }}
            >
              <div className="profile-info">
                <h2>{user.prenom}, {user.age}</h2>
                <p className="profile-location">📍 {user.localisation}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
  
      <div className="profile-actions">
        <button 
          className="dislike-btn" 
          onClick={handleDislike}
        >
          ❌
        </button>
        <button 
          className="like-btn" 
          onClick={handleLike}
        >
          ❤️
        </button>
      </div>
    </div>
  );
  
  
};

export default Profil;
 