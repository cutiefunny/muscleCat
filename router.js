const CRUD= require("./CRUD");

exports.main = function(req,res) {
    var name;
    name = req.query.name ? req.query.name : "김냐냐";
    CRUD.searchData("init","stat",name).then((stat)=>{
        console.log("read initialize data");
        console.log(stat[0]);
        console.log(stat ? stat.name +" read stat OK" : "read stat fail");
        res.render('main', { title: '근육고양이 키우기'
                        , userList : ''
                        , stat : stat[0]
                    });
    })
}
