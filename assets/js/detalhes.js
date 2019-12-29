//funcao que so executa no fim da pagina tar totalmente carregada
$(document).ready(function() {
    if ($('#detalhesPesquisarCidadeInput').val().length == 0) {
        var currentCity = JSON.parse(localStorage.getItem('currentCity'));
        requestData(currentCity.city, currentCity.country);
        getForecast(currentCity.city, currentCity.country);
        $('#detalhesPesquisarCidadeInput').attr("placeholder", currentCity.city + " - " + currentCity.country);
    }
    existeCidade();
});

//Esta eh uma funçao para converter o tempo unix em tempo normal
function unixTimeComverter(unixtime) {
    var date = new Date(unixtime * 1000);
    var hours = date.getHours() + "h";
    var minutes = date.getMinutes() + "m";
    var seconds = date.getSeconds() + "s";
    var formattedTime = hours + minutes + seconds;
    return formattedTime;
}

//funcao para pedir infomaçao ao site
function
requestData(city, country) {
    $.ajax({
        type: "POST", //rest Type
        dataType: 'jsonp', //mispelled
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=f56b2228d2888531cedd5596dd2be12c',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(msg) {
            loadCityData(msg);
        },
        error: function() {
            alertify.error('Cidade não encontrada!!');
        }
    });
}

//funcao para converter kelvin em c
function kelvinToC(kelvin) {
    return kelvin - 273.15;
}

//funcao para converter os angulos em direçoes
function degToDirecoes(deg) {
    var direcoes;

    if (deg == 0) {
        direcoes = "N";
    } else if (deg > 0 && deg < 90) {
        direcoes = "NE";
    } else if (deg == 90) {
        direcoes = "E";
    } else if (deg > 90 && deg < 180) {
        direcoes = "SE";
    } else if (deg == 180) {
        direcoes = "S";
    } else if (deg > 180 && deg < 270) {
        direcoes = "SW";
    } else if (deg == 270) {
        direcoes = "W";
    } else if (deg > 270 && deg < 360) {
        direcoes = "NW";
    } else if (deg == 360) {
        direcoes = "N";
    } else {
        direcoes = "NaN"
    }
    return direcoes;
}

//funcao para carregar a informaçao da cidade pretendida
function loadCityData(msg) {
    var city = { 'country': msg.sys.country, 'city': msg.name };
    localStorage.setItem('currentCity', JSON.stringify(city));

    $('#divSearchResults').show();
    $('#detalhesResultadosName').text("Resultados - " + msg.name + " " + msg.sys.country + " " + kelvinToC(msg.main.temp).toFixed(2) + "ºC");
    $('#detalhesTemperaturaMinima').text(kelvinToC(msg.main.temp_min).toFixed(2) + 'ºC');
    $('#detalhesTemperaturaMaxima').text(kelvinToC(msg.main.temp_max).toFixed(0) + 'ºC');
    $('#detalhesWindSpeed').text(msg.wind.speed.toFixed(0) + 'km/h ' + degToDirecoes(msg.wind.deg));
    $('#detalhesClouds').text(msg.clouds.all.toFixed(0) + '%');
    $('#deatalhesHumidade').text(msg.main.humidity.toFixed(0) + '%');
    $('#detalhesPressao').text(msg.main.pressure.toFixed(0) + 'p');
    $('#detalhesSunriseTime').text(unixTimeComverter(msg.sys.sunrise));
    $('#detalhesSunsetTime').text(unixTimeComverter(msg.sys.sunset));
    $('#detalhesCoordenadasLon').text("lon: " + msg.coord.lon);
    $('#detalhesCoordenadasLat').text("lat: " + msg.coord.lat);
    $('#detalhesEstado').text(" " + msg.weather[0].main + " - " + msg.weather[0].description);
    $('#detalhesEstadoImagem').attr('src', 'http://openweathermap.org/img/wn/' + msg.weather[0].icon + '@2x.png');
}

