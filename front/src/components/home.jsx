import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';
import Inscription from "./inscription.jsx";
import Connexion from "./connexion.jsx";
import '../style/footer.css';

const Home = () => {
  return (
      <Router>
        <div className="main-content">
          <h1>Bienvenue sur l'application</h1>

          {/* Routes de contenu */}
          <Routes>
            <Route path="/profil" element={<Profil />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/message" element={<Messagerie />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/" element={<h2>Bienvenue sur la page d'accueil</h2>} />
          </Routes>
        </div>

        {/* Footer */}
        <footer>
          <ul>
            <li><Link to="/profil">Profil</Link></li>
            <li><Link to="/notification">Notification</Link></li>
            <li><Link to="/message">Tchat</Link></li>
            <li><Link to="/inscription">Inscription</Link></li>
            <li><Link to="/connexion">Connexion</Link></li>
          </ul>
        </footer>
      </Router>
  );
};

export default Home;
