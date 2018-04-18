var ViewModel = function() {
  var self = this;

  this.mapPoints = ko.observableArray([]);

  initialPoints.forEach(function(mapPoint) {
    self.mapPoints.push(new MapPoint(mapPoint));
  });
};

ko.applyBindings(new ViewModel());
