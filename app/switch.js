module.exports.switchSpeech = function () {
  const fs = require('fs');
  const mic = require('mic');
  const mastodon = require('/home/pi/RURI/app/sayToot');
  const twitter = require('/home/pi/RURI/app/sayTweet');
  process.on('unhandledRejection', console.dir);
  const { BingSpeechClient, VoiceRecognitionResponse } = require('bingspeech-api-client');
  var file = fs.readFileSync("/home/pi/RURI/setting.json", "utf-8");
  var json = JSON.parse(file);
  var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 2
  });
  var micInputStream = micInstance.getAudioStream();
  micInputStream.pipe(fs.WriteStream('output.wav'));
  micInputStream.on('data', function (data) {
    console.log("Recieved Input Stream: " + data.length);
  });
  micInputStream.on('error', function (err) {
    cosole.log("Error in Input Stream: " + err);
  });
  micInputStream.on('silence', function () {
    micInstance.stop();
    let audioStream = fs.createReadStream('./output.wav');
    let subscriptionKey = json.bing.key;
    let client = new BingSpeechClient(subscriptionKey);
    client.recognizeStream(audioStream, 'ja-JP').then(response => {
      if (isset(response.results)) {
        var res = response['results'][0]['name'];
        console.log(res);
        if (
          res.indexOf('とぅーと') != -1 ||
          res.indexOf('トゥート') != -1 ||
          res.indexOf('ますとどん') != -1 ||
          res.indexOf('マストドン') != -1
        ) {
          var OpenJTalk = require('openjtalk');
          var mei = new OpenJTalk();
          mei.talk('トゥートですね、トゥート内容をどうぞ。', function () {
            mastodon.getTextAndToot();
          });
        } else if (
          res.indexOf('ツイッター') != -1 ||
          res.indexOf('ついったー') != -1 ||
          res.indexOf('ツイート') != -1 ||
          res.indexOf('ついーと') != -1
        ) {
          var OpenJTalk = require('openjtalk');
          var mei = new OpenJTalk();
          mei.talk('ツイートですね、ツイート内容をどうぞ。', function () {
            twitter.getTextAndTweet();
          });

        } else {
          console.log('音声認識に失敗しました');
          var OpenJTalk = require('openjtalk');
          var mei = new OpenJTalk();
          mei.talk('すみません、聞き取れませんでした');
          console.log(JSON.stringify(response));
        }
      }
    });
  });
  micInputStream.on('processExitComplete', function () {
    console.log("Got SIGNAL processExitComplete");
  });
  micInstance.start();

  function isset(data) {
    return (typeof (data) != 'undefined');
  }
}