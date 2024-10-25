import React from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from '@mui/icons-material/Calculate';
import { useNavigate } from 'react-router-dom';

export default function Sidemenu({ open, toggleDrawer, userType }) {
  const navigate = useNavigate();

  const listOptions = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        {/* Opciones para Clientes */}
        {userType === 'cliente' && (
          <>
            <ListItemButton onClick={() => navigate("/cliente/simulacion")}>
              <ListItemIcon>
                <CalculateIcon />
              </ListItemIcon>
              <ListItemText primary="Simulación de Crédito" />
            </ListItemButton>
          </>
        )}

        {/* Opciones para Ejecutivos */}
        {userType === 'ejecutivo' && (
          <>
            <ListItemButton onClick={() => navigate("/ejecutivo/evaluacion")}>
              <ListItemIcon>
                <CalculateIcon />
              </ListItemIcon>
              <ListItemText primary="Evaluación de Solicitudes" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}