const { response, request } = require("express");
const { validationResult, check } = require("express-validator");

const validarCampos = (req = request, res = response, continua) => {
  const erroresDelValidators = validationResult(req); // esto guarda un objeto con los errores si es que tiene , de los validadores en el routes.js

  if (!erroresDelValidators.isEmpty()) {
    return res.status(400).json({
      erroresDelValidators: erroresDelValidators.mapped(),
    });
  }
  continua(); // con esta funcion continua el flujo si no hay error
};

const loginValidators = [
  //estos son validators,  podemos agruparlo tmabein ver documentacion express-validators
  //revisa que el json recibido   traiga el campo 'email' y que tenga un foprmato email, se pueden agregarmas validaciones concztentando .isEnpty() etc.
  //Ojo esto no detiene el flujo, sino que crea un objeto de errores si hay, que luego validamos en optra funcion 'validarCampos
  //OJO: Los campos deben estar en el primer nivel del json { email:etc, passowrd: etc}
  check("email", "El email no es valido").isEmail(), //el 2do parametro sirve para agregar un mensaje a la respuesta, opciontal si se dispara  se agrega a los errores manejados en la funcion mas abajo 'validaCampos'
  check("password", "La contraseña minimo de 6 digitos es obligatoria").isLength({ min: 6 }),
  validarCampos, //esta funcion la movimos para manerjar el error de validaros, si hay error se retornar un res.status.json y no pasa de aquí
];

const registroValidator = [
  //check('id', 'El id no es valido').isMongoId(), esto es para validar un fpomrato de id de mongodb, es de otro curso de angular avanzado
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("email", "El correo es no es valido").isEmail().isLength({ min: 1 }),
  check("password", "La contraseña minimo de 6 digitos es obligatoria").isLength({ min: 6 }),
  validarCampos, //validador personalizado
];

module.exports = {
  loginValidators: loginValidators,
  registroValidator: registroValidator,
};
