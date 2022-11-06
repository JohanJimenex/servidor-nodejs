const mongoose = require("mongoose");

const dbConection = async () => {
    console.log('Inciando conexión a la base de datos...');
    try {
        await mongoose.connect(process.env.DB_CNN);//acuerdate que viene del archivo enviromens .env
        console.log('Base de datos conectada!');//si pasa bien
    } catch (error) {
        console.error(error);
        throw new Error('Error en la conexión de la base de datos')
    }
}



//par poder llamar la funcion  desde el index.js
module.exports = {
    dbConection
}