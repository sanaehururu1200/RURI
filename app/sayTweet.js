const twitter = require('../src/twitter');
module.exports.sayTweet = function (text) {
  var OpenJTalk = require('openjtalk');
  var mei = new OpenJTalk();
  const execSync = require('child_process').execSync;
  const result = execSync('cat /sys/class/thermal/thermal_zone0/temp').toString();
  mei.talk('ツイートを開始します、内容は、' + text + '、です。', (err) => {
    twitter.tweet(text);
    if (err) {
      mei.talk('エラーが発生しました');
      console.log(err);
    }
    mei.talk('ツイートが完了しました');
  });
}