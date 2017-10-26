const music = require('./src/music/');
const mastodon = require('./src/mastodon');
const twitter = require('./src/twitter');
const bt = require('./src/bluetooth');
var EventEmitter = require('events').EventEmitter;
var ev = new EventEmitter();
var path = require('path');

// var localPath = music.getRandomMusicPath();
// music.play(localPath);
// mastodon.toot('ラズパイからNodejsを使用した投稿!!');
twitter.tweet('TEST');

// var fs = require('fs');

// fs.writeFileSync('/sys/class/gpio/export', 16);
// fs.writeFileSync('/sys/class/gpio/gpio16/direction', 'out');
// fs.writeFileSync('/sys/class/gpio/gpio16/value', 1)
// process.on('SIGINT', function(code) {
//  fs.writeFileSync('/sys/class/gpio/gpio16/value', 0);
//  fs.writeFileSync('/sys/class/gpio/unexport', 16);
//  console.log('LEDをオフにしました');
// });

ev.on('writeBT', function (text) {
  console.log('EVENT!! ' + text);
})