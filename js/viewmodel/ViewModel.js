// ViewModel is the viewmodel used to populate main.html
var ViewModel = function() {
  var self = this;

  this.sidemenuOpen = ko.observable(false);
  this.mapPoints = ko.observableArray([]);
  this.filterText = ko.observable("");

  // This loop is used to populate the mapPoints list with the places which
  // will be marked on the map.
  initialPoints.forEach(function(mapPoint) {
    self.mapPoints().push(new MapPoint(mapPoint));
  });

  this.openSidemenu = function() {
    self.sidemenuOpen(true);
  }

  this.closeSidemenu = function() {
    self.sidemenuOpen(false);
  };

  // onMapPointClicked() finds the clicked place and updates it`s status and UI.
  this.onMapPointClicked = function(mapPoint) {
    var points = self.mapPoints();
    for(var i = 0; i < points.length; i++) {
      var mp = points[i];
      mp.active(mp.id == mapPoint.id);
    }

    activateMarker(mapPoint);
  }

  // onFilterList() filters the MapPoints and markers according to search term.
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

  // deactivateMapPoint updates the MapPoint status to ser as deactivated.
  this.deactivateMapPoint = function(id) {
    self.mapPoints().forEach(function(mapPoint) {
      if(mapPoint.id == id) {
        mapPoint.active(false);
      }
    });
  }

  // activateMapPoint updates the MapPoint status to ser as activated.
  this.activateMapPoint = function(id) {
    self.mapPoints().forEach(function(mapPoint) {
      if(mapPoint.id == id) {
        mapPoint.active(true);
      }
    });
  }

  // This loop is used to fetch the Wikimedia info for each place on the map.
  // There would be a delay everytime a user clicked on marker if the info was
  // fetched at the moment the marker is selected. This loop avoids the delay.
  this.alertOpened = false;
  this.mapPoints().forEach(function(mapPoint) {
    fetchWikiInfo(mapPoint.name, function(response) {
      var url = response[3];
      if(url != null && url.length > 0) {
        mapPoint.infoUrl = url;
      }
    }, function() {
      if(!self.alertOpened) {
        alert("We were enable to fetch information about the places. =/");
        self.alertOpened = true;
      }
    });
  });
};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
