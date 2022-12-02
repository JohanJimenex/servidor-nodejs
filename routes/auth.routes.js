
/*
    Ruta prefija: /api/auth
*/

const { Router } = require('express'); //sacamos la funcion Router
const { login, registro, validarJWT } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJWTMiddleWare } = require('../middlewares/validar-jwt.middleware');

const router = Router(); //devuelve un objeto de rutas

//Ruta para logearse
// esto son funciones callba, no se llaman con () ya que se mandan referencias
// router.post('/', login)
router.post('/',  [
    //estos son validators,  podemos agruparlo tmabein ver documentacion express-validators
    //revisa que traiga el campo 'email' y que tenga un foprmato email, se pueden agregarmas validaciones concztentando .isEnpty() etc.
    //Ojo esto no detiene el flujo, sino que crea un objeto de errores si hay, que luego validamos en optra funcion 'validarCampos
    //Los campos deben estar en el primer nivel del json { email:etc, passowrd: etc}
    check('email', 'El email no es valido').isEmail(), // si se dispara  se agrega a los errores manejados en la funcion mas abajo 'validaCampos'
    check('password', 'La contraseña minimo de 6 digitos es obligatoria').isLength({ min: 6 }),
    validarCampos //esta funcion la movimos para manerjar el error de validaros, si hay error se retornar un res.status.json y no pasa de aquí
], login)// nos llevamos la logica a otro archivo para tenerlo limpio, llamado controladores, pasando referencias sin llamarla

//Ruta para crear nuevo usuario
router.post('/registro', [
    //check('id', 'El id no es valido').isMongoId(), esto es de angular avanzado
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es no es valido').isEmail().isLength({ min: 1 }),
    check('password', 'La contraseña minimo de 6 digitos es obligatoria').isLength({ min: 6 }),
    validarCampos//validador personalizado 
], registro)

//Ruta para validar el JWT y renovarlo si esta vigente,
router.get('/validar-jwt', validarJWTMiddleWare, validarJWT) //NOTA DE ACTUALIZACION: en el angular avanzado Fernando ua el  'validarJWTMiddleware' . en todas las peticiones  para que tenga que pasar por ese validarop y se protegen las rutas

//Exportamos como lo permite node.js
module.exports = router;