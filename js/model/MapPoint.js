var MapPoint = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.lat = data.lat;
  this.lng = data.lng;
  this.infoUrl = "";
  this.active = ko.observable(false);
  this.filtered = ko.observable(false);
}
