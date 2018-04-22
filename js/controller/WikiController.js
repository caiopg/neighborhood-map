// fetchWikiInfo() fetches the information regarding a specific location from
//  Wikimedia API.
function fetchWikiInfo(place, successCallback) {
  var url = "http://en.wikipedia.org/w/api.php?action=opensearch&search="
  + place + "&format=json&callback=wikiInfoCallback";

  $.ajax(url, {
    dataType: "jsonp",
    crossDomain: "true",
    cache: "true",
    success: function(response) {
      successCallback(response);
    }
  });
}
