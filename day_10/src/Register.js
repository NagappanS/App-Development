import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import './register.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './images/Blogo.jpg';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/users/register', {
        name,
        email,
        password,
        confirmpassword,
      });

      if (response.status === 200) {
        toast.success('Registered successfully! Please login.');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email already in use. Please use a different email.');
      } else {
        toast.error('Error registering. Please try again later.');
      }
    }
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10, borderRadius: '5px' }} />
          <Typography variant="h6">
            <span style={{ color: 'black', fontWeight: 'bolder', fontSize: '25px' }}>B</span>orn Eves
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className="root">
        <div className="logoContainer">
          <img src={logo} alt="Logo" className="log" />
        </div>
        <Container component="main" maxWidth="xs" className="formContainer">
          <Typography component="h1" variant="h5" align="center">
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="textField"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="button"
            >
              Register
            </Button>
            <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
              Already have an account? <Link component={RouterLink} to="/login">Log In</Link>
            </Typography>
          </form>
          <ToastContainer />
        </Container>
      </Box>
    </>
  );
};

export default Register;
