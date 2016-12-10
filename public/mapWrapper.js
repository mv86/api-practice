var MapWrapper = function(container, coords, zoom) {
  var container = document.getElementById('map-cell');
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
};