// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//the assignment
app.get("/api/whoami", headerParse);

function headerParse(req, res, next){
  const { headers } = req;
  console.log("WHO AM I request from: ");
  console.log(headers);
  console.log("Returning info.");

  let userInfo = {"ipaddress": req.ip, "language": headers['accept-language'], "software": headers['user-agent']}
  console.log(userInfo);

  res.json(userInfo);
  next();
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
