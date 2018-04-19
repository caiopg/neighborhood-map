var initialPoints = [
  {
    name : "Shopping Cidade São Paulo",
    lat : -23.563647,
    lng : -46.652903
  },
  {
    name : "Padaria Bella Paulista",
    lat : -23.556172,
    lng : -46.660118
  },
  {
    name : "Museu de Arte de São Paulo",
    lat : -23.561414,
    lng : -46.655882
  },
  {
    name : "Carlo's Bakery São Paulo",
    lat : -23.563308,
    lng : -46.669262
  },
  {
    name : "O'Malley's Bar",
    lat : -23.558311,
    lng : -46.665982
  }
]

var defaultMarkerColor = '0091ff';
var highlightedMarkerColor = 'ffff24';

function initMap() {
  var map = new google.maps.Map(document.getElementById('map-container'), {
    center: {lat: -23.557736, lng: -46.660912 },
    zoom: 14
  });

  var infoWindow = new google.maps.InfoWindow();

  initialPoints.forEach(function(mapPoint) {
    var marker = new google.maps.Marker({
      position: {lat: mapPoint.lat, lng: mapPoint.lng},
      map: map,
      title: mapPoint.name,
      animation: google.maps.Animation.DROP,
      icon: colorMarker(defaultMarkerColor)
    });

    marker.addListener('click', function() {
      marker.setIcon(colorMarker(highlightedMarkerColor));
      populateInfoWindow(map, this, infoWindow);
    });

    marker.addListener('');
  });
}

function populateInfoWindow(map, marker, infoWindow) {
  if(infoWindow.marker != marker) {
    if(infoWindow.marker != null) {
      infoWindow.marker.setIcon(colorMarker(defaultMarkerColor));
    }

    infoWindow.marker = marker;
    infoWindow.setContent('<div>test</div>');
    infoWindow.open(map, marker);

    infoWindow.addListener('closeclick', function() {
      if(infoWindow.marker != null) {
        infoWindow.marker.setIcon(colorMarker(defaultMarkerColor));
      }
      infoWindow.marker = null;
    });
  }
}

function colorMarker(color) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' +
    color + '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));

    return markerImage;
}
