//autocomple
var cityName = {
    url: function(phrase) {
        return "https://api.openweathermap.org/data/2.5/find?&q=" + phrase + "&type=like&sort=population&cnt=30&appid=f56b2228d2888531cedd5596dd2be12c";
    },
    listLocation: "list",
    getValue: "name",

    list: {
        match: {
            enabled: true
        },
        showAnimation: {
            type: "slide",
            time: 300
        },
        hideAnimation: {
            type: "slide",
            time: 300
        },
        onClickEvent: function() {
            var value = $("#detalhesPesquisarCidadeInput").getSelectedItemData();
            $("#detalhesPesquisarCidadeInput").val(value.name + " - " + value.sys.country);
            requestData(value.name, value.sys.country);
            getForecast(value.name, value.sys.country);
            var pathname = window.location.pathname;
            if (pathname.slice(1) != "search.html") {
                window.location.href = 'search.html';
                var currentCity = { 'country': value.sys.country, 'city': value.name };
                localStorage.setItem('currentCity', JSON.stringify(currentCity));
            }
        }
    },
    theme: "round",
    template: {
        type: "custom",
        method: function(value, item) {
            return "<b>" + item.name + "</b> - " + item.sys.country;
        }
    }
};

//liga o autocomplete
$("#detalhesPesquisarCidadeInput").easyAutocomplete(cityName);