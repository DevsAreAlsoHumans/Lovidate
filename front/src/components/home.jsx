import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';

const Home = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Messagerie />} />
          <Route path="/" element={<h2>Bienvenue sur la page d'accueil</h2>} />
        </Routes>
        <footer>
          <ul>
            <li><Link to="/message">Tchat</Link></li>
          </ul>
        </footer>

       
      </div>
    </Router>
  );
};

export default Home;
