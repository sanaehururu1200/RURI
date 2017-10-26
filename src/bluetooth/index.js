var bleno = require('bleno');
var util = require('util');
const music = require('../music/');
const twitter = require('../twitter/');
var EventEmitter = require('events').EventEmitter;

var Characteristic = bleno.Characteristic;
var PrimaryService = bleno.PrimaryService;

var SwitchCharacteristic = function() {
    SwitchCharacteristic.super_.call(this, {
      uuid: 'ff11',
      properties: ['read', 'write'],
      descriptors: [
         new bleno.Descriptor({
           uuid: '8836',
           value: 'Switch'
         })
      ]
    });
  };
util.inherits(SwitchCharacteristic, Characteristic);

SwitchCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log("read request");
  var data = new Buffer(1);
  callback(this.RESULT_SUCCESS, data);
};

SwitchCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('write request: ' + data.toString());
    switch (data.toString()) {
      case 'rmp':
        music.play(music.getRandomMusicPath());
        break;

        
    }  
    callback(this.RESULT_SUCCESS);
}

var lightService = new PrimaryService({
  uuid: 'ff10',
  characteristics: [
    new SwitchCharacteristic()
  ]
});

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('USB', [lightService.uuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([lightService]);
  }
});

function exit() {
  process.exit();
}
process.on('SIGINT', exit);