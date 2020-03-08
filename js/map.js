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
        var clat = position.coords.latitude;
        var clng = position.coords.longitude;
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        map.setCenter(pos);
        var marker = new google.maps.Marker({position: {lat: clat, lng: clng}, map: map});
        var marker = new google.maps.Marker({position: {lat: clat+.04, lng: clng+.02}, map: map});
        var marker = new google.maps.Marker({position: {lat: clat-.03, lng: clng+.04}, map: map});
        var marker = new google.maps.Marker({position: {lat: clat-.04, lng: clng-.02}, map: map});
        var marker = new google.maps.Marker({position: {lat: clat+.03, lng: clng-.04}, map: map});
        map.setZoom(12);
        }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

    function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
    
}



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}