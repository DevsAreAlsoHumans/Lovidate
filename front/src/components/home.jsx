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

    // Vérifier l'état d'authentification (si un token ou une info est présente)
    useEffect(() => {
        // Vérifier dans le localStorage si un utilisateur est connecté
        const userData = localStorage.getItem('user');  // Par exemple, tu peux stocker des infos dans le localStorage après connexion
        if (userData) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <div className="main-content">
                <h1>Bienvenue sur l'application</h1>

                {/* Routes de contenu */}
                <Routes>
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/message" element={<Messagerie />} />
                    <Route path="/inscription" element={<Inscription setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/connexion" element={<Connexion setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/" element={<h2>Bienvenue sur la page d'accueil</h2>} />
                </Routes>
            </div>

            {/* Footer */}
            <footer>
                <ul>
                    <li><Link to="/profil">Profil</Link></li>
                    <li><Link to="/notification">Notification</Link></li>
                    <li><Link to="/message">Tchat</Link></li>

                    {/* Ne montre le lien Connexion que si l'utilisateur n'est pas authentifié */}
                    {!isAuthenticated && <li><Link to="/connexion">Connexion</Link></li>}
                </ul>
            </footer>
        </Router>
    );
};

export default Home;
