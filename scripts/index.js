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
        var weatherIcon = data.weather[0].main;
        var city = data.name;
        var country = data.sys.country; 
        var description = data.weather[0].description;
        var temp = Math.floor((data.main.temp)*(9/5)-459.67) + " &degF";
        var humidity = data.main.humidity + " &#37";
        var visibility = data.visibility;
        var wind = data.wind.speed + " mph";
        
        //convert military time to normal time
        function convert(input) {
          return moment(input, 'HH:mm:ss').format('h:mm:ss A');
        }

        //convert unix time stamp to real time
        var sunriseTimeStamp = data.sys.sunrise;
        var date = new Date(sunriseTimeStamp*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var sunrise = convert(hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));

        var sunsetTimeStamp = data.sys.sunset;
        var sunsetDate = new Date(sunsetTimeStamp*1000);
        var sunsetHours = sunsetDate.getHours();
        var sunsetMinutes = "0" + sunsetDate.getMinutes();
        var sunsetSeconds = "0" + sunsetDate.getSeconds();
        var sunset = convert(sunsetHours + ':' + sunsetMinutes.substr(-2) + ':' + sunsetSeconds.substr(-2));
        
        // Substituting class id with jQuery actions.
        $(".weatherIcon").html(weatherIcon);
        if (weatherIcon === "Clear"){
          $(".weatherIcon").remove('.weatherIcon').add('.icon.sunny.sun.rays');
        } else if (weatherIcon == "rain"){
          $(".weatherIcon").addClass('.icon.rainy.cloud.rain').removeClass('.weatherIcon');
        } else if (weatherIcon == "snow"){
          $(".weatherIcon").addClass('.icon.flurries.cloud.snow.flake.flake').removeClass('.weatherIcon');
        } else if (weatherIcon == "clouds"){
          $(".weatherIcon").addClass('.icon.cloudy.cloud.cloud').removeClass('.weatherIcon');
        } else if (weatherIcon == "thunder"){
          $(".weatherIcon").addClass('.icon.thunder-storm.cloud.lightning.bolt.bolt').removeClass('.weatherIcon');
        } else if (weatherIcon == "showers"){
          $(".weatherIcon").addClass('.icon.sun-shower.cloud.sun.rays.rain').removeClass('.weatherIcon');
        }

        $(".city").html(city);
        $(".country").html(country);
        $(".description").html(description);
        $(".temp").html(temp);
        $(".humidity").html(humidity);
        $(".wind").html(wind);
        $(".sunrise").html(sunrise);
        $(".sunset").html(sunset);
      })

    })
  }
});
