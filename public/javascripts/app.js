// $(document).ready(function(){

//   });

let songlist = [];

// function pushData() {
//   let view = document.getElementById("view");
//   let newTd = document.createElement("li");
//   var inputText = document.getElementById("songInput").value;
//   var inputArtist = document.getElementById("artistInput").value;
//   var inputRate = document.getElementById("rateInput").value;
//   var node = document.createTextNode(
//     "Song: " + inputText + ", By: " + inputArtist + ", Rating : " + inputRate
//   );
//   newTd.appendChild(node);
//   view.appendChild(newTd);

//   document.location.href = "index.html#home";
// }

//////page before show code
// $(document).on("pagebeforeshow", "ListAll", function (event){
//   createList();

// });

// function createList(){
//   //clear the prior data
//   var theList = document.getElementById("view")
//   theList.innerHTML = "";

//   songlist.forEach(function (element,i){ //use handy array forEach method
//     var li = document.createElement('li');
//     li.innerHTML = node;
//     theList.appendChild(li);

//   }

// }

let SongObject = function (sTitle, sArtist, sRating, sGenre) {
  this.Title = sTitle;
  this.Artist = sArtist;
  this.Rating = sRating;
  this.sGenre = sGenre;
  //this.ID = songlist.length + 1;
  this.ID = Math.random().toString(16).slice(5);
};

document.addEventListener("DOMContentLoaded", function () {
   createList();

  document.getElementById("buttonAdd").addEventListener("click", function () {
    let newSong = new SongObject(
      document.getElementById("songInput").value,
      // document.getElementById("year").value,
      // selectedGenre,
      document.getElementById("artistInput").value,
      document.getElementById("rateInput").value
    )
    $.post("/AddSong", newSong,function (data, status) {});
    // songlist.push(
    //   new SongObject(
    //     document.getElementById("songInput").value,
    //     // document.getElementById("year").value,
    //     // selectedGenre,
    //     document.getElementById("artistInput").value,
    //     document.getElementById("rateInput").value
    //   )
    // );
    // document.getElementById("URL").value));
    document.location.href = "index.html#home";
    // also add the URL value
  });

  $(document).on("pagebeforeshow", "#home", function (event) {
    // have to use jQuery
    //createList();
  });

  // need one for our details page to fill in the info based on the passed in ID
  $(document).on("pagebeforeshow", "#details", function (event) {
    let localID = localStorage.getItem("parm"); // get the unique key back from the dictionairy

    // next step to avoid bug in jQuery Mobile,  force the movie array to be current
    songlist = JSON.parse(localStorage.getItem("songlist"));

    let poninter = getObjectPointer(localID);

    ///console.log(songlist[poninter]);

    document.getElementById("songTitle").innerHTML =
      "The Song: " + songlist[poninter].Title;
    document.getElementById("songArtist").innerHTML =
      "By: " + songlist[poninter].Artist;
    document.getElementById("songRate").innerHTML =
      "You Rating Of: " + songlist[poninter].Rating;
    // document.getElementById("oneWoman").innerHTML = "Leading Woman: " + songlist[localID - 1].Woman;
    // document.getElementById("oneMan").innerHTML = "Leading Man: " + songlist[localID - 1].Man;
    // document.getElementById("oneURL").innerHTML = songlist[localID - 1].URL;
  });
});

function getObjectPointer(whichID) {
  for (i = 0; i < songlist.length; i++) {
    if (songlist[i].ID === whichID) {
      return i;
    }
  }
}

function createList() {
  // clear prior data
  let myUL = document.getElementById("view");
  myUL.innerHTML = "";

  $.get("/getAllSongs", function (data, status) {
    // AJAX get
    
    songlist = data; // copy returned server json data into local array
    // now INSIDE this “call back” anonymous function,
    // update the web page with this new data
  
console.log(songlist);
console.log(data);
  songlist.forEach(function (oneMovie) {
    // use handy array forEach method
    var myLi = document.createElement("li");
    // adding a class name to each one as a way of creating a collection
    myLi.classList.add("oneMovie");
    // use the html5 "data-parm" to encode the ID of this particular data object
    // that we are building an li from
    myLi.setAttribute("data-parm", oneMovie.ID);
    myLi.innerHTML = `${oneMovie.ID}) Song: ${oneMovie.Title} By: ${oneMovie.Artist} Rating: ${oneMovie.Rating}`;
    // myLi.innerHTML =
    //   oneMovie.ID +
    //   ":  " +
    //   oneMovie.Title +
    //   "  " +
    //   oneMovie.Artist +
    //   "  " +
    //   oneMovie.Rating;
    myUL.appendChild(myLi);
  });

  // now we have the HTML done to display out list,
  // next we make them active buttons
  // set up an event for each new li item,
  var liList = document.getElementsByClassName("oneMovie");
  let newMoviewArray = Array.from(liList);
  newMoviewArray.forEach(function (element) {
    element.addEventListener("click", function () {
      // get that data-parm we added for THIS particular li as we loop thru them

      var parm = this.getAttribute("data-parm"); // passing in the record.Id
      // get our hidden <p> and save THIS ID value in the localStorage "dictionairy"
      localStorage.setItem("parm", parm);

      // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
      // current movie array and save it to localStorage as well.
      let stringsonglist = JSON.stringify(songlist); // convert array to "string"
      
      localStorage.setItem("songlist", stringsonglist);

      // now jump to our page that will use that one item
      document.location.href = "index.html#details";
    });
  });
});
}

// console.log(songlist[poninter].Title);
