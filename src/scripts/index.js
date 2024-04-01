$(document).ready(function() {
  var long;
  var lat;
  var tempSwap = true;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=9275623e0a26c09af9ac2d9854ee8568";

      $.getJSON(api, function(data) {
        var weatherIcon = data.weather[0].main;
        var city = data.name;
        var country = data.sys.country; 
        var description = data.weather[0].description;
        var tempK = data.main.temp;
        var tempF = Math.round((tempK - 273.15) * 9/5 + 32) + "°F";
        var tempC = Math.round(tempK - 273.15) + "°C"; 
        var humidity = data.main.humidity + "%";
        var wind = data.wind.speed + " mph";

        $(".weatherIcon").html(weatherIcon);
        // Add CSS class dynamically based on weather condition
        if (weatherIcon === "Clear") {
          $(".weatherIcon").replaceWith('<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>');
          $('body').css("background-image", "url('https://upload.wikimedia.org/wikipedia/commons/5/56/Clear_sky_over_Riga%2C_2008.jpg')");
          $('.sun').css("background", "#FFFF00");
        } else if (weatherIcon === "Rain") {
          $(".weatherIcon").replaceWith('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
          $('body').css("background-image", "url('https://upload.wikimedia.org/wikipedia/commons/5/58/Rain-drops.jpg')");
        } else if (weatherIcon === "Snow") {
          $(".weatherIcon").replaceWith('<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>');
          $('body').css("background-image", "url('http://www.publicdomainpictures.net/pictures/130000/velka/winter-snow-background.jpg')");
          $('h1').css("color", "black");
          $('.mainDiv').css("color", "black");
        } else if (weatherIcon === "Clouds") {
          $(".weatherIcon").replaceWith('<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>');
          $('body').css("background-image", "url('http://www.publicdomainpictures.net/pictures/30000/velka/white-clouds-on-dark-sky.jpg')");
        } else if (weatherIcon === "Thunderstorm") {
          $(".weatherIcon").replaceWith('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
          $('body').css("background-image", "url('http://www.publicdomainpictures.net/pictures/100000/velka/lightning-bolt.jpg')");
        } else if (weatherIcon === "Drizzle") {
          $(".weatherIcon").replaceWith('<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>');
          $('body').css("background-image", "url('https://static.pexels.com/photos/639/clouds-rainy-rain-asia.jpg')");
        }

        $(".description").html(description);  
        $(".city").html(city + ", " + country);
        $(".tempF").html(tempF);
        $(".tempButton").click(function(){
          if (tempSwap === true){
            $(".tempF").html(tempC);
            tempSwap = false;
            $(".tempButton").html("°F");
          } else {
            $(".tempF").html(tempF);
            tempSwap = true;
            $(".tempButton").html("°C"); 
          }
        });
        $(".humidity").html("Humidity: " + humidity);
        $(".wind").html("Windspeed: " + wind);
      });
    });
  }
});