//marcar ou desmarcar os favoritos
$("#searchFavorites").click(function() {
    var currentCity = JSON.parse(localStorage.getItem('currentCity'));
    var favorites = [];
    var countFavorites = 0;
    var countID = 0;
    favorites = JSON.parse(localStorage.getItem('favoriteCities'));
    if (localStorage.getItem("favoriteCities") === null) {
        favorites = [{ 'country': currentCity.country, 'city': currentCity.city }];
        localStorage.setItem("favoriteCities", JSON.stringify(favorites));
    } else {
        favorites.forEach(element => {
            if (element.city == currentCity.city && element.country == currentCity.country) {
                countFavorites = 1;
            }
        });
        if (countFavorites == 0) {
            $('#searchFavorites').attr('src', 'assets/img/star-full.svg');
            alertify.success("City: " + currentCity.city + " Added to favorites.");
            favorites.unshift({ 'country': currentCity.country, 'city': currentCity.city });
            localStorage.setItem("favoriteCities", JSON.stringify(favorites));
        } else if (countFavorites == 1) {
            //erro("Esta cidade ja existe!! Nos Seus favoritos");
            favorites.forEach(element => {
                if (element.city == currentCity.city && element.country == currentCity.country) {
                    $('#searchFavorites').attr('src', 'assets/img/star-notfull.svg');
                    favorites.splice(countID, 1);
                    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
                    alertify.error("City: " + currentCity.city + " Added to favorites.");
                }
                countID++;
            });
        }
    }
});

//Funcao para ir buscar o forecast
function getForecast(city, country) {
    $.ajax({
        type: "POST", //rest Type
        dataType: 'jsonp', //mispelled
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&appid=f56b2228d2888531cedd5596dd2be12c',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(msg) {
            $("#detalhesResultadosNameForecast").text("Resultados - " + msg.city.name + " - " + msg.city.country);
            // console.log(msg);
            $("#detalhesDescriptionTime").text(msg.list[0].weather[0].main + " - " + msg.list[0].weather[0].description);
            $("#detalhesCurrentTempTime").html(kelvinToC(msg.list[0].main.temp).toFixed(0) + "ºC");
            $('#detalhesImgTime').attr('src', 'http://openweathermap.org/img/wn/' + msg.list[0].weather[0].icon + '@2x.png');
            $("#detalhesTemperaturaMinimaTime").html(kelvinToC(msg.list[0].main.temp_min).toFixed(0) + "ºC");

            $("#detalhesTemperaturaMaximaTime").html(kelvinToC(msg.list[0].main.temp_max).toFixed(0) + "ºC");
            msg.list.forEach(element => {
                $('#detalhesSelectTime').append(`<option value="${element.dt_txt}"> ${element.dt_txt} </option>`);
            });
            $("#detalhesSelectTime").change(function() {
                var selectedate = $(this).children("option:selected").val();
                msg.list.forEach(element => {
                    if (element.dt_txt == selectedate) {
                        $("#detalhesDescriptionTime").text(element.weather[0].main + " " + element.weather[0].description);
                        $("#detalhesCurrentTempTime").html(kelvinToC(element.main.temp).toFixed(0) + "ºC");
                        $("#detalhesTemperaturaMinimaTime").html(kelvinToC(element.main.temp_min).toFixed(0) + "ºC");
                        $("#detalhesTemperaturaMaximaTime").html(kelvinToC(element.main.temp_max).toFixed(0) + "ºC");
                        $('#detalhesImgTime').attr('src', 'http://openweathermap.org/img/wn/' + element.weather[0].icon + '@2x.png');
                    }
                });
            });
        },
        error: function() {}
    });
};

//funcao para verificar se a cidade existe
function existeCidade() {
    var currentCity = JSON.parse(localStorage.getItem('currentCity'));
    var favorites = JSON.parse(localStorage.getItem('favoriteCities'));
    favorites.forEach(element => {
        if (element.city == currentCity.city && element.country == currentCity.country) {
            $('#searchFavorites').attr('src', 'assets/img/star-full.svg');
        }
    });
}