import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import solicitudService from "../services/solicitud.service";
import ejecutivoService from "../services/ejecutivo.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Evaluacion = () => {
  const { state } = useLocation();
  const { solicitudId } = state || {};

  const [solicitud, setSolicitud] = useState({});
  const [archivos, setArchivos] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const criteriosBasicos = [
    "Relación Cuota/Ingreso",
    "Historial Crediticio del Cliente",
    "Antigüedad Laboral y Estabilidad",
    "Relación Deuda/Ingreso",
    "Monto Máximo de Financiamiento",
    "Edad del Solicitante"
  ];

  const capacidadAhorro = [
    "Saldo Mínimo Requerido",
    "Historial de Ahorro Consistente",
    "Depósitos Periódicos",
    "Relación Saldo/Años de Antigüedad",
    "Retiros Recientes"
  ];

  const handleDownload = (contenidoBase64, tipoDocumento) => {
    const linkSource = `data:application/pdf;base64,${contenidoBase64}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = `${tipoDocumento}.pdf`;
    downloadLink.click();
  };

  const handleRechazarCredito = async () => {
    const confirmacion = window.confirm("¿Rechazar crédito?");
    if (!confirmacion) return;

    try {
      await ejecutivoService.cambiarEstado(solicitudId, "Rechazada");
      alert("El crédito ha sido rechazado.");
    } catch (error) {
      console.error("Error al rechazar el crédito:", error);
      alert("Hubo un error al rechazar el crédito. Inténtalo de nuevo.");
    }
  };

  const handleAprobarCredito = async () => {
    const confirmacion = window.confirm("¿Aprobar crédito?");
    if (!confirmacion) return;

    try {
      await ejecutivoService.cambiarEstado(solicitudId, "Aprobada");
      alert("El crédito ha sido aprobado.");
    } catch (error) {
      console.error("Error al aprobar el crédito:", error);
      alert("Hubo un error al aprobar el crédito. Inténtalo de nuevo.");
    }
  };

  const handleAñadirComentario = async () => {
    try {
      await ejecutivoService.añadirComentario(solicitudId, nuevoComentario);
      alert("Comentario añadido con éxito");
      setNuevoComentario("");
    } catch (error) {
      console.error("Error al añadir comentario:", error);
      alert("Hubo un error al añadir el comentario. Inténtalo de nuevo.");
    }
  };

  useEffect(() => {
    const fetchSolicitudData = async () => {
      try {
        const response = await solicitudService.getSolicitudById(solicitudId);
        setSolicitud(response.data);

        const archivosResponse = await ejecutivoService.obtenerArchivosDeSolicitud(solicitudId);
        setArchivos(archivosResponse.data);
      } catch (error) {
        console.error("Error al cargar la solicitud y archivos:", error);
      }
    };

    if (solicitudId) fetchSolicitudData();
  }, [solicitudId]);

  return (
    <Box sx={{ backgroundColor: 'white', padding: 4, minHeight: '100vh' }}>
      <br /> <br /> <br /> <br /> <br />
      <Typography variant="h5" gutterBottom color="black">
        Evaluación de Solicitud
      </Typography>

      {/* Tabla de Criterios Básicos */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }} color="black" align="left">Criterios Básicos</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {criteriosBasicos.map((criterio, index) => (
                <TableCell key={index} align="center">{criterio}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {criteriosBasicos.map((_, index) => (
                <TableCell key={index} align="center">
                  {solicitud.reglasGenerales && solicitud.reglasGenerales[index] ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tabla de Capacidad de Ahorro */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }} color="black" align="left">Capacidad de Ahorro</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {capacidadAhorro.map((criterio, index) => (
                <TableCell key={index} align="center">{criterio}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {capacidadAhorro.map((_, index) => (
                <TableCell key={index} align="center">
                  {solicitud.reglasAhorro && solicitud.reglasAhorro[index] ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sección de Archivos */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }} color="black">Archivos Subidos</Typography>
      {archivos.length > 0 ? (
        archivos.map((archivo, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            sx={{ mb: 1, mr: 1 }}
            onClick={() => handleDownload(archivo.contenidoBase64, archivo.tipoDocumento)}
          >
            Descargar {archivo.tipoDocumento}
          </Button>
        ))
      ) : (
        <Typography color="black">No hay archivos subidos.</Typography>
      )}

      {/* Sección de Operaciones */}
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }} color="black">Operaciones</Typography>
      <Button
        variant="contained"
        color="error"
        sx={{ mb: 1, mr: 1 }}
        onClick={handleRechazarCredito}
      >
        Rechazar Crédito
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{ mb: 1, mr: 1 }}
        onClick={handleAprobarCredito}
      >
        Aprobar Crédito
      </Button>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <TextField
            label="Comentario"
            variant="outlined"
            value={nuevoComentario}
            size="small"
            onChange={(e) => setNuevoComentario(e.target.value)}
            sx={{ mr: 2 }}
        />
        <Button
            variant="contained"
            color="info"
            onClick={handleAñadirComentario}
        >
            Añadir Comentario
        </Button>
        </Box>
    </Box>
  );
};

export default Evaluacion;
