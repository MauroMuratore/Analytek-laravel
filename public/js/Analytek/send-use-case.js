import { lastAnalytekCookie, setCookie, checkAnalytekCookie} from "./manage-cookie.js";

$(document).ready(function() {
    if(checkAnalytekCookie())
        getUseCases();
    else{
        checkEndPage();
    }
});


//function to get use case
function getUseCases() {
    var address = window.location.host + "/api/use-cases"; 
    $.ajax({
        url: address,
        type: "GET",
        success: function(data) {
            var useCases = data;
            chooseUseCase(useCases);
        }
    })
}

//function to choose use case
function chooseUseCase(useCases){
    //creare una funzione che mi fa apparire un dialog con i vari use case
    //quando l'utente sceglie un use case, lo salvo in un cookie perfomance con un uuid
}

//function to check if the user is on the last page
function checkEndPage(){
    //check if the user is on the last page
    //if the user is on the last page, send the json perfomance
    //if the user is not on the last page, do nothing
}

//function to send the json perfomance
function sendPerfomance(){
    //send the json perfomance
}