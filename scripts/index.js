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
          $(".weatherIcon").replaceWith('<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>');
          $('body').css("background-image", "url('https://upload.wikimedia.org/wikipedia/commons/5/56/Clear_sky_over_Riga%2C_2008.jpg')");
          $('.sun').css("background", "#FFFF00");
        } else if (weatherIcon === "Rain"){
          $(".weatherIcon").replaceWith('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
        } else if (weatherIcon = "Snow"){
          $(".weatherIcon").replaceWith('<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>');
        } else if (weatherIcon = "Clouds"){
          $(".weatherIcon").replaceWith('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
        } else if (weatherIcon = "Thunder"){
          $(".weatherIcon").replaceWith('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
        } else if (weatherIcon = "Showers"){
          $(".weatherIcon").replaceWith('<div class="icon sun-shower"><div class="cloud"></div><div class="sun">    <div class="rays"></div></div><div class="rain"></div></div>');
        }

        
        $(".city").html(city + ", " + country);
        $(".temp").html(temp);
        $(".humidity").html("Humidity: " + humidity);
        $(".wind").html("Windspeed: " + wind);
        $(".sunrise").html("Sunrise: " + sunrise);
        $(".sunset").html("Sunset: " + sunset);
      })

    })
  }
});
