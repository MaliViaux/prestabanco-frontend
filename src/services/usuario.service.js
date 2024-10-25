import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/api/v1/usuario/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/usuario/${rut}`);
}

const update = data => {
    return httpClient.put('/api/v1/usuario/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/usuario/${rut}`);
}

const login = data => {
    return httpClient.post("/api/v1/usuario/login", data);
}

export default { create, get, update, remove, login };