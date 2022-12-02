//Esto es un "modelo" o sea clase o sea como una interfaz, para crrear objetos basados en el modelo/interface/clase/plantilla 

//Ya mongoose nos provee de un objeto Schema para facilitarno esa parte

// const mongoose = require('mongoose'); otra forma y leugo se llaman los metodos como mongoose.Schema() y  mongoose.model()
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true,
        // default: 'Nombre Por Defecto' //valor por defecto si no lo pone
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Universidad: { // Esto es para relacionar las propiedades con otra tabla/registro
    //     require:true,
    //     type: Schema.Types.ObjectId,
    //     ref: 'Universidad' // se debe colocar el nombre de la coleccion/tabla con la cual se relaciona, video 123 Angular Avanzado
    // }
}, {collection:'NombreColeccionnDeseado'}) // con esto personalzamos el nombre de la coleccion en vez de dejarlo por defecto es opcional

//Con este código soobreescribiremos el _id por defecto que mongoDB le asigna a los registros
//Pero no es necesario para esta aplicación ya quee este metodo lo copié de otro curso y ademas ya retornamos un objeto armado por mi
// UsuarioSchema.method('toJSON', function () {
//     const { __v, _id, ...restoDelObjecto } = this.toObject(); // este objeto solo existe en mongoose

//     restoDelObjecto.userId = _id;

//     return restoDelObjecto;
// })


//Antes de exportar, llamamos la funcion model que crea una clase 'Usuario' con las propidades definida en el objeto Schema
// esto a su vez es el nombre de la tabla/entidad en la DB y le pone automaticamente la letra 'S' quedando como 'Usuarios' 
module.exports = model('Usuario', UsuarioSchema);
