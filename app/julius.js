var Julius = require('julius-net');
julius = new Julius({
    host: 'localhost',
    port: 10500
});

julius.on('recognitionSuccess', function (recognition) {
    console.log(recognition);
});