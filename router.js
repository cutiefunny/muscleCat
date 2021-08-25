const CRUD= require("./CRUD");

exports.main = function(req,res) {
    CRUD.searchData("init","stat").then((stat)=>{
        console.log("read initialize data");
        console.log(stat[0]);
        console.log(stat ? stat.name +" read stat OK" : "read stat fail");
        res.render('main', { title: '근육고양이 키우기'
                        , userList : ''
                        , stat : stat[0]
                    });
    })
}