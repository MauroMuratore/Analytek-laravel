$(document).ready(function() {
    getUseCases();    
    /* if(checkAnalytekCookie()){
        getUseCases();
    }
    else{
        checkEndPage();
    } */
});


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

//function to choose use case
function chooseUseCase(useCases){
    console.log(useCases);
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

function addModal(useCases){
    //creo il modal
    var modal = document.createElement("div");
    modal.setAttribute("id", "myModal");
    modal.classList.add("modal");
    modal.setAttribute("style", "display: block; background-color: transparent;");
    
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
    for(var i = 0; i < useCases.length; i++){
        var buttonUseCase = document.createElement("button");
        buttonUseCase.setAttribute("type", "button");
        buttonUseCase.classList.add("btn");
        buttonUseCase.classList.add("btn-primary");
        buttonUseCase.setAttribute("id", "useCase" + i);
        buttonUseCase.innerHTML = useCases[i].name;
        modal_body.append(buttonUseCase);
        buttonUseCase.onclick = function(){
            //salvo il use case scelto in un cookie
            //mando il json perfomance
            //chiudo il modal
            $('#myModal').modal('hide');
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
    modal_footer.append(buttonClose);
    

    $('body').append(modal);
    $('#myModal').modal('show');
}