import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import '../css/style.css';

const Profil = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost/back/routes/utilisateurs.php'); 
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };

    fetchUsers();
  }, []);  

  const swiped = (direction, userName) => {
    console.log(`${userName} a été swipé vers la ${direction}`);
    if (direction === 'right') {
      alert(`💖 ${users.find(user => user.id === userId).prenom} a été liké ❤️`);
    } else if (direction === 'left') {
      alert(`💔 ${users.find(user => user.id === userId).prenom} a été disliké ❌`);
    }

    setUsers((prevUsers) => prevUsers.filter(user => user.prenom !== userName));
  };
  
  return (
    <div className="profile-container">
      {users.length === 0 ? (
        <p>Aucun utilisateur à afficher.</p>
      ) : (
        users.map((user) => (
          <TinderCard
            key={user.id}
            className="swipe"
            onSwipe={(dir) => swiped(dir, user.prenom)}
            preventSwipe={['up', 'down']}
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
        ))
      )}
    </div>
  );
  
};

export default Profil;