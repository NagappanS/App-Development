// src/components/BookingSummary.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({ totalPrice }) => {
  const [open, setOpen] = useState(false);
  const history = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    history('/user-form'); 
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mt: 4 }}>
        Submit to Confirm
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The total price of your booked events is ${totalPrice}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm to Fill Form
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingSummary;
