var express = require('express');
var router = express.Router();
var fs = require("fs");

let songlist = [];

let SongObject = function (sTitle, sArtist, sRating, sGenre) {
  this.Title = sTitle;
  this.Artist = sArtist;
  this.Rating = sRating;
  this.sGenre = sGenre;
  // this.ID = songlist.length + 1;
  this.ID = Math.random().toString(16).slice(5)
};



let fileManager  = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    songlist = goodData;
  },

  write: function() {
    let data = JSON.stringify(songlist);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};

console.log(songlist)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
  });

/*  GET song data */
router.get('/getAllSongs', function(req,res){
  fileManager.read();
  res.status(200).json(songlist);
});

/*  Add one new song  */
router.post('/AddSong',function(req,res){
  const newSong = req.body;
  console.log(newSong);
  songlist.push(newSong);
  fileManager.write();
  res.status(200).json(newSong);
});

module.exports = router;
