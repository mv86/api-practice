var app = function() {
  var select = document.getElementById('film-select');

    select.onchange = function() {
      var film = this.value;
      makeRequest(film, requestCompleteFilm);
    };
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
  soundtrackRequest = "https://api.spotify.com/v1/search?q=" + filmJson.Title + "&type=album&limit=1";
  makeRequest(soundtrackRequest, requestCompleteSoundtrack);
  populateFilmInfo(filmJson);
}

var requestCompleteSoundtrack = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var soundtrackJson = JSON.parse(jsonString);
  populateSoundtrackInfo(soundtrackJson);
}

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
  var spotifyLink = document.createElement('li');
  var a = document.createElement('a');
  a.id = "spotify-link";
  spotifyLink.appendChild(a);
  liTitle.innerText = "Title: " + film.Title;
  liReleased.innerText = "Release Date: " + film.Released;
  liLanguage.innerText = "Language: " + film.Language;
  liDirector.innerText = "Director: " + film.Director;
  liAwards.innerText = "Awards: " + film.Awards;
  liSynopsis.innerText = "Synopsis: " + film.Plot;
  a.innerText = "Listen to Soundtrack on Spotify"
  ul.appendChild(liTitle);
  ul.appendChild(liReleased);
  ul.appendChild(liLanguage);
  ul.appendChild(liDirector);
  ul.appendChild(liAwards);
  ul.appendChild(liSynopsis);
  ul.appendChild(spotifyLink);
  var filmImg = document.getElementById('poster');
  filmImg.src = film.Poster;
  filmInfoCell.appendChild(filmImg);
  filmInfoCell.appendChild(ul);
  // populatePoster(film);
  populateMap(film);
  populateGraph(film);
};

var populateSoundtrackInfo = function(soundtrack) {
  a = document.getElementById('spotify-link');
  a.href = soundtrack.albums.items[0].external_urls.spotify;
  a.target = "_blank";
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
  filmRating = parseFloat(film.imdbRating);
  new ColumnChart('column', 'Film IMDB Rating', filmRating, [{y: filmRating}],
    [film.Title], film.imdbRating);
};

window.onload = app;