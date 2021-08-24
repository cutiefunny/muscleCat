var btn_test = document.getElementById("btn_test");
var btn_feed = document.getElementById("btn_feed");
var btn_table = document.getElementById("btn_table");
var btn_box = document.getElementById("btn_box");
var img_cat = document.getElementById("img_cat");
var span_sub = document.getElementById("span_sub");
var div_stat = document.getElementById("div_stat");
var div_table = document.getElementById("div_table");
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

//이벤트 함수
function test(){ callAjax("test"); }
function face1(){ callAjax("face1"); }
function face2(){ callAjax("face2"); }
function feed(){ callAjax("feed"); }
function table(){ toggleHide(div_table,btn_table); }
function box(){ toggleHide(div_stat,btn_box); }
function setFatigue(per){ $('#bar_fatigue').progress({ percent : per }); }
function setEnergy(per){ $('#bar_energy').progress({ percent : per }); }
function setCondition(per){ $('#bar_condition').progress({ percent : per }); }
function getCondition(){ callAjax("getCondition"); }

//토글 박스
function toggleHide(a,b){
    a.classList.toggle('hide');
    b.classList.toggle('hide');
}