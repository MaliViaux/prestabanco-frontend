import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Sidemenu from './Sidemenu';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Leer el tipo de usuario del localStorage
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#ffffff',
          height: '80px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            outline= "none"
            sx={{ 
              mr: 2, 
              color: '#000000aa',
              outline: 'none',
              boxShadow: 'none',
              '&:focus': {
                outline: 'none',
                boxShadow: 'none'
              }
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: 'center', flexGrow: 1, color: '#4a4a4a' }}
          >
            PRESTA BANCO
          </Typography>

          <Box sx={{ position: 'absolute', display: 'flex', gap: 2, right: 16 }}>
            <Button sx={{ color: '#4a4a4a' }} component={Link} to="/loginejecutivo">
              Ejecutivos
            </Button>
            <Button sx={{ color: '#4a4a4a' }} component={Link} to="/login">
              Clientes
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer} userType={userType} />
    </Box>
  );
};

export default Navbar;