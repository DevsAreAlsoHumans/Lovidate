import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';
import { FaHome, FaComments } from 'react-icons/fa';
//import { Link, Routes, Route } from 'react-router-dom';

import LogoLovidate from '../assets/Logo_Lovidate2.png';
import LogoEcrit from '../assets/Logo_Ecrit.png';

const Home = () => {
  return (
    <Router>
      <div>
        <header>
          <h1 className='title-home'>Lovidate</h1>
        </header>

        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Messagerie />} />
        </Routes>

        <nav>
          <ul>
            <li>
              <Link to="/profil">
                <FaHome size={30} title="Accueil" />
              </Link>
            </li>
            <li>
              <Link to="/message">
                <FaComments size={30} title="Tchat" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default Home;
