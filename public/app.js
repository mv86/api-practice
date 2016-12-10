var app = function() {
  var filmUrl = "http://www.omdbapi.com/?t=the+shawshank+redemption&y=&plot=full&r=json";
  // var soundtrackUrl = "https://api.spotify.com/v1/search?q=The+Shawshank+Redemption&type=album&limit=1";
  makeRequest(filmUrl, requestCompleteFilm);
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

var populateFilmInfo = function(film) {
  var filmInfoCell = document.getElementById('film-info-cell');
  var ul = document.getElementById('film-info-ul')
  var liTitle = document.createElement('li');
  var liYear = document.createElement('li');
  var liReleased = document.createElement('li');
  var liLanguage = document.createElement('li');
  var liDirector = document.createElement('li');
  var liAwards = document.createElement('li');
  liTitle.innerText = "Title: " + film.Title;
  liYear.innerText = "Year: " + film.Year;
  liReleased.innerText = "Release Date: " + film.Released;
  liLanguage.innerText = "Language: " + film.Language;
  liDirector.innerText = "Director: " + film.Director;
  liAwards.innerText = "Awards: " + film.Awards;
  ul.appendChild(liTitle);
  ul.appendChild(liYear);
  ul.appendChild(liReleased);
  ul.appendChild(liLanguage);
  ul.appendChild(liDirector);
  ul.appendChild(liAwards);
  filmInfoCell.appendChild(ul);
  populatePoster(film);
  populateMap(film);
}

var populatePoster = function(film) {
  var posterCell = document.getElementById('poster-cell');
  var filmImg = document.createElement('img');
  filmImg.src = film.Poster;
  posterCell.appendChild(filmImg);
}

var populateMap = function(film) {
  var mapCell = document.getElementById('map-cell');
  // var map = document.getElementById('map');
  var geo = new google.maps.Geocoder();

  geo.geocode({'address': film.Country}, function (results) {
    var locationLat = results[0].geometry.location.lat();
    var locationLng = results[0].geometry.location.lng();
    var filmLocation = {lat: locationLat, lng: locationLng};
    console.log(filmLocation);
    var mainMap = new MapWrapper(mapCell, filmLocation, 3);
  });
  
}

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