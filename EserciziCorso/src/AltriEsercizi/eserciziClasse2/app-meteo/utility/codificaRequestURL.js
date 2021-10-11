export function addURLParam(url,name,value){
    url += (url.indexOf('?') == -1 ? "?" : "&");
    url = `${url}${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    return url;
}