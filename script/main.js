var btn_test = document.getElementById("btn_test");
var btn_feed = document.getElementById("btn_feed");
var btn_stat = document.getElementById("btn_stat");
var img_cat = document.getElementById("img_cat");
var span_sub = document.getElementById("span_sub");
var div_stat = document.getElementById("div_stat");

function test(){ callAjax("test"); }
function face1(){ callAjax("face1"); }
function face2(){ callAjax("face2"); }
function feed(){ callAjax("feed"); }
function stat(){ toggleBtn(btn_stat,div_stat) }

//토글 버튼
function toggleBtn(btn,div){
    if(btn.getAttribute("class").includes("positive")) {
        btn.setAttribute("class","ui button");
        $('.box').transition('fade');
        //div.setAttribute("class","box hide");
    }
    else {
        btn.setAttribute("class","ui positive button");
        $('.box').transition('fade');
        //div.setAttribute("class","box");
    }
}