import React, { useEffect, useState, useContext } from "react";
import solicitudService from "../services/solicitud.service";
import calculosService from "../services/calculos.service";
import { UserContext } from "../contexts/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Modal,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "black",
  overflow: "auto",
  maxHeight: "80vh",
};

const ListaSolicitudes = () => {
  const { rut } = useContext(UserContext);
  const [solicitudes, setSolicitudes] = useState([]);
  const [openComentarioModal, setOpenComentarioModal] = useState(false);
  const [openCostosModal, setOpenCostosModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [costosData, setCostosData] = useState(null);

  const init = () => {
    solicitudService
      .getByRut(rut)
      .then((response) => {
        setSolicitudes(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las solicitudes:", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleCancelar = (id) => {
    const confirmCancelar = window.confirm(
      "¿Está seguro que desea cancelar esta solicitud?"
    );
    if (confirmCancelar) {
      solicitudService
        .cancelar(id)
        .then((response) => {
          init(); // Refrescar lista después de cancelar
        })
        .catch((error) => {
          console.error("Error al cancelar la solicitud:", error);
        });
    }
  };

  const handleOpenComentario = (comentario) => {
    setModalContent(comentario || "Sin comentario");
    setOpenComentarioModal(true);
  };

  const handleOpenCostos = async (solicitud) => {
    try {
      // Llama a cada función para obtener los cálculos desde el backend
      const cuotaMensual = await calculosService.calcularCuotaMensual(solicitud.monto, solicitud.plazo, solicitud.interes);
      const seguroDesgravamen = await calculosService.calcularSeguroDesgravamen(solicitud.monto);
      const comisionAdministracion = await calculosService.calcularComisionAdministracion(solicitud.monto);
      const costoMensual = await calculosService.calcularCostoMensual(solicitud.monto, solicitud.plazo, solicitud.interes);
      const costoTotal = await calculosService.calcularCostoTotal(solicitud.monto, solicitud.plazo, solicitud.interes);

      setCostosData({
        cuotaMensual: cuotaMensual.data,
        seguroDesgravamen: seguroDesgravamen.data,
        comisionAdministracion: comisionAdministracion.data,
        costoMensual: costoMensual.data,
        costoTotal: costoTotal.data,
        seguroIncendio: 20000 // Valor fijo de seguro de incendio
      });
      setOpenCostosModal(true);
    } catch (error) {
      console.error("Error al obtener el desglose de costos:", error);
      setModalContent("No se pudo obtener el desglose de costos.");
      setOpenCostosModal(true);
    }
  };

  const handleCloseComentario = () => setOpenComentarioModal(false);
  const handleCloseCostos = () => setOpenCostosModal(false);

  return (
    <TableContainer component={Paper} sx={{ minHeight: 800 }} justifyContent="center" alignItems="center">
        <br /> <br /> <br /> <br /> <br />
      <Table sx={{ maxWidth: 1200, ml: 8 }} size="small" aria-label="a dense table" justifyContent="center">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo de Crédito</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Monto</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Interes</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Plazo</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Estado</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Operaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solicitudes.map((solicitud) => (
            <TableRow key={solicitud.id}>
              <TableCell align="left">{solicitud.tipoCredito}</TableCell>
              <TableCell align="left">{solicitud.monto}</TableCell>
              <TableCell align="right">{solicitud.interes}</TableCell>
              <TableCell align="right">{solicitud.plazo}</TableCell>
              <TableCell align="right">{solicitud.estado}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleCancelar(solicitud.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleOpenComentario(solicitud.comentario)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Ver Comentario
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleOpenCostos(solicitud)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Desglose de Costos
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal para comentario */}
      <Modal
        open={openComentarioModal}
        onClose={handleCloseComentario}
        aria-labelledby="modal-comentario-title"
        aria-describedby="modal-comentario-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-comentario-title" variant="h6">Comentario</Typography>
          <Typography id="modal-comentario-description" sx={{ mt: 2 }}>{modalContent}</Typography>
        </Box>
      </Modal>

      {/* Modal para desglose de costos */}
      <Modal
        open={openCostosModal}
        onClose={handleCloseCostos}
        aria-labelledby="modal-costos-title"
        aria-describedby="modal-costos-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-costos-title" variant="h6">Desglose de Costos</Typography>
          {costosData ? (
            <List>
              <ListItem>
                <ListItemText primary={`Cuota Mensual: $${costosData.cuotaMensual.toFixed(2)}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Seguro de Desgravamen: $${costosData.seguroDesgravamen.toFixed(2)}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Seguro de Incendio: $${costosData.seguroIncendio.toFixed(2)}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Comisión por Administración: $${costosData.comisionAdministracion.toFixed(2)}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Costo Mensual Total: $${costosData.costoMensual.toFixed(2)}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Costo Total del Crédito: $${costosData.costoTotal.toFixed(2)}`} />
              </ListItem>
            </List>
          ) : (
            <Typography>Cargando desglose de costos...</Typography>
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default ListaSolicitudes;
