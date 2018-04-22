var ViewModel = function() {
  var self = this;

  this.sidemenuOpen = ko.observable(false);
  this.mapPoints = ko.observableArray([]);
  this.filterText = ko.observable("");

  initialPoints.forEach(function(mapPoint) {
    self.mapPoints().push(new MapPoint(mapPoint));
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

  this.onFilterList = function(data) {
    self.mapPoints().forEach(function(mapPoint) {
      if(mapPoint.name.toUpperCase().includes(data.filterText().toUpperCase())) {
        mapPoint.filtered(false);
      } else {
        mapPoint.filtered(true);
      }
    });

    updateMap();
  }

  this.deactivateMapPoint = function(id) {
    self.mapPoints().forEach(function(mapPoint) {
      if(mapPoint.id == id) {
        mapPoint.active(false);
      }
    });
  }

  this.activateMapPoint = function(id) {
    self.mapPoints().forEach(function(mapPoint) {
      if(mapPoint.id == id) {
        mapPoint.active(true);
      }
    });
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
