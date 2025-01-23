import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './components/profil';
import Notification from './components/notification';
import Tchat from './components/tchat';

const Home = () => {
  return (
    <Router>
      <div>
        <h1>Bienvenue sur l'application</h1>
        <nav>
          <ul>
            <li><Link to="/profil">Profil</Link></li>
            <li><Link to="/notification">Notification</Link></li>
            <li><Link to="/tchat">Tchat</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/tchat" element={<Tchat />} />
          <Route path="/" element={<h2>Bienvenue sur la page d'accueil</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
