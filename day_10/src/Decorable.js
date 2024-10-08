import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Footer from './Footer';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from '@mui/material';
import logo from './images/Blogo.jpg';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from './MyAppBar';
import './MyAppBar.css';
// import d1 from './images/dec1.jpg';
// import d2 from './images/dec2.jpg';
// import d3 from './images/dec3.jpg';
// import d4 from './images/dec4.jpg';
// import d5 from './images/dec5.avif';
// import d6 from './images/dec6.jpg';
// import d7 from './images/dec7.jpg';
// import d8 from './images/dec8.jpg';
// import d9 from './images/dec9.jpg';
// import d10 from './images/dec10.jpg';
// import d11 from './images/dec11.jpg';
// import d12 from './images/dec12.jpg';
// import d13 from './images/dec13.jpg';
// import d14 from './images/dec14.jpg';
// import d15 from './images/dec15.jpg';
// import d16 from './images/dec16.jpg';
// import d17 from './images/dec17.jpg';
// import d18 from './images/dec18.jpg';
// import d19 from './images/dec19.jpg';
// import d20 from './images/dec20.avif';
// import d21 from './images/dec21.jpg';
// import d22 from './images/dec22.webp';
// import d23 from './images/dec23.avif';
// import d24 from './images/dec24.jpg';
// import d25 from './images/dec25.jpg';
// import d26 from './images/dec26.webp';
// import d27 from './images/dec27.jpg';
// import d28 from './images/dec28.jpg';
// import d29 from './images/dec29.jpg';
// import d30 from './images/dec30.jpg';
import './decorable.css';

// const items = [
//   { id: 1, name: 'Balloon Arch', image: d1 },
//   { id: 2, name: 'Confetti', image: d2 },
//   { id: 26, name: 'Balloon Garland', image: d26},
//   { id: 4, name: 'Birthday Banner', image: d4 },
//   { id: 5, name: 'Party Hats', image: d5},
//   { id: 6, name: 'Party Blowers', image: d6},
//   { id: 7, name: 'Table Centerpieces', image: d7 },
//   { id: 8, name: 'Paper Lanterns', image: d8},
//   { id: 9, name: 'Tablecloth', image: d9},
//   { id: 10, name: 'Cake Topper', image: d10 },
//   { id: 11, name: 'Party Favors', image: d11},
//   { id: 12, name: 'Photo Booth Props', image: d12 },
//   { id: 13, name: 'Hanging Decorations', image: d13},
//   { id: 14, name: 'Candles', image: d14},
//   { id: 15, name: 'Confetti Poppers', image: d15},
//   { id: 16, name: 'Gift Bags', image: d16 },
//   { id: 17, name: 'Party Streamers', image: d17 },
//   { id: 18, name: 'Happy Birthday Sign', image: d18 },
//   { id: 19, name: 'Balloon Bouquets', image: d19},
//   { id: 20, name: 'Cupcake Toppers', image: d20},
//   { id: 21, name: 'Table Decorations', image: d21},
//   { id: 22, name: 'Crackers', image: d22},
//   { id: 23, name: 'Party Plates', image: d23 },
//   { id: 24, name: 'Streamers and Ribbons', image: d24 },
//   { id: 25, name: 'Inflatable Decorations', image: d25},
//   { id: 3, name: 'Streamers', image: d3 },
//   { id: 27, name: 'Backdrop Curtain', image: d27},
//   { id: 28, name: 'Bunting Flags', image: d28},
//   { id: 29, name: 'Party Straws', image: d29 },
//   { id: 30, name: 'Glow Sticks', image: d30}
// ];

function Decorable() {
  const { user, logout } = useAuth();
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:8081/new/add')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  const handleAddRemoveItem = async (item) => {
    if (!user) {
      toast.info('Please log in to add items.');
      return;
    }

    try {
      const existingItem = selectedItems.find((id) => id === item.id);
      if (existingItem) {
        await axios.delete(`http://localhost:8081/selectedItems/${item.id}`);
        setSelectedItems((prevItems) => prevItems.filter(id => id !== item.id));
        toast.info('Item removed');
      } else {
        await axios.post('http://localhost:8081/selectedItems', {
          id: item.id,
          name: item.name,
          user2: { id: user.id },
        });
        setSelectedItems((prevItems) => [...prevItems, item.id]);
        toast.success('Item added\nGo to event page and give Submit to confirm');
      }
    } catch (error) {
      toast.error('Error updating item. Please try again later.');
    }
  };

  const handleLogout = () => {
    logout();
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
    { text: 'Dashboard', onClick: () => navigate('/') },
    { text: 'Events', onClick: () => navigate('/event') },
    { text: 'Cakes', onClick: () => navigate('/cakesec') },
    { text: 'Decorables', onClick: () => navigate('/decorates') },
    { text: 'Eco-Friendly Plan', onClick: () => navigate('/eco-Plan') },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <Toolbar />
      <div className="App">
        <h1 className="titless">Decorate Your Day More Special</h1>
        <div className="grid-containers">
          {filteredItems.map((item) => (
            <div className="grid-items" key={item.id}>
              <img src={require(`./images/${item.image}`)} alt={item.name} className="item-images" />
              <h3 className="item-names">{item.name}</h3>
              <button
                onClick={() => handleAddRemoveItem(item)}
                className="action-buttonss"
              >
                {selectedItems.includes(item.id) ? 'Remove' : 'Add'}
              </button>
              {selectedItems.includes(item.id) && <span className="favorite-icon">⭐</span>}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Decorable;
