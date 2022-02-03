// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
	host     : '192.168.33.12',
	user     : 'juan',
	password : 'pass123',
	database : 'movie_db',		
	SocketPath: '/var/run/mysqld/mysqld.sock'
	
});

connection.connect(err => {
  if (err) {
    console.log("Database conecction error due to " + err);
  } else {
    console.log("Database conecction succesfully");
  }
});


function getMovies(callback) {    
       connection.query("SELECT * FROM movie_db.moviereview",
           function (err, rows) {
               console.log(rows);
               callback(err, rows); 
           }
       );    
}

function getReviewers(callback) {    
       connection.query("SELECT * FROM movie_db.reviewer",
           function (err, rows) {
               console.log(rows);
               callback(err, rows); 
           }
       );    
}

function getPublications(callback) {    
       connection.query("SELECT * FROM movie_db.publication",
           function (err, rows) {
               console.log(rows);
               callback(err, rows); 
           }
       );    
}


//Testing endpoint
/*
app.get('/', function(req, res){
  var response = [{response : 'hello'}, {code : '200'}]
  res.json(response);
})
*/

app.get('/movies', function (req, res) {
  getMovies(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})
  
 
app.get('/reviewers', function (req, res) {
  getReviewers(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})
   
 app.get('/publications', function (req, res) {
  getPublications(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})
   


console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
