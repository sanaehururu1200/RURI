const twitter = require('../src/twitter');
module.exports.sayTweet = function (text) {
  var OpenJTalk = require('openjtalk');
  var mei = new OpenJTalk();
  const execSync = require('child_process').execSync;
  mei.talk('ツイートを開始します、内容は、' + text + '、です。', (err) => {
    twitter.tweet(text);
    if (err) {
      mei.talk('エラーが発生しました');
      console.log(err);
    }
    mei.talk('ツイートが完了しました');
  });
}


module.exports.getTextAndTweet = function (text) {
  const fs = require('fs');
  const mic = require('mic');
  const twitter = require('/home/pi/RURI/app/sayTweet');
  process.on('unhandledRejection', console.dir);
  const { BingSpeechClient, VoiceRecognitionResponse } = require('bingspeech-api-client');
  var file = fs.readFileSync("/home/pi/RURI/setting.json", "utf-8");
  var json = JSON.parse(file);
  var OpenJTalk = require('openjtalk');
  var mei = new OpenJTalk();
  var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 2
  });
  var micInstance1 = mic({
    rate: '16000',
    channels: '1',
    debug: false,
    exitOnSilence: 2
  });
  var micInputStream1 = micInstance1.getAudioStream();
  micInputStream1.pipe(fs.WriteStream('output.wav'));

  var micInputStream = micInstance.getAudioStream();
  micInputStream.pipe(fs.WriteStream('output.wav'));
  micInputStream.on('data', function (data) {
    console.log("Recieved Input Stream: " + data.length);
  });
  micInputStream.on('error', function (err) {
    console.log("Error in Input Stream: " + err);
  });
  micInputStream.on('silence', function () {
    micInstance.stop();
    let audioStream = fs.createReadStream('./output.wav');
    let subscriptionKey = json.bing.key;
    let client = new BingSpeechClient(subscriptionKey);
    client.recognizeStream(audioStream, 'ja-JP').then(response => {
      if (isset(response['results'])) {
        mei.talk('投稿内容は、' + response['results'][0]['name'] + '、でよろしいですか？', function () {
          text = response['results'][0]['name'];
          micInstance1.start();
        })
        console.log('音声認識に成功しました');
      } else {
        mei.talk('すみません、聞き取れませんでした');
        console.log('音声認識に失敗しました');
        console.log(JSON.stringify(response));
      }
    });
  });
  micInputStream.on('processExitComplete', function () {
    console.log("Got SIGNAL processExitComplete");
  });
  micInstance.start();


  micInputStream1.on('data', function (data) {
    console.log("Recieved Input Stream: " + data.length);
  });

  micInputStream1.on('silence', function () {
    micInstance1.stop();
    let audioStream = fs.createReadStream('./output.wav');
    let subscriptionKey = json.bing.key;
    let client = new BingSpeechClient(subscriptionKey);
    client.recognizeStream(audioStream, 'ja-JP').then(response => {
      if (isset(response['results'])) {
        switch (response['results'][0]['name']) {
          case 'はい':
          case 'そうだよ':
          case 'あたりまえだよなぁ':
          case 'そう':
            twitter.sayTweet(text);
            break;
          case 'いいえ':
          case 'ちがう':
          case 'ちがうよ':
          default:
            mei.talk('投稿しませんでした');
            console.log(response['results'][0]['name']);
            break;
        }
        console.log('音声認識に成功しました');
      } else {
        mei.talk('すみません、聞き取れませんでした');
        console.log('音声認識に失敗しました');
        console.log(JSON.stringify(response));
      }
    });
  });

  function isset(data) {
    return (typeof (data) != 'undefined');
  }
}