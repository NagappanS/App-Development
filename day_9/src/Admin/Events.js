import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import './event.css';
import { toast } from 'react-toastify';

const Events = () => {
  const [openDecorables, setOpenDecorables] = useState(false);
  const [openCakes, setOpenCakes] = useState(false);
  const [openEcoItems, setOpenEcoItems] = useState(false);
  const [openEvents, setOpenEvents] = useState(false);

  const [formData, setFormData] = useState({
    image: '',
    name: ''
  });
  const [cakeData, setCakeData] = useState({
    image: '',
    name: '',
    price: ''
  });

  const [ecoItemData, setEcoItemData] = useState({
    image: '',
    name: '',
    price: ''
  });
  
  const [eventData, setEventData] = useState({
    title: '',
    image: '',
    rating: '',
    price: '',
    description: ''
  });
  
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const handleOpenDecorables = () => setOpenDecorables(true);
  const handleCloseDecorables = () => setOpenDecorables(false);
  const handleOpenCakes = () => setOpenCakes(true);
  const handleCloseCakes = () => setOpenCakes(false);
  const handleOpenEcoItems = () => setOpenEcoItems(true);
  const handleCloseEcoItems = () => setOpenEcoItems(false);
  const handleOpenEvents = () => {
    setOpenEvents(true);
  };

  const handleCloseEvents = () => {
    setOpenEvents(false);
  };


  
  const handleChangeDecorables = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleChangeCakes = (e) => {
    const { name, value } = e.target;
    setCakeData({ ...cakeData, [name]: value });
  };
  
  const handleChangeEcoItems = (e) => {
    const { name, value } = e.target;
    setEcoItemData({ ...ecoItemData, [name]: value });
  };
  
  const handleChangeEvents = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitDecorables = async () => {
    if (!formData.name || !formData.image) {
      setSnackbarMessage('All fields are required');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      await axios.post(
        'http://localhost:8081/new/add',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setSnackbarMessage('Item added successfully');
      setSnackbarSeverity('success');
      handleCloseDecorables();
    } catch (error) {
      setSnackbarMessage('Error submitting form data');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleSubmitCakes = async () => {
    if (!cakeData.name || !cakeData.image || !cakeData.price) {
      setSnackbarMessage('All fields are required');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await axios.post(
        'http://localhost:8081/new/cake',
        cakeData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setSnackbarMessage('Cake added successfully');
      setSnackbarSeverity('success');
      handleCloseCakes();
    } catch (error) {
      setSnackbarMessage('Error submitting form data');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleSubmitEcoItems = async (e) => {
    e.preventDefault();
    if (!ecoItemData.name || !ecoItemData.image || !ecoItemData.price) {
      toast.error('All fields are required');
      return;
    }
  
    try {
      await axios.post(
        'http://localhost:8081/new/ecoitem',
        ecoItemData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      toast.success('Eco item added successfully');
      handleCloseEcoItems();
    } catch (error) {
      toast.error('Error submitting eco item data');
    }
  };
  
  const handleAddToGames = async () => {
    try {
      await axios.post('http://localhost:8081/new/game', eventData);
      alert('Event added to Games!');
      handleCloseEvents();
    } catch (error) {
      console.error('Failed to add event to Games', error);
    }
  };

  const handleAddToMusic = async () => {
    try {
      await axios.post('http://localhost:8081/new/music', eventData);
      alert('Event added to Music!');
      handleCloseEvents();
    } catch (error) {
      console.error('Failed to add event to Music', error);
    }
  };

  const handleAddToDance = async () => {
    try {
      await axios.post('http://localhost:8081/new/dance', eventData);
      alert('Event added to Dance!');
      handleCloseEvents();
    } catch (error) {
      console.error('Failed to add event to Dance', error);
    }
  };

  const handleAddToDj = async () => {
    try {
      await axios.post('http://localhost:8081/new/dj', eventData);
      alert('Event added to DJ!');
      handleCloseEvents();
    } catch (error) {
      console.error('Failed to add event to DJ', error);
    }
  };

  return (
    <>
    <div className="admin-events">
      <div className="grid-item decorables" onClick={handleOpenDecorables}>
        <h2>Manage Decorables</h2>
      </div>
      <div className="grid-item cakes" onClick={handleOpenCakes}>
        <h2>Manage Cakes</h2>
      </div>
     <div className="grid-item eco-items" onClick={handleOpenEcoItems}>
      <h2>Manage Eco Items</h2>
    </div>
      <div className='grid-item events' onClick={handleOpenEvents}>
        <h2>Manage Events</h2>
      </div>


      {/* Decorables Modal */}
      <Modal
        open={openDecorables}
        onClose={handleCloseDecorables}
        aria-labelledby="manage-decorables-modal"
        aria-describedby="manage-decorables-description"
      >
        <Box className="modal-box">
          <h2 id="manage-decorables-modal">Add Decorables Item</h2>
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChangeDecorables}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChangeDecorables}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmitDecorables}>
            Add Item
          </Button>
        </Box>
      </Modal>

      {/* Cakes Modal */}
      <Modal
        open={openCakes}
        onClose={handleCloseCakes}
        aria-labelledby="manage-cakes-modal"
        aria-describedby="manage-cakes-description"
      >
        <Box className="modal-box">
          <h2 id="manage-cakes-modal">Add Cake Item</h2>
          <TextField
            label="Image URL"
            name="image"
            value={cakeData.image}
            onChange={handleChangeCakes}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={cakeData.name}
            onChange={handleChangeCakes}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={cakeData.price}
            onChange={handleChangeCakes}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmitCakes}>
            Add Cake
          </Button>
        </Box>
      </Modal>

      {/* Eco Items Modal */}
     <Modal
          open={openEcoItems}
          onClose={handleCloseEcoItems}
          aria-labelledby="manage-eco-items-modal"
          aria-describedby="manage-eco-items-description"
        >
          <Box className="modal-box">
            <h2 id="manage-eco-items-modal">Add Eco Item</h2>
            <TextField
              label="Image URL"
              name="image"
              value={ecoItemData.image}
              onChange={handleChangeEcoItems}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              name="name"
              value={ecoItemData.name}
              onChange={handleChangeEcoItems}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              value={ecoItemData.price}
              onChange={handleChangeEcoItems}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmitEcoItems}>
              Add Eco Item
            </Button>
          </Box>
        </Modal>


        <Modal
        open={openEvents}
        onClose={handleCloseEvents}
        aria-labelledby="manage-events-modal"
        aria-describedby="manage-events-description"
      >
        <Box className="modal-box" sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          padding: 2, 
          maxWidth: 500, 
          margin: 'auto', 
          bgcolor: 'background.paper' 
        }}>
          <h2 id="manage-events-modal">Add Event</h2>
          <TextField
            label="Title"
            name="title"
            value={eventData.title}
            onChange={handleChangeEvents}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="image"
            value={eventData.image}
            onChange={handleChangeEvents}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Rating"
            name="rating"
            value={eventData.rating}
            onChange={handleChangeEvents}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={eventData.price}
            onChange={handleChangeEvents}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChangeEvents}
            fullWidth
            margin="normal"
          />
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            justifyContent: 'space-between', 
            marginTop: 2 
          }}>
            <Button variant="contained" color="primary" onClick={handleAddToGames} sx={{ flex: '1 1 45%' }}>
              Add to Games
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddToMusic} sx={{ flex: '1 1 45%' }}>
              Add to Music
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddToDance} sx={{ flex: '1 1 45%' }}>
              Add to Dance
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddToDj} sx={{ flex: '1 1 45%' }}>
              Add to DJ
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    </>
  );
};

export default Events;
