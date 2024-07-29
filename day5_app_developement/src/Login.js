import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './images/Blogo.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        toast.success('Logged in successfully!');
        navigate('/'); 
      } else {
        toast.error('Invalid credentials. Please try again or register.');
      }
    } catch (error) {
      toast.error('Error logging in. Please try again later.');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const handleForgotPasswordRedirect = () => {
    navigate('/forgot'); 
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
      <Box className="root">
        <Container component="main" maxWidth="xs" className="formContainer">
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              className="textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              className="textField"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="button"
            >
              Sign In
            </Button>
            <Box mt={2} display="flex" flexDirection="column" alignItems="center">
              <Link onClick={handleForgotPasswordRedirect} style={{ cursor: 'pointer' }}>
                Forgot password?
              </Link>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link onClick={handleRegisterRedirect} style={{ cursor: 'pointer' }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </form>
          <ToastContainer />
        </Container>
      </Box>
    </>
  );
};

export default Login;
