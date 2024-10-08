import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Divider } from '@mui/material';
// import ev1 from './images/ev1.jpg';
// import ev2 from './images/ev2.jpg';
// import ev3 from './images/ev3.jpg';
// import ev4 from './images/ev4.jpg';
// import ev5 from './images/ev5.jpg';
// import ev6 from './images/ev6.jpg';

// const initialMusicTypes = [
//   { title: "Jazz", image: ev1, description: "Smooth and relaxing Jazz music.", rating: 4.5, price: 50 },
//   { title: "Pop", image: ev2, description: "Upbeat and catchy Pop tunes.", rating: 4.7, price: 40 },
//   { title: "Classical", image: ev3, description: "Timeless classical music.", rating: 4.8, price: 60 },
//   { title: "Rock", image: ev4, description: "Energetic rock music.", rating: 4.6, price: 55 },
//   { title: "Hip Hop", image: ev5, description: "Rhythmic and dynamic Hip Hop.", rating: 4.4, price: 45 },
//   { title: "Country", image: ev6, description: "Soulful country music.", rating: 4.3, price: 35 },
// ];

const MusicSection = ({ searchQuery, onBook }) => {
  const [musicTypes, setMusicTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    // Fetch the music types from the database
    axios.get('http://localhost:8081/new/music')
      .then(response => {
        setMusicTypes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the music types!", error);
        toast.error('Failed to fetch music types. Please try again.');
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
      const updatedMusicTypes = musicTypes.map((music) =>
        music.title === selectedContent.title ? { ...music, rating: newValue } : music
      );
      setMusicTypes(updatedMusicTypes);
      setSelectedContent((prevContent) => ({
        ...prevContent,
        rating: newValue,
      }));
    }
  };
  

  const filteredMusic = musicTypes.filter(music => 
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{ color: '#3f51b5', fontFamily: 'fantasy', fontStyle: 'italic' }}
        >
          Music
        </Typography>
        <Grid container spacing={4}>
          {filteredMusic.map((music, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: 3,
                  height: '100%',
                  bgcolor: '#AFDDE5',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={require(`./images/${music.image}`)}
                  alt={music.title}
                  sx={{ objectFit: 'cover', borderBottom: '1px solid #ddd' }}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {music.title}
                  </Typography>
                  <Rating
                    value={music.rating}
                    precision={0.1}
                    readOnly
                  />
                  <Typography variant="body1" color="textSecondary">
                    Price: ${music.price}
                  </Typography>
                  <Button
                    onClick={() => handleClickOpen(music)}
                    variant="outlined"
                    sx={{ mt: 1 }}
                  >
                    View Details
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={()=>onBook(music.title,music.price)}
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

export default MusicSection;
