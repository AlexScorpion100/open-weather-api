$(document).ready(function () {
    window.onload = function () {
        contentToDisplay(run());
    };
});

//funcao para correr assim que a pagina esta carregada
function run() {
    var pathname = window.location.href;
    var urlgood = pathname.replace(window.location.origin + window.location.pathname, "");
    $("#navLink-" + urlgood.slice(1)).addClass("active");
    return urlgood;
};

//nav bar click on go
$(".nav-link").on('click', function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    activeClear();
    $(this).addClass("active");
    contentToDisplay($(this).attr('href'));
});

//footer clicable
$(".list-inline-item a").on('click', function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    contentToDisplay($(this).attr('href'));
});

//Funcao que limpa todas a classe active do menu
function activeClear() {
    $("#navLink-home").removeClass("active");
    $("#navLink-details").removeClass("active");
    $("#navLink-forecast").removeClass("active");
    $("#navLink-favorites").removeClass("active");
}

//funcao para aparecer o conteudo na div content
function contentToDisplay(url) {
    var urlgood = url.slice(1);
    if (urlgood == "") {
        $("#navLink-home").addClass("active");
        $("#contentLoader").load(window.location.pathname + "home.html");
    } else {
        $("#navLink-" + urlgood.slice(1)).addClass("active");
        $("#contentLoader").load(window.location.pathname + urlgood + ".html");
    }
    return false;
}