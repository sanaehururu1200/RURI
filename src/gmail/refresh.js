var request = require('request');
var querystring = require('querystring');
const fs = require('fs');
var file = fs.readFileSync("./setting.json", "utf-8");
var json = JSON.parse(file);
var form = {
  client_id: json.gmail.client_id,
  client_secret: json.gmail.client_secret,
  refresh_token: json.gmail.refresh_token,
  grant_type: "refresh_token"
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://accounts.google.com/o/oauth2/token',
    body: formData,
    method: 'POST'
  }, function (err, res, body) {
    console.log(body);
  });