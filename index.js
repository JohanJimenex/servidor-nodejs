const express = require('express');
const cors = require('cors'); // para confirgurar y habilitar las peticiones entre diferentes dominios
const { dbConection } = require('./database/config.js');
require('dotenv').config(); //para agregar el puerto que que tenemos en el archivo de .env , que estamos usando a las variables de entorno que tiene node.js

const app = express(); // Crea el servidor

app.use(cors());// copnfigurmamos los cors por defecto, tiene configuraciones adicionales opcionales ver docuemntacion
app.use(express.json()); //nos permite leer el body que nos envie el cliente frontend en formato json 

//Midleware .use() es una funcion intermediaria que se ejecuta cuando el interpre pasa por su linea de codigo
//Rutas, le colocamos una ruta por defecto como prefijo
app.use('/api/auth', require('./routes/auth.routes.js'));// dividimos las rutas en archivos separados para mejor control y le agregamos un prefijo para estar mas organizado, así no tener que agregarselo a todos el api/auth

// si accede a  la ruta raiz, con esto le mandamo la carpeta public que contiene html, css, javscript etc, y o el proyecto de Angular si van a usar el mismo hosting
app.use(express.static('public'));

// Dispara la conexion a la base de datos de mongo DB usando mongoose
dbConection();

const path = require('path'); // esto nos da un obejto que tiene un metodo que obtiene el directiorio raiz

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'public/index.html'))// ubicamos el index.html del Angular
})

//Esta variable process.env.PORT viene del arcvhio .env
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', + process.env.PORT);
});


// 01 GET : primera practica
// app.get('/', (req, res) => {
//     // res.send({"nombre":"johan"})
//     // res.send('<h1>hello</h1>')
//     // res.send('klk')
//     // res.json({klk:"johan"})
//     // res.redirect('https://google.com')
//     // res.status(200).send('klk')
//     res.status(200).json(
//         {
//             "ok": true,
//             "msg": "Todo bien",
//             "uid": 12345
//         }
//     )
// })

