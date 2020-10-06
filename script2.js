$(document).ready(function(){
    //current date
    var today = moment();
    $('.todayDate').text(today.format("MMM Do YYYY"));

    //5 day dates
    var i=1;
    var show = moment().add(1, 'days').calendar();
        var date = $(document).find('[data-index='+i+']');
        date.find('.date').text(show.format("MMM Do YYYY"));
    
    
    //defailt unit
    var city = 'Austin';
    var units = 'imperial';
    var unitSym = '°F';
    var windSym = 'MPH';
    weather();
    
    $('.unitBtn').on('click', function() {
      if ($('.unitBtn').text().toLowerCase() === "imperial") {
        units = 'metric';
        $('.unitBtn').text('Metric');
        unitSym = '°C'
        windSym = 'm/s²'
        weather();
      }
      else {
        units = 'imperial';
        unitSym = '°F';
        windSym = 'MPH';
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
        //delcare city
        $('.currentCity').text(city)
    
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=2864aec1e6fe0dd5f0a41878fb56f375&units=" + units;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var start = 0;
            console.log(response);
            //for loop to show 6 days worth of weather
            for (start=0; start<6; start++) {
                var section = $(document).find('[data-index='+start+']');
                section.find('.temp').text(response.list[start].main.temp + unitSym);
                section.find('.humid').text(response.list[start].main.humidity + '%');
                    
                var iconcode = response.list[start].weather[0].icon;
                var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
                section.find('.icon').attr("src",iconurl);
            };

            //feels like, wind, UV index for only main card (jumbotron)
            $('#feel').text(response.list[0].main.feels_like + unitSym);
            $('#wind').text(response.list[0].wind.speed + windSym);
            //UV index
            var cityLat = response.city.coord.lat;
            var cityLon = response.city.coord.lon;
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&APPID=2864aec1e6fe0dd5f0a41878fb56f375&units=" + units;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var uvI = response.value
                $('#uv').text(uvI);
    
                if (uvI<=1.99){
                    $('#uv').addClass('badge-primary')
                }
                else if (uvI>2 && uvI<=5.99){
                    $('#uv').addClass('badge-success')
                }
                else if (uvI>5.99 && uvI<=7.99){
                    $('#uv').addClass('badge-warning')
                }
                else if (uvI>7.99 && uvI<=10.99){
                    $('#uv').addClass('badge-danger')
                }
                else if (uvI>10.99 && uvI<=11.99){
                    $('#uv').addClass('badge-dark')
                }
            });

        })
    };
});
    