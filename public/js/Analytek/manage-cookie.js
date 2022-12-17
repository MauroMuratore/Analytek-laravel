// Description: This file contains the functions to manage the cookies
// Path: public/js/Analytek/manage-cookie.js

export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function getAllAnalytekCookies() {
    var cookies = [];
    for(var i = 0; i < 100; i++) {
        var cookie = getCookie("analytek_" + i);
        if (cookie != "") {
            cookies.push(cookie);
        }
    }
    return cookies;
}

export function deleteAnalytekCookie() {
    for(var i = 0; i < 100; i++) {
        if(getCookie("analytek_" + i) == "")
            break;
        document.cookie = "analytek_" + i + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

export function lastAnalytekCookie() {
    for(var i = 0; i < 100; i++) {
        var cookie = getCookie("analytek_" + i);
        if (cookie == "") {
            return "analytek_" + i;
        }
    }
    return "analytek_" + 101;
}