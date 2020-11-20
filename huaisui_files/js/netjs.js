//调试
var myURL = "http://localhost:8080";

//部署
// var myURL = "http://teohuaisui.top";

// ajax 这里完全可以用jquery（事实上我后面用的都是jquery，在这里只是为了体验一下原生js实现ajax
function ajax(URL,method) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest(); 
        req.open(method, URL, true);
        req.onload = function () {
        if (req.status === 200) { 
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send(); 
    });
}


