import { useState, useContext } from "react";
import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, FormControl, Button, Select, MenuItem, InputLabel, IconButton } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import solicitudService from "../services/solicitud.service";

const Formulario = () => {
  const { rut } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);

  const [tipoCredito, setTipoCredito] = useState("");
  const [tieneDeudasImpagas, setTieneDeudasImpagas] = useState('');
  const [deudaMensual, setDeudaMensual] = useState('');
  const [tipoTrabajo, setTipoTrabajo] = useState('');
  const [antiguedadLaboral, setAntiguedadLaboral] = useState('');
  const [sueldoMensual, setSueldoMensual] = useState('');
  const [ingresoIndependiente, setIngresoIndependiente] = useState('');
  const [saldoCuentaAhorro, setSaldoCuentaAhorro] = useState('');
  const [retirosMaximos, setRetirosMaximos] = useState('');
  const [antiguedadCuentaAhorro, setAntiguedadCuentaAhorro] = useState('');
  const [depositos, setDepositos] = useState([{ mes: '', monto: '' }]);

  const navigate = useNavigate();

  const handleTipoCreditoChange = (e) => {
    setTipoCredito(e.target.value);
    setShowForm(true);
  };

  const handleDepositoChange = (index, field, value) => {
    const newDepositos = [...depositos];
    newDepositos[index][field] = value;
    setDepositos(newDepositos);
  };

  const handleAddDeposito = () => {
    setDepositos([...depositos, { mes: '', monto: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!deudaMensual || !retirosMaximos || !saldoCuentaAhorro || !antiguedadCuentaAhorro) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    console.log("RUT del cliente:", rut);
  
    const solicitudData = {
      rutCliente: rut,
      tipoCredito: tipoCredito,
      impagas: tieneDeudasImpagas === "si",
      deudaMensual: deudaMensual || null,
      antiguedadLaboral: tipoTrabajo === "dependiente" ? antiguedadLaboral : null,
      sueldoPromedio: tipoTrabajo === "dependiente" ? sueldoMensual : ingresoIndependiente,
      saldoAhorro: saldoCuentaAhorro,
      retiroMax: retirosMaximos,
      depositos: depositos.reduce((acc, curr) => {
        if (curr.mes && curr.monto) {
          acc[curr.mes] = curr.monto;
        }
        return acc;
      }, {}),
      antiguedadAhorro: antiguedadCuentaAhorro,
    };
  
    try {
      const response = await solicitudService.create(solicitudData);
      const solicitudId = response.data.id;
      console.log("Datos guardadados:", response.data);
      navigate("/cliente/archivos", { state: { solicitudId, tipoCredito } });
    } catch (error) {
      console.error("Error al guardar los datos de la solicitud:", error);
    }
  };
  

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <>
          {/* Selector de Tipo de Crédito */}
          {!tipoCredito && (
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>Tipo de Crédito</InputLabel>
              <Select
                value={tipoCredito}
                onChange={handleTipoCreditoChange}
                label="Tipo de Crédito"
              >
                <MenuItem value="Primera Vivienda">Primera Vivienda</MenuItem>
                <MenuItem value="Segunda Vivienda">Segunda Vivienda</MenuItem>
                <MenuItem value="Propiedades Comerciales">Propiedades Comerciales</MenuItem>
                <MenuItem value="Remodelacion">Remodelación</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Formulario Completo */}
          {showForm && (
            <>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <SavingsIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Informacion Financiera
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Typography variant="h6" align="left" sx={{ mt: 1}}>
                    Rellene los siguientes campos para finalizar su solicitud
                </Typography>
                <Typography variant="h6" align="left" sx={{ mb: 1 , mt: 2}}>
                  Historial Crediticio
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>¿Tiene deudas impagas?</InputLabel>
                      <Select
                        value={tieneDeudasImpagas}
                        onChange={(e) => setTieneDeudasImpagas(e.target.value)}
                        label="¿Tiene deudas impagas?"
                      >
                        <MenuItem value="si">Sí</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Deuda Mensual Actual"
                      type="number"
                      value={deudaMensual}
                      onChange={(e) => setDeudaMensual(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" align="left" sx={{ mt: 3, mb: 1 }}>
                  Antigüedad Laboral y Estabilidad
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Tipo de Trabajo</InputLabel>
                      <Select
                        value={tipoTrabajo}
                        onChange={(e) => setTipoTrabajo(e.target.value)}
                        label="Tipo de Trabajo"
                      >
                        <MenuItem value="dependiente">Dependiente</MenuItem>
                        <MenuItem value="independiente">Independiente</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {tipoTrabajo === 'dependiente' && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Antigüedad Laboral (años)"
                          type="number"
                          value={antiguedadLaboral}
                          onChange={(e) => setAntiguedadLaboral(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Sueldo Mensual Promedio"
                          type="number"
                          value={sueldoMensual}
                          onChange={(e) => setSueldoMensual(e.target.value)}
                        />
                      </Grid>
                    </>
                  )}

                  {tipoTrabajo === 'independiente' && (
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Ingreso Mensual Promedio últimos 2 años"
                        type="number"
                        value={ingresoIndependiente}
                        onChange={(e) => setIngresoIndependiente(e.target.value)}
                      />
                    </Grid>
                  )}
                </Grid>

                <Typography variant="h6" align="left" sx={{ mt: 3, mb: 1 }}>
                  Capacidad de Ahorro
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Saldo de la Cuenta de Ahorro"
                      type="number"
                      value={saldoCuentaAhorro}
                      onChange={(e) => setSaldoCuentaAhorro(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Monto Máximo retirado en últimos 12 meses"
                      type="number"
                      value={retirosMaximos}
                      onChange={(e) => setRetirosMaximos(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Antigüedad de la Cuenta de Ahorro (años)"
                      type="number"
                      value={antiguedadCuentaAhorro}
                      onChange={(e) => setAntiguedadCuentaAhorro(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" align="left" sx={{ mt: 3, mb: 1 }}>
                      Depósitos de los últimos 12 meses
                    </Typography>
                  </Grid>

                  {depositos.map((deposito, index) => (
                    <Grid
                      container
                      spacing={2}
                      key={index}
                      alignItems="left"
                      sx={{ mb: 2, maxWidth: 500, mx: "auto" }} // Limita el ancho y centra cada fila
                    >
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <InputLabel>Mes</InputLabel>
                          <Select
                            value={deposito.mes}
                            onChange={(e) => handleDepositoChange(index, 'mes', e.target.value)}
                            label="Mes"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
                              <MenuItem key={mes} value={mes}>{mes}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={7}>
                        <TextField
                          required
                          fullWidth
                          label="Monto"
                          type="number"
                          value={deposito.monto}
                          onChange={(e) => handleDepositoChange(index, 'monto', e.target.value)}
                        />
                      </Grid>
                      {index === depositos.length - 1 && (
                        <Grid item xs={2}>
                          <IconButton onClick={handleAddDeposito} color="primary">
                            <AddIcon />
                          </IconButton>
                        </Grid>
                      )}
                    </Grid>
                  ))}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#4bba5f' }}
                >
                  Siguiente
                </Button>
              </Box>
            </>
          )}
        </>
      </Box>
    </Container>
  );
};

export default Formulario;
