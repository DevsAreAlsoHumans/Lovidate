import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';
import '../css/style.css';  

const Profil = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données factices en cas d'erreur API
  const fakeUsers = [
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
  ];

  const swiped = (direction, userName) => {
    console.log(`${userName} a été swipé vers la ${direction}`);
    if (direction === 'right') {
      alert(`${userName} a été liké ❤️`);
    } else if (direction === 'left') {
      alert(`${userName} a été disliké ❌`);
    }

    // Supprimer le profil de la liste
    setUsers((prevUsers) => prevUsers.slice(1));
  };

  useEffect(() => {
    axios.get('http://localhost/back/routes/utilisateurs.php')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        setUsers(fakeUsers);  // Remplacer par les données factices en cas d'erreur
      })
      .finally(() => {
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
    {users.length > 0 ? (
      users.map((user) => (
        <TinderCard
          key={user.id}
          className="swipe"
          onSwipe={(dir) => swiped(dir, user.prenom)}
          preventSwipe={['up', 'down']}  // Empêche le swipe haut/bas
        >
          <div className="profile-card">
            <img src={user.photo} alt={user.prenom} className="profile-photo" />
            <h2>{user.prenom}, {user.age}</h2>
            <p className="profile-location">📍 {user.localisation}</p>
          </div>
        </TinderCard>
      ))
    ) : (
      <h2>Aucun autre profil à afficher</h2>
    )}
  </div>

  );
};

export default Profil;
