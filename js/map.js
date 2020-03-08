var map, infoWindow, service;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 118.2851, lng: 34.0224},
    zoom: 6
});
infoWindow = new google.maps.InfoWindow;

// Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    map.setCenter(pos);
    map.setZoom(12);
    }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}
}

var request = {
    query: 'restaurant',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}