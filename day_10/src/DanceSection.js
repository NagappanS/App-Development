import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Grid, Box, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Rating } from '@mui/material';
// import ev7 from './images/ev7.jpg';
// import ev8 from './images/ev8.jpg';
// import ev9 from './images/ev9.jpg';
// import ev10 from './images/ev10.jpg';
// import ev11 from './images/ev11.jpg';
// import ev12 from './images/ev12.jpg';

// const initialDanceTypes = [
//   { title: "Ballet", image: ev7, description: "Graceful and elegant Ballet dance.", rating: 4.8, price: 50 },
//   { title: "Hip Hop", image: ev8, description: "Energetic and rhythmic Hip Hop dance.", rating: 4.7, price: 40 },
//   { title: "Salsa", image: ev9, description: "Lively and passionate Salsa dance.", rating: 4.6, price: 45 },
//   { title: "Tango", image: ev10, description: "Sensual and dramatic Tango dance.", rating: 4.5, price: 55 },
//   { title: "Contemporary", image: ev11, description: "Expressive and fluid Contemporary dance.", rating: 4.4, price: 60 },
//   { title: "Jazz", image: ev12, description: "Stylish and high-energy Jazz dance.", rating: 4.3, price: 35 },
// ];

const DanceSection = ({ onBook, searchQuery }) => {
  const [danceTypes, setDanceTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/new/dance')
      .then(response => {
        setDanceTypes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the dance types!", error);
        toast.error('Error fetching dance types. Please try again.');
      });
  }, []);

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
      const updatedDanceTypes = danceTypes.map((dance) =>
        dance.title === selectedContent.title ? { ...dance, rating: newValue } : dance
      );
      setDanceTypes(updatedDanceTypes);
      setSelectedContent((prevContent) => ({
        ...prevContent,
        rating: newValue,
      }));
    }
  };

  const filteredDance = danceTypes.filter(dance =>
    dance.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <Typography variant="h4" component="div" gutterBottom>
          <span style={{ fontFamily: "fantasy", fontStyle: "italic", color: "#0FA4AF" }}>Dance</span>
        </Typography>
        <Grid container spacing={4}>
          {filteredDance.map((dance, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ bgcolor: '#0FA4AF', height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={require(`./images/${dance.image}`)}
                  alt={dance.title}
                  sx={{ objectFit: 'cover', borderRadius: 1 }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ fontFamily: 'Poppins, sans-serif', color: '#ffffff' }}>
                    {dance.title}
                  </Typography>
                  <Rating
                    value={dance.rating}
                    precision={0.1}
                    onChange={(event, newValue) => handleRatingChange(event, newValue)}
                  />
                  <Typography variant="h6" color="textSecondary" sx={{ color: '#ffffff' }}>
                    Price: ${dance.price}
                  </Typography>
                  <Button
                    onClick={() => handleClickOpen(dance)}
                    sx={{ mt: 1 }}
                    variant="outlined"
                    color="inherit"
                  >
                    View Details
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={() => onBook(dance.title,dance.price)}
                  >
                    Book
                  </Button>
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
            onChange={handleRatingChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DanceSection;
