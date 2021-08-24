//Ajax 함수
function callAjax(op) {

    $.ajax({
        url: '/ajax',
        dataType: 'json',
        type: 'POST',
        data: { 
            msg : "test"
            , op : op
        },
        success: function(result) {

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
                span_sub.className = "";
                span_sub.innerText = "맛있다냥!!";
                img_cat.setAttribute("src","/images/cat/cat_eat.gif");
                callAjax("idle");
            }
            else if( result['result'] == "idle" ) {
                span_sub.innerText = "";
                img_cat.setAttribute("src","/images/cat/cat_idle.gif");
            }else if( result['result'] == "getCondition" ) {
                setFatigue(result['stat'].fatigue);
                setEnergy(result['stat'].energy);
                setCondition(result['stat'].condition);
            }
            
        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        //alert("fail");
    }); // ------      ajax 끝-----------------
}