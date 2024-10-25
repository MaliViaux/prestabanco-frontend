import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { InputLabel, Select } from '@mui/material';
import usuarioService from "../services/usuario.service";
import '../App.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [rut, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const loginUsuario = (e) => {
    e.preventDefault();

    if (!rut.trim()) {
      console.error("Rut no puede estar vacío.");
      return;
    }
    if (!contraseña.trim()) {
      console.error("Contraseña no puede estar vacía.");
      return;
    }

    const loginData = { rut, contraseña };

    usuarioService.login(loginData)
      .then(response => {
        if (response.data) {
          console.log("Login exitoso.");
          localStorage.setItem("userType", "cliente");
          navigate("/home"); // cambiar cuando exista el dashboard
        } else {
          console.error("Login fallido. Rut o contraseña incorrectos.");
        }
      })
      .catch(error => {
        console.error("Error en el login:", error);
      });
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={loginUsuario}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="rut"
            label="Rut"
            name="rut"
            autoComplete="rut"
            autoFocus
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="contraseña"
            label="Contraseña"
            type="password"
            id="contraseña"
            autoComplete="current-contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#4bba5f' }}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"No tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Login;