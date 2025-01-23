import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';
import Inscription from "./inscription.jsx";

const Home = () => {
  return (
    <Router>
      <div>
        <h1>Bienvenue sur l'application</h1>
        <footer>
          <ul>
            <li><Link to="/profil">Profil</Link></li>
            <li><Link to="/notification">Notification</Link></li>
            <li><Link to="/message">Tchat</Link></li>
            <li><Link to="/inscription">Inscription</Link></li>
          </ul>
        </footer>

        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Messagerie />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/" element={<h2>Bienvenue sur la page d'accueil</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;