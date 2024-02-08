import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddAccountPage from './components/AddAccountPage';
import Features from './components/Features';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <li>
            <Link to="/">Accueil</Link>
          </li>
        </nav>
        <Routes>
          { }
          <Route path="/" element={<HomePage />} />
          <Route path="/add-account" element={<AddAccountPage />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

