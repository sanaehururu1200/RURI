const Julius = require('julius-net');
const fs = require('fs');
const mic = require('mic');
const net = require('net');
var execSync = require('child_process').execSync;
let speechFlag = false;
const { BingSpeechClient, VoiceRecognitionResponse } = require('bingspeech-api-client');
const mastodon = require('../src/mastodon');
julius = new Julius({
    host: '127.0.0.1',
    port: 10500
});
// execSync('julius -C ../grammar-kit-v4.1/testmic.jconf -charconv EUC-JP UTF-8 -module');
julius.on('recognitionSuccess', function (recognition) {
    // console.log(JSON.stringify(recognition));
    if (recognition[0]['words'] !== undefined && speechFlag == false) {
        console.log(recognition[0]['words'][1]['word']);
        if (recognition[0]['words'][1]['word'] === 'ぶどう') {
            console.log('音声認識を開始します、Tootする内容を話してください。')
            testPromise().catch((err) => {
                console.log(err.toString())
            })
            // bing();
            // console.log('Tootします');
            // var text = '';
            // for (var i = 0; recognition[0]['words'].length > i; i++) {
            //     if (recognition[0]['words'][i]['word'] != '<s>' || recognition[0]['words'][i]['word'] != '</s>') {
            //         text += recognition[0]['words'][i]['word'];
            //     }
            // }
            // console.log('「' + text + '」');
            // mastodon.toot(text);
            /* Google Cloud Speech API で文字を起こして投稿 */
        }
    }
    
});

julius.end()

function testPromise() {
    return new Promise((resolve, reject) => {
        julius.end();
    }).then(() => {
        bing()
    })
}

function bing() {
    // julius.socket.destroy();
    console.log('Connected Stop Julius');
    console.log('Bing Speech Start');
    speechFlag = true;

    var file = fs.readFileSync("./setting.json", "utf-8");
    var json = JSON.parse(file);
    var micInstance = mic({
        rate: '16000',
        channels: '1',
        debug: false,
        exitOnSilence: 4
    });
    console.log('1');
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
        console.log('3');
        client.recognizeStream(audioStream, 'ja-JP').then(response => console.log(response));
    });
    micInputStream.on('processExitComplete', function () {
        console.log("Got SIGNAL processExitComplete");
    });
    micInstance.start();

    julius.on('error', function (e) {
        console.log('Connection Failed');
        console.error(e.message);
    });

    julius.on('close', function () {
        console.log('Connection closed');
    });

    process.on('unhandledRejection', console.dir);
    console.log('4');
}
console.log('2');