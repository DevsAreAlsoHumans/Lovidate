import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';
import { FaHome, FaComments } from 'react-icons/fa';
//import { Link, Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <Router>
      <div>
        <header>
          <img className="img-home" src='/src/assets/heart.png'></img>
          <h1 className='title-home'>Lovidate</h1>
        </header>

        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Messagerie />} />
          <Route path="/" element={<h2>Bienvenue sur la page d'accueil</h2>} />
        </Routes>

        <nav className='nav'>
          <ul>
            <li>
              <Link to="/profil">
                <FaHome size={30} title="Accueil" />
              </Link>
            </li>
            <li>
              <Link to="/message">
                <img className="logo-nav" src='/src/assets/HOME.png' ></img>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default Home;
