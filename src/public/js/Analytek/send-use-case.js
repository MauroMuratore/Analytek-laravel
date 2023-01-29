import { deleteAnalytekCookie, checkAnalytekCookie, getCookie, setCookie } from './manage-cookie.js';
import { restartTime } from './visit-time.js';

let modal_header_content;
let modal_body;
let modal_footer;
let use_cases;

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
    let pages = getCookie("pages").split(",");
    console.log(pages);
    let next_page = pages[0];
    if(next_page == page){
        if(pages.length == 1){
            console.log("last page");
            postPerfomance();

            deleteAnalytekCookie();
            window.location = "/";
        }
        else{
            setCookie("pages", pages.slice(1).toString());
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
    use_cases = useCases;
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
    createUseCaseButtons(use_cases);
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

            showDescription(element);
            //salvo il use case scelto in un cookie
            /* setCookie("use_case", element.id);
            setCookie("pages", element.pages);
            //riparto il timer
            restartTime();
            //chiudo il modal
            $('#myModal').modal("hide"); */
            //$('#myModal').remove();
        }
        $('.modal-body > .row').append(col);
    });
    let buttonCancel = $("#cancelButton");
    buttonCancel.click(function(){
        $('#myModal').modal("hide");
        setCookie("use_case", "no_use_case");
        setCookie("pages", "/no_use_case_analytek");
        //$('#myModal').remove();
    });
}
//function to send use case
function postPerfomance(){
    let address = "/api/use_cases";
    let use_case = {"use_case" : getCookie("use_case")};
    let pages_times = {"data" :getCookie("analytek").split(",")};
    let ritorno = {
        ... use_case,
        ... pages_times
    };
    ritorno = JSON.stringify(ritorno);
    $.ajaxSetup({async: false});
    $.post(address, ritorno);
}


//show description in the modal
function showDescription(use_case){
    modal_header_content = $(".modal-title").text();
    modal_body = $('.modal-body > .row')[0];
    modal_footer = $('.modal-footer > button')[0];
    $(".modal-title").text(use_case.name);
    $(".modal-body").empty();
    $(".modal-body").append("<p>" + use_case.description +"</p>");
    $('.modal-footer > button').remove();
    $(".modal-footer").append("<button id='start-use-case' class='btn btn-primary mx-2'>Start</button><button id='back-use-case' type='button' class='btn btn-secondary' mx-2'>Back</button>");
    
    $("#start-use-case").on('click', ()=>{
            //salvo il use case scelto in un cookie
            setCookie("use_case", element.id);
            setCookie("pages", element.pages);
            //riparto il timer
            restartTime();
            //chiudo il modal
            $('#myModal').modal("hide"); 
    } );
    $("#back-use-case").on('click', ()=>{
        $(".modal-title").text(modal_header_content);
        $(".modal-body").empty();
        $(".modal-body").append(modal_body);
        $(".modal-footer").empty();
        $(".modal-footer").append(modal_footer);
    });
}

//hide description in the modal
function hideDescription(){

}