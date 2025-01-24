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
      genre: "Femme",
      photo: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      prenom: "Maxime",
      age: 32,
      localisation: "Lyon, France",
      genre: "Canapé",
      photo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 3,
      prenom: "Sophie",
      age: 25,
      localisation: "Marseille, France",
      genre: "Non binaire",
      photo: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 4,
      prenom: "Lucas",
      age: 30,
      localisation: "Bordeaux, France",
      genre: "chaise",
      photo: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ]);
  const [currentUserId] = useState(3);
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(''); 
  const [isSwiping, setIsSwiping] = useState(null); // Stocke l'ID et la direction de l'animation


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
  
  // Fonction pour gérer le like ou dislike
  const handleSwipeAction = (direction, userId) => {
    const user = users.find(user => user.id === userId);
    
    if (user) {
      setIsSwiping({ id: userId, direction });

      removeProfile(userId);

      if (direction === 'right') {
        setMessage(`💖 ${user.prenom} a été liké ❤️`);
        setNotificationType('like'); 
        sendLikeToAPI(userId);
      } else if (direction === 'left') {
        setMessage(`💔 ${user.prenom} a été disliké ❌`);
        setNotificationType('dislike'); 
      }

      setTimeout(() => {
        setIsSwiping(null); 
        setMessage(null); 
        setNotificationType('');
      }, 1000);
    }
  };

  // Gestion du swipe
  const swiped = (direction, userId) => {
    handleSwipeAction(direction, userId);
  };

  // Gestion du clic Like
  const handleLike = () => {
    if (users.length > 0) {
      const currentUserId = users[users.length - 1].id;
      handleSwipeAction('right', currentUserId);
    }
  };

  // Gestion du clic Dislike
  const handleDislike = () => {
    if (users.length > 0) {
      const currentUserId = users[users.length - 1].id;
      handleSwipeAction('left', currentUserId);
    }
  };

  // Fonction pour supprimer un profil via ID
  const removeProfile = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };
    
  return (
    <div className="profil-wrapper"> 
      <div className="profile-container">
        {users.length > 0 ? (
          users.map((user) => (
            <TinderCard
              key={user.id}
              className={`swipe ${isSwiping?.id === user.id ? (isSwiping.direction === 'right' ? 'swipe-right' : 'swipe-left') : ''}`}
              preventSwipe={['up', 'down']}
            >
              
              <div className="profile-content" style={{ backgroundImage: `url(${user.photo})` }}>
                <div className="profile-info">
                  <h2>{user.prenom}, {user.age}</h2>
                  <p className="profile-location">📍 {user.localisation}</p>
                </div>
              
                {message && (
                  <div className={`overlay-message ${notificationType}`}>
                    {message}
                  </div>
                )}

              </div>
            </TinderCard>
          ))
        ) : (
          <h2 className="no-profile-message">Aucun profil disponible</h2>
        )}
      </div>

        {users.length > 0 && (
          <div className="profile-actions">
            <button 
              className="dislike-btn" 
              onClick={() => handleSwipeAction('left', users[users.length - 1].id)}
              >
              ❌
            </button>
            <button 
              className="like-btn" 
              onClick={() => handleSwipeAction('right', users[users.length - 1].id)}
            >
              <img className="btn-like" src="/src/assets/heart.png" alt="Like"/>
            </button>
          </div>
        )}
      </div>
  );

};

export default Profil;

