const jwt = require('jsonwebtoken');
// require('dotenv').config(); si quieres ejecutar codigo desde aquí que dependa de la variable de entorno 

const generarJWT = (uid, name) => {

    const payload = {
        uid: uid,
        name: name
    }

    return new Promise((resolve, reject) => {

        //Encriptamo con jwt, Parametros que pide:
        //1. Pide el payload, o sea la info que queremos guardar en el jwt (un objeto con el uid y nombre)
        //2. secret o llave secreta (contrasena personalizada) inventada (viene desde mis variables de entorno)
        //3. Opciones adicionales como el tiempod e cigentencia dle token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '24h' }, (error, token) => {
            if (error) {
                //si algo sale mal
                reject(error)
            } else {
                //si va todo bien tenemos que regresar el json web token
                //Pero el problema es que como no es una promesa es asincrono y el
                //codigo que le sige mas abajo cuando llamen esta funcion 'generarJWT()' no va a esperar por la respuesta,
                //Entonces por eso lo metimos en una promesa que pueda esperar con .then() o async await
                resolve(token);
            }
        })

    })
}


module.exports = {
    generarJWT: generarJWT
}