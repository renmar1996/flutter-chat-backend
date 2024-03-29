const express=require('express')
const path=require('path')
require('dotenv').config();

///Db config
const {dbConnection}=require('./database/config');
dbConnection();


////App de Express
const app= express();
///////////
app.use(express.json());
///Lectura y parseo del body

/////


//Node Server Config
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')




const publicPath= path.resolve(__dirname,'public')


app.use(express.static(publicPath))

////Mis rutas
app.use('/api/login',require('./routes/auth'));

////////


server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto',process.env.PORT);
})