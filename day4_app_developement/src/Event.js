// src/App.js or src/pages/MainPage.js
import React, { useState } from 'react';
import MusicSection from './MusicSection';
import DanceSection from './DanceSection';
import DJSection from './DjSection';
import GamesSection from './GameSection';
import BookingSummary from './BookingSummary';
import { Typography } from '@mui/material';
const Event = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleBook = (price) => {
    setTotalPrice(prevPrice => prevPrice + price);
  };

  return (
    <div>
      <Typography variant="h2" component="div" gutterBottom align="center" style={{color:"#E64833"}} fontFamily={"fantasy"}>
        Book Your Event
      </Typography>
      <MusicSection onBook={handleBook} />
      <DanceSection onBook={handleBook} />
      <DJSection onBook={handleBook} />
      <GamesSection onBook={handleBook} />
      <BookingSummary totalPrice={totalPrice} />
    </div>
  );
};

export default Event;
