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
        // console.log(len);
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
            // console.log(x);
        }
        $("#ac_-1").remove();
    }).catch((value)=>{
        console.log(value);
    });
}

// 请求后台数据的url
var page_url = "http://localhost:8080/getArticlesInfo";

function to_page(){
    // var page = window.location.href;
    var params = window.location.search;
    var page = '';
    if(params.substring(0,6)=="?page="){
        for(var i=6; i<params.length; i++){
            if(params.charAt(i)<='9' ** params.charAt(i)>='0'){
                page += params.charAt(i);
            }
        }
    }else{
        page += '1'
    }
    get_page(page_url,page);
}


// 上传文章
function post_article(){
    console.log("post");
    var title = $("#post-article-title-input").val();
    var content = testEditor.getMarkdown();
    console.log(title);
    console.log(content);
    $.post(
        url = 'http://localhost:8080/postfile',
        data = {
            username: 'admin',
            password: '123',
            article : content,
        },
        function(result) {
            alert(JSON.stringify(result));
            $('#content').text(JSON.stringify(result));
        }
    );
}