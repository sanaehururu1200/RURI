module.exports.getUserMessage = function (text) {
  /*
  投稿:
    投稿して -> Twitterに投稿
    マストドンに投稿して -> Mastodonに投稿
  使用できる特殊文
    CPU温度 -> ◯◯度
    今の天気 -> 晴れ/曇り/雨
  取得
    ◯◯[を/に][教えて/◯◯は？]
  音楽
    音楽を再生して
  */
}

const mpg = require('mpg123');
var player = new mpg.MpgPlayer();
player.play('/home/pi/RURI/p.mp3');
player.on('end', function(data){
  process.exit();
})