import axios from "axios";

const PrestaBancoServer = import.meta.env.VITE_PRESTABANCO_SERVER;
const PrestaBancoPort = import.meta.env.VITE_PRESTABANCO_PORT;

console.log(PrestaBancoServer)
console.log(PrestaBancoPort)

export default axios.create({
    baseURL: `http://${PrestaBancoServer}:${PrestaBancoPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});