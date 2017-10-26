var Twitter = require('twitter');

module.exports.tweet = function(text) {
  var fs = require('fs');
  var file = fs.readFileSync("./setting.json", "utf-8");
  var json = JSON.parse(file);
  console.dir(json);
  var client = new Twitter({
  consumer_key: json['twitter']['consumer_key'],
  consumer_secret: json['twitter']['consumer_secret'],
  access_token_key: json['twitter']['access_token_key'],
  access_token_secret: json['twitter']['access_token_secret']
  });

  client.post('statuses/update', {status: text},  function(error, tweet, response) {
    if(error);
  });
}