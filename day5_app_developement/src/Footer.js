import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from './images/Blogo.jpg';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We are dedicated to making your birthday events special and memorable. Our team ensures every detail is perfectly managed, so you can enjoy your celebration to the fullest.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <div className="footer-links">
              <Link href="/" className="footer-link">Home</Link>
              <Link href="/event" className="footer-link">Events</Link>
              <Link href="/cakesec" className="footer-link">Cakes</Link>
              <Link href="/decorates" className="footer-link">Decorables</Link>
              <Link href="/eco-Plan" className="footer-link">Eco-Friendly Plan</Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: support@birthdayevents.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: (123) 456-7890
            </Typography>
            <div className="social-media-icons">
              <IconButton color="primary" href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" href="https://linkedin.com" target="_blank">
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <img src={logo} alt="Logo" className="footer-logo" />
        <Typography variant="body2" color="textSecondary" align="center" className="footer-bottom">
          &copy; {new Date().getFullYear()} Born Eves. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
