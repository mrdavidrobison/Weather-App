$(document).ready(function() {
  var long;
  var lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      $("#data").html("latitude: " + long + "<br>longitude: " + position.coords.longitude);
    });
  }

  var api =
    "http://samples.openweathermap.org/data/2.5/weather?lat='id=2172797&appid=b1b15e88fa797225412429c1c50c122a1";
  $.getJSON(api, function(data) {
    alert(data.coord.lon);
  });
});
