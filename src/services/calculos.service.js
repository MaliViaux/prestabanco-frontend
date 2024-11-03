import httpClient from "../http-common";

const calcularCuotaMensual = (monto, plazo, interes) => {
    return httpClient.post("/api/v1/calculos/cuotaMensual", null, {
        params: {
            monto: monto,
            plazo: plazo,
            interes: interes
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

const calcularCostoMensual = (monto, plazo, interes) => {
    return httpClient.post("/api/v1/calculos/costoMensual", null, {
        params: {
            monto: monto,
            plazo: plazo,
            interes: interes
        }
    });
}

const calcularCostoTotal = (monto, plazo, interes) => {
    return httpClient.post("/api/v1/calculos/costoTotal", null, {
        params: {
            monto: monto,
            plazo: plazo,
            interes: interes
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