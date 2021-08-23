const CRUD= require("./CRUD");

exports.main = function(req,res) {
    CRUD.searchData("init","stat").then((stat)=>{
        console.log(stat ? stat.date +" read stat OK" : "read stat fail");
        res.render('main', { title: '근육고양이 키우기'
                        , userList : ''
                        , stat : stat
                    });
    })
}