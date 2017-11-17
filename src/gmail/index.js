module.exports.getLastMail = function () {
  const Gmail = require('node-gmail-api');
  const fs = require('fs');
  var file = fs.readFileSync("./setting.json", "utf-8");
  var json = JSON.parse(file);
  var access_token = refreshRequest();
  const gmail = new Gmail(access_token);
  const s = gmail.messages('label:inbox', { max: 1 });
  s.on('data', function (d) {
    return d.snippet;
  })
}

function refreshRequest() {
  var request = require('sync-request');
  var querystring = require('querystring');
  const fs = require('fs');
  var file = fs.readFileSync("./setting.json", "utf-8");
  var json = JSON.parse(file);
  var form = {
    client_id: json.google.client_id,
    client_secret: json.google.client_secret,
    refresh_token: json.google.refresh_token,
    grant_type: "refresh_token"
  };

  var formData = querystring.stringify(form);
  var contentLength = formData.length;

  var res = request('POST', 'https://accounts.google.com/o/oauth2/token', {
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  });
  return JSON.parse(res.getBody('utf8')).access_token;
}