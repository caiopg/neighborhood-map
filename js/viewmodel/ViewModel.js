var ViewModel = function() {
  var self = this;

  this.sidemenuOpen = ko.observable(false);
  this.mapPoints = ko.observableArray([]);

  initialPoints.forEach(function(mapPoint) {
    self.mapPoints.push(new MapPoint(mapPoint));
  });

  this.openSidemenu = function() {
    self.sidemenuOpen(true);
  }

  this.closeSidemenu = function() {
    self.sidemenuOpen(false);
  };

  this.onMapPointClicked = function(mapPoint) {
    var points = self.mapPoints();
    for(var i = 0; i < points.length; i++) {
      var mp = points[i];
      mp.active(mp.id == mapPoint.id);
    }

    activateMarker(mapPoint);
  }

  this.mapPoints().forEach(function(mapPoint) {
    fetchWikiInfo(mapPoint.name, function(response) {
      var url = response[3];
      if(url != null && url.length > 0) {
        mapPoint.infoUrl = url;
      }
    });
  });
};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
