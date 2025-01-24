import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';
import Inscription from "./inscription.jsx";
import Connexion from "./connexion.jsx";
import '../style/footer.css';

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <div className="main-content">
                <Routes>
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/message" element={<Messagerie />} />
                    <Route path="/inscription" element={<><h1>Inscription</h1><Inscription setIsAuthenticated={setIsAuthenticated}/></>}/>
                    <Route path="/connexion" element={<><h1>Connexion</h1><Connexion setIsAuthenticated={setIsAuthenticated} /></>}/>
                    <Route path="/" element={<h1>Bienvenue sur l'application Lovidate</h1>}/>
                </Routes>
            </div>

            <footer>
                <ul>
                    {isAuthenticated &&<li><Link to="/profil">Profil</Link></li>}
                    {isAuthenticated &&<li><Link to="/message">Tchat</Link></li>}
                    {!isAuthenticated && <li><Link to="/connexion">Connexion</Link></li>}
                </ul>
            </footer>
        </Router>
    );
};

export default Home;
