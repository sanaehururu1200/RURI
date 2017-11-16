const record = require('node-record-lpcm16');
const fs = require('fs');
var file = fs.createWriteStream('rec.wav', { encoding: 'binary' });

record.start({
  sampleRate: 44100,
  verbose: true
}).pipe(file);