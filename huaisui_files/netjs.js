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

// 获得第n页
function get_page(url,page){
    url = url+"?page="+page;
    console.log(url);
    ajax(url,"GET").then((value)=>{
        var obj = JSON.parse(value);
        console.log(obj);
    }).catch((value)=>{
        console.log(value);
    });
}

// get_article("https://localhost:8080/getitem");
// get_page("http://localhost:8080",1);

function create_article_item(){
    var right = document.getElementById("right-part")
    var n = right.getElementsByClassName("articles-container");            
    console.log(n);
}

create_article_item();