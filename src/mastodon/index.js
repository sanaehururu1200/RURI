var Masto = require('mastodon-api')

module.exports.toot = function(text){
  var fs = require('fs');
  var file = fs.readFileSync("/home/pi/RURI/setting.json", "utf-8");
  var json = JSON.parse(file);
  var M = new Masto({
      access_token: json['mastodon']['access_token'],
      timeout_ms: 60 * 1000,
      api_url: 'https://mstdn.y-zu.org/api/v1/',
  })
  M.post('statuses', {status: text, visibility: 'unlisted'}, function (err, data, res) {
    if(err)
      return false;
    return true;
  })
}
