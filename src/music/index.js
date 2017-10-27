const fs = require('fs');
const mpg = require('mpg123');
var player = new mpg.MpgPlayer();

module.exports.getRandomMusicPath = function () {
  var files = fs.readdirSync(__dirname + '/../../music/')
  var musicName = files[Math.floor(Math.random() * files.length)];
  var musicPath = __dirname + '/../../music/' + musicName;
  console.log(musicPath);
  return musicPath; 
}

module.exports.pause = function () {
  player.pause();
}

module.exports.volume = function (volume) {
  player.volume(volume);
}

module.exports.play = function (path) {
  player.play(path);
}

player.on('end', function(data){
})