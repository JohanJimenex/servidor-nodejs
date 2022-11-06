//Esto es un "modelo" o sea clase o sea como una interfaz, para crrear objetos basados en el modelo/interface/clase/plantilla 

//Ya mongoose nos provee de un objeto Schema para facilitarno esa parte

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


//Antes de exportar, llamamos la funcion model que crea una clase 'Usuario' con las propidades definida en el objeto Schema
// esto a su vez es el nombre de la tabla/entidad en la DB
module.exports = model('Usuario', UsuarioSchema);
