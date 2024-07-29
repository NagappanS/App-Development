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
import axios from 'axios';
import { Search, SearchIconWrapper, StyledInputBase } from './MyAppBar';
import './MyAppBar.css';
import { Link } from '@mui/material';
import pc1 from './images/hii.jpg';
import pc2 from './images/straw.jpg';
import pc3 from './images/crackers.jpg';
import pc4 from './images/bag.jpg';
import pc5 from './images/bamboo.jpg';
import pc6 from './images/confetti.jpg';
import pc7 from './images/plate.jpg';
import pc8 from './images/cup.jpg';
import pc9 from './images/napkins.jpg';
import pc10 from './images/Compostable.jpg';
import pc11 from './images/table cloth.jpg';
import pc12 from './images/Recycled Paper Decorations.jpg';
import pc13 from './images/Natural Fiber Ribbons.jpg';
import pc14 from './images/Eco-friendly Gift Wrap.jpg';
import pc15 from './images/Solar-Powered Lights.jpg';
import pc16 from './images/Eco-friendly Candles.jpg';
import pc17 from './images/Plant-Based Decoration.jpg';
import pc18 from './images/Reusable Gift Bags.jpg';

const EcoPlan = () => {
  const [items, setItems] = useState([]);

  const handleAdd = (itemName) => {
    setItems([...items, itemName]);
    console.log('Items:', items);
  };

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
     
     

    <div className='bod'>
    <div className="apps">
      <h1>Eco-Friendly Decorables</h1>
      <div className="grid-containe">
        <div className="grid-ite">
          <img src={pc1} alt="Reusable Water Balloons" />
          <div className="item-nam">Reusable Water Balloons</div>
          <button className="add-but" onClick={() => handleAdd('Reusable Water Balloons')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc2} alt="Reusable Straw" />
          <div className="item-nam">Reusable Straw</div>
          <button className="add-but" onClick={() => handleAdd('Reusable Straw')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc3} alt="Homemade Crackers" />
          <div className="item-nam">Homemade Crackers</div>
          <button className="add-but" onClick={() => handleAdd('Homemade Crackers')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc4} alt="Reusable Shopping Bags" />
          <div className="item-nam">Reusable Shopping Bags</div>
          <button className="add-but" onClick={() => handleAdd('Reusable Shopping Bags')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc5} alt="Bamboo Utensils" />
          <div className="item-nam">Bamboo Utensils</div>
          <button className="add-but" onClick={() => handleAdd('Bamboo Utensils')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc6} alt="Eco-friendly Confetti" />
          <div className="item-nam">Eco-friendly Confetti</div>
          <button className="add-but" onClick={() => handleAdd('Eco-friendly Confetti')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc7} alt="Eco-friendly Paper Plates" />
          <div className="item-nam">Eco-friendly Paper Plates</div>
          <button className="add-but" onClick={() => handleAdd('Eco-friendly Paper Plates')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc8} alt="Biodegradable Cups" />
          <div className="item-nam">Biodegradable Cups</div>
          <button className="add-but" onClick={() => handleAdd('Biodegradable Cups')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc9} alt="Eco-friendly Napkins" />
          <div className="item-nam">Eco-friendly Napkins</div>
          <button className="add-but" onClick={() => handleAdd('Eco-friendly Napkins')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc10} alt="Compostable Cutlery" />
          <div className="item-nam">Compostable Cutlery</div>
          <button className="add-but" onClick={() => handleAdd('Compostable Cutlery')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc11} alt="Organic Cotton Tablecloth" />
          <div className="item-nam">Organic Cotton Tablecloth</div>
          <button className="add-but" onClick={() => handleAdd('Organic Cotton Tablecloth')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc12} alt="Recycled Paper Decorations" />
          <div className="item-nam">Recycled Paper Decorations</div>
          <button className="add-but" onClick={() => handleAdd('Recycled Paper Decorations')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc13} alt="Natural Fiber Ribbons" />
          <div className="item-nam">Natural Fiber Ribbons</div>
          <button className="add-but" onClick={() => handleAdd('Natural Fiber Ribbons')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc14} alt="Eco-friendly Gift Wrap" />
          <div className="item-nam">Eco-friendly Gift Wrap</div>
          <button className="add-but" onClick={() => handleAdd('Eco-friendly Gift Wrap')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc15} alt="Solar-Powered Lights" />
          <div className="item-nam">Solar-Powered Lights</div>
          <button className="add-but" onClick={() => handleAdd('Solar-Powered Lights')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc16} alt="Eco-friendly Candles" />
          <div className="item-nam">Eco-friendly Candles</div>
          <button className="add-but" onClick={() => handleAdd('Eco-friendly Candles')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc17} alt="Plant-Based Decorations" />
          <div className="item-nam">Plant-Based Decorations</div>
          <button className="add-but" onClick={() => handleAdd('Plant-Based Decorations')}>Add to Cart</button>
        </div>
        <div className="grid-ite">
          <img src={pc18} alt="Reusable Gift Bags" />
          <div className="item-nam">Reusable Gift Bags</div>
          <button className="add-but" onClick={() => handleAdd('Reusable Gift Bags')}>Add to Cart</button>
        </div>
      </div>
      <div className="eco-info">
        <h2>Why Choose Eco-Friendly Products?</h2>
        <p>Choosing eco-friendly products helps to reduce waste and minimize our environmental impact. These products are designed to be sustainable, biodegradable, and made from renewable resources. By opting for eco-friendly options, you are contributing to a healthier planet and supporting practices that promote environmental conservation.</p>

      </div>
      <button type="button" className="submit-buttons">Submit</button>
    </div>
    </div>
    </>
  );
}

export default EcoPlan;
