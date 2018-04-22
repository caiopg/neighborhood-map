// initialPoints contains all the initial points used to populate the map.
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
  },
  {
    id : 6,
    name : "Starbucks Paulista",
    lat : -23.562323,
    lng: -46.655771
  },
  {
    id : 7,
    name : "Top Center Shopping",
    lat : -23.565507,
    lng: -46.650555
  }
]

var defaultMarkerColor = '0091ff';
var highlightedMarkerColor = 'ffff24';
var markers = [];
var infoWindow;
var map;

// initMap() is a callback used when the maps API is finished loading into site.
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

// onMarkerClicked() updates the marker icon and opens the Info Window.
function onMarkerClicked(marker) {
  marker.setIcon(colorMarker(highlightedMarkerColor));
  populateInfoWindow(marker, infoWindow);
}

// populateInfoWindow() is used to insert all the content and behavior into
// the Info Window.
function populateInfoWindow(marker, infoWindow) {
  if(infoWindow.marker != marker) {
    if(infoWindow.marker != null) {
      viewModel.deactivateMapPoint(infoWindow.marker.id);
      infoWindow.marker.setIcon(colorMarker(defaultMarkerColor));
    }

    infoWindow.marker = marker;
    viewModel.activateMapPoint(marker.id);

    infoWindow.addListener('closeclick', function() {
      viewModel.deactivateMapPoint(infoWindow.marker.id);
      deactivateMarker();
    });

    infoWindow.setContent(createContent(marker));
    infoWindow.open(map, marker);
  }
}

// updateMap() updates the visibility of the markers present on the map.
function updateMap() {

  for(var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    if(viewModel.mapPoints()[i].filtered()) {
      marker.setMap(null);
    } else {
      marker.setMap(map);
    }
  }
}

// createContent() creates the html which will be inflated into the Info Window.
function createContent(marker) {

  var currentPoint;
  for(var i = 0; i < viewModel.mapPoints().length; i++) {
    var point = viewModel.mapPoints()[i];
    if(marker.id == point.id) {
      currentPoint = point;
      break;
    }
  }

   var title = currentPoint.name;
   var url = currentPoint.infoUrl;
   var content = '<div class=\"info-window\"><h2>' + title + '</h2></div>';
   if(url != null && url.length > 0) {
     content = content.concat('<div>More info: </div><a href=' + url + '>' + title + '</a>');
   } else {
     content = content.concat('<div>No information found about ' + title + '.</div>');
   }

   return content;
}

// deactivateMarker() updates the marker icon to set it as deactivate.
function deactivateMarker() {
  if(infoWindow.marker != null) {
    infoWindow.marker.setIcon(colorMarker(defaultMarkerColor));
  }

  infoWindow.marker = null;
}

// activateMarker() updates the marker icon to set it as active.
function activateMarker(mapPoint) {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].id == mapPoint.id) {
      onMarkerClicked(markers[i]);
    }
  }
}

// colorMarker() colors the selected marker to the color specified in the input.
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
