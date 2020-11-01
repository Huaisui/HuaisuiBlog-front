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
    ajax(url,"GET").then((value)=>{
        var obj = JSON.parse(value);
        // console.log(obj[0]);
        // console.log(obj[0].article_id);
        var len = obj.length;
        var myNodes = new Array();
        console.log(len);
        for(var i=0; i<len; i++){  //复制n个article-container
            myNodes[i] = $("div.article-container").clone();
        }
        for(var i=0; i<len; i++){  //append n个article-container到articles-container
            myNodes[i].appendTo("div.articles-container");
        }
        var containers = document.getElementsByClassName("article-container");
        for(var i=0; i<len; i++){  //往每个article-container里面填数据
            containers[i].id = "ac-"+i;
            var x = $("div#ac-"+i).find("span");
            x[0].innerHTML = obj[i].article_title;
            x[0].setAttribute("id","url"+obj[i].article_id);
            x[1].innerHTML = obj[i].post_date;
            x[2].setAttribute("id","url"+obj[i].article_id);
            console.log(x);
        }
        $("#ac_-1").remove();
    }).catch((value)=>{
        console.log(value);
    });
}

function flip_page(){
    var page = window.location.href;
    console.log(page);
}


get_page("http://localhost:8080/getArticlesInfo",1); 
flip_page();

