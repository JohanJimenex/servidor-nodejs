const { Router } = require('express'); //sacamos la funcion Router
const { login, registro, validarJWT } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJWTMiddleWare } = require('../middlewares/validar-jwt.middleware');

const router = Router(); //devuelve un objeto de rutas

//Ruta para logearse
// esto son funciones callba, no se llaman con () ya que se mandan referencias
// router.post('/', login)
router.post('/', [
    //estos son validators,  podemos agruparlo tmabein ver documentacion express-validators
    //revisa que traiga el campo 'email' y que tenga un foprmato email, se pueden agregarmas validaciones concztentando .isEnpty() etc.
    //Ojo esto no detiene el flujo, sino que crea un objeto de errores si hay, que luego validamos en optra funcion 'validarCampos
    //Los campos deben estar en el primer nivel del json { email:etc, passowrd: etc}
    check('email', 'El email no es valido').isEmail(),
    check('password', 'La contraseña minimo de 6 digitos es obligatoria').isLength({ min: 6 }),
    validarCampos
], login)// nos llevamos la logica a otro archivo para tenerlo limpio, llado controladores, pasando referencias sin llamarla

//Ruta para crear nuevo usuario
router.post('/registro', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es no es valido').isEmail().isLength({ min: 1 }),
    check('password', 'La contraseña minimo de 6 digitos es obligatoria').isLength({ min: 6 }),
    validarCampos//validador personalizado 
], registro)

//Ruta para validar el JWT y renovarlo si esta vigente,
router.get('/validar-jwt', validarJWTMiddleWare, validarJWT)

//Exportamos como lo permite node.js
module.exports = router;