// Get our dependencies
var express = require('express');
var app = express();
var mysql = require("mysql");
var connection = mysql.createConnection({
	host     : process.env.DB_HOST || '192.168.33.12',
	user     : process.env.DB_USER || 'juan',
	password : process.env.DB_PASS ||  'pass123',
	database : process.env.DB_NAME || 'movie_db',		
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


/*
app.get('/movies', function (req, res) {
  getMovies(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})
*/

// Implement the movies API endpoint
app.get('/movies', function(req, res){
  var movies = [
    {title : 'Suicide Squad', release: '2016', score: 8, reviewer: 'Robert Smith', publication : 'The Daily Reviewer'},    
    {title : 'Batman vs. Superman', release : '2016', score: 6, reviewer: 'Chris Harris', publication : 'International Movie Critic'},
    {title : 'Captain America: Civil War', release: '2016', score: 9, reviewer: 'Janet Garcia', publication : 'MoviesNow'},
    {title : 'Deadpool', release: '2016', score: 9, reviewer: 'Andrew West', publication : 'MyNextReview'},
    {title : 'Avengers: Age of Ultron', release : '2015', score: 7, reviewer: 'Mindy Lee', publication: 'Movies n\' Games'},
    {title : 'Ant-Man', release: '2015', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Guardians of the Galaxy', release : '2014', score: 10, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'},
  ]

  res.json(movies);
})

/* 
app.get('/reviewers', function (req, res) {
  getReviewers(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})
*/

// Implement the reviewers API endpoint
app.get('/reviewers', function(req, res){
  var authors = [
    {name : 'Robert Smith', publication : 'The Daily Reviewer', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg'},
    {name: 'Chris Harris', publication : 'International Movie Critic', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg'},
    {name: 'Janet Garcia', publication : 'MoviesNow', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg'},
    {name: 'Andrew West', publication : 'MyNextReview', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg'},
    {name: 'Mindy Lee', publication: 'Movies n\' Games', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg'},
    {name: 'Martin Thomas', publication : 'TheOne', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg'},
    {name: 'Anthony Miller', publication : 'ComicBookHero.com', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg'}
  ];

  res.json(authors);
})

   
 app.get('/publications', function (req, res) {
  getPublications(function (err, result) {
    if (err) throw err;
    res.json(result);
  })})
   


console.log("server listening through port: "+process.env.PORT);
// Launch our API Server and have it listen on port 3000.
app.listen(process.env.PORT || 3000);
module.exports = app;
