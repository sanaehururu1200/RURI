var fs = require('fs');
var http = require('http');
var music = require('../music')
var EventEmitter = require('events').EventEmitter;
var ev = new EventEmitter;
var server = http.createServer();
var files = {list: fs.readdirSync('./music')};

server.on('request', function (req, res) {
  var stream = fs.createReadStream('index.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  stream.pipe(res);
});
var io = require('socket.io').listen(server);
server.listen(8000);

io.sockets.on('connection', function (socket) {
  socket.emit('connect', files);
  socket.on('getMusicList', function () {
      var files = fs.readdirSync('./music')
      socket.emit('pushMusicList', files);
      console.log(files);
  });
  socket.on('music', function (val,val1) {
    switch (val) {
      case 'play':
        var localPath = music.getRandomMusicPath();
        music.play(localPath);
        break;
      case 'pause':
        music.pause();
        break;
      case 'volume':
        music.volume(val1);
        break;
    }
  });
});