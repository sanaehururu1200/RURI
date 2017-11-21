var gpio = require('rpi-gpio');

gpio.setup(12, gpio.DIR_IN, gpio.EDGE_BOTH);

gpio.on('change', function(channel, value) {
  if(channel === 12 && value === true){
    require('./switch').switchSpeech();;
  }
});