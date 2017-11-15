const mastodon = require('../src/mastodon');
module.exports.sayTweet = function (text) {
  var OpenJTalk = require('openjtalk');
  var mei = new OpenJTalk();
  const execSync = require('child_process').execSync;
  const result = execSync('cat /sys/class/thermal/thermal_zone0/temp').toString();
  mei.talk('ツイートを開始します、内容は、' + text + '、です。', (err) => {
    mastodon.toot(text);
    if (err) {
      mei.talk('エラーが発生しました');
      console.log(err);
    }
    mei.talk('ツイートが終了しました');
  });
}