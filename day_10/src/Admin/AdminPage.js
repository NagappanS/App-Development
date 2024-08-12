import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import logo from '../images/Blogo.jpg'; // Make sure the path to the logo is correct
import { useAuth } from '../AuthContext';

const drawerWidth = 240;

const AdminPage = () => {
  const [showAdminTable, setShowAdminTable] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminConfirmPassword, setNewAdminConfirmPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:8081/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const admins = data.filter(user => user.roles === 'admin');
      setAdmins(admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleManageAdminsClick = () => {
    setShowAdminTable(!showAdminTable);
    if (!showAdminTable) {
      fetchAdmins();
    }
  };

  const handleAddAdmin = () => {
    setOpenAddDialog(true);
  };

  const handleAddAdminSubmit = async () => {
    const newAdmin = {
      username: newAdminEmail.split('@')[0],
      email: newAdminEmail,
      password: newAdminPassword,
      confirmpassword: newAdminConfirmPassword,
      name: newAdminName
    };

    try {
      const response = await axios.post('http://localhost:8081/users/admin', newAdmin, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const addedAdmin = response.data;
        setAdmins([...admins, addedAdmin]);
        setOpenAddDialog(false);
        setNewAdminEmail('');
        setNewAdminPassword('');
        setNewAdminConfirmPassword('');
        setNewAdminName('');
      } else {
        console.error('Error adding admin:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/users/${id}`);

      if (response.status === 200) {
        setAdmins(admins.filter(admin => admin.id !== id));

        // Log out if the deleted admin is the logged-in admin
        if (user.id === id) {
          handleLogout();
        }
      } else {
        console.error('Error deleting admin:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#000' }}>
          <Toolbar>
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16, borderRadius: "5px" }} />
            <Typography variant="h6" noWrap>
              Born Eves <span style={{ marginLeft: "35rem" }}>ADMIN</span>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h6" noWrap sx={{ marginRight: 2 }}>
              Welcome, {user.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1e3a8a', color: '#fff' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['Dashboard', 'Users', 'Manage-Products', 'Calendar'].map((text, index) => (
                <ListItem button key={text} component={Link} to={`/admin/${text.toLowerCase()}`}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Button variant="contained" color="primary" onClick={handleManageAdminsClick} sx={{ marginBottom: 3 }}>
            {showAdminTable ? 'Close Manage Admins' : 'Manage Admins'}
          </Button>
          {showAdminTable && (
            <TableContainer component={Paper}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={handleManageAdminsClick}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Manage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins.map((admin, index) => (
                    <TableRow key={admin.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={handleAddAdmin}>Add</Button>
                        {index !== 0 && ( // Don't show delete button for the first admin
                          <Button variant="contained" color="secondary" onClick={() => handleDeleteAdmin(admin.id)}>
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Confirm-Password"
                type="password"
                fullWidth
                value={newAdminConfirmPassword}
                onChange={(e) => setNewAdminConfirmPassword(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Name"
                type="name"
                fullWidth
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddAdminSubmit} color="primary">
                Add Admin
              </Button>
            </DialogActions>
          </Dialog>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminPage;
