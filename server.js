const VirtualTrainer = require("./virtual-trainer");
const https = require('https');
const fs=require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const version = require('./version');

let trainer = new VirtualTrainer();
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/json' }))

app.post('/steer', function(req, res) {
  res.send();
  data = req.body
  trainer.update(data);
});

app.get('/steer', function(req, res) {
  data = trainer.get();
  data.version = version;
  res.send(data)
});

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');

var credentials = {
  key: key,
  cert: cert
};

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(9999);
