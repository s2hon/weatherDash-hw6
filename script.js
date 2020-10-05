//current date
var today = moment();
$('.todayDate').text(today.format("MMM Do YYYY"));

//5 day Forecast
//add = 1;
// var tomorrow = moment().add(add, 'days').calendar();  
// $('.todayDate').text(today.format("MMM Do YYYY"));

//defailt unit
var city = 'Austin';
var units = 'imperial';
var unitSym = '°F';
var windSym = 'mi/hr';
weather();

$('.unitBtn').on('click', function() {
  if ($('.unitBtn').text().toLowerCase() === "imperial") {
    units = 'metric';
    $('.unitBtn').text('Metric');
    unitSym = '°C'
    windSym = 'm/s'
    weather();
  }
  else {
    units = 'imperial';
    unitSym = '°F';
    windSym = 'mi/hr';
    $('.unitBtn').text('Imperial');
    weather();
  }
});

$('.list-group-item').on('click', function(){
    city = $(this).text();
    weather();
});

//default
function weather() {

    // city = ;

    $('.currentCity').text(city);

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&APPID=2864aec1e6fe0dd5f0a41878fb56f375&units=" + units;

// Creating an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $('#currentTemp').text(response.main.temp + unitSym);
        $('#currentFeel').text(response.main.feels_like + unitSym);
        $('#currentHumid').text(response.main.humidity + '%');
        $('#currentWind').text(response.wind.speed + windSym);

        //UV index
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&APPID=2864aec1e6fe0dd5f0a41878fb56f375&units=" + units;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        console.log(response);})
    })
}
        // var icon = $("<img>");
        // var iconcode = response.weather[0].icon;
        // console.log(iconcode);
        // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        // icon.attr("src",iconurl);

        // $('#icon').append(icon);
