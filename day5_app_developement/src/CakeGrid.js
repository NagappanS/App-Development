import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { Link } from '@mui/material';
import logo from './images/Blogo.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, SearchIconWrapper, StyledInputBase } from './MyAppBar';
import './MyAppBar.css';
import './cakegrid.css';
import p1 from './images/pc1.jpg';
import p2 from './images/pc2.jpg';
import p3 from './images/pc3.avif';
import p4 from './images/pc4.avif';
import p5 from './images/pc5.avif';
import p6 from './images/pc6.avif';
import p7 from './images/pc7.avif';
import p8 from './images/pc8.avif';
import p9 from './images/pc9.avif';
import p10 from './images/pc10.avif';
import p11 from './images/pc11.avif';
import p12 from './images/pc12.avif';
import p13 from './images/pc13.avif';
import p14 from './images/pc14.avif';
import p15 from './images/pc15.avif';
import p16 from './images/pc16.avif';
import p17 from './images/pc17.avif';
import p18 from './images/pc18.avif';
import p19 from './images/pc19.avif';
import p20 from './images/pc20.avif';
import p21 from './images/pc21.avif';
import p22 from './images/pc22.avif';
import p23 from './images/pc23.avif';
import p24 from './images/pc24.avif';
import p25 from './images/pc25.avif';
import p26 from './images/pc26.avif';
import p27 from './images/pc27.avif';
import p28 from './images/pc28.avif';

const cakes = [
  { id: 1, name: 'Chocolate Cake', image: p1 },
  { id: 2, name: 'Vanilla Cake', image: p2 },
  { id: 3, name: 'Red Velvet Cake', image: p3 },
  { id: 4, name: 'Lemon Cake', image: p4 },
  { id: 5, name: 'Carrot Cake', image: p5 },
  { id: 6, name: 'Cheesecake', image: p6 },
  { id: 7, name: 'Strawberry Cake', image: p7 },
  { id: 8, name: 'Black Forest Cake', image: p8 },
  { id: 9, name: 'Pineapple Cake', image: p9 },
  { id: 10, name: 'Marble Cake', image: p10},
  { id: 11, name: 'Coconut Cake', image:p11 },
  { id: 12, name: 'Pumpkin Cake', image: p12 },
  { id: 13, name: 'Almond Cake', image: p13 },
  { id: 14, name: 'Coffee Cake', image: p14 },
  { id: 15, name: 'Banana Cake', image: p15},
  { id: 16, name: 'Blueberry Cake', image: p16 },
  { id: 17, name: 'Mango Cake', image: p17 },
  { id: 18, name: 'Butter Cake', image: p18},
  { id: 19, name: 'Orange Cake', image: p19},
  { id: 20, name: 'Peanut Butter Cake', image: p20 },
  { id: 21, name: 'Mint Chocolate Cake', image: p21},
  { id: 22, name: 'Tiramisu Cake', image: p22 },
  { id: 23, name: 'Matcha Cake', image: p23 },
  { id: 24, name: 'Hazelnut Cake', image: p24 },
  { id: 25, name: 'Funfetti Cake', image: p25 },
  { id: 26, name: 'Lava Cake', image:p26 },
  { id: 27, name: 'Zucchini Cake', image: p27 },
  { id: 28, name: 'Pistachio Cake', image: p28 },
];

function CakeGrid({ quantities, handleIncrement, handleDecrement }) {
  
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
  { text: 'Eco-Friendly Plan', onClick: () => console.log('Eco-Friendly Plan clicked') },
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

    <div className="cake-grid">
      {cakes.map((cake, index) => (
        <div key={cake.id} className="cake-item">
          <img src={cake.image} alt={cake.name} className="cake-image" />
          <h3>{cake.name}</h3>
          <div className="counter">
            <button onClick={() => handleDecrement(index)}>-</button>
            <span>{quantities[index]} kg</span>
            <button onClick={() => handleIncrement(index)}>+</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default CakeGrid;