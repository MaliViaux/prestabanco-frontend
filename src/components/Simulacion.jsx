import React, { useState } from "react";
import calculosService from "../services/calculos.service";
import { 
    Container, 
    TextField, 
    MenuItem, 
    Button, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    Paper 
  } from "@mui/material";

const Simulacion = () => {
  const [tipoCredito, setTipoCredito] = useState("Primera Vivienda");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [resultados, setResultados] = useState(null);

  const handleSimulacion = async () => {
    try {
      const cuotaMensual = await calculosService.calcularCuotaMensual(monto, plazo, tipoCredito);
      const seguroDesgravamen = await calculosService.calcularSeguroDesgravamen(monto);
      const comisionAdministracion = await calculosService.calcularComisionAdministracion(monto);
      const costoMensual = await calculosService.calcularCostoMensual(monto, plazo, tipoCredito);
      const costoTotal = await calculosService.calcularCostoTotal(monto, plazo, tipoCredito);

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

  return (
    <Container component="main" maxWidth="xs" className="simulacion-container">
      <Typography variant="h4" gutterBottom>
        Simulación de Crédito
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          select
          label="Tipo de Crédito"
          value={tipoCredito}
          onChange={(e) => setTipoCredito(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Primera Vivienda">Primera Vivienda</MenuItem>
          <MenuItem value="Segunda Vivienda">Segunda Vivienda</MenuItem>
          <MenuItem value="Propiedades Comerciales">Propiedades Comerciales</MenuItem>
          <MenuItem value="Remodelacion">Remodelacion</MenuItem>
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
          label="Plazo (en años)"
          type="number"
          value={plazo}
          onChange={(e) => setPlazo(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="Ingresa el plazo en años"
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
        <Paper elevation={3} style={{ padding: '20px' }}>
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