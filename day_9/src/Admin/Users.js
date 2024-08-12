import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users');
        // Filter users based on their role
        const filteredUsers = response.data.filter(user => user.roles === 'user');
        setUsers(filteredUsers);
        setUserCount(filteredUsers.length); // Set the count of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/users/${userId}`);
      // Update the local state to remove the deleted user
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      setUserCount(updatedUsers.length); // Update the count after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <Typography variant="h6" gutterBottom>
        Total Users: {userCount}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
