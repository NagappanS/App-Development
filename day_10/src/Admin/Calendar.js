import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import axios from 'axios';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [decorables, setDecorables] = useState([]);
  const [cakes, setCakes] = useState([]);
  const [events, setEvents] = useState([]);
  const [ecoPlans, setEcoPlans] = useState([]);
  const [birthdays, setBirthdays] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const acceptedResponse = await axios.get('http://localhost:8081/acceptedRequests');
        const rejectedResponse = await axios.get('http://localhost:8081/rejectedRequests');
        const decorablesResponse = await axios.get('http://localhost:8081/selectedItems');
        const cakesResponse = await axios.get('http://localhost:8081/orders');
        const eventsResponse = await axios.get('http://localhost:8081/event');
        const ecoPlansResponse = await axios.get('http://localhost:8081/cart');
        
        setAcceptedRequests(acceptedResponse.data);
        setRejectedRequests(rejectedResponse.data);
        setDecorables(decorablesResponse.data);
        setCakes(cakesResponse.data);
        setEvents(eventsResponse.data);
        setEcoPlans(ecoPlansResponse.data);

        const birthdates = acceptedResponse.data.map(request => new Date(request.birthdate));
        setBirthdays(birthdates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItemsForUser = (userId) => (
    <>
      <Typography variant="h6" gutterBottom>
        Decorables
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {decorables
          .filter(item => item.userId === userId)
          .map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Cakes Chosen
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {cakes
          .filter(cake => cake.userId === userId)
          .map(cake => (
            <Grid item xs={12} sm={6} md={4} key={cake.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{cake.name}</Typography>
                  <Typography variant="body2">Price: ${cake.price}</Typography>
                  <Typography variant="body2">Quantity: {cake.quantity}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Events Booked
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {events
          .filter(event => event.userId === userId)
          .map(event => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{event.eventname}</Typography>
                  <Typography variant="body2">Price: {event.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Eco Plans
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {ecoPlans
          .filter(plan => plan.userId === userId)
          .map(plan => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{plan.name}</Typography>
                  <Typography variant="body2">Price: ${plan.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );

  const tileContent = ({ date, view }) => {
    if (view === 'month' && birthdays.some(birthday => 
      birthday.getDate() === date.getDate() &&
      birthday.getMonth() === date.getMonth() &&
      birthday.getFullYear() === date.getFullYear())) {
      return (
        <div style={{ backgroundColor: '#FFD700', borderRadius: '50%', width: '10px', height: '10px', margin: '0 auto' }} />
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Calendar
          onChange={setDate}
          value={date}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          tileContent={tileContent}
        />
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Accepted Requests
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {acceptedRequests.map(request => (
          <Grid item xs={16} sm={10} md={8} key={request.email}>
            <Card sx={{ backgroundColor: '#d4edda' }}>
              <CardContent>
                <Typography variant="h6">Username: {request.username}</Typography>
                <Typography variant="body2">Email: {request.email}</Typography>
                <Typography variant="body2">Phone: {request.phone}</Typography>
                <Typography variant="body2">Address: {request.address}</Typography>
                <Typography variant="body2">Gender: {request.gender}</Typography>
                <Typography variant="body2">Birthday Boy/Girl Name: {request.birthdayboyorgirl}</Typography>
                <Typography variant="body2">Birthdate: {request.birthdate}</Typography>
                <Typography variant="body2">Age: {request.age}</Typography>

                {renderItemsForUser(request.userId)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="h6" gutterBottom>
        Rejected Requests
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {rejectedRequests.map(request => (
          <Grid item xs={12} sm={6} md={4} key={request.email}>
            <Card sx={{ backgroundColor: '#f8d7da' }}>
              <CardContent>
                <Typography variant="h6">Username: {request.username}</Typography>
                <Typography variant="body2">Email: {request.email}</Typography>
                <Typography variant="body2">Phone: {request.phone}</Typography>
                <Typography variant="body2">Address: {request.address}</Typography>
                <Typography variant="body2">Gender: {request.gender}</Typography>
                <Typography variant="body2">Birthday Boy/Girl Name: {request.birthdayboyorgirl}</Typography>
                <Typography variant="body2">Birthdate: {request.birthdate}</Typography>
                <Typography variant="body2">Age: {request.age}</Typography>

                {renderItemsForUser(request.userId)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CalendarPage;
