const music = require('./src/music/');
const mastodon = require('./src/mastodon');
const twitter = require('./src/twitter');
const web = require('./src/web');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var ev = new EventEmitter;
// var fs = require('fs');
ev.on('connect', function (flag) {
  if(flag){
    console.log('接続されました');
  }
});
// var localPath = music.getRandomMusicPath();
// music.play(localPath);
// mastodon.toot('ラズパイからNodejsを使用した投稿!!');
// twitter.tweet('TEST');

// fs.writeFileSync('/sys/class/gpio/export', 16);
// fs.writeFileSync('/sys/class/gpio/gpio16/direction', 'out');
// fs.writeFileSync('/sys/class/gpio/gpio16/value', 1)
// process.on('SIGINT', function(code) {
//  fs.writeFileSync('/sys/class/gpio/gpio16/value', 0);
//  fs.writeFileSync('/sys/class/gpio/unexport', 16);
//  console.log('LEDをオフにしました');
// });
