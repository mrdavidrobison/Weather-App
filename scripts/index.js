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
        var weatherIcon = data.weather[0].description;
        var city = data.name;
        var country = data.sys.country; 
        var description = data.weather.description;
        var temp = Math.floor((data.main.temp)*(9/5)-459.67) + " &degF";
        var humidity = data.main.humidity;
        var visibility = data.visibility;
        var wind = data.wind.speed;
        
        var sunriseTimeStamp = data.sys.sunrise;
        var date = new Date(sunriseTimeStamp*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var sunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        var sunsetTimeStamp = data.sys.sunset;
        var sunsetDate = new Date(sunsetTimeStamp*1000);
        var sunsetHours = sunsetDate.getHours();
        var sunsetMinutes = "0" + sunsetDate.getMinutes();
        var sunsetSeconds = "0" + sunsetDate.getSeconds();
        var sunset = sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2);
        
        // Substituting class id with jQuery actions.
        if (weatherIcon == "Clear Sky"){
          $(".weatherIcon").attr('class', '.icon.sunny.sun.rays');
        }

        $(".weatherIcon").html(weatherIcon);
        $(".city").html(city);
        $(".country").html(country);
        $(".description").html(description);
        $(".temp").html(temp);
        $(".humidity").html(humidity);
        $(".visibility").html(visibility);
        $(".wind").html(wind);
        $(".sunrise").html(sunrise);
        $(".sunset").html(sunset);
      })

    })
  }
});
