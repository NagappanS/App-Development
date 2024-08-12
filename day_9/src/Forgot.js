import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Toolbar,AppBar } from '@mui/material';
import logo from './images/Blogo.jpg';
import { useNavigate } from 'react-router-dom';
import './forgot.css';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const nav = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8081/users/${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setEmailExists(true);
        setMessage('Email found. Please enter your new password.');
      } else {
        setMessage('No user found with this email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handlePasswordSubmit = async () => {
    if (password !== confirmpassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/users/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmpassword })
      });
      const data = await response.text();
      if (data!=null) {
        setMessage('Password has been reset successfully.');
        nav('/login')
        setEmailExists(false);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>
    <AppBar position="fixed" color="primary">
        <Toolbar>
          <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10,borderRadius: '5px' }} />
          <Typography variant="h6">
          <Typography variant="h6">
            <span style={{ color: 'black' ,fontWeight: 'bolder',fontSize:'25px'}}>B</span>orn Eves
          </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
    <Toolbar/>
    <Container className="password-reset-container">
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      {!emailExists ? (
        <>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleEmailSubmit}>
            Check Email
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handlePasswordSubmit}>
            Reset Password
          </Button>
        </>
      )}
      {message && (
        <Typography variant="body2" color="error" className="message">
          {message}
        </Typography>
      )}
    </Container>
    </>
  );
};

export default Forgot;
