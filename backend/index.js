//Revisar apuntes en la carpeta DESARROLLO_WEB/MERN/crear un CRUD con MERN
const express = require('express');
//Importamos Express para administrar las rutas del backend. 
const app = express();

const socketio = require('socket.io');
// Importamos socket.io para ajustar el chat en vivo 
const http = require('http');
//Este módulo es necesario para usar socket.io
const server = http.createServer(app);
//creamos un servidor con express y http de node js. 
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
//Creamos el servidor con socket.io. Añadimos objeto CORS para no tener problemas de seguridad. 
const morgan = require('morgan');
//Es para recibir mensajes por consola de cada http req recibido en el back
const cors = require('cors');
//Permite administar las solicitudes http. En este caso, todas son permitidas.
require('dotenv').config({ path: 'C:/full stack/backend/.env' });

//Tuvimos que instalar dotenv porque estaba teniendo problemas al acceder a las variables de entorno
//npm init dotenv para después definir una ruta directa al archivo y almacenar la respuesta en una constante de formato JSON
//que contiene toda la información del archivo .env

const cookieParser = require('cookie-parser');
//Para pasar la cookie de la sesión en cada solicitud

require('./src/database');
//Esta es la conexión a la base de datos, creada de forma modular en el archivo .database

const PORT = process.env.PORT || 4000;

const { addUser, removeUser, getUser, getUsersInRoom } = require('./chatUsers');

app.set('Port', PORT);
//Aquí se define el puerto que vamos a utilizar para el back. Debe ser un puerto que no estemos usando.

app.use(morgan('dev'));

app.use(express.json({ limit: '5mb'}));
//Para permitir el body parsing en formato JSON, utilizamos esta funcionalidad de express. 

app.use(cookieParser());
//Usar el cookieParser en todas las solicitudes entrantes. Si hay cookies, que se pasen en req.cookies.

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
//Habilitamos el CORS para las solicitudes enviadas desde el puerto del frontend donde corre React.

io.on('connection', (socket) => {
    // comenzamos a implementar socket.io con el método .on el cual recibirá un socket como parámetro.
    // También utilizamos el método .on del parámetro y 'disconnect'.

    // Aquí agregamos la respuesta del backend al recibir el evento 'join' del socket declarado en el cliente.
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        // desde addUser podemos o recibir un usuario o un error

        if (error) {
            return callback(error);
        }

        //Mensaje a quien recién se unió.
        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room: "${user.room}"` });
        // Mensaje a todos los usuarios sobre quien recién se une gracias a broadcast.
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        //envía señal al front para realizar alguna otra función
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user){
            io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
        }
    })
});

//Rutas. Asociamos cada dirección con el archivo que contiene sus respectivas rutas. api para info de empleados y auth para loggeo.
app.use('/api/', require('./src/routes/empleado.routes'));
app.use('/auth/', require('./src/routes/usuario.routes'));

//Iniciamos la aplicación con el método .listen()
server.listen(app.get('Port'), () => {
    console.log('Escuchando por el puerto ', app.get('Port'))
})