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

  function geocodeLatLng(geocoder, map, infowindow, latlng) {
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              //map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
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
        });
  }
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  // Add a listener for idle event and call getElevation on a random set of marker in the bound
  google.maps.event.addListener(map, 'click', function () {
    console.log(count);
    var polyLine = new google.maps.Polyline({
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
    });
  });
}
