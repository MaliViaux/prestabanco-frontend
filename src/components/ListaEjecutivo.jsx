import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import solicitudService from "../services/solicitud.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ListaEjecutivo = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate(); // Inicializa navigate

  const init = async () => {
    try {
      const response = await solicitudService.filtrarPorEstado();
      const solicitudesData = response.data;

      const solicitudesWithClienteData = await Promise.all(
        solicitudesData.map(async (solicitud) => {
          const clienteResponse = await solicitudService.obtenerDatosClientePorSolicitud(solicitud.id);
          const clienteData = clienteResponse.data;
          return {
            ...solicitud,
            rut: clienteData.rut,
            nombreApellido: clienteData.nombre,
          };
        })
      );

      console.log("Mostrando listado de todas las solicitudes.", solicitudesWithClienteData);
      setSolicitudes(solicitudesWithClienteData);
      setFilteredSolicitudes(solicitudesWithClienteData);
    } catch (error) {
      console.log("Error al cargar las solicitudes:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
    const filtered = solicitudes.filter((solicitud) =>
      solicitud.rut.includes(value) ||
      solicitud.nombreApellido.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSolicitudes(filtered);
  };

  const handleEvaluar = (id) => {
    console.log("Evaluando solicitud con ID:", id);
    navigate("/ejecutivo/evaluacion", { state: { solicitudId: id } }); // Navega y pasa el id
  };

  return (
    <TableContainer component={Paper} sx={{ minHeight: 600 }}>
      <br /> <br /> <br /> <br /> <br />
      <TextField
        label="Filtrar por RUT o Nombre"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={handleFilterChange}
        sx={{ mb: 3, ml: 8, maxWidth: 400 }}
      />
      <Table sx={{ maxWidth: 1200, ml: 8 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>RUT</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Nombre y Apellido</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Tipo de Crédito</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Monto</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Interés</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Plazo</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>Estado</TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>Operaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSolicitudes.map((solicitud) => (
            <TableRow
              key={solicitud.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{solicitud.rut}</TableCell>
              <TableCell align="left">{solicitud.nombreApellido}</TableCell>
              <TableCell align="left">{solicitud.tipoCredito}</TableCell>
              <TableCell align="left">{solicitud.monto}</TableCell>
              <TableCell align="right">{solicitud.interes}</TableCell>
              <TableCell align="right">{solicitud.plazo}</TableCell>
              <TableCell align="right">{solicitud.estado}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEvaluar(solicitud.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Evaluar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListaEjecutivo;
