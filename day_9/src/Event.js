import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Footer from './Footer';
import { Link, Snackbar } from '@mui/material';
import logo from './images/Blogo.jpg';
import { useNavigate } from 'react-router-dom';
import { Search, SearchIconWrapper, StyledInputBase } from './MyAppBar';
import './MyAppBar.css';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import MusicSection from './MusicSection';
import DanceSection from './DanceSection';
import DJSection from './DjSection';
import GamesSection from './GameSection';
import BookingSummary from './BookingSummary';
import axios from 'axios';
import './eve.css';

const Event = () => {
  const { user, logout } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedEvents, setBookedEvents] = useState(new Set());
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleBook = async (eventname, price) => {
    // ... (existing booking logic)
    if (!user) {
      toast.error('You must be logged in to book an event!');
      return;
    }
  
    if (bookedEvents.has(eventname)) {
      toast.error('This event has already been booked.');
      return;
    }
  
    setTotalPrice(prevPrice => prevPrice + price);
  
    try {
      const response = await axios.post('http://localhost:8081/event', {
        eventname,
        price,
        user: { id: user.id }
      });
  
      console.log('Event booked:', response.data);
      setBookedEvents(prevEvents => new Set(prevEvents).add(eventname));
      setSnackbarOpen(true);
    } catch (error) {
      console.error('There was an error booking the event!', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
      toast.error('There was an error booking the event!');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!\nGo to event page and give Submit to confirm');
  };

  const menuItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Events', path: '/event' },
    { text: 'Cakes', path: '/cakesec' },
    { text: 'Decorables', path: '/decorates' },
    { text: 'Eco-Friendly Plan', path: '/eco-Plan' },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#508C9B' }} className="appBar">
        <Toolbar>
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
          <Link href="/"><img src={logo} alt="Logo" className="logo" style={{borderRadius:'5px'}} /></Link>
          <Typography variant="h6" noWrap className="title">
            <span style={{ color: 'black', fontWeight: 'bolder', fontSize: '25px' }}>B</span>orn Eves
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </Search>
          <div style={{ marginLeft: 'auto', display: 'flex' }}>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={() => handleNavigate(item.path)}>
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </div>
          {user ? (
            <>
              <Typography variant="h6" style={{ marginRight: 20 }}>
                {user.email}
              </Typography>
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
      <ToastContainer />

      <Toolbar />
      <div className='bo'>
        <Typography variant="h2" component="div" gutterBottom align="center" style={{ color: "#E64833" }} fontFamily={"fantasy"}>
          Book Your Event
        </Typography>
        <MusicSection searchQuery={searchQuery} onBook={handleBook} />
        <DanceSection searchQuery={searchQuery} onBook={handleBook} />
        <DJSection searchQuery={searchQuery} onBook={handleBook} />
        <GamesSection searchQuery={searchQuery} onBook={handleBook} />
        <BookingSummary totalPrice={totalPrice} />
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Event Booked! Total Price: ${totalPrice}
        </MuiAlert>
      </Snackbar>
      <Footer />
    </>
  );
};

export default Event;
