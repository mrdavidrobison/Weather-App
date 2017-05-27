$(document).ready(function() {
  var api =
    "api.openweathermap.org/data/2.5/weather?q=London";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var city = position.name;
      var state = position.sys.country;
      $("#city").html("City: " + city);
      $("#state").html("State: " + state);
    });
  }
});
