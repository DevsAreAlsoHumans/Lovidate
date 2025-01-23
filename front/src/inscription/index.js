// front/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Inscription from 'front/src/components/inscription.jsx';
import 'inscription.css';

ReactDOM.render(
    <React.StrictMode>
        <Inscription />
    </React.StrictMode>,
    document.getElementById('root')
);
