import React, { useState } from 'react';
import './log.css'; 

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUsername] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    if (email === 'u@exam.com' && password === 'password') {
      setIsAuthenticated(true);
    } else if (email !== '' && password !== null){
      setIsLogin(false);
    }
  };

  const handleRegister = () => {
    if(email ==='u@exam.com' && username ==='nags'  && password ==='password' && confirmPassword === 'password')
    setIsLogin(true);
  };

  if (isAuthenticated) {
    return <h2>Welcome to the Home Page</h2>;
  }

  return (
    <div className="container">
      {isLogin ? (
        <div className="login">
          <h2>Login</h2>
          <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          required/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          required/>
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account? <button onClick={() => setIsLogin(false)}>Register</button>
          </p>
          </form>
        </div>
      ) : (
        <div className="register">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account? <button onClick={() => setIsLogin(true)}>Login</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
