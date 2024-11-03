import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ejecutivoService from "../services/ejecutivo.service";
import { UserContext } from "../contexts/UserContext";

const LoginEjecutivo = () => {
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Usar login desde el contexto

  const loginEjecutivo = (e) => {
    e.preventDefault();

    if (!contraseña.trim()) {
      console.error("Contraseña no puede estar vacía.");
      return;
    }

    ejecutivoService.login(contraseña)
      .then(response => {
        if (response.data) {
          console.log("Login exitoso.");
          login("ejecutivo", ""); // Cambiar userType a 'ejecutivo'
          navigate("/home");
        } else {
          console.error("Login fallido. Contraseña incorrecta.");
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
          Login Ejecutivos
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={loginEjecutivo}>
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
        </Box>
      </Box>
      <Box mt={8}></Box>
    </Container>
  );
};

export default LoginEjecutivo;