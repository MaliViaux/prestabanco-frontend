import httpClient from "../http-common";

// Función para crear una nueva solicitud
const create = (data) => {
    return httpClient.post("/api/v1/solicitud/crear", data);
};

// Función para obtener solicitudes por RUT del cliente
const getByRut = (rut) => {
    return httpClient.get(`/api/v1/solicitud/cliente/${rut}`);
};

// Funcion para subir archivos
const uploadPdf = (solicitudId, formData, tipoDocumento) => {
    formData.append("tipoDocumento", tipoDocumento);
    return httpClient.post(`/api/v1/solicitud/${solicitudId}/upload-pdf`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

const datosCredito = (data) => {
    return httpClient.put("/api/v1/solicitud/credito", data);
};

const cancelar = (id) => {
    return httpClient.put(`/api/v1/solicitud/${id}/cancelar`);
};

const filtrarPorEstado = () => {
    return httpClient.get("/api/v1/solicitud/filtrar-por-estado");
};

const obtenerDatosClientePorSolicitud = (solicitudId) => {
    return httpClient.get(`/api/v1/solicitud/${solicitudId}/cliente`);
};

// Nueva función para obtener la solicitud por ID
const getSolicitudById = (solicitudId) => {
    return httpClient.get(`/api/v1/solicitud/${solicitudId}`);
};

export default { 
    create, 
    getByRut, 
    uploadPdf, 
    datosCredito, 
    cancelar, 
    filtrarPorEstado, 
    obtenerDatosClientePorSolicitud, 
    getSolicitudById
};