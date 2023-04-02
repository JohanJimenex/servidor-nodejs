/*
    Ruta prefija: /api/auth
*/

const { Router } = require("express"); //sacamos la funcion Router
const { login, registro, validarJWT} = require("../controllers/auth.controller");
// const { check } = require("express-validator");
const { loginValidators, registroValidator } = require("../middlewares/validar-campos.middleware");
const { validarJWTMiddleWare } = require("../middlewares/validar-jwt.middleware");

const router = Router(); //devuelve un objeto de rutas

//Ruta para logearse
// esto son funciones callba, no se llaman con () ya que se mandan referencias
// router.post('/', login)
router.post("/", loginValidators, login); // nos llevamos la logica a otro archivo para tenerlo limpio, llamado controladores, pasando referencias sin llamarla

//Ruta para crear nuevo usuario
router.post("/registro", registroValidator, registro);

//Ruta para validar el JWT y renovarlo si esta vigente,
router.get("/validar-jwt", validarJWTMiddleWare, validarJWT); //NOTA DE ACTUALIZACION: en el angular avanzado Fernando ua el  'validarJWTMiddleware' . en todas las peticiones  para que tenga que pasar por ese validarop y se protegen las rutas

//Exportamos como lo permite node.js
module.exports = router;