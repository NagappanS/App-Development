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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import Rating from '@mui/material/Rating';
import ev13 from './images/ev13.jpg';
import ev14 from './images/ev14.jpg';
import ev15 from './images/ev15.jpg';
import ev16 from './images/ev16.jpg';
import ev17 from './images/ev17.jpg';
import ev18 from './images/ev18.jpg';

const initialDJStyles = [
  { title: "House", image: ev13, description: "Uplifting and rhythmic House music.", rating: 4.8, price: 100 },
  { title: "Techno", image: ev14, description: "Energetic and pulsating Techno beats.", rating: 4.7, price: 120 },
  { title: "Trance", image: ev15, description: "Hypnotic and melodic Trance music.", rating: 4.6, price: 110 },
  { title: "Hip Hop", image: ev16, description: "Groovy and dynamic Hip Hop sets.", rating: 4.5, price: 90 },
  { title: "Dubstep", image: ev17, description: "Heavy bass and electrifying Dubstep.", rating: 4.4, price: 130 },
  { title: "Drum & Bass", image: ev18, description: "Fast-paced and energetic Drum & Bass.", rating: 4.3, price: 105 },
];

const DjSection = ({ onBook }) => {
  const [djStyles, setDJStyles] = useState(initialDJStyles);
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
      setDJStyles((prevStyles) =>
        prevStyles.map((dj) =>
          dj.title === selectedContent.title ? { ...dj, rating: newValue } : dj
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
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <Typography variant="h4" component="div" gutterBottom>
          <span style={{ fontFamily: "fantasy", fontStyle: "italic", color: "#90AEAD" }}>DJ</span>
        </Typography>
        <Grid container spacing={4}>
          {djStyles.map((dj, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ bgcolor: '#90AEAD', height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={dj.image}
                  alt={dj.title}
                  sx={{ objectFit: 'cover', borderRadius: 1 }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ fontFamily: 'Poppins, sans-serif', color: '#ffffff' }}>
                    {dj.title}
                  </Typography>
                  <Rating
                    value={dj.rating}
                    precision={0.1}
                    onChange={(event, newValue) => handleRatingChange(event, newValue)}
                  />
                  <Typography variant="h6" color="textSecondary" sx={{ color: '#ffffff' }}>Price: ${dj.price}</Typography>
                  <Button onClick={() => handleClickOpen(dj)} variant="outlined" color="inherit" sx={{ mt: 1 }}>
                    View Details
                  </Button>
                  <Button color="primary" variant="contained" sx={{ mt: 1 }} onClick={() => handleBook(dj.price)}>Book</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

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

export default DjSection;
