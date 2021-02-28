function getForecast(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c2db56534504e0f832745a60ec594814";
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    var card = $("<div>");
                    var weatherFive = $("#weatherFive");
                    // Append info to card, then append card to weatherFive at the end
                }
            }
        }
    })
}

function getDaily(city) {
    $("#currentWeather").empty();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c2db56534504e0f832745a60ec594814&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (weatherData) {
            console.log(weatherData);
            var currentWeatherDiv = $("#currentWeather");
            $("<h1>").text(weatherData.name).appendTo(currentWeatherDiv);
            $("<img>").attr("src", "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png").appendTo(currentWeatherDiv);
            $("<h3>").text("Current Temperature: " + weatherData.main.temp + " °F").appendTo(currentWeatherDiv);
            $("<h3>").text("Humidity: " + weatherData.main.humidity + "%").appendTo(currentWeatherDiv);
            $("<h3>").text("Wind Speed: " + weatherData.wind.speed + " mph").appendTo(currentWeatherDiv);
            var latitude = weatherData.coord.lat;
            var longitude = weatherData.coord.lon;
            
            var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=c2db56534504e0f832745a60ec594814";
            $.ajax({
                url: queryUV,
                method: "GET",
                success: function(UVData) {
                    $("<h3>").text("UV Index: " + UVData.value).appendTo(currentWeatherDiv);
                }
            })

        }
    })
}



$("#cityBtn").on("click", function(e) {
    e.preventDefault;
    var search = $("#citySearch").val().trim();
    if (search) {
        getForecast(search);
        getDaily(search);
    }
    else {}
})