//Ajax 함수
function callAjax(op) {

    $.ajax({
        url: '/ajax',
        dataType: 'json',
        type: 'POST',
        data: { 
            msg : "test"
            , op : op
            , name : "nya"
        },
        success: function(result) {
            //테스트
            if ( result['result'] == "test" ) {  
                alert(result['msg']);
            }else if( result['result'] == "face1" ) {
                span_sub.className = "bold";
                span_sub.innerText = "밥줘!!";
                img_cat.setAttribute("src","/images/cat/cat_face1.png");
                callAjax("idle");
            }else if( result['result'] == "face2" ) {
                img_cat.setAttribute("src","/images/cat/cat_face2.png");
                callAjax("idle");
            }else if( result['result'] == "feed" ) {
                setEnergy(result['energy']);
                span_sub.className = "";
                span_sub.innerText = "맛있다냥!!";
                img_cat.setAttribute("src","/images/cat/cat_eat.gif");
                callAjax("idle");
            }
            else if( result['result'] == "idle" ) {
                callAjax("getCondition");
                // span_sub.innerText = "";
                // img_cat.setAttribute("src","/images/cat/cat_idle.gif");
            }else if( result['result'] == "getCondition" ) {
                setFatigue(result['stat'].fatigue);
                setEnergy(result['stat'].energy);
                setCondition(result['stat'].condition);
                result['stat'].sleep ? btn_sleep.innerText = "일어나기" : btn_sleep.innerText = "잠자기";
                setImage(result['stat'].energy,btn_sleep.innerText == "잠자기" ? false : true);
            }
            
        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        //alert("fail");
    }); // ------      ajax 끝-----------------
}

//그림 바꾸기
function setImage(energy,sleep){
    if(!sleep){
        if(energy < 50){
            img_cat.setAttribute("src","/images/cat/cat_face1.png");
            span_sub.innerText = "밥줘!!";
        }else{
            span_sub.innerText = "";
            img_cat.setAttribute("src","/images/cat/cat_idle.gif");
        }
    }else {
        span_sub.innerText = "..zzZZZ";
        img_cat.setAttribute("src","/images/cat/cat_face2.png");
        btn_feed.className = "ui disabled button";
        btn_workout.className = "ui disabled button";
    }
}