$(document).ready(function() {

  var long;
  var lat;
  var temp;

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=9275623e0a26c09af9ac2d9854ee8568";
  
      $.getJSON(api, function(data){

        // JSON calls for Open Weather API
        var weatherIcon = data.weather.description;
        var city = data.name;
        var country = data.sys.country; 
        var description = data.weather.description;
        var temp = Math.floor((data.main.temp)*(9/5)-459.67) + " &degF";
        var humidity = data.main.humidity;
        var visibility = data.visibility;
        var wind = data.wind.speed;
        var sunrise = data.sys.sunrise;
        var sunset = data.sys.sunset;
        
        // Substituting class id with jQuery actions.
        if (weatherIcon == "Clear Sky"){
          $(".weatherIcon").attr('class', '.icon.sunny.sun.rays');
        }


        $(".city").html(city);
        $(".country").html(country);
        $(".description").html(description);
        $(".temp").html(temp);
        $(".pressure").html(pressure);
        $(".humidity").html(humidity);
        $(".visibility").html(visibility);
        $(".wind").html(wind);
        $(".sunrise").html(sunrise);
        $(".sunset").html(sunset);
      })

    })
  }
});
