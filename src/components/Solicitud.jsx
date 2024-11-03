import React, { useState, useContext } from "react";
import { Container, TextField, MenuItem, Button, Typography, Paper } from "@mui/material";
import solicitudService from "../services/solicitud.service";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

// parámetros según el tipo de crédito
const creditOptions = {
    "Primera Vivienda": { maxPlazo: 30, tasaMin: 3.5, tasaMax: 5.0 },
    "Segunda Vivienda": { maxPlazo: 20, tasaMin: 4.0, tasaMax: 6.0 },
    "Propiedades Comerciales": { maxPlazo: 25, tasaMin: 5.0, tasaMax: 7.0 },
    "Remodelacion": { maxPlazo: 15, tasaMin: 4.5, tasaMax: 6.0 }
};

const Solicitud = () => {
  const { state } = useLocation();
  const { solicitudId, tipoCredito } = state || {};

  const { rut } = useContext(UserContext); // Obtén el rut desde el contexto
  const [valorPropiedad, setValorPropiedad] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [interes, setInteres] = useState("");
  const navigate = useNavigate();

  // Validación del plazo máximo
  const handlePlazoChange = (e) => {
    const maxPlazo = creditOptions[tipoCredito].maxPlazo;
    const nuevoPlazo = e.target.value;
    if (nuevoPlazo <= maxPlazo) {
      setPlazo(nuevoPlazo);
    } else {
      alert(`El plazo máximo para ${tipoCredito} es ${maxPlazo} años.`);
    }
  };

  // Validación para la tasa de interés
  const handleInteresBlur = () => {
    const valorInteres = parseFloat(interes);
    const { tasaMin, tasaMax } = creditOptions[tipoCredito];
    
    // Verifica si el valor es un número válido y está dentro del rango
    if (valorInteres >= tasaMin && valorInteres <= tasaMax) {
        // El interés está dentro del rango, no se hace nada
    } else {
        alert(`La tasa de interés para ${tipoCredito} debe estar entre ${tasaMin}% y ${tasaMax}%.`);
        setInteres(""); // Resetea el campo si el valor no es válido
    }
  };

  const handleInteresChange = (e) => {
    setInteres(e.target.value);
  };

  // Función para enviar la solicitud al backend
  const handleSubmit = async () => {
    if (!rut) {
      alert("No se encontró el RUT del usuario en la sesión.");
      return;
    }

    if (!tipoCredito || !monto || !valorPropiedad || !interes || !plazo) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const solicitudData = {
      solicitudId: solicitudId,
      monto,
      valorPropiedad,
      interes,
      plazo,
    };

    try {
      const response = await solicitudService.datosCredito(solicitudData);
      const solicitudId = response.data.id;
      console.log("Solicitud enviada con éxito:", response.data);
      alert("Solicitud enviada con éxito");
      navigate("/cliente/solicitudes");

    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Hubo un error al enviar la solicitud. Por favor, intenta de nuevo.");
    }
  };

  return (
    <Container component="main" className="simulacion-container" maxWidth={false} disableGutters>
      <br /><br /><br /><br />
      <Paper className="simulacion-paper" elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6" align="centre">
        Ingrese los valores de su credito
      </Typography>

        <TextField
          label="Valor de la Propiedad"
          type="number"
          value={valorPropiedad}
          onChange={(e) => setValorPropiedad(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="Ingrese el valor de la propiedad"
        />

        <TextField
          label="Monto del Crédito"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="Ingrese el monto del crédito"
        />

        <TextField
          label="Tasa de Interés (%)"
          type="number"
          value={interes}
          onChange={handleInteresChange}
          onBlur={handleInteresBlur}
          fullWidth
          margin="normal"
          placeholder={`Entre ${creditOptions[tipoCredito].tasaMin}% y ${creditOptions[tipoCredito].tasaMax}%`}
        />

        <TextField
          label="Plazo (en años)"
          type="number"
          value={plazo}
          onChange={handlePlazoChange}
          fullWidth
          margin="normal"
          placeholder={`Máximo ${creditOptions[tipoCredito].maxPlazo} años`}
          inputProps={{ max: creditOptions[tipoCredito].maxPlazo }}
        />

        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '20px' }}
          fullWidth
          onClick={handleSubmit}
        >
          Solicitar Credito
        </Button>
      </Paper>
    </Container>
  );
};

export default Solicitud;
