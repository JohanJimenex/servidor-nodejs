const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWTMiddleWare = (req = request, res = response, continuar) => {

    const tokenJWTRecibidoDelFrontned = req.header('jwt');

    console.log(tokenJWTRecibidoDelFrontned);

    if (!tokenJWTRecibidoDelFrontned) {
        return res.status(401).json({
            ok: false,
            msg: "JWToken invalido"
        })
    }

    try {
        // Desencriptamos el jwt, con la firma/clave que le habiamos puesto en la creacion
        //Si lo desencripta nos  dará el objeto, el cual solo nos interesa el uid y name
        //mientras pueda desncriptar el JWT quiere decir que esta todo bien y el usuario frontned puede seguir navengando
        const { uid, name } = jwt.verify(tokenJWTRecibidoDelFrontned, process.env.SECRET_JWT_SEED);

        //agregamos estas propiedades a la reques, para poder leerla desde el controlador, y devolverlo al frontned
        req.uid = uid;
        req.name = name;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Error con el JWToken",
            error: error
        })
    }

    // si va todo bien OK continua con el controllador dle endpoint llamado (ya se aRegistro, login o validarjwt)
    continuar()


}


module.exports = {
    validarJWTMiddleWare: validarJWTMiddleWare
}