// server.js
// where your node app starts

// Dependencies: A set of statements to import dependencies
var express = require('express');
var url = require('url');
var request = require('request');
var mongo = require('mongodb').MongoClient;

// Instantiations: A set of statements to create objects
var app = express();
const db_url = "mongodb://"+process.env.USER+":"+process.env.PASSWORD+"@ds153609.mlab.com:53609/rafascardb";

// Configurations: A set of statements to configure system and custom settings
app.use(express.static('public'));

// Middleware: A set of statements that is executed for every incoming request

// Routes: A set of statements that defines server routes, endpoints, and pages
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/:term", function (req, res) {
  const term = req.params.term;
  const offset = url.parse(req.url, true).query.offset;
  
  // Add search to database history
  addToHistory(term);
  
  searchImages(term, offset, function(err, images) {
    res.send(images);
  });
});

app.get("/api/latest/imagesearch", function (req, res) {
  // Get database history
  getHistory(function(err, hist) {
    if(err) throw err;
    
    res.send(hist);
  });
});

// Bootup: A set of statements that starts the server and makes it listen on a specific port for incoming requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function searchImages(term, offset, callback) {  
  // Get page from offset parameter
  var page = isNaN(offset) ? 1 : (+offset*10 + 1);
  
  // Create api url
  var params = {
    q: term,
    cx: "010241553826995913188:789puu3wzjw",
    searchType: 'image',
    start: page,
    key: process.env.APIKEY
  };
  const url = "https://www.googleapis.com/customsearch/v1?" + encodeQueryData(params);
  
  // Call api
  request(url, function(error, response, body) {
    if(error) callback(error);
    
    // Parse json response
    const data = JSON.parse(body);
    var result = [];
    data.items.forEach((item) => {
      result.push({
        url: item.link,
        snippet: item.snippet,
        thumbnail: item.image.thumbnailLink,
        context: item.image.contextLink
      });
    });
    callback(null, result);
  });
}

function encodeQueryData(data) {
  var ret = [];
  for(var key in data) {
    ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  return ret.join('&');
}

function addToHistory(term) {
  mongo.connect(db_url, function(err, db) {
    if(err) throw err;
    
    const collection = db.collection("imagesearch");
    collection.insert({
      term: term,
      date: new Date().toISOString()
    }, function(err, doc) {
      if(err) throw err;
      db.close();
    });
  });
}

function getHistory(callback) {
  mongo.connect(db_url, function(err, db) {
    if(err) throw err;
    
    const collection = db.collection("imagesearch");
    collection.find({}, {_id: false})
      .sort({$natural:-1})
      .limit(10)
      .toArray(function(err, docs) {
        if(err) callback(err);

        db.close();
        callback(null, docs);   
      });
  });
}