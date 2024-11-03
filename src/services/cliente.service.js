import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/api/v1/cliente/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/cliente/${rut}`);
}

const login = data => {
    return httpClient.post("/api/v1/cliente/login", data);
}

export default { create, get, login };