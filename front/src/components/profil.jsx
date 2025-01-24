import React, { useEffect, useState } from 'react';
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

  const swiped = (direction, userName) => {
    console.log(`${userName} a été swipé vers la ${direction}`);
    if (direction === 'right') {
      alert(`${userName} a été liké ❤️`);
    } else if (direction === 'left') {
      alert(`${userName} a été disliké ❌`);
    }

    // Supprimer le profil de la liste
    setUsers((prevUsers) => prevUsers.filter(user => user.prenom !== userName));
  };

  return (
    <div className="profile-container">
      {users.map((user) => (
        <TinderCard
          key={user.id}
          className="swipe"
          onSwipe={(dir) => swiped(dir, user.prenom)}
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
  );
  
};

export default Profil;