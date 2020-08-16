var jsonp = function (url, data, callback) {
    var cbFuncName = 'jsonp_fun' + Math.random().toString().replace('.', '');
    window[cbFuncName] = callback;
    var queryString = url.indexOf('?') == -1 ? '?' : '&';
    for (var key in data) {
        queryString += key + '=' + data[key] + '&';
    }
    queryString += 'callback=' + cbFuncName;
    queryString += '&apiKey=0df993c66c0c636e29ecbb5344252a4a'
    var script = document.createElement('script');
    script.src = url + queryString;
    document.body.appendChild(script);
}
export default jsonp
