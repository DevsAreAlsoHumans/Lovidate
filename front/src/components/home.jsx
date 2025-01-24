import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profil from './profil';
import Notification from './notification';
import Messagerie from './message';
import Inscription from "./inscription.jsx";
import Connexion from "./connexion.jsx";
import '../style/footer.css';

import LogoLovidate from '../assets/Logo_Lovidate2.png';
import LogoEcrit from '../assets/Logo_Ecrit.png';

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
                <h1>Bienvenue sur l'application Lovidate</h1>
                <nav>
                    <ul>
                        {isAuthenticated && <li><Link to="/profil">Profil</Link></li>}
                        {isAuthenticated && <li><Link to="/notification">Notifications</Link></li>}
                        {isAuthenticated && <li><Link to="/message">Tchat</Link></li>}
                        {!isAuthenticated && <li><Link to="/connexion">Connexion</Link></li>}
                        {!isAuthenticated && <li><Link to="/inscription">Inscription</Link></li>}
                    </ul>
                </nav>

                <Routes>
                    <Route path="/profil" element={isAuthenticated ? <Profil /> : <h2>Veuillez vous connecter</h2>} />
                    <Route path="/notification" element={isAuthenticated ? <Notification /> : <h2>Veuillez vous connecter</h2>} />
                    <Route path="/message" element={isAuthenticated ? <Messagerie /> : <h2>Veuillez vous connecter</h2>} />
                    <Route path="/inscription" element={<><h1>Inscription</h1><Inscription setIsAuthenticated={setIsAuthenticated} /></>} />
                    <Route path="/connexion" element={<><h1>Connexion</h1><Connexion setIsAuthenticated={setIsAuthenticated} /></>} />
                </Routes>
            </div>

            <footer>
                <ul>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/message">Tchat</Link></li>
                            <li><Link to="/profil">Profil</Link></li>
                            <li><Link to="/notification">Notifications</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/connexion">Connexion</Link></li>
                            <li><Link to="/inscription">Inscription</Link></li>
                        </>
                    )}
                </ul>
            </footer>
        </Router>
    );
};

export default Home;

