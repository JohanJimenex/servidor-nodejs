const { response, request } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario"); // colocamos el nombrne de la variable para que tenga sentido la clase que va a tener dentro
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { set } = require("mongoose");

// decimos que el res que viene como referencia es igual a response que es un objeto que existe en express
// es un truquito para poder tener el tipado y sus metodos, importado ariba

const registro = async (req = request, res = response) => {

    //las validaciones la hacemos desde una funcion middleware personalizado en el index.js validarCampos
    const { name, email, password } = req.body;

    try {

        //Paso 1: Verificar si email existe
        //.findOne busca en la base de datos online si existe algun usuario con el campo email y si existe devuelve un objeto con todas sus propiedades
        //Recuerda que esta variable 'Usuario' tiene por dentro en realidad es una clase llamada 'Usuario', nada que ver con el nombre de la variable dado
        //Se colocó el mismo nombre a la variable para hacer sentido.
        let usuarioDesdeDB = await Usuario.findOne({ email: email })

        if (usuarioDesdeDB) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con este correo"
            })
        }

        //Paso 2: Crear una instancia/objeto de la clase 'Usuario' que a su vez tiene metodos para interactuar con la DB online
        let usuario = new Usuario(req.body);

        //Paso 3: Encriptar la contrasena
        const sal = bcrypt.genSaltSync(); //bcrypt genera un string aleatorio,

        // cambiamos la clave del nuestro objeto usuario local que puso el usuario por una encriptada.
        usuario.password = bcrypt.hashSync(password, sal);//.hashSync liga el stirng aleatorio con la clave y lo retorna

        //Paso 4: Generar JWT
        const tokenJWT = await generarJWT(usuario.id, name) //esto devuelve el jwt que es un stirng de 3 piezas dividido por un punto .

        //Paso 5: Duardar en la BD online
        await usuario.save();

        //Paso 6: Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: usuario.id, //este id lo genera mongoose, opcional para cualquier uso
            name: name,
            email: email,
            msg: 'Usuario creado de manera exitosa',
            jwt: tokenJWT
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor"
        })
    }
}

const login = async (req = request, res = response) => {

    // console.log(req.body);
    // console.log(req.query);
    // console.log(req.params);

    // const errors = validationResult(req); // nos llevamos esto a un archiovo aparte para reuytilizarlo

    //validamos el con el metodo isEmpty() si tiene alguno de los campos errores , si es asi devolvemos un status y opcional los errores
    //lo movimos a una funcion middlwware para reutilizarlo para las otras apis
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         errors: errors.mapped()
    //     })
    // }

    const { email, password } = req.body;

    try {
        // const usuariosDesdeDB = await Usuario.find() // Devuelve todos los usuarios y sus propeidades
        // const usuariosDesdeDB = await Usuario.find().skip(3).limit(6)// ingora los primeros 3 y trae maximo 6 
        // const usuariosDesdeDB = await Usuario.find({},'nombre') // Devuelve todos los usuarios pero solo con la propiedad 'nombre' y el id por defecto
        // const usuariosDesdeDB = await Usuario.find({}, 'nombre email etc') // igual que arriba pero con mas campos
        // const usuariosDesdeDB = await Usuario.find().populate('usuario','nombre email etc').populate('otra referdo x') // buscar un referido video 128 angular avanzado
        // const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, {nombre: 'nuevo', email:'nuevo'}, {new:true}) //para actualizar un registro, ver video 113 Angular Avanzado, el new en tru es para que retorne el nuevo usuario actualziado
        // const usuarioActualizado = await Usuario.findByIdAndDelete(uid) //para eliminar un registro, ver video 115 Angular Avanzado, el new en tru es para que retorne el nuevo usuario actualziado
        // si existe un usuario con ese correo me devuelve un objeto con sus propiedades incluyendo password (encriptada por nosotro)
        const usuarioDesdeDB = await Usuario.findOne({ email: email })

        if (usuarioDesdeDB == null) {
            return res.status(401).json({
                ok: false,
                msg: 'Credenciales invalidas my friend'
            })
        }

        //Con bcrypt revisamos si la clave recibida del Frontend es igual a la clave del objeto usuario que viene de la DB arriba
        const validarPassword = bcrypt.compareSync(password, usuarioDesdeDB.password) //true / false

        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: 'Credenciales shh passw es  invalidar my friend'
            })
        }

        //si todo va bien generamos un nuevo jwt
        const tokenJWT = await generarJWT(email, usuarioDesdeDB.name);

        res.json({
            ok: true,
            email: email,
            uid: usuarioDesdeDB.id,
            msg: 'Login correcto my friend',
            jwt: tokenJWT,
        })

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, hable con el programador'
        })
    }

}

const validarJWT = async (req = request, res = response) => {

    //Ya validamos el jwt en un middleWare para usarlo en todas las peticiones deseada sy noe star creando el 'returnreq.status() etc bla bla 
    //Si pasa el middleware entonces llega aquí

    // necesitamos el uid y el name para retornarselo al frontend pero en la peticion a este enpoint no envian esas propeidades entonces 
    //Express nos permite agregar propiedades al objeto 'request' desde otros script ej: req.nombre = 'klk', en este caso desde el validar JWT middleware
    const { uid, name } = req;

    const generarNewTokenJWT = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid: uid,
        name: name,
        jwt: generarNewTokenJWT
    })

}

// module.exports = login;
module.exports = {
    login: login,
    registro: registro,
    validarJWT: validarJWT
};


