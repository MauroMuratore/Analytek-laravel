import { appendCookie} from "./manage-cookie.js";

let start_time = 0;

window.onbeforeunload = function () {
    let date = new Date();
    let end_time = date.getTime();
    let page = window.location.pathname;
    let time = (end_time - start_time)/1000;
    appendCookie("analytek", page + ":" + time );
};

$(document).ready(function() {
    let date = new Date();
    start_time = date.getTime();
});

export function restartTime(){
    let date = new Date();
    start_time = date.getTime();
    document.cookie = 'analytek=; Max-Age=-99999999;';
}