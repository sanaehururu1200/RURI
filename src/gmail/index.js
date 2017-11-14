const Gmail = require('node-gmail-api');
const fs = require('fs');
var file = fs.readFileSync("./setting.json", "utf-8");
var json = JSON.parse(file);
const gmail = new Gmail(json['gmail']['access_token']);
const s = gmail.messages('label:inbox', {max: 1});

s.on('data', function (d) {
  console.log(d.snippet);
})
