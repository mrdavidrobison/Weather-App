$(document).ready(function() {
  var api =
    "http://samples.openweathermap.org/data/2.5/weather?lat='id=2172797&appid=b1b15e88fa797225412429c1c50c122a1";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var city = position.name;
      var state = position.
      $("#city").html("City: " + city);
      $("#state").html("State: " + state);
    });
  }
});
