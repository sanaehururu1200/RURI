module.exports.say = function() {
  var OpenJTalk = require('openjtalk');
  var mei = new OpenJTalk();
  const execSync = require('child_process').execSync;
  const result = execSync('cat /sys/class/thermal/thermal_zone0/temp').toString();
  mei.talk('現在のCPU温度は、' + Math.round(result / 1000) + '度です。');
}

module.exports.get = function() {
  const execSync = require('child_process').execSync;
  const result = execSync('cat /sys/class/thermal/thermal_zone0/temp').toString();
  return Math.round(result / 1000);
}