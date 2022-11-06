const { response, request } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = (req = request, res = response, continua) => {

    const erroresDelValidators = validationResult(req);// esto guarda un objeto con los errores si es que tiene , de los validadores en el routes.js
    
    if (!erroresDelValidators.isEmpty()) {
        return res.status(400).json({
            erroresDelValidators: erroresDelValidators.mapped()
        })
    }

    continua();// con ersta funcion continua el flujo si no hay error

}


// function validarCampos(algo) {
//     console.log(algo);
// }


module.exports = {
    validarCampos
} 