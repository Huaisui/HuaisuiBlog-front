// ajax
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

// 获得article
function get_article(url){
    ajax(url,'GET').then((value)=>{
        var obj = JSON.parse(value);
        console.log(obj);
    }).catch((value)=>{
        console.log(value);
    });
}

// 获得n篇article
function get_articles(url,page){
    ajax(url,"GET").then((value)=>{
        // for(let i = 0; i < value; i++){
        //     get_article()
        // }
    }).catch((value)=>{
        console.log(value);
    });
}

get_article("https://localhost:8080/getitem");
