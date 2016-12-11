var app = function() {
  var select = document.getElementById('film-select');

    select.onchange = function() {
      var film = this.value;
      makeRequest(film, requestCompleteFilm);
    };
  // var soundtrackUrl = "https://api.spotify.com/v1/search?q=The+Shawshank+Redemption&type=album&limit=1";
  // makeRequest(filmUrl, requestCompleteFilm);
  // makeRequest(soundtrackUrl, requestCompleteSoundtrack)
};

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestCompleteFilm = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var filmJson = JSON.parse(jsonString);
  populateFilmInfo(filmJson);
}

// var requestCompleteSoundtrack = function() {
//   if(this.status !== 200) return;
//   var jsonString = this.responseText;
//   var soundtrackJson = JSON.parse(jsonString);
//   populateSoundtrackInfo(soundtrackJson);
// }

// var populateSelect = function(films) {
//   var select = document.getElementById('film-select');

//   select.onchange = function() {
//     var film = films[this.value];
//     populateFilmInfo(film);
//   };

  // for (film of films) {
  //   var option = document.createElement('option');
  //   option.innerText = film.Title;
  //   select.appendChild(option);
  // }
// };

var populateFilmInfo = function(film) {
  var filmInfoCell = document.getElementById('film-info-cell');
  var ul = document.getElementById('film-info-ul')
  ul.innerText = "";
  ul.src = "";
  var liTitle = document.createElement('li');
  var liReleased = document.createElement('li');
  var liLanguage = document.createElement('li');
  var liDirector = document.createElement('li');
  var liAwards = document.createElement('li');
  var liSynopsis = document.createElement('li');
  var button = document.createElement('button');
  liTitle.innerText = "Title: " + film.Title;
  liReleased.innerText = "Release Date: " + film.Released;
  liLanguage.innerText = "Language: " + film.Language;
  liDirector.innerText = "Director: " + film.Director;
  liAwards.innerText = "Awards: " + film.Awards;
  liSynopsis.innerText = "Synopsis: " + film.Plot;
  button.innerText = "Listen to Soundtrack on Spotify"
  // button.onclick = handleButtonClick;
  ul.appendChild(liTitle);
  ul.appendChild(liReleased);
  ul.appendChild(liLanguage);
  ul.appendChild(liDirector);
  ul.appendChild(liAwards);
  ul.appendChild(liSynopsis);
  var filmImg = document.getElementById('poster');
  filmImg.src = film.Poster;
  ul.appendChild(button);
  filmInfoCell.appendChild(filmImg);
  filmInfoCell.appendChild(ul);
  // populatePoster(film);
  populateMap(film);
  populateGraph(film);
};

// var populatePoster = function(film) {
//   var posterCell = document.getElementById('poster-cell');
//   var filmImg = document.createElement('img');
//   filmImg.src = film.Poster;
//   posterCell.appendChild(filmImg);
// }

var populateMap = function(film) {
  var mapCell = document.getElementById('map-cell');
  // var map = document.getElementById('map');
  var geo = new google.maps.Geocoder();

  geo.geocode({'address': film.Country}, function (results) {
    var locationLat = results[0].geometry.location.lat();
    var locationLng = results[0].geometry.location.lng();
    var filmLocation = {lat: locationLat, lng: locationLng};
    var mainMap = new MapWrapper(mapCell, filmLocation, 3);
    mainMap.addMarker(filmLocation);
  });
};

var populateGraph = function(film) {
  console.log(film);
  console.log(film.imdbRating);
  filmRating = parseFloat(film.imdbRating);
  var graphCell = document.getElementById('graph-cell');
  var chart = new ColumnChart('column', 'Film IMDB Rating', filmRating, [{y: filmRating}],
    [film.Title], film.imdbRating);
  graphCell.appendChild(chart);
};

// var getFilmName = function(film) {
//   for (item of film) {
//     return item.Title;
//   };
// };

// var top10Films = [
//   "http://www.omdbapi.com/?t=volver&y=&plot=short&r=json", 
//   "http://www.omdbapi.com/?t=the+shawshank+redemption&y=&plot=full&r=json", 
//   "http://www.omdbapi.com/?i=tt0120735&plot=short&r=json"]

// var populateSoundtrackInfo = function(soundtrack) {
//   var div = document.getElementById('soundtrack-info');
//   var liName = document.createElement('li');
//   var soundtrackImg = document.createElement('img');
//   console.log(soundtrack);
//   liName.innerText = soundtrack.albums.items[0].name;
//   soundtrackImg.src = soundtrack.albums.items[0].images[1].url;
//   div.appendChild(soundtrackImg);
//   div.appendChild(liName);
//   // div.appendChild(ul);
// }

window.onload = app;