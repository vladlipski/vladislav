import Cookies from 'js-cookie';

var _cookie;

export function getCookie(key) {
    return _cookie ? _cookie.get(key) : Cookies.get(key);
}

export function setCookie(cookie) {
    _cookie = cookie;
}