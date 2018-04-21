var initialPoints = [
  {
    id : 1,
    name : "Shopping Cidade São Paulo",
    lat : -23.563647,
    lng : -46.652903
  },
  {
    id : 2,
    name : "Padaria Bella Paulista",
    lat : -23.556172,
    lng : -46.660118
  },
  {
    id : 3,
    name : "Museu de Arte de São Paulo",
    lat : -23.561414,
    lng : -46.655882
  },
  {
    id : 4,
    name : "Carlo's Bakery São Paulo",
    lat : -23.563308,
    lng : -46.669262
  },
  {
    id : 5,
    name : "Trianon Park",
    lat : -23.561815,
    lng : -46.657767
  }
]

var defaultMarkerColor = '0091ff';
var highlightedMarkerColor = 'ffff24';
var markers = [];
var infoWindow;
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map-container'), {
    center: {lat: -23.557736, lng: -46.660912 },
    zoom: 14
  });

  infoWindow = new google.maps.InfoWindow();

  initialPoints.forEach(function(mapPoint) {
    var marker = new google.maps.Marker({
      id: mapPoint.id,
      position: {lat: mapPoint.lat, lng: mapPoint.lng},
      map: map,
      title: mapPoint.name,
      animation: google.maps.Animation.DROP,
      icon: colorMarker(defaultMarkerColor)
    });

    marker.addListener('click', function() {
      onMarkerClicked(this);
    });

    markers.push(marker);
  });
}

function onMarkerClicked(marker) {
  marker.setIcon(colorMarker(highlightedMarkerColor));
  populateInfoWindow(marker, infoWindow);
}

function populateInfoWindow(marker, infoWindow) {
  if(infoWindow.marker != marker) {
    if(infoWindow.marker != null) {
      infoWindow.marker.setIcon(colorMarker(defaultMarkerColor));
    }

    infoWindow.marker = marker;
    infoWindow.addListener('closeclick', function() {
      deactivateMarker();
    });

    fetchWikiInfo(marker.title, function(response) {
      infoWindow.setContent(createContent(response, marker));
      infoWindow.open(map, marker);
    });
  }
}

function createContent(response, marker) {
  var content = '<div class=\"info-window\"><h2>' + marker.title + '</h2></div>';

  var title = response[0];
  var url = response[3];
  if(url != null && url.length > 0) {
    content = content.concat('<div>More info: </div><a href=' + url + '>' + title + '</a>')
  } else {
    content = content.concat('<div>No information found about ' + title + '.</div>')
  }

  return content;
}

function deactivateMarker() {
  if(infoWindow.marker != null) {
    infoWindow.marker.setIcon(colorMarker(defaultMarkerColor));
  }

  infoWindow.marker = null;
}

function activateMarker(mapPoint) {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].id == mapPoint.id) {
      onMarkerClicked(markers[i]);
    }
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
