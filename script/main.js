//#region 엘리먼트를 변수로 선언
var btn_test = document.getElementById("btn_test");
var btn_feed = document.getElementById("btn_feed");
var btn_table = document.getElementById("btn_table");
var btn_box = document.getElementById("btn_box");
var btn_sleep = document.getElementById("btn_sleep");
var btn_workout = document.getElementById("btn_workout");
var img_cat = document.getElementById("img_cat");
var span_sub = document.getElementById("span_sub");
var div_stat = document.getElementById("div_stat");
var div_table = document.getElementById("div_table");
var div_fatigue = document.getElementById("div_fatigue");
var div_energy = document.getElementById("div_energy");
var div_condition = document.getElementById("div_condition");
var td_fatigue = document.getElementById("td_fatigue");
var span_name = document.getElementById("span_name");
var span_race = document.getElementById("span_race");
var imgFolder = span_race.innerText;
var menu = document.getElementById("menu");
var div_sideBar = document.getElementById("div_sideBar");
//#endregion

//페이지 시작 시 수행되는 함수
window.onload = function(){
    //현재 컨디션 가져오기
    getCondition();
    //10초마다 컨디션 갱신
    setInterval("getCondition()",10000);
};

//#region 클릭 이벤트 함수들
// $('.ui.labeled.icon.sidebar')
//   .sidebar('toggle')
// ;

function test(){ callAjax("test"); }
//메뉴 클릭
function clickMenu(){ 
    $('.ui.labeled.icon.sidebar').sidebar('toggle'); 
}
//고양이 선택
function selectCat(value){ location.href="/?name="+value; }
//운동
function workout(){ callAjax("face1"); }
//잠자기 버튼 클릭
function sleep(){ 
    btn_feed.classList.toggle('disabled');
    btn_workout.classList.toggle('disabled');
    if(btn_sleep.innerText=="잠자기") {
        span_sub.innerText = "..zzZZZ";
        img_cat.setAttribute("src","/images/"+imgFolder+"/cat_sleep.png");
        btn_sleep.innerText="일어나기"
    }else{
        span_sub.innerText = "";
        img_cat.setAttribute("src","/images/"+imgFolder+"/cat_idle.gif");
        btn_sleep.innerText="잠자기"
    }
    callAjax("sleep"); 
}
//밥 주기
function feed(){ 
    if( parseInt(div_energy.innerText) > 99 ) {
        span_sub.innerText = "배 불러! 고만 줘!!";
        img_cat.setAttribute("src","/images/"+imgFolder+"/cat_angry.png");
        callAjax("idle");
    }else callAjax("feed"); 

}
//상태창 보이기/숨기기
function table(){ toggleHide(div_table,btn_table); }
//능력치 보이기/숨기기
function box(){ toggleHide(div_stat,btn_box); }
//#endregion

//#region 컨디션 가져오기, 그리기
function setFatigue(per){ $('#bar_fatigue').progress({ percent : per }); }
function setEnergy(per){ $('#bar_energy').progress({ percent : per }); }
function setCondition(per){ $('#bar_condition').progress({ percent : per }); }
function getCondition(){ callAjax("getCondition"); }
//#endregion

//보이기/숨기기 함수
function toggleHide(a,b){
    a.classList.toggle('hide');
    b.classList.toggle('hide');
}