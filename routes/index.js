var express = require('express');
var router = express.Router();

let songlist = [];

let SongObject = function (sTitle, sArtist, sRating, sGenre) {
  this.Title = sTitle;
  this.Artist = sArtist;
  this.Rating = sRating;
  this.sGenre = sGenre;
  this.ID = songlist.length + 1;
  //this.ID = Math.random().toString(16).slice(5)
};

console.log(songlist)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
  });

/*  GET song data */
router.get('/getAllSongs', function(req,res){
  res.status(200).json(songlist);
});


module.exports = router;
