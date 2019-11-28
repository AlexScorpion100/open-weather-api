//funcao que so executa no fim da pagina tar totalmente carregada
$(document).ready(function() {
    if ($('#detalhesPesquisarCidadeInput').val().length == 0) {
        limpar();
    } else {
        var city = $('#detalhesPesquisarCidadeInput').val();
        requestData(city);
    }
});