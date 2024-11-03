import React, { useState } from "react";
import calculosService from "../services/calculos.service";
import { Container, TextField, MenuItem, Button, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

// parámetros según el tipo de crédito
const creditOptions = {
    "Primera Vivienda": { maxPlazo: 30, tasaMin: 3.5, tasaMax: 5.0 },
    "Segunda Vivienda": { maxPlazo: 20, tasaMin: 4.0, tasaMax: 6.0 },
    "Propiedades Comerciales": { maxPlazo: 25, tasaMin: 5.0, tasaMax: 7.0 },
    "Remodelacion": { maxPlazo: 15, tasaMin: 4.5, tasaMax: 6.0 }
};

const Simulacion = () => {
  const [tipoCredito, setTipoCredito] = useState("Primera Vivienda");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [interes, setInteres] = useState("");
  const [resultados, setResultados] = useState(null);

  // Función para manejar la simulación
  const handleSimulacion = async () => {
    try {
      const cuotaMensual = await calculosService.calcularCuotaMensual(monto, plazo, interes);
      const seguroDesgravamen = await calculosService.calcularSeguroDesgravamen(monto);
      const comisionAdministracion = await calculosService.calcularComisionAdministracion(monto);
      const costoMensual = await calculosService.calcularCostoMensual(monto, plazo, interes);
      const costoTotal = await calculosService.calcularCostoTotal(monto, plazo, interes);

      setResultados({
        cuotaMensual: cuotaMensual.data,
        seguroDesgravamen: seguroDesgravamen.data,
        comisionAdministracion: comisionAdministracion.data,
        costoMensual: costoMensual.data,
        costoTotal: costoTotal.data,
        seguroIncendio: 20000 // siempre es fijo
      });
    } catch (error) {
      console.error("Error al realizar la simulación:", error);
    }
  };

  // Cambiar el tipo de crédito y ajustar el plazo e interés según corresponda
  const handleTipoCreditoChange = (e) => {
    const selectedCredit = e.target.value;
    setTipoCredito(selectedCredit);
    setPlazo(creditOptions[selectedCredit].maxPlazo); // Actualiza el plazo máximo según el tipo de crédito
    setInteres(""); // Reinicia el interés para permitir una nueva entrada dentro del rango
  };

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

  return (
    <Container component="main" className="simulacion-container" maxWidth={false} disableGutters>
      <Typography variant="h4" gutterBottom>
        Simulación de Crédito
      </Typography>
      <Paper className="simulacion-paper" elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          select
          label="Tipo de Crédito"
          value={tipoCredito}
          onChange={handleTipoCreditoChange}
          fullWidth
          margin="normal"
        >
          {Object.keys(creditOptions).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Monto del Crédito"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="Ingresa el monto"
        />
        <TextField
          label="Tasa de Interés (%)"
          type="number"
          value={interes}
          onChange={handleInteresChange} // Actualiza el valor mientras se escribe
          onBlur={handleInteresBlur}     // Valida solo cuando el usuario deja el campo
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
          onClick={handleSimulacion}
          style={{ marginTop: '20px' }}
          fullWidth
        >
          Simular
        </Button>
      </Paper>

      {resultados && (
        <Paper className="simulacion-paper" elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Resultados de la Simulación
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`Cuota Mensual: $${resultados.cuotaMensual.toFixed(2)}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Seguro de Desgravamen: $${resultados.seguroDesgravamen.toFixed(2)}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Seguro de Incendio: $${resultados.seguroIncendio.toFixed(2)}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Comisión por Administración: $${resultados.comisionAdministracion.toFixed(2)}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Costo Mensual Total: $${resultados.costoMensual.toFixed(2)}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Costo Total del Crédito: $${resultados.costoTotal.toFixed(2)}`} />
            </ListItem>
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default Simulacion;
