//funcao que so executa no fim da pagina tar totalmente carregada
$(document).ready(function() {
    if ($('#detalhesPesquisarCidadeInput').val().length == 0) {
        limpar();
    } else {
        var city = $('#detalhesPesquisarCidadeInput').val();
        requestData(city);
    }
});

//funcao que so executa no fim da pagina tar totalmente carregada
$(document).ready(function() {
    $('#cidadeNotFound').hide();
    limpar();
});

//isto executa cadavez que uma key se deixa no fim de escrever
/*$('#detalhesPesquisarCidadeInput').keyup(function() {
    if ($('#detalhesPesquisarCidadeInput').val().length == 0) {
        limpar();
    }
    var city = $('#detalhesPesquisarCidadeInput').val();
    requestData(city);
});*/

//isto executa quando o botao pesquisa eh precionado 
$('#detalhesPesquisarCidadeBtn').click(function() {
    if ($('#detalhesPesquisarCidadeInput').val().length == 0) {
        limpar();
        alertify.error('Introduza primeiro a cidade a pesquisar!!');
    } else {
        var city = $('#detalhesPesquisarCidadeInput').val();
        requestData(city);
    }
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
function requestData(city, country) {
    $.ajax({
        type: "POST", //rest Type
        dataType: 'jsonp', //mispelled
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=f56b2228d2888531cedd5596dd2be12c',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(msg) {
            console.log(msg);
            $('#cidadeNotFound').hide();
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
            $('#detalhesCoordenadasLat').text("lon: " + msg.coord.lat);
            $('#detalhesEstado').text(" " + msg.weather[0].main + " - " + msg.weather[0].description);
            $('#detalhesEstadoImagem').attr('src', 'http://openweathermap.org/img/wn/' + msg.weather[0].icon + '@2x.png');

            console.log(msg);

            // alertify.success('Cidade encontrada!!');
        },
        error: function() {
            //alertify.error('Cidade não encontrada!!');
            limpar();
            $('#cidadeNotFound').show();
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

//funcao para apagar tudo
function limpar() {
    $('#cidadeNotFound').hide();
    $('#detalhesResultadosName').text("Resultados - ºC");
    $('#detalhesTemperaturaMinima').text("ºC");
    $('#detalhesTemperaturaMaxima').text("ºC");
    $('#detalhesWindSpeed').text("km/h ");
    $('#detalhesClouds').text("%");
    $('#deatalhesHumidade').text("%");
    $('#detalhesPressao').text("p");
    $('#detalhesSunriseTime').text("hms");
    $('#detalhesSunsetTime').text("hms");
    $('#detalhesCoordenadasLon').text("lon: ");
    $('#detalhesCoordenadasLat').text("lon: ");
    $('#detalhesEstado').text(" ");
    $('#detalhesEstadoImagem').attr('src', 'http://openweathermap.org/img/wn/02d@2x.png');
}

//autocomple
var cityName = {
    url: function(phrase) {
        return "https://api.openweathermap.org/data/2.5/find?&q=" + phrase + "&type=like&sort=population&cnt=30&appid=f56b2228d2888531cedd5596dd2be12c";
    },
    listLocation: "list",
    getValue: "name",

    list: {
        onClickEvent: function() {
            var value = $("#detalhesPesquisarCidadeInput").getSelectedItemData();
            requestData(value.name, value.sys.country);
        }
    },
    template: {
        type: "custom",
        method: function(value, item) {

            return "<b>" + item.name + "</b> - " + item.sys.country;
        }
    }
};

//liga o autocomplete
$("#detalhesPesquisarCidadeInput").easyAutocomplete(cityName);