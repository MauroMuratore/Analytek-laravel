import { deleteAnalytekCookie, checkAnalytekCookie, getCookie, setCookie } from './manage-cookie.js';
import { restartTime } from './visit-time.js';

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
    let pages = getCookie("pages").split(",", limit=1);
    let next_page = pages[0];
    if(next_page == page){
        if(pages.length == 1){
            console.log("arrivato alla fine invio dati");
            postPerfomance();
            deleteAnalytekCookie(); 
        }
        else{
            setCookie("pages", pages[1]);
        }
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
                                    <div class='modal-header' > \n \
                                        <h4 style='color: black;' class='modal-title'>Choose a use case</h4> \n \
                                    </div> \n \
                                    <div class='modal-body'> \n \
                                        <div class='row'> \n \
                                        </div> \n \
                                    </div> \n \
                                    <div class='modal-footer'> \n \
                                        <button id='cancelButton' type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button> \n \
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
            setCookie("pages", element.pages);
            //riparto il timer
            restartTime();
            //chiudo il modal
            $('#myModal').modal("hide");
            //$('#myModal').remove();
        }
        $('.modal-body > .row').append(col);
    });
    buttonCancel = $("#cancelButton");
    buttonCancel.click(function(){
        $('#myModal').modal("hide");
        setCookie("use_case", "no_use_case");
        setCookie("pages", "/no_use_case_analytek");
        //$('#myModal').remove();
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
