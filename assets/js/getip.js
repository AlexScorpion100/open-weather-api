$(document).ready(function() {
    getIp();
});

// Funcao para apanhar o ip
function getIp() {
    $.ajax({
        type: "POST", //rest Type
        dataType: 'jsonp', //mispelled
        url: 'https://api.ipify.org?format=jsonp',
        contentType: "application/json; charset=utf-8",
        success: function(msg) {
            var pathname = window.location.pathname;
            if (pathname.slice(1) == "index.html" || pathname.slice(1) == "") {
                getIpData(msg.ip);
            }
        },
        error: function(e) {
            if (e.status == 404 || e.status == 403) {
                //erro("Something went wrong - Geting your ip.");
                if (localStorage.getItem("homeCity") === null) {
                    cityHome = getDadosDaCidadePrincipal("Introduza a sua cidade!!");
                } else {
                    var home = JSON.parse(localStorage.getItem('homeCity'));
                    getHomeCityDataIfFail(home.city, home.country);
                }
            }
            console.log("GET IP ERROR CODE: " + e.status);
        }
    });
}

//Funcao devolve a localizaçao da pessoa
function getIpData(ip) {
    $.ajax({
        url: 'https://geo.ipify.org/api/v1?apiKey=at_sqVr1pCKRDNItTPKPQUsg45xB8EtU&ipAddress=' + ip,
        dataType: 'application/json',
        complete: function(data) {
            var obj = JSON.parse(data.responseText);
            alertify.success("IP: " + obj.ip + " - Coutry: " + obj.location.country + " - Region: " + obj.location.region + " - City: " + obj.location.city);
            getHomeCity(obj);
        },
        error: function(e) {
            if (e.status == 404 || e.status == 403) {
                //erro("Something went wrong - Geting your ip.");
                if (localStorage.getItem("homeCity") === null) {
                    cityHome = getDadosDaCidadePrincipal("Introduza a sua cidade!!");
                } else {
                    var home = JSON.parse(localStorage.getItem('homeCity'));
                    getHomeCityDataIfFail(home.city, home.country);
                }
            }
            console.log("GET CITY ERROR CODE: " + e.status);
        }
    });
}