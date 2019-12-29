//variaveis para a data
var d = new Date();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//get data para a cidade principal da geolocalizaçao se a localizaçao conseguir a localizaçao correta
function getHomeCity(data) {
    $("#spanDayHomeLocation").text(days[d.getDay()]);
    $("#spanDateHomeLocation").text(d.getDate() + " " + months[d.getMonth()]);
    $("#spanCityHomeLocation").text(data.location.city);
    var homeCityData = { 'country': data.location.country, 'city': data.location.city };
    localStorage.setItem('homeCity', JSON.stringify(homeCityData));
    $.ajax({
        type: "POST", //rest Type
        dataType: 'jsonp', //mispelled
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + data.location.city + ',' + data.location.country + '&appid=f56b2228d2888531cedd5596dd2be12c',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(msg) {
            $("#spanHomeTemperatureLocation").text(kelvinToC(msg.main.temp).toFixed(0) + "ºC");
            $('#imgHomeEstadoImagemLocation').attr('src', 'http://openweathermap.org/img/wn/' + msg.weather[0].icon + '@2x.png');
            $("#spanHomePercepitacaoLocation").text(" " + msg.clouds.all.toFixed(0) + '%');
            $("#spanHomewindSpeedLocation").text(" " + msg.wind.speed.toFixed(0) + "km/h");
            $("#spanHomeWindDerectionLocation").text(" " + degToDirecoes(msg.wind.deg));
        },
        error: function() {
            erro("Something went wrong - Getting your city information!");
        }
    });
}

//get data se nao conseguiu a localizaçao do user
function getHomeCityDataIfFail(city, country) {
    $("#spanDayHomeLocation").text(days[d.getDay()]);
    $("#spanDateHomeLocation").text(d.getDate() + " " + months[d.getMonth()]);
    $("#spanCityHomeLocation").text(city);
    $.ajax({
        type: "POST", //rest Type
        dataType: 'jsonp', //mispelled
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=f56b2228d2888531cedd5596dd2be12c',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(msg) {
            var homeCityData = { 'country': country, 'city': city };
            localStorage.setItem('homeCity', JSON.stringify(homeCityData));
            $("#spanHomeTemperatureLocation").text(kelvinToC(msg.main.temp).toFixed(0) + "ºC");
            $('#imgHomeEstadoImagemLocation').attr('src', 'http://openweathermap.org/img/wn/' + msg.weather[0].icon + '@2x.png');
            $("#spanHomePercepitacaoLocation").text(" " + msg.clouds.all.toFixed(0) + '%');
            $("#spanHomewindSpeedLocation").text(" " + msg.wind.speed.toFixed(0) + "km/h");
            $("#spanHomeWindDerectionLocation").text(" " + degToDirecoes(msg.wind.deg));
        },
        error: function(e) {
            if (e.status == 404 || e.status == 403) {
                erro("Something went wrong - Getting your city information!");
            }
            console.log("GET CITY DATA ERROR CODE: " + e.status);
        }
    });
}