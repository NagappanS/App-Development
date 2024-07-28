import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Rating from '@mui/material/Rating';
import ev19 from './images/ev19.jpg';
import ev20 from './images/ev20.jpg';
import ev21 from './images/ev21.jpg';
import ev22 from './images/ev22.jpg';
import ev23 from './images/ev23.jpg';
import ev24 from './images/ev24.jpg';

const initialGameTypes = [
  { title: "Board Games", image: ev19, description: "Classic and modern board games for all ages.", rating: 4.8, price: 30 },
  { title: "Video Games", image: ev20, description: "Exciting and immersive video games.", rating: 4.7, price: 50 },
  { title: "Outdoor Games", image: ev21, description: "Fun and active outdoor games.", rating: 4.6, price: 20 },
  { title: "Card Games", image: ev22, description: "Strategic and entertaining card games.", rating: 4.5, price: 25 },
  { title: "Puzzle Games", image: ev23, description: "Challenging and mind-bending puzzle games.", rating: 4.4, price: 15 },
  { title: "Arcade Games", image: ev24, description: "Classic and new arcade games.", rating: 4.3, price: 35 },
];

const GamesSection = ({ onBook }) => {
  const [gameTypes, setGameTypes] = useState(initialGameTypes);
  const [open, setOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickOpen = (content) => {
    setSelectedContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContent(null);
  };

  const handleRatingChange = (event, newValue) => {
    if (selectedContent) {
      setGameTypes((prevTypes) =>
        prevTypes.map((game) =>
          game.title === selectedContent.title ? { ...game, rating: newValue } : game
        )
      );
    }
  };

  const handleBook = (price) => {
    onBook(price);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <Typography variant="h4" component="div" gutterBottom>
          <span style={{ fontFamily: "fantasy", fontStyle: "italic", color: "#748D92" }}>Games</span>
        </Typography>
        <Grid container spacing={4}>
          {gameTypes.map((game, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ bgcolor: '#C1C8E4', height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={game.image}
                  alt={game.title}
                  sx={{ objectFit: 'cover', borderRadius: 1 }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ fontFamily: 'Poppins, sans-serif', color: '#000000' }}>
                    {game.title}
                  </Typography>
                  <Rating
                    value={game.rating}
                    precision={0.1}
                    onChange={(event, newValue) => handleRatingChange(event, newValue)}
                  />
                  <Typography variant="h6" color="textSecondary" sx={{ color: '#000000' }}>Price: ${game.price}</Typography>
                  <Button onClick={() => handleClickOpen(game)} variant="outlined" color="inherit" sx={{ mt: 1 }}>
                    View Details
                  </Button>
                  <Button color="primary" variant="contained" sx={{ mt: 1 }} onClick={() => handleBook(game.price)}>Book</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedContent?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedContent?.description}
          </DialogContentText>
          <Typography variant="body1" color="textSecondary">
            Price: ${selectedContent?.price}
          </Typography>
          <Rating
            value={selectedContent?.rating || 0}
            precision={0.1}
            onChange={(event, newValue) => handleRatingChange(event, newValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Event Booked!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default GamesSection;
