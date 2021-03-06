var local = JSON.parse(localStorage.getItem("searchHistory")) || [];
var city = "" || local[0];
getDaily(city);
getForecast(city); 

// Function to show searches from local storage in a list
function showLocal() {
    var local = JSON.parse(localStorage.getItem("searchHistory")) || [];
    for (var i = 0; i < local.length; i++) {
        var lineItem = $("<div>");
        lineItem.addClass("list-group-item list-group-item-action");
        lineItem.text(local[i]);
        
        $("#localCity").append(lineItem);
        
        
    }

    $(".list-group-item").on("click", function(){
        getDaily($(this).text());
        getForecast($(this).text());
    })
}
showLocal();


// Function for getting 5-day forecast for the city
function getForecast(city) {
    $("#weatherFive").empty();
    console.log("got here 1");
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c2db56534504e0f832745a60ec594814&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (data) {
            console.log(data);

            // Setting test1 =/= test2 so that when they are compared, it will only show new dates for the forecast
            for (var i = 0; i < data.list.length; i++) {
                var test1 = data.list[i].dt_txt.split(" ");
                if (i===0) {
                    var test2 = 2;
                }
                else {
                    var test2 = data.list[i-1].dt_txt.split(" ");
                }
                if (test1[0] !== test2[0]) {
                    console.log(data.list[i].main.humidity);
                    var card = $("<div>");
                    var weatherFive = $("#weatherFive");
                    card.addClass("col-md-2");
                    card.addClass("card")
                    $("<h3>").text(new Date(data.list[i].dt_txt).toLocaleDateString()).appendTo(card);
                    $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png").appendTo(card);
                    $("<h5>").text("Temperature: " +  data.list[i].main.temp + " °F").appendTo(card);
                    $("<h5>").text("Humidity: " + data.list[i].main.humidity + "%").appendTo(card);
                    card.appendTo(weatherFive);

                    // Append info to card, then append card to weatherFive at the end
                }
            }
        }
    })
}

// Function for getting daily weather for city
function getDaily(city) {
    $("#currentWeather").empty();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c2db56534504e0f832745a60ec594814&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (weatherData) {
            // console.log(weatherData);
            var currentWeatherDiv = $("#currentWeather");
            $("<h1>").text(weatherData.name).appendTo(currentWeatherDiv);
            $("<img>").attr("src", "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png").appendTo(currentWeatherDiv);
            $("<h3>").text("Current Temperature: " + weatherData.main.temp + " °F").appendTo(currentWeatherDiv);
            $("<h3>").text("Humidity: " + weatherData.main.humidity + "%").appendTo(currentWeatherDiv);
            $("<h3>").text("Wind Speed: " + weatherData.wind.speed + " mph").appendTo(currentWeatherDiv);
            var latitude = weatherData.coord.lat;
            var longitude = weatherData.coord.lon;
            
            var queryUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=c2db56534504e0f832745a60ec594814";
            $.ajax({
                url: queryUV,
                method: "GET",
                success: function(UVData) {
                    var uvIndex = $("<h3>").text("UV Index: " + UVData.value);
                    if (UVData.value < 3) {
                        uvIndex.css("color", "green");
                    }
                    else if (UVData.value < 7) {
                        uvIndex.css("color", "orange");
                    }
                    else {
                        uvIndex.css("color", "red");
                    }
                    uvIndex.appendTo(currentWeatherDiv);
                }
            })

        }
    })
}


// Event listener for button that activates search when clicked
$("#cityBtn").on("click", function(e) {
    e.preventDefault;
    var search = $("#citySearch").val().trim();
    local.unshift(search);
    localStorage.setItem("searchHistory", JSON.stringify(local));
    if (search) {
        getForecast(search);
        getDaily(search);
    }
    else {}
})

$("#clearBtn").on("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    location.reload();
})