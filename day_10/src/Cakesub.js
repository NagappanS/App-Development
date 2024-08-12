import React, { useState } from 'react';
import './cakesub.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Toolbar } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppBar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider, Button, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Search, SearchIconWrapper, StyledInputBase } from './MyAppBar';
import Footer from './Footer';
import './MyAppBar.css';
import logo from './images/Blogo.jpg';
// import p1 from './images/pc1.jpg';
// import p2 from './images/pc2.jpg';
// import p3 from './images/pc3.avif';
// import p4 from './images/pc4.avif';
// import p5 from './images/pc5.avif';
// import p6 from './images/pc6.avif';
// import p7 from './images/pc7.avif';
// import p8 from './images/pc8.avif';
// import p9 from './images/pc9.avif';
// import p10 from './images/pc10.avif';
// import p11 from './images/pc11.avif';
// import p12 from './images/pc12.avif';
// import p13 from './images/pc13.avif';
// import p14 from './images/pc14.avif';
// import p15 from './images/pc15.avif';
// import p16 from './images/pc16.avif';
// import p17 from './images/pc17.avif';
// import p18 from './images/pc18.avif';
// import p19 from './images/pc19.avif';
// import p20 from './images/pc20.avif';
// import p21 from './images/pc21.avif';
// import p22 from './images/pc22.avif';
// import p23 from './images/pc23.avif';
// import p24 from './images/pc24.avif';
// import p25 from './images/pc25.avif';
// import p26 from './images/pc26.avif';
// import p27 from './images/pc27.avif';
// import p28 from './images/pc28.avif';
import './MyAppBar.css';
import './cakegrid.css';

// const cakes = [
//   { id: 1, name: 'Chocolate Cake', image: p1, price: 20.4 },
//   { id: 2, name: 'Vanilla Cake', image: p2, price: 18.5 },
//   { id: 3, name: 'Red Velvet Cake', image: p3, price: 22.0 },
//   { id: 4, name: 'Lemon Cake', image: p4, price: 19.0 },
//   { id: 5, name: 'Carrot Cake', image: p5, price: 21.0 },
//   { id: 6, name: 'Cheesecake', image: p6, price: 25.0 },
//   { id: 7, name: 'Strawberry Cake', image: p7, price: 23.0 },
//   { id: 8, name: 'Black Forest Cake', image: p8, price: 24.0 },
//   { id: 9, name: 'Pineapple Cake', image: p9, price: 20.0 },
//   { id: 10, name: 'Marble Cake', image: p10, price: 22.5 },
//   { id: 11, name: 'Coconut Cake', image: p11, price: 21.5 },
//   { id: 12, name: 'Pumpkin Cake', image: p12, price: 19.5 },
//   { id: 13, name: 'Almond Cake', image: p13, price: 23.5 },
//   { id: 14, name: 'Coffee Cake', image: p14, price: 20.5 },
//   { id: 15, name: 'Banana Cake', image: p15, price: 18.0 },
//   { id: 16, name: 'Blueberry Cake', image: p16, price: 22.0 },
//   { id: 17, name: 'Mango Cake', image: p17, price: 21.0 },
//   { id: 18, name: 'Butter Cake', image: p18, price: 19.0 },
//   { id: 19, name: 'Orange Cake', image: p19, price: 20.0 },
//   { id: 20, name: 'Peanut Butter Cake', image: p20, price: 24.5 },
//   { id: 21, name: 'Mint Chocolate Cake', image: p21, price: 22.5 },
//   { id: 22, name: 'Tiramisu Cake', image: p22, price: 27.0 },
//   { id: 23, name: 'Matcha Cake', image: p23, price: 23.0 },
//   { id: 24, name: 'Hazelnut Cake', image: p24, price: 25.0 },
//   { id: 25, name: 'Funfetti Cake', image: p25, price: 21.5 },
//   { id: 26, name: 'Lava Cake', image: p26, price: 26.0 },
//   { id: 27, name: 'Zucchini Cake', image: p27, price: 22.0 },
//   { id: 28, name: 'Pistachio Cake', image: p28, price: 24.0 },
// ];

function Cakesub() {
  const { user, logout } = useAuth();
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState(cakes.map(() => 0));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:8081/new/cakes') 
      .then(response => {
        setCakes(response.data);
        setQuantities(new Array(response.data.length).fill(0));
      })
      .catch(error => {
        console.error("There was an error fetching the cakes!", error);
      });
  }, []);

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
    }
    setQuantities(newQuantities);
  };

  const handleAddNow = async (index) => {
    try {
      if (!user) {
        toast.error('Please log in to add items.');
        return;
      }

      const selectedCake = {
        name: cakes[index].name,
        price: cakes[index].price,
        quantity: quantities[index],
        user1: { id: user.id },
      };

      if (selectedCake.quantity === 0) {
        toast.error("Please select at least one quantity.");
        return;
      }

      const response = await axios.post('http://localhost:8081/orders', selectedCake, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Item added successfully!\nGo to event page and give Submit to confirm');
      } else {
        throw new Error('Failed to add item');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('There was an error submitting your order. Please try again.');
    }
  };

  
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Dashboard', onClick: () => navigate('/') },
    { text: 'Events', onClick: () => navigate('/event') },
    { text: 'Cakes', onClick: () => navigate('/cakesec') },
    { text: 'Decorables', onClick: () => navigate('/decorates') },
    { text: 'Eco-Friendly Plan', onClick: () => navigate('/eco-plan') },
  ];
  

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!');
  };

  const filteredCakes = cakes.filter(cake =>
    cake.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
       <AppBar position="fixed" style={{ backgroundColor: '#508C9B' }} className="appBar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Link href="/"><img src={logo} alt="Logo" className="logo" style={{borderRadius:'5px'}} /></Link>
          <Typography variant="h6" noWrap className="title">
            <span style={{ color: 'black', fontWeight: 'bolder', fontSize: '25px' }}>B</span>orn Eves
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
          </Search>
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
      <Toolbar />
      <div className="Appss">
        <header className="App-header">
          <h1>Cake Selection</h1>
          <h2>Make your day more sweet</h2>
        </header>
        <div className="cake-grid">
          {filteredCakes.map((cake, index) => (
            <div key={cake.id} className="cake-item">
              <img src={require(`./images/${cake.image}`)} alt={cake.name} className="cake-image" />
              <h3>{cake.name}</h3>
              <div className="counter">
                <button onClick={() => handleDecrement(index)}>-</button>
                <span>{quantities[index]} kg</span>
                <button onClick={() => handleIncrement(index)}>+</button>
              </div>
              <button className="add-now-btn" onClick={() => handleAddNow(index)}>Add Now</button>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Cakesub;
