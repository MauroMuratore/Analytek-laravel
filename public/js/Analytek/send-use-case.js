import { deleteAnalytekCookie, checkAnalytekCookie, getCookie, setCookie } from './manage-cookie.js';

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
    let page = window.location.pathname;
    let last_page = getCookie("last_page");
    if(last_page == page){
        console.log("arrivato alla fine invio dati");
        postPerfomance();
        deleteAnalytekCookie(); 
    }


}  


//function to get use case
function getUseCases() {
    let address = "/api/use_cases"; 
    $.ajax({
        url: address,
        type: "GET",
        success: function (result) {

            addModal(result);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

//function to add modal
function addModal(useCases){
    //creo il modal
    let modal = document.createElement("div");
    modal.setAttribute("id", "myModal");
    modal.classList.add("modal");
    modal.setAttribute("style", "display: block; background-color: transparent;");
    modal.setAttribute("data-bs-backdrop", "static")
    modal.setAttribute("data-bs-keyboard","false");
    //creo e aggiungo il modal dialog
    let modal_dialog = document.createElement("div");
    modal.append(modal_dialog);
    modal_dialog.classList.add("modal-dialog");

    //creo e aggiungo il modal content
    let modal_content = document.createElement("div");
    modal_dialog.append(modal_content);
    modal_content.classList.add("modal-content");
    //creo e aggiungo il modal header
    let modal_header = document.createElement("div");
    modal_content.append(modal_header);
    modal_header.classList.add("modal-header");

    //creo e aggiungo il modal title
    let modal_title = document.createElement("h4");
    modal_header.append(modal_title);
    modal_header.setAttribute("style", "background-color: black;");
    modal_title.classList.add("modal-title");
    modal_title.innerHTML = "Choose a use case";

    //creo e aggiungo il modal body
    let modal_body = document.createElement("div");
    modal_content.append(modal_body);
    modal_body.classList.add("modal-body");
    let row = document.createElement("div");
    row.classList.add("row");
    modal_body.append(row);
    for(let i = 0; i < useCases.length; i++){
        let col = document.createElement("div");
        col.classList.add("col-12");
        row.append(col);
        let buttonUseCase = document.createElement("button");
        buttonUseCase.setAttribute("type", "button");
        buttonUseCase.classList.add("btn");
        buttonUseCase.classList.add("btn-primary");
        buttonUseCase.classList.add("my-2");
        let id = useCases[i].id;
        let last_page = useCases[i].last_page;
        buttonUseCase.setAttribute("id", "useCase" + id);
        buttonUseCase.innerHTML = useCases[i].name;
        col.append(buttonUseCase);
        buttonUseCase.onclick = function(){
            //salvo il use case scelto in un cookie
            setCookie("use_case", id);
            setCookie("last_page", last_page);
            //chiudo il modal
            //$('#myModal').modal("hide");
            $('#myModal').remove();

        }
    }
    modal_body.setAttribute("style", "background-color: black;");
    

    //creo e aggiungo il modal footer
    let modal_footer = document.createElement("div");
    modal_footer.setAttribute("style", "background-color: black;");
    modal_content.append(modal_footer);
    modal_footer.classList.add("modal-footer");
    let buttonClose = document.createElement("button");
    buttonClose.setAttribute("type", "button");
    buttonClose.classList.add("btn");
    buttonClose.classList.add("btn-secondary");
    
    buttonClose.setAttribute("data-dismiss", "modal");
    buttonClose.innerHTML = "Close";
    buttonClose.onclick = function(){
        //salvo il use case scelto in un cookie
        setCookie("use_case", "no_use_case");
        setCookie("last_page", "no_end_page");
        //chiudo il modal
        //$('#myModal').modal("hide");
        $('#myModal').remove();
    }
    modal_footer.append(buttonClose);
    

    $('body').append(modal);
}

//function to send use case
function postPerfomance(){
    let address = "/api/use_cases/";
    let use_case = {"use_case" : getCookie("use_case")};
    let pages_times = {"data" :getCookie("analytek").split(",")};
    let ritorno = {
        ... use_case,
        ... pages_times
    };
    $.post(address, JSON.stringify(ritorno));
}
