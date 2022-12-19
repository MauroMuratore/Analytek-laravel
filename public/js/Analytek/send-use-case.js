import { checkAnalytekCookie, setCookie } from './manage-cookie.js';

$(document).ready(function() { 
    if(!checkAnalytekCookie("use_case")){
        getUseCases();
    }
    else{
        checkEndPage();
    }
});

function checkEndPage(){
    //controllo che sia l'ultima pagina
    //se è l'ultima pagina, invio i dati
    end_page = getCookie("end_page");
    var page = window.location.pathname;

}  


//function to get use case
function getUseCases() {
    var address = "/api/use_cases"; 
    $.ajax({
        url: address,
        type: "GET",
        success: function (result) {
            console.log("success");
            addModal(result.data);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//function to add modal
function addModal(useCases){
    //creo il modal
    var modal = document.createElement("div");
    modal.setAttribute("id", "myModal");
    modal.classList.add("modal");
    modal.setAttribute("style", "display: block; background-color: transparent;");
    modal.setAttribute("data-bs-backdrop", "static")
    modal.setAttribute("data-bs-keyboard","false");
    //creo e aggiungo il modal dialog
    var modal_dialog = document.createElement("div");
    modal.append(modal_dialog);
    modal_dialog.classList.add("modal-dialog");

    //creo e aggiungo il modal content
    var modal_content = document.createElement("div");
    modal_dialog.append(modal_content);
    modal_content.classList.add("modal-content");
    //creo e aggiungo il modal header
    var modal_header = document.createElement("div");
    modal_content.append(modal_header);
    modal_header.classList.add("modal-header");

    //creo e aggiungo il modal title
    var modal_title = document.createElement("h4");
    modal_header.append(modal_title);
    modal_header.setAttribute("style", "background-color: black;");
    modal_title.classList.add("modal-title");
    modal_title.innerHTML = "Choose a use case";

    //creo e aggiungo il modal body
    var modal_body = document.createElement("div");
    modal_content.append(modal_body);
    modal_body.classList.add("modal-body");
    var row = document.createElement("div");
    row.classList.add("row");
    modal_body.append(row);
    for(var i = 0; i < useCases.length; i++){
        var col = document.createElement("div");
        col.classList.add("col-12");
        row.append(col);
        var buttonUseCase = document.createElement("button");
        buttonUseCase.setAttribute("type", "button");
        buttonUseCase.classList.add("btn");
        buttonUseCase.classList.add("btn-primary");
        buttonUseCase.classList.add("my-2");
        var id = useCases[i].id;
        var end_page = useCases[i].end_page;
        buttonUseCase.setAttribute("id", "useCase" + id);
        buttonUseCase.innerHTML = useCases[i].name;
        col.append(buttonUseCase);
        buttonUseCase.onclick = function(){
            //salvo il use case scelto in un cookie
            setCookie("use_case", id);
            setCookie("end_page", end_page);
            //chiudo il modal
            //$('#myModal').modal("hide");
            $('#myModal').remove();

        }
    }
    modal_body.setAttribute("style", "background-color: black;");
    

    //creo e aggiungo il modal footer
    var modal_footer = document.createElement("div");
    modal_footer.setAttribute("style", "background-color: black;");
    modal_content.append(modal_footer);
    modal_footer.classList.add("modal-footer");
    var buttonClose = document.createElement("button");
    buttonClose.setAttribute("type", "button");
    buttonClose.classList.add("btn");
    buttonClose.classList.add("btn-secondary");
    
    buttonClose.setAttribute("data-dismiss", "modal");
    buttonClose.innerHTML = "Close";
    buttonClose.onclick = function(){
        //salvo il use case scelto in un cookie
        setCookie("use_case", "no_use_case");
        setCookie("end_page", "no_end_page");
        //chiudo il modal
        //$('#myModal').modal("hide");
        $('#myModal').remove();
    }
    modal_footer.append(buttonClose);
    

    $('body').append(modal);
}