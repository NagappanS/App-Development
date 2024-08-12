import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0); // State for user count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingRes = await axios.get('http://localhost:8081/pendingRequests');
        console.log('Pending Requests Response:', pendingRes.data);
        setPendingRequests(Array.isArray(pendingRes.data) ? pendingRes.data : []);

        const acceptedRes = await axios.get('http://localhost:8081/acceptedRequests');
        console.log('Accepted Requests Response:', acceptedRes.data);
        setAcceptedRequests(Array.isArray(acceptedRes.data) ? acceptedRes.data : []);

        const rejectedRes = await axios.get('http://localhost:8081/rejectedRequests');
        console.log('Rejected Requests Response:', rejectedRes.data);
        setRejectedRequests(Array.isArray(rejectedRes.data) ? rejectedRes.data : []);

        const usersRes = await axios.get('http://localhost:8081/users');
        console.log('Users Response:', usersRes.data);
        const filteredUsers = Array.isArray(usersRes.data) ? usersRes.data.filter(user => user.roles === 'user') : [];
        setUsers(filteredUsers);
        setUserCount(filteredUsers.length); // Set user count based on role
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set empty arrays if there's an error
        setPendingRequests([]);
        setAcceptedRequests([]);
        setRejectedRequests([]);
        setUsers([]);
        setUserCount(0); // Reset user count on error
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const request = pendingRequests.find(req => req.id === id);
  
      // Add to accepted requests
      await axios.post('http://localhost:8081/acceptedRequests', request);
  
      // Remove from pending requests
      await axios.delete(`http://localhost:8081/pendingRequests/${id}`);
  
      // Update state
      setPendingRequests(pendingRequests.filter(req => req.id !== id));
      setAcceptedRequests([...acceptedRequests, request]);
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };
  
  const handleReject = async (id) => {
    try {
      const request = pendingRequests.find(req => req.id === id);
  
      // Add to rejected requests
      await axios.post('http://localhost:8081/rejectedRequests', request);
  
      // Remove from pending requests
      await axios.delete(`http://localhost:8081/pendingRequests/${id}`);
  
      // Update state
      setPendingRequests(pendingRequests.filter(req => req.id !== id));
      setRejectedRequests([...rejectedRequests, request]);
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const data = [
    { name: 'Pending Requests', value: pendingRequests.length },
    { name: 'Accepted Requests', value: acceptedRequests.length },
    { name: 'Rejected Requests', value: rejectedRequests.length },
  ];

  const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ padding: 2, backgroundColor: '#e0f7fa' }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{userCount}</Typography> {/* Display user count */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ padding: 2, backgroundColor: '#fff3e0' }}>
            <Typography variant="h6">Pending Requests ({pendingRequests.length})</Typography>
            <List>
              {pendingRequests.map((request) => (
                <ListItem key={request.id}>
                  <ListItemText primary={request.username} secondary={request.email} />
                  <Button onClick={() => handleAccept(request.id)} variant="contained" color="success">Accept</Button>
                  <Button onClick={() => handleReject(request.id)} variant="contained" color="error">Reject</Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ padding: 2, backgroundColor: '#e8f5e9' }}>
            <Typography variant="h6">Accepted Requests ({acceptedRequests.length})</Typography>
            <List>
              {Array.isArray(acceptedRequests) && acceptedRequests.map((request) => (
                <ListItem key={request.id}>
                  <ListItemText primary={request.username} secondary={request.email} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ padding: 2, backgroundColor: '#ffebee' }}>
            <Typography variant="h6">Rejected Requests ({rejectedRequests.length})</Typography>
            <List>
              {Array.isArray(rejectedRequests) && rejectedRequests.map((request) => (
                <ListItem key={request.id}>
                  <ListItemText primary={request.username} secondary={request.email} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, backgroundColor: '#f0f4c3' }}>
            <Typography variant="h6">Requests Distribution</Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
