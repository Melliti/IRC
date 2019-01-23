var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"content-type": "text/html"});
        res.end(content);
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connect', function(socket) {
    socket.broadcast.emit('message', 'Un utilisateur s\'est connecté');
    socket.on('message', function(client) {
        socket.broadcast.emit('clients', {'nick': client.pseudo, 'message': client.message});
    })
});

server.listen(8000);