module.exports.switchSpeech = function () {
  const fs = require('fs');
  const mic = require('mic');
  const record = require('./record');
  const mastodon = require('/home/pi/RURI/app/sayToot');
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
      if (isset(response.result)) {
        var res = response['results'][0]['name'];
        if (res.indexOf('トゥート')) {
          var OpenJTalk = require('openjtalk');
          var mei = new OpenJTalk();
          mei.talk('トゥートですね、トゥート内容をどうぞ。', function () {
            mastodon.getTextAndToot();
          });
        }
        console.log('音声認識に成功しました');
      } else {
        console.log('音声認識に失敗しました');
        console.log(JSON.stringify(response));
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