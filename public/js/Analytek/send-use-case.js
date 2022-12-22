import { deleteAnalytekCookie, checkAnalytekCookie, getCookie, setCookie } from './manage-cookie.js';

$(document).ready(function() { 
    if(!checkAnalytekCookie("use_case")){
        getUseCases();
    }
    else{
        checkEndPage();
    }
});

//controllo che sia l'ultima pagina
    //se è l'ultima pagina, invio i dati
function checkEndPage(){
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
    let modal_html =    "<div class='modal' id='myModal' style='background-color: transparent;' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' > \n \
                            <div class='modal-dialog'> \n \
                                <div class='modal-content'> \n \
                                    <div class='modal-header' style='background-color: black;'> \n \
                                        <h4 class='modal-title'>Choose a use case</h4> \n \
                                    </div> \n \
                                    <div class='modal-body' style='background-color: black;'> \n \
                                        <div class='row'> \n \
                                        </div> \n \
                                    </div> \n \
                                    <div class='modal-footer' style='background-color: black;'> \n \
                                        <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button> \n \
                                    </div> \n \
                                </div> \n \
                            </div> \n \
                        </div> \n";
    $('body').append(modal_html);
    createUseCaseButtons(useCases);
    $('#myModal').modal("show");
}

//function create for use case buttons in modal
function createUseCaseButtons(use_cases){
    use_cases.forEach(element => {
        let col = document.createElement("div");
        col.classList.add("col-12");
        let button = document.createElement("button");
        col.append(button);
        button.setAttribute("type", "button");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.classList.add("my-2");
        button.setAttribute("id", "useCase" + element.id);
        button.innerHTML = element.name;
        button.onclick = function(){
            //salvo il use case scelto in un cookie
            setCookie("use_case", element.id);
            setCookie("last_page", element.last_page);
            //chiudo il modal
            $('#myModal').modal("hide");
            //$('#myModal').remove();
        }
        $('.modal-body > .row').append(col);
    });
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
