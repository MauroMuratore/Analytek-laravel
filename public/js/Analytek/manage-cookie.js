// Description: This file contains the functions to manage the cookies
// Path: public/js/Analytek/manage-cookie.js

export function appendCookie(cname, cvalue) {
    var cookie_value = getCookie(cname);
    var value = "";
    if(cookie_value != "")
        value = cookie_value + "," + cvalue;
    else
        value = cvalue;
    document.cookie = cname + "=" + value + ";path=/";
}

export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
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

export function deleteAnalytekCookie() {
    document.cookie = 'analytek=; Max-Age=-99999999;';
    document.cookie = 'use_case=; Max-Age=-99999999;';  
    document.cookie = 'end_page=; Max-Age=-99999999;';    
}

export function checkAnalytekCookie(cname) {
    if(getCookie(cname) == "")
            return false;
    
    return true;
}