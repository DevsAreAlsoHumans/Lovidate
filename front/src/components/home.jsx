import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';

import LogoLovidate from '../assets/Logo_Lovidate2.png';
import LogoEcrit from '../assets/Logo_Ecrit.png';

const Home = () => {
  return (
    <Router>
      <div>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <img src={LogoLovidate} alt="Logo Lovidate" style={{ width: '100px', marginRight: '10px' }} />
          <img src={LogoEcrit} alt="Logo Ecrit" style={{ width: '200px' }} />
        </div>

        <nav>
          <ul>
            <li><Link to="/profil">Profil</Link></li>
            <li><Link to="/notification">Notification</Link></li>
            <li><Link to="/message">Tchat</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Messagerie />} />
          <Route path="/" element={<h2>Bienvenue sur la page d'accueil</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
