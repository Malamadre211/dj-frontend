import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';


export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
  }, [])

  const handleChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
  }, [])

  const handleConnect = useCallback(async () => {
      const response = await fetch('http://localhost:1338/api/auth/local', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              identifier: email,
              password: password
          })
      })
      const data = await response.json()
      if(data.jwt) {
          navigate('/home')
      }
      else {
          setEmail('')
          setPassword('')
      }
  }, [email, password, navigate])

  return <div className="login">
      <div className="header">
          <h1>PlayMag</h1>
      </div>
      <div className="form">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={handleChangeEmail} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={handleChangePassword} />
          <button onClick={handleConnect}>Login</button>
      </div>
  </div>
}