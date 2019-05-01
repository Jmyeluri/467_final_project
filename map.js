var map;
var markers = [];
var polyLines = [];
function initMap() {
  var elevator;
  var myOptions = {
  zoom: 6,
  center: new google.maps.LatLng(46.87916, -3.32910),
  mapTypeId: 'terrain'
  };
  var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.8566, lng: 2.3522},
        zoom: 8,
        styles: [
          {
              "featureType": "all",
              "elementType": "geometry",
              "stylers": [
                  {
                      "saturation": "100"
                  },
                  {
                      "lightness": "-37"
                  },
                  {
                      "gamma": "4.16"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "hue": "#ff0000"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  },
                  {
                      "color": "#f49f53"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "saturation": "-8"
                  },
                  {
                      "lightness": "-9"
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "gamma": "0.00"
                  },
                  {
                      "weight": "0.01"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "all",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f9ddc5"
                  },
                  {
                      "lightness": -7
                  }
              ]
          },
          {
              "featureType": "poi.business",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#645c20"
                  },
                  {
                      "lightness": 38
                  }
              ]
          },
          {
              "featureType": "poi.government",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#9e5916"
                  },
                  {
                      "lightness": 46
                  }
              ]
          },
          {
              "featureType": "poi.medical",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#813033"
                  },
                  {
                      "lightness": 38
                  },
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#645c20"
                  },
                  {
                      "lightness": 39
                  }
              ]
          },
          {
              "featureType": "poi.school",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#a95521"
                  },
                  {
                      "lightness": 35
                  }
              ]
          },
          {
              "featureType": "poi.sports_complex",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#9e5916"
                  },
                  {
                      "lightness": 32
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#813033"
                  },
                  {
                      "lightness": 43
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#f19f53"
                  },
                  {
                      "weight": 1.3
                  },
                  {
                      "visibility": "on"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#f19f53"
                  },
                  {
                      "lightness": -10
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "lightness": 38
                  }
              ]
          },
          {
              "featureType": "transit.line",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#813033"
                  },
                  {
                      "lightness": 22
                  }
              ]
          },
          {
              "featureType": "transit.station",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#1994bf"
                  },
                  {
                      "saturation": -69
                  },
                  {
                      "gamma": 0.99
                  },
                  {
                      "lightness": 43
                  }
              ]
          }
      ]

      });

  var isDrawing = false;
  var overlay = new google.maps.OverlayView();
  overlay.draw = function () {};
  overlay.setMap(map);
  var count = 0;
  var coords = [];

  var lineSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: '#393'
          };

var symbolOne = {
            path: 'M -10,0 0,-10 10,0 0,10 z',
            strokeColor: '#1994bf',
            fillColor: '#1994bf',
            fillOpacity: 0.8
          };

var symbolTwo = {
                      path: 'M -10,0 0,-10 10,0 0,10 z',
                      strokeColor: '#1994bf',
                      fillColor: '#bf4218',
                      fillOpacity: 0.8
                    };


  var request;
  var gettingData = false;
  var weather;
  var openWeatherMapKey = "339b52f9b02b6d39e0aa17eae154d267";
  var latLngDict = {};

  // Make the weather request
  var getWeather = function(lat, lng) {
    gettingData = true;
    var requestString = "http://api.openweathermap.org/data/2.5/weather?lat="
                        + lat + "&lon=" + lng + "&units=imperial&APPID=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.onload = processResults;
    request.open("get", requestString, false);
    request.send();
  };
  // Take the JSON results and proccess them
  var processResults = function() {
    weather = JSON.parse(this.responseText);
  };
  function createMarker(place) {
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      getWeather(lat, lng);
      var photos = place.photos;
      if(!photos){
        return;
      }

      var marker = new google.maps.Marker({
           map: map,
           icon: symbolOne,
           position: place.geometry.location,
           data: place.types
         });
      markers.push(marker);

      var photoHtml = '';
      if(photos){
        photoHtml = '<img style="width:350px;height:330px;" src=' + photos[0].getUrl() + '>';
      }

      var infoWindowHtml = '<div>' + photoHtml + '<br>' + '<strong>' + place.name + '</strong><br>' +
                '<strong>Place Type:</strong> ' + place.types.join(', ') + '<br><strong>Nearest Town: </strong>' + weather.name +
                ', <strong>Temperature: </strong>' + weather.main.temp + '&deg;F</div><br>' + '<img src="http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png">';

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(infoWindowHtml);
        infowindow.open(map, this);
      });
    }



  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        if(i > 5){
          return;
        }
        createMarker(results[i]);
      }
    }
  }

  $(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`
       deletePolyLines();
       deleteMarkers();
    }
});


  function geocodeLatLng(geocoder, map, infowindow, latLng) {
  var placesRequest = {
    location: latLng,
    radius: '300'
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(placesRequest, callback);

  }

$(document).on('click', '.linePoint', function () {
    latLngRaw = $(this).text();
    console.log(latLngRaw);
    latLngArr = latLngRaw.split(',');
    var placeCount = latLngArr[0];
    var latLng = new google.maps.LatLng(latLngArr[1], latLngArr[2])
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': latLng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0].formatted_address)
          map.setZoom(7);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: symbolTwo,
            data: results[0].types
          });
          markers.push(marker);
          infowindow.setContent("<strong>" + placeCount + "</strong>" + results[0].formatted_address);
          infowindow.open(map, marker);
        }
      } else {
        if(status == 'OVER_QUERY_LIMIT'){
          window.alert('Geocoder failed due to: ' + status);
        }
      }

    });
});

  function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }
  function deletePolyLines() {
    for (var i = 0; i < polyLines.length; i++) {
      polyLines[i].setMap(null);
    }
    polyLines = [];
  }
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  polyLine = new google.maps.Polyline({
          icons: [{
                icon: lineSymbol,
                offset: '100%'
              }],
          map: map,
          strokeColor: '#813033',
          strokeOpacity: 0.7,
          strokeWeight: 8
        });
  polyLines.push(polyLine);
  // Add a listener for idle event and call getElevation on a random set of marker in the bound
  google.maps.event.addListener(map, 'click', function () {
    //polyLine.setMap(null);
    //deleteMarkers();
    polyLine = new google.maps.Polyline({
        icons: [{
              icon: lineSymbol,
              offset: '100%'
            }],
        map: map,
        strokeColor: '#813033',
        strokeOpacity: 0.7,
        strokeWeight: 8
      });
      polyLines.push(polyLine);
    google.maps.event.addListener(map, 'mousemove', function (event) {
        count++;
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var latLng = new google.maps.LatLng(lat, lng)
        console.log(count);
        polyLine.getPath().push(latLng);
        var freq = 10;
        if(count % freq == 0){
          coords.push(latLng);
            console.log(lat);
            console.log(lng);
            console.log()
            $("<button class='btn btn-success linePoint' type='button' latLng=" + latLng + " data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>" + String(count/freq) + ") ,"+ lat + ',' + lng +"</button>").appendTo('#latLng');
          geocodeLatLng(geocoder, map, infowindow, latLng);
        }
        google.maps.event.addListener(polyLine, 'click', function(event) {
          google.maps.event.clearListeners(map, 'mousemove');
        });
    });
  });
}
function filterMarkers() {
  var place_type = document.getElementById("Select1").value;
  if (place_type == "") {
    console.log(markers);
    for (var i = 0; i < markers.length; i++) {
        markers[i].setVisible(true);
    }
  }
  else{
    for (var i = 0; i < markers.length; i++) {
      if (!markers[i].data.includes(place_type)) {
        markers[i].setVisible(false);
      }
    }
  }
}
