import React, { useState } from "react";
import { Container, CssBaseline, Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import { useLocation } from "react-router-dom";
import solicitudService from "../services/solicitud.service";
import { useNavigate } from "react-router-dom";

const documentRequirements = {
    "Primera Vivienda": ["Comprobante de ingresos", "Certificado de avalúo", "Historial crediticio"],
    "Segunda Vivienda": ["Comprobante de ingresos", "Certificado de avalúo", "Escritura de la primera vivienda", "Historial crediticio"],
    "Propiedades Comerciales": ["Estado financiero del negocio", "Comprobante de ingresos", "Certificado de avalúo", "Plan de negocios"],
    "Remodelacion": ["Comprobante de ingresos", "Presupuesto de la remodelación", "Certificado de avalúo actualizado"]
};

const Archivos = () => {
  const { state } = useLocation();
  const { solicitudId, tipoCredito } = state || {};
  const [pdfFiles, setPdfFiles] = useState({});

  const navigate = useNavigate();

  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    setPdfFiles(prevFiles => ({
      ...prevFiles,
      [docType]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si todos los archivos requeridos están cargados
    const missingFiles = documentRequirements[tipoCredito]?.some(docType => !pdfFiles[docType]);
    if (missingFiles) {
      alert("Por favor, suba todos los archivos requeridos antes de continuar.");
      return;
    }

    try {
      for (const [docType, file] of Object.entries(pdfFiles)) {
        const formData = new FormData();
        formData.append("file", file);

        // Enviar el archivo junto con el tipo de documento
        await solicitudService.uploadPdf(solicitudId, formData, docType);
      }
      alert("Archivos cargados con éxito.");
      navigate("/cliente/solicitud", { state: { solicitudId, tipoCredito } });
    } catch (error) {
      console.error("Error al cargar los archivos:", error);
      alert("Hubo un error al cargar los archivos. Por favor, intenta de nuevo.");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ marginTop: 15, marginBottom: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Subir Documentos</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          Documentos requeridos para {tipoCredito}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          {documentRequirements[tipoCredito]?.map((docType) => (
            <Paper key={docType} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>{docType} pdf</Typography>
              <TextField
                type="file"
                fullWidth
                onChange={(e) => handleFileChange(e, docType)}
                InputLabelProps={{ shrink: true }}
              />
            </Paper>
          ))}
          <Divider sx={{ marginY: 2 }} />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3, mb: 2, backgroundColor: '#4bba5f' }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Archivos;
