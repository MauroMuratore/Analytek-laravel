import { appendCookie} from "./manage-cookie.js";

let start_time = 0;

$(document).ready(function() {
    let date = new Date();
    start_time = date.getTime();
});

$('a').click(function(event) {
    // Remember the link href
    let href = this.href;

    // Don't follow the link
    event.preventDefault();

    // Set the cookie
    let date = new Date();
    let end_time = date.getTime();
    let page = window.location.pathname;
    let time = end_time - start_time;
    appendCookie("analytek", page + ":" + time );    

    // And when it's done, go to the link
    window.location = href;
});

export function restartTime(){
    let date = new Date();
    start_time = date.getTime();
}