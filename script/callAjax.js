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
                img_cat.setAttribute("src","/images/cat/cat_face1.png");
                callAjax("idle");
            }
            else if( result['result'] == "face2" ) {
                img_cat.setAttribute("src","/images/cat/cat_face2.png");
                callAjax("idle");
            }
            else if( result['result'] == "idle" ) img_cat.setAttribute("src","/images/cat/cat_idle.gif");
            
        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        //alert("fail");
    }); // ------      ajax 끝-----------------
}