'use strict';
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  var ipaddress = req.headers["x-forwarded-for"];
  var software = req.headers["user-agent"];
  var language = req.headers["accept-language"];
  var parsed = {
    ipaddress: ipaddress.slice(0, ipaddress.indexOf(',')), 
    language: language,
    software: software}
  return res.json(parsed);
});

app.get('*', (req, res) => {
  res.redirect('api/whoami')
})

app.listen(process.env.PORT || 3000), function () {
  console.log('Your app is listening on port ' + listener.address().port);
});