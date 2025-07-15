import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn }) => {
  return (
    <AppBar position="static" sx={{borderRadius:'0px'}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
          Mini Resume Vault
        </Typography>
        {!loggedIn && (
          <Button component={Link} to="/login" color="inherit" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
