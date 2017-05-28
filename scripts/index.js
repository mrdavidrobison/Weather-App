$(document).ready(function() {
  var api =
    "http://api.openweathermap.org/data/2.5/weather?zip=98512,us&appid=9275623e0a26c09af9ac2d9854ee8568";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var city = position.city;
      var country = position.country;
      $(".city").html("City: " + city);
      $(".country").html("Country: " + country);
    });
  }
});
