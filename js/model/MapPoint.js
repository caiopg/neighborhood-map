var MapPoint = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.lat = data.lat;
  this.lng = data.lng;
  this.active = ko.observable(false);
}
