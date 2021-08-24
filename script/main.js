var btn_test = document.getElementById("btn_test");
var btn_feed = document.getElementById("btn_feed");
var btn_stat = document.getElementById("btn_stat");
var img_cat = document.getElementById("img_cat");
var span_sub = document.getElementById("span_sub");
var div_stat = document.getElementById("div_stat");
var div_fatigue = document.getElementById("div_fatigue");
var div_energy = document.getElementById("div_energy");
var div_condition = document.getElementById("div_condition");
var td_fatigue = document.getElementById("td_fatigue");

//페이지 시작 시 수행되는 함수
window.onload = function(){
    setFatigue( parseInt(div_fatigue.innerText));
    setEnergy( parseInt(div_energy.innerText));
    setCondition( parseInt(div_condition.innerText));
    setInterval("getCondition()",10000);
};

function test(){ callAjax("test"); }
function face1(){ callAjax("face1"); }
function face2(){ callAjax("face2"); }
function feed(){ callAjax("feed"); }
function stat(){ toggleBtn(btn_stat,div_stat) }
function setFatigue(per){ $('#bar_fatigue').progress({ percent : per }); }
function setEnergy(per){ $('#bar_energy').progress({ percent : per }); }
function setCondition(per){ $('#bar_condition').progress({ percent : per }); }
function getCondition(){ callAjax("getCondition"); }

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