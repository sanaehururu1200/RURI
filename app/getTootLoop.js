var Masto = require('mastodon-api')
const mpg = require('mpg123');
let flag = false;
let sayText = '';
let player = new mpg.MpgPlayer();
console.log('Toot Loopを開始しました');
setInterval(function () {
  if (flag === false) {
    var OpenJTalk = require('openjtalk');
    var mei = new OpenJTalk();
    var fs = require('fs');
    var file = fs.readFileSync("/home/pi/RURI/setting.json", "utf-8");
    var json = JSON.parse(file);
    let localText = fs.readFileSync('/home/pi/RURI/files/latest_mastodon.txt', 'utf8');
    var M = new Masto({
      access_token: json['mastodon']['access_token'],
      timeout_ms: 60 * 1000,
      api_url: 'https://mstdn.y-zu.org/api/v1/',
    })
    M.get('notifications', { limit: 1 }).then(res => {
      if (localText !== JSON.stringify(res['data'][0]['created_at'])) {
        if (res['data'][0]['type'] === 'favourite') {
          flag = true;
          fs.writeFileSync("/home/pi/RURI/files/latest_mastodon.txt", JSON.stringify(res['data'][0]['created_at']));
          sayText = res['data'][0]['account']['display_name'] + 'さんが、投稿をお気に入りにしました';
          player.play('/home/pi/RURI/p.mp3')
        } else if (res['data'][0]['type'] === 'mention') {
          flag = true;
          fs.writeFileSync("/home/pi/RURI/files/latest_mastodon.txt", JSON.stringify(res['data'][0]['created_at']));
          var text = res['data'][0]['status']['content'].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g)
          console.log(text);
          text = sayText.slice(text.indexOf(' '));
          sayText = res['data'][0]['account']['display_name'] + 'さんからメンションが届きました、' + text;
          console.log(sayText);
          player.play('/home/pi/RURI/p.mp3')
        } else if (res['data'][0]['type'] === 'reblog') {
          flag = true;
          fs.writeFileSync("/home/pi/RURI/files/latest_mastodon.txt", JSON.stringify(res['data'][0]['created_at']));
          sayText = res['data'][0]['account']['display_name'] + 'さんが、投稿をブーストしました';
          player.play('/home/pi/RURI/p.mp3')
        }
      }
    })
  }
}, 5000);

player.on('end', function (data) {
  var OpenJTalk = require('openjtalk');
  var mei = new OpenJTalk();
  mei.talk(sayText, () => {
    flag = false;
  })
})