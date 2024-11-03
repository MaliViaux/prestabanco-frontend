import httpClient from "../http-common";

const login = (contraseña) => {
    return httpClient.post("/api/v1/ejecutivo/login", contraseña, {
        headers: { "Content-Type": "text/plain" },
    });
};

// Función para extraer los archivos PDF de una solicitud por solicitudId
const obtenerArchivosDeSolicitud = (solicitudId) => {
    return httpClient.get(`/api/v1/ejecutivo/${solicitudId}/archivos`);
};

// Función para actualizar el estado de una solicitud
const cambiarEstado = (solicitudId, estado) => {
    return httpClient.put(`/api/v1/ejecutivo/${solicitudId}/accion`, estado, {
        headers: { "Content-Type": "text/plain" },
    });
};

// Función para añadir un comentario a una solicitud
const añadirComentario = (solicitudId, comentario) => {
    return httpClient.put(`/api/v1/ejecutivo/${solicitudId}/comentario`, comentario, {
        headers: { "Content-Type": "text/plain" },
    });
};

export default { login, obtenerArchivosDeSolicitud, cambiarEstado, añadirComentario };