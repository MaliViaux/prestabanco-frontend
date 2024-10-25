import httpClient from "../http-common";

const calcularCuotaMensual = (monto, plazo, tipoCredito) => {
    return httpClient.post("/api/v1/calculos/cuotaMensual", null, {
        params: {
            monto: monto,
            plazo: plazo,
            tipoCredito: tipoCredito
        }
    });
}

const calcularSeguroDesgravamen = monto => {
    return httpClient.post("/api/v1/calculos/seguroDesgravamen", null, {
        params: {
            monto: monto
        }
    });
}

const calcularComisionAdministracion = monto => {
    return httpClient.post("/api/v1/calculos/comisionAdministracion", null, {
        params: {
            monto: monto
        }
    });
}

const calcularCostoMensual = (monto, plazo, tipoCredito) => {
    return httpClient.post("/api/v1/calculos/costoMensual", null, {
        params: {
            monto: monto,
            plazo: plazo,
            tipoCredito: tipoCredito
        }
    });
}

const calcularCostoTotal = (monto, plazo, tipoCredito) => {
    return httpClient.post("/api/v1/calculos/costoTotal", null, {
        params: {
            monto: monto,
            plazo: plazo,
            tipoCredito: tipoCredito
        }
    });
}

export default {
    calcularCuotaMensual,
    calcularSeguroDesgravamen,
    calcularComisionAdministracion,
    calcularCostoMensual,
    calcularCostoTotal
};