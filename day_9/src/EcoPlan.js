import React, { useState } from 'react';
import './eco.css';
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
import Footer from './Footer';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { Search, SearchIconWrapper, StyledInputBase } from './MyAppBar';
import './MyAppBar.css';
import { Link } from '@mui/material';
// import pc1 from './images/hii.jpg';
// import pc2 from './images/straw.jpg';
// import pc3 from './images/crackers.jpg';
// import pc4 from './images/bag.jpg';
// import pc5 from './images/bamboo.jpg';
// import pc6 from './images/confetti.jpg';
// import pc7 from './images/plate.jpg';
// import pc8 from './images/cup.jpg';
// import pc9 from './images/napkins.jpg';
// import pc10 from './images/Compostable.jpg';
// import pc11 from './images/table cloth.jpg';
// import pc12 from './images/Recycled Paper Decorations.jpg';
// import pc13 from './images/Natural Fiber Ribbons.jpg';
// import pc14 from './images/Eco-friendly Gift Wrap.jpg';
// import pc15 from './images/Solar-Powered Lights.jpg';
// import pc16 from './images/Eco-friendly Candles.jpg';
// import pc17 from './images/Plant-Based Decoration.jpg';
// import pc18 from './images/Reusable Gift Bags.jpg';

const EcoPlan = () => {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [itemss, setItemss] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();


  
  useEffect(() => {
    axios.get('http://localhost:8081/new/ecoitem') // Adjust to match your backend endpoint
      .then(response => {
        setItemss(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  const filteredItems = itemss.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

const handleAdd = async (itemname, price) => {
  if (user) {
    try {
      await axios.post('http://localhost:8081/cart', {
        name: itemname,
        price: price,
        user3: { id: user.id },
      });

      setItems([...items, { name: itemname, price }]);
      toast.success(`${itemname} added to cart!\nGo to event page and give Submit to confirm`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error adding item to cart. Please try again later.');
    }
  } else {
    toast.error('Please log in to add items to the cart.');
  }
};


  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!');
  };

  const menuItems = [
    { text: 'Dashboard', onClick: () => navigate('/') },
    { text: 'Events', onClick: () => navigate('/event') },
    { text: 'Cakes', onClick: () => navigate('/cakesec') },
    { text: 'Decorables', onClick: () => navigate('/decorates') },
    { text: 'Eco-Friendly Plan', onClick: () => navigate('/eco-Plan') },
  ];

  // const filteredItems = [
  //   { src: pc1, name: 'Reusable Water Balloons', price: 5 },
  //   { src: pc2, name: 'Reusable Straw', price: 2 },
  //   { src: pc3, name: 'Homemade Crackers', price: 3 },
  //   { src: pc4, name: 'Reusable Shopping Bags', price: 10 },
  //   { src: pc5, name: 'Bamboo Utensils', price: 7 },
  //   { src: pc6, name: 'Eco-friendly Confetti', price: 4 },
  //   { src: pc7, name: 'Eco-friendly Paper Plates', price: 6 },
  //   { src: pc8, name: 'Biodegradable Cups', price: 5 },
  //   { src: pc9, name: 'Eco-friendly Napkins', price: 3 },
  //   { src: pc10, name: 'Compostable Cutlery', price: 8 },
  //   { src: pc11, name: 'Organic Cotton Tablecloth', price: 15 },
  //   { src: pc12, name: 'Recycled Paper Decorations', price: 12 },
  //   { src: pc13, name: 'Natural Fiber Ribbons', price: 6 },
  //   { src: pc14, name: 'Eco-friendly Gift Wrap', price: 4 },
  //   { src: pc15, name: 'Solar-Powered Lights', price: 20 },
  //   { src: pc16, name: 'Eco-friendly Candles', price: 8 },
  //   { src: pc17, name: 'Plant-Based Decorations', price: 10 },
  //   { src: pc18, name: 'Reusable Gift Bags', price: 5 },
  // ].filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#508C9B' }} className="appBar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Link href="/"><img src={logo} alt="Logo" className="logo" style={{ borderRadius: '5px' }} /></Link>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      <div className='bod'>
        <div className="apps">
          <h1>Eco-Friendly Decorables</h1>
          <div className="grid-containe">
            {filteredItems.map((item, index) => (
              <div className="grid-ite" key={index}>
                <img src={require(`./images/${item.image}`)}alt={item.name} />
                <div className="item-nam">{item.name}</div>
                <button className="add-but" onClick={() => handleAdd(item.name, item.price)}>
                  Add to Cart (${item.price})
                </button>
              </div>
            ))}
          </div>
          <div className="eco-info">
            <h2>Why Choose Eco-Friendly Products?</h2>
            <p>Choosing eco-friendly products helps to reduce waste and minimize our environmental impact. These products are designed to be sustainable, biodegradable, and made from renewable resources. By opting for eco-friendly options, you are contributing to a healthier planet and supporting practices that promote environmental conservation.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default EcoPlan;
