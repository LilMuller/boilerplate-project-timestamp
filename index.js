// index.js
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

//Function to generate the timestamp
const getTimestamp = (date)=>({
  unix: Math.floor(date.getTime()/1000.0),
  utc: date.toUTCString()
});

// your first API endpoint... 
app.get("/api/", function (req, res) {
  let currentDate = new Date()
  res.json(getTimestamp(currentDate));
});


app.get("/api/:date_string?", (req, res)=>{
  const {date_string} = req.params;
  let date;

  if (/^\d+$/.test(date_string)) {
    date = new Date(parseInt(date_string, 10) * 1000)
  } else {
    date = new Date(date_string);
  }

  if(isNaN(date.getTime())){
    res.json({error: "Invalid Date"});
  }else{
    res.json(getTimestamp(date));
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
