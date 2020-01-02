$(document).ready(function() {
    if (localStorage.getItem("favoriteCities") === null) {
        $("#noFav").show();
    }else{
        if (localStorage.getItem("favoriteCities") === "[]"){
             $("#noFav").show();
        }else{
            $("#noFav").hide();
        }
        
    }
});