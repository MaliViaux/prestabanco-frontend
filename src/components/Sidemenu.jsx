import React, { useContext } from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from '@mui/icons-material/Calculate';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Importar el contexto

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const { userType, logout } = useContext(UserContext); // Obtener userType y logout del contexto

  const listOptions = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Divider />
        {userType === 'cliente' && (
          <>
            <ListItemButton onClick={() => navigate("/cliente/simulacion")}>
              <ListItemIcon>
                <CalculateIcon />
              </ListItemIcon>
              <ListItemText primary="Simulación de Crédito" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/cliente/formulario")}>
              <ListItemIcon>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primary="Solicitar Credito" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/cliente/solicitudes")}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Solicitudes" />
            </ListItemButton>
          </>
        )}
        {userType === 'ejecutivo' && (
          <ListItemButton onClick={() => navigate("/ejecutivo/solicitudes")}>
            <ListItemIcon><CalculateIcon /></ListItemIcon>
            <ListItemText primary="Evaluación de Solicitudes" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      {listOptions()}
    </Drawer>
  );
}
