import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/simpson.png';
import '../styles/styles.css';

function HomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&password=${password}`,
        })
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleReset = (e) => {
        e.preventDefault();
        setUsername('');
        setPassword('');
        setMessage('');
    };

    return (
        <div className="page-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-md-6">
                    <img src={logo} alt="Logo" className="img-fluid mx-auto d-block mt-4 mb-4" />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Identifiant</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez votre identifiant"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="reset" onClick={handleReset} className="me-2">
                            Reset
                        </Button>
                        <Button variant="secondary" type="submit" className="me-2">
                            Valider
                        </Button>
                        <Link to="/add-account">
                            <button variant="link">Ajout compte</button>
                        </Link>

                    </Form>
                    {message && <Alert variant="info">{message}</Alert>}
                </div>
            </div>
        </div>
    );
}

export default HomePage;