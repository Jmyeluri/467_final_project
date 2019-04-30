function initMap() {
  var map;
  var elevator;
  var myOptions = {
  zoom: 6,
  center: new google.maps.LatLng(46.87916, -3.32910),
  mapTypeId: 'terrain'
  };
  map = new google.maps.Map($('#map')[0], myOptions);
  var markers = [];

  var isDrawing = false;
  var overlay = new google.maps.OverlayView();
  overlay.draw = function () {};
  overlay.setMap(map);
  var count = 0;
  var coords = [];

  function createMarker(place) {
      var photos = place.photos;
      var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      var photoHtml = '';
      if(photos){
        photoHtml = '<img style="width:80px;height:60px;" src=' + photos[0].getUrl() + '>';
        console.log(photoHtml);
      }

      var infoWindowHtml = '<div>' + photoHtml + '<br>' + '<strong>' + place.name + '</strong><br>' +
                'Place Type: ' + place.types.join(', ') + '</div>';

      markers.push(marker);
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(infoWindowHtml);
        infowindow.open(map, this);
      });
    }



  function callback(results, status) {
    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }



  function geocodeLatLng(geocoder, map, infowindow, latLng) {
  var placesRequest = {
    location: latLng,
    radius: '300'
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(placesRequest, callback);
  /*
  geocoder.geocode({'location': latLng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {

        //map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      }
    } else {
      if(status == 'OVER_QUERY_LIMIT'){
        window.alert('Geocoder failed due to: ' + status);
      }
    }

  });*/
  }
  function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  var polyLine = new google.maps.Polyline({
    map: map,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 10
  });

  // Add a listener for idle event and call getElevation on a random set of marker in the bound
  google.maps.event.addListener(map, 'click', function () {
    console.log(count);
    polyLine.setMap(null);
    deleteMarkers();
    polyLine = new google.maps.Polyline({
      map: map,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 10
    });
    google.maps.event.addListener(map, 'mousemove', function (event) {
        count++;
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var latLng = new google.maps.LatLng(lat, lng)
        console.log(count);
        polyLine.getPath().push(latLng);
        if(count % 20 == 0){
          coords.push(latLng);
          console.log(coords);
          geocodeLatLng(geocoder, map, infowindow, latLng);
        }
        google.maps.event.addListener(polyLine, 'click', function(event) {
          google.maps.event.clearListeners(map, 'mousemove');
        });
    });
  });
}
