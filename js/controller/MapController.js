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

function initMap() {
  var map = new google.maps.Map(document.getElementById('map-container'), {
    center: {lat: -23.563163, lng: -46.6552573 },
    zoom: 14
  });

  initialPoints.forEach(function(mapPoint) {
    var marker = new google.maps.Marker({
      position: {lat: mapPoint.lat, lng: mapPoint.lng},
      map: map,
      title: mapPoint.name
    });
  });
}
