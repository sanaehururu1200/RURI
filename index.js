// const music = require('./src/music/');
// const mastodon = require('./src/mastodon');
// const twitter = require('./src/twitter');
// const web = require('./src/web');
// const wikipedia = require('./src/wikipedia');
// const path = require('path');
//const cpuThermal = require('./app/sayCPUThermal');
//const sayToot = require('./app/sayToot');
//sayToot.sayToot('テスト : ' + cpuThermal.get());
// var fs = require('fs');
// var localPath = music.getRandomMusicPath();
// music.play(localPath);
// mastodon.toot('ラズパイからNodejsを使用した投稿!!');

// fs.writeFileSync('/sys/class/gpio/export', 16);
// fs.writeFileSync('/sys/class/gpio/gpio16/direction', 'out');
// fs.writeFileSync('/sys/class/gpio/gpio16/value', 1)
// process.on('SIGINT', function(code) {
//  fs.writeFileSync('/sys/class/gpio/gpio16/value', 0);
//  fs.writeFileSync('/sys/class/gpio/unexport', 16);
//  console.log('LEDをオフにしました');
// });

require('./app/getTootLoop')
require('./app/getGmailLoop')
require('./app/gpio');
