import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });

      const token = response.data.jwt;
      localStorage.setItem('token', token);

      onLogin();
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="background">
      <h2>Login</h2>
      <label>
        Username:  
        <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
      </label>
      <br />
      <label>
        Password:  
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

