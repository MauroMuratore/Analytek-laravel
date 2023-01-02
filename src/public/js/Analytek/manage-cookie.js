// Description: This file contains the functions to manage the cookies
// Path: public/js/Analytek/manage-cookie.js

export function appendCookie(cname, cvalue) {
    let cookie_value = getCookie(cname);
    let value = "";
    if(cookie_value != ""){
        value = cookie_value + "," + cvalue;
    }
    else{
        value = cvalue;
    }
    document.cookie = cname + "=" + value + ";SameSite=Lax;path=/";
}

export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";SameSite=Lax;path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
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
    document.cookie = 'analytek=; Max-Age=-99999999;path=/';
    document.cookie = 'use_case=; Max-Age=-99999999;path=/';  
    document.cookie = 'pages=; Max-Age=-99999999;path=/';    
    console.log("delete cookie");
}

export function checkAnalytekCookie(cname) {
    if(getCookie(cname) == "")
            return false;
    
    return true;
}