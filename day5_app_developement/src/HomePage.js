import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import logo from './images/Blogo.jpg';
import axios from 'axios';
import { Search, SearchIconWrapper, StyledInputBase } from './MyAppBar';
import './MyAppBar.css';
import { Link } from '@mui/material';

function MyAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        toast.success('Logged in successfully!');
        setIsLoggedIn(true);
        navigate('/');
      } else {
        toast.error('Invalid credentials. Please try again or register.');
      }
    } catch (error) {
      toast.error('Error logging in. Please try again later.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
    toast.success('Logged out successfully!');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Dashboard', onClick: () => console.log('Dashboard clicked') },
    { text: 'Events', onClick: () => navigate('/event') },
    { text: 'Cakes', onClick: () => navigate('/cakesec') },
    { text: 'Decorables', onClick: () => navigate('/decorates') },
    { text: 'Eco-Friendly Plan', onClick: () => navigate('/eco-Plan') },
  ];

  return (
    <>
      <AppBar position="fixed" className="appBar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Link href="/"><img src={logo} alt="Logo" className="logo" style={{borderRadius:'5px'}} /></Link>
          <Typography variant="h6" noWrap className="title">
          <span style={{ color: 'black' ,fontWeight: 'bolder',fontSize:'25px'}}>B</span>orn Eves
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          {isLoggedIn ? (
            <>
              <IconButton edge="end" color="inherit" aria-label="account">
                <AccountCircle />
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} role="presentation">
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={item.onClick}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
      <ToastContainer />
    </>
  );
}

export default MyAppBar;
