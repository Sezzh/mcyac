
//This is the entry file for a node.js server
/*
var http = require('http');
var server = http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<!DOCTYPE "<html>"');
    response.write('<html>');
    response.write('<head>');
    response.write('<title>Hellow World!</title>');
    response.write('</head>');
    response.write('<body>');
    response.write('Hello World!!');
    response.write('</body>');
    response.write('</html>');
})

var port = 8484;

server.listen(port, function() {
    console.log('Escuchando en el puerto: ', port);
});
*/
//example server most simple with express
/*
var express = require('express');
var app = express();
var http = require('http').Server(app)
var port = 8576;

app.get('/', function(request, response) {
    response.send('<h1>Hello World!</h1>');
});

http.listen(port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('Servidor escuchando en el puerto: ', port);
});*/

var express = require('express');
var app = express();
var http = require('http').Server(app)
var port = 8004;
var io = require('socket.io')(http);

//se ejecuta si se llama explicitamente
/*
function middleHandler(request, response, next) {
    console.log('soy el middleHandler que anda por ahí');
    next();
}
*/
/*
//este middleware siempre se ejecuta primero
app.use(function(request, response, next) {
    console.log('soy un middleware número uno :D');
    next();
});

app.use(function(request, response, next) {
    console.log('soy un middleware número dos :D');
    next();
});
*/
//Esto sirve para servir archivos estaticos como CSS JS y assets
app.use('/', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
    console.log('petición al home');
});

app.get('*', function(request, response) {
    //Esto funciona como un 404
    response.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnect');
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

http.listen(port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('Servidor escuchando en el puerto: ', port);
});
