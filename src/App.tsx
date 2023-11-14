import React, { useState } from 'react';
import Login from './Login';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="container">
      <div className="form">
      <h1>PlayMag</h1>
      {isLoggedIn ? (
        <p>Utilisateur connecté!</p>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
    </div>
  );
};

export default App;
