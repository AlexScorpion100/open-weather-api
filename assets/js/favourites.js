$(document).ready(function() {
    var pathname = window.location.pathname;
    var counterFavDiv = 0;

    //vai buscar os favoritos para o arreio
    var favorites = [];
    favorites = JSON.parse(localStorage.getItem('favoriteCities'));

    reloadFavList(favorites);

    $(document).on('click', '.fav_slot_btn_detalhes', function() {
        var index = $('.fav_slot_btn_detalhes').index(this);
        var currentCity = {
            'country': favorites[index].country,
            'city': favorites[index].city
        };
        localStorage.setItem('currentCity', JSON.stringify(currentCity));
        window.location.href = 'search.html';
    });

    $(document).on('click', '.fav_slot_btn_removefav', function() {
        var index = $('.fav_slot_btn_removefav').index(this);
        favorites.splice(index, 1);
        localStorage.setItem('favoriteCities', JSON.stringify(favorites));
         if (pathname.slice(1) == "favourites.html") {
        window.location.href = 'favourites.html';
         }else if (pathname.slice(1) == "index.html" || pathname.slice(1) == "") {
              window.location.href = 'index.html';
         }
        
    });

    // funcao para dar load dos favoritos
    function reloadFavList(favorites) {
        favorites = [];
        favorites = JSON.parse(localStorage.getItem('favoriteCities'));

        //O objeto para colonar
        var clones = $('.fav_slot').clone(true);

        //O container para onde vai os objetos colonados
        $('.fav_container').empty();
        if (pathname.slice(1) == "favourites.html") {
            favorites.forEach(element => {
                if (verificarMultiplo(counterFavDiv) === 0) {
                    $('<div class="divid"></div>').appendTo('.fav_container');
                }
                console.log(element);
                var fgclones = clones.clone(true);
                $(".fav_spanDayHomeLocation", fgclones).text(days[d.getDay()]);
                $(".fav_spanDateHomeLocation", fgclones).text(d.getDate() + " " + months[d.getMonth()]);
                $(".fav_spanCityHomeLocation", fgclones).html(element.city + " - " + element.country);

                $.ajax({
                    type: "POST", //rest Type
                    dataType: 'jsonp', //mispelled
                    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + element.city + ',' + element.country + '&appid=f56b2228d2888531cedd5596dd2be12c',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    success: function(msg) {
                        $('.fav_imgHomeEstadoImagemLocation', fgclones).attr('src', 'http://openweathermap.org/img/wn/' + msg.weather[0].icon + '@2x.png');
                        $(".fav_spanHomeTemperatureLocation", fgclones).html(kelvinToC(msg.main.temp).toFixed(0) + "ºC");
                        $(".fav_spanHomePercepitacaoLocation", fgclones).text(" " + msg.clouds.all.toFixed(0) + '%');
                        $(".fav_spanHomewindSpeedLocation", fgclones).text(" " + msg.wind.speed.toFixed(0) + "km/h");
                        $(".fav_spanHomeWindDerectionLocation", fgclones).text(" " + degToDirecoes(msg.wind.deg));
                    },
                    error: function(e) {
                        if (e.status == 404 || e.status == 403) {
                            alertify.error('Cidade não encontrada!!');
                        }
                    }
                });
                $('.fav_container').append(fgclones);
                counterFavDiv++;
            });
        } else if (pathname.slice(1) == "index.html" || pathname.slice(1) == "") {
            favorites.slice(0, 6).forEach(element => {
                if (verificarMultiplo(counterFavDiv) === 0) {
                    $('<div class="divid"></div>').appendTo('.fav_container');
                }
                console.log(element);
                var fgclones = clones.clone(true);
                $(".fav_spanDayHomeLocation", fgclones).text(days[d.getDay()]);
                $(".fav_spanDateHomeLocation", fgclones).text(d.getDate() + " " + months[d.getMonth()]);
                $(".fav_spanCityHomeLocation", fgclones).html(element.city + " - " + element.country);

                $.ajax({
                    type: "POST", //rest Type
                    dataType: 'jsonp', //mispelled
                    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + element.city + ',' + element.country + '&appid=f56b2228d2888531cedd5596dd2be12c',
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    success: function(msg) {
                        $('.fav_imgHomeEstadoImagemLocation', fgclones).attr('src', 'http://openweathermap.org/img/wn/' + msg.weather[0].icon + '@2x.png');
                        $(".fav_spanHomeTemperatureLocation", fgclones).html(kelvinToC(msg.main.temp).toFixed(0) + "ºC");
                        $(".fav_spanHomePercepitacaoLocation", fgclones).text(" " + msg.clouds.all.toFixed(0) + '%');
                        $(".fav_spanHomewindSpeedLocation", fgclones).text(" " + msg.wind.speed.toFixed(0) + "km/h");
                        $(".fav_spanHomeWindDerectionLocation", fgclones).text(" " + degToDirecoes(msg.wind.deg));
                    },
                    error: function(e) {
                        if (e.status == 404 || e.status == 403) {
                            alertify.error('Cidade não encontrada!!');
                        }
                    }
                });
                $('.fav_container').append(fgclones);
                counterFavDiv++;
            });
        }
    }
});

//Funcao para verificar se eh um multiplo
function verificarMultiplo(counter) {
    var resultado = (counter % 3);
    if (resultado === 0) {
        return resultado;
    }
    return resultado;
}