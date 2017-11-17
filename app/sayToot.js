const mastodon = require('/home/pi/RURI/src/mastodon');
module.exports.sayToot = function (text) {
  var OpenJTalk = require('openjtalk');
  var mei = new OpenJTalk();
  const execSync = require('child_process').execSync;
  mei.talk('ツイートを開始します、内容は、' + text + '、です。', (err) => {
    mastodon.toot(text);
    if (err) {
      mei.talk('エラーが発生しました');
      console.log(err);
    }
    mei.talk('ツイートが終了しました');
  });
}