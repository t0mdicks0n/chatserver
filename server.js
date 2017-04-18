var express = require('express');
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var port = 3000;
var ip = '127.0.0.1';
var dbLocation = '../db/db.json';

app.use(cors());
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

var readDatabase = function () {
  return fs.readFileSync(dbLocation, 'utf8');
};

app.listen(port, ip, function() {
  console.log("Server running on http://127.0.0.1:3000");
});

app.get('/classes/messages', function(request, response) {
  response.status(200).send(readDatabase());
});

app.get('*', function(request, response){
  response.send('Wrong path.', 404);
});

app.post('/classes/messages', function(request, response) {
  var newPost = request.body;
  newPost.objectId = Math.random();

  var currentDb = JSON.parse(readDatabase());
  currentDb.results.push(newPost);

  fs.writeFile(dbLocation, JSON.stringify(currentDb), function(err) {
    if(err) {  return console.log(err) };

    console.log("The file was saved!");
  }); 
  response.status(201).send('it was written');
});
