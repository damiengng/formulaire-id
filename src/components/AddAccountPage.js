import React, { useState } from 'react';

function AddAccountPage() {
    const [identifiant, setIdentifiant] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [messageErreur, setMessageErreur] = useState('');

    const handleIdentifiantChange = (e) => {
        setIdentifiant(e.target.value);
    };

    const handleMotDePasseChange = (e) => {
        setMotDePasse(e.target.value);
    };

    const handleNomChange = (e) => {
        setNom(e.target.value);
    };

    const handlePrenomChange = (e) => {
        setPrenom(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const regexMotDePasse = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regexMotDePasse.test(motDePasse)) {
            setMessageErreur('Le mot de passe doit contenir au moins 8 caractères, dont au moins une minuscule, une majuscule, un chiffre et un caractère spécial.');
            return;
        }
        // Vérification de l'identifiant
        if (!isValidEmail(identifiant)) {
            setMessageErreur("L'adresse e-mail n'est pas valide.");
            return;
        }
        // Soumettre le formulaire si toutes les conditions sont remplies
        setMessageErreur('');

        // Envoi des données à la route pour ajouter un utilisateur
        fetch('/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `identifiant=${identifiant}&mot_de_passe=${motDePasse}&nom=${nom}&prenom=${prenom}`,
        })
            .then(response => response.json())
            .then(data => {
                // Gérer la réponse de la requête
                alert(data.message); // Ou utilisez une autre méthode pour afficher un message à l'utilisateur
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const isValidEmail = (email) => {
        // Vérification de la présence du caractère "@"
        if (!email.includes('@')) {
            return false;
        }

        // Séparation du nom d'utilisateur et du nom de domaine
        const [usernamePart, domainPart] = email.split('@');

        // Vérification du nom d'utilisateur
        const usernameRegex = /^[a-zA-Z0-9._-]+$/;
        if (!usernameRegex.test(usernamePart)) {
            return false;
        }

        // Vérification du nom de domaine
        const domainRegex = /^[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$/;
        if (!domainRegex.test(domainPart)) {
            return false;
        }

        // Vérification de la présence d'un point dans le domaine
        if (!domainPart.includes('.')) {
            return false;
        }

        // Vérification de la présence du caractère "@" dans la partie du domaine
        if (domainPart.startsWith('.') || domainPart.endsWith('.') || domainPart.includes('..')) {
            return false;
        }

        return true;
    };
    return (
        <div>
            <h1>Ajouter un compte</h1>
            {messageErreur && <p style={{ color: 'red' }}>{messageErreur}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Identifiant:
                        <input type="text" value={identifiant} onChange={handleIdentifiantChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Mot de passe:
                        <input type="password" value={motDePasse} onChange={handleMotDePasseChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Nom:
                        <input type="text" value={nom} onChange={handleNomChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Prénom:
                        <input type="text" value={prenom} onChange={handlePrenomChange} />
                    </label>
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default AddAccountPage;
