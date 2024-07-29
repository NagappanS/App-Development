import React from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { AppBar, Toolbar} from '@mui/material';
import './forgot.css';
import logo from './images/Blogo.jpg';
const Forgot = () => {
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
      <img src={logo} alt="Logo" className="log" />
      <Container component="main" maxWidth="xs" className="formContainer">
        <Typography component="h1" variant="h5" align="center">
          Forgot Password
        </Typography>
        <form >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
            className="textField"/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="button">
            Submit
          </Button>
        </form>
      </Container>
    </Box>
    </>
  );
};

export default Forgot;