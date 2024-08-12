import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './images/Blogo.jpg';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/users/login', { email, password });

      if (response.status === 200) {
        const userData = response.data;
        login(userData); // Save user data

        if (userData.roles === 'admin') {
          navigate('/admin'); // Navigate to admin page
        } else if (userData.roles === 'user') {
          navigate('/'); // Navigate to user dashboard
        }

        toast.success('Logged in successfully!');
      } else if (response.status === 401) {
        toast.error('Invalid credentials. Please try again or register.');
      } else {
        toast.error('Error logging in. Please try again later.');
      }
    } catch (error) {
      toast.error('Error logging in. Please try again later.');
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              <Link onClick={() => navigate('/forgot')} style={{ cursor: 'pointer' }}>
                Forgot password?
              </Link>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
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
