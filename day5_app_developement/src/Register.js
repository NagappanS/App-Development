import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar} from '@mui/material';
import './register.css'; 
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './images/Blogo.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate=useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/users`, { email, password });
      toast.success('Registered successfully! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error('Error registering. Please try again later.');
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
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
            value={username}
            onChange={handleUsernameChange}
            className="textField"/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            onChange={handleEmailChange}
            className="textField"/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="textField"/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="textField"/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="button">
            Register
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
            Already have an account? <Link component={RouterLink} to="/login">Log In</Link>
          </Typography>
        </form>
        <ToastContainer/>
      </Container>
    </Box>
    </>
  );
};

export default Register;
