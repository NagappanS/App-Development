import React from 'react';
import { Container, Grid, Toolbar, Typography } from '@mui/material';
import BirthDay1 from './images/birthday1.jpg';
import BirthDay2 from './images/birthday2.jpg';
import BirthDay3 from './images/birthday3.jpg';
import BirthDay4 from './images/birthday4.jpg';
import BirthDay5 from './images/birthday5.jpg';
import BirthDay6 from './images/birthday6.jpg';
import './content.css';

const Content = () => {
  return (
    <>
    <Toolbar/>
    <Container className="App">
      <Typography variant="h4" className="titles">Our Offerings</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <div className="section">
            <img src={BirthDay1} alt="birth 1" className="image" />
            <div className="text">
              <Typography variant="h6">Elegant Decorations</Typography>
              <Typography variant="body1">
              Transform your event with our stunning decorations, designed to add a touch of elegance and style to your special day.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="section">
            <img src={BirthDay3} alt="birth22" className="image" />
            <div className="text">
              <Typography variant="h6">Fun Activities</Typography>
              <Typography variant="body1">
              Engage your guests with exciting activities and entertainment options that ensure everyone has a memorable time.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="section">
            <img src={BirthDay2} alt="" className="image" />
            <div className="text">
              <Typography variant="h6"> Delicious Cakes</Typography>
              <Typography variant="body1">
              Discover our wide variety of cakes, from classic chocolate to exotic fruit flavors, perfect for any celebration.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="section">
            <img src={BirthDay4} alt="" className="image" />
            <div className="text">
              <Typography variant="h6">Themed Party Packages</Typography>
              <Typography variant="body1">
              Choose from our themed party packages, which include everything you need to host a spectacular event with minimal hassle.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="section">
            <img src={BirthDay5} alt="" className="image" />
            <div className="text">
              <Typography variant="h6">Exquisite Catering</Typography>
              <Typography variant="body1">
              Enjoy gourmet catering services that offer a range of delectable dishes, tailored to delight your guests and enhance your event.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="section">
            <img src={BirthDay6} alt="" className="image" />
            <div className="text">
              <Typography variant="h6">Custom Invitations</Typography>
              <Typography variant="body1">
              Make a great first impression with our custom invitations, designed to capture the theme and spirit of your event perfectly.
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default Content;
