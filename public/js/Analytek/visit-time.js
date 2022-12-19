import {setCookie} from "./manage-cookie.js";

var start_time = 0;

$(document).ready(function() {
    var date = new Date();
    start_time = date.getTime();
});

$('a').click(function(event) {
    // Remember the link href
    var href = this.href;

    // Don't follow the link
    event.preventDefault();

    // Set the cookie
    var date = new Date();
    var end_time = date.getTime();
    var page = window.location.pathname;
    var time = end_time - start_time;
    setCookie("analytek", page + ":" + time);    

    // And when it's done, go to the link
    window.location = href;
});