import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteService from "../services/cliente.service";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Register = () => {
  const [rut, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const navigate = useNavigate();

  const savecliente = (e) => {
    e.preventDefault();

    if (!rut.trim()) {
      alert('Rut no puede estar vacío.');
      return;
    }

    if (!contraseña.trim()) {
      alert('Contraseña no puede estar vacía.');
      return;
    }

    if (!nombre.trim()) {
      alert('Nombre no puede estar vacío.');
      return;
    }

    if (!apellido.trim()) {
      alert('Apellido no puede estar vacío.');
      return;
    }

    const cliente = { rut, contraseña, nombre, apellido, edad };
    clienteService
      .create(cliente)
      .then((response) => {
        alert("Usuario creado exitosamente.");
        console.log("Cliente ha sido creado.", response.data);
        navigate("/login");
      })
      .catch((error) => {
        alert("Ha ocurrido un error al intentar crear el nuevo usuario.");
        console.error("Error al crear el cliente:", error);
      });
  };

  const handleEdadChange = (event) => {
    const value = parseFloat(event.target.value);
    const currentYear = new Date().getFullYear();
    if (value > 0 && value <= 2024) {
      setEdad(value);
    } else {
      console.error('year cannot be negative or greater than current year.');
    }
  };


  return (
    <Container component="main" maxWidth="xs" className="login-page">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nombre"
                name="nombre"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="rut"
                label="Rut"
                name="rut"
                autoComplete="rut"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="contraseña"
                label="Contraseña"
                type="password"
                id="contraseña"
                autoComplete="new-contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="edad"
                label="Edad"
                type="number"
                value={edad}
                onChange={handleEdadChange}
                helperText="Ej: 40"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(e) => savecliente(e)}
            sx={{ mt: 3, mb: 2, backgroundColor: '#4bba5f' }}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            <Link to="/login" variant="body2">
                Ya tienes una cuenta? Inicia sesion
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={5}>
      </Box>
    </Container>
  );
};

export default Register;