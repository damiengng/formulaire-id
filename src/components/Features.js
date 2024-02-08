import React from 'react';
import { Link } from 'react-router-dom';

function Features() {
    return (
        <div>
            <h1>Vous êtes connecté.</h1>
            <h2>C'est tout pour le moment, vous pouvez vous déconnecter et retourner à l'accueil !</h2>
            { }
            <Link to="/">
                <button variant="link">Déconnexion</button>
            </Link>
        </div>
    );
}

export default Features;
