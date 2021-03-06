const CRUD= require("./CRUD");

//동작별 상태 변경 정의
const feed=10; //밥 주기

exports.controller = function(req,res,next) {
    
    if(req.body.op=="test"){
        console.log("ajax called");
        res.send({result:req.body.op,msg:"test"});
    }else if(req.body.op=="face1"){
        res.send({result:req.body.op,msg:"face1"});
    }else if(req.body.op=="face2"){
        res.send({result:req.body.op,msg:"face2"});
    }else if(req.body.op=="feed"){
        CRUD.searchData("getCondition","condition",req.body.name).then((stat)=>{
            CRUD.updateData("feed","condition",parseInt(stat[0].energy)+feed,req.body.name);
            res.send({result:req.body.op,energy:parseInt(stat[0].energy)+feed});
        });
    }else if(req.body.op=="sleep"){
        CRUD.searchData("getCondition","condition",req.body.name).then((stat)=>{
            CRUD.updateData("sleep","condition", stat[0].sleep ? false : true ,req.body.name);
            res.send({result:req.body.op,sleep: stat[0].sleep ? false : true });
        });
    }else if(req.body.op=="idle"){
        setTimeout(() => {
            res.send({result:req.body.op,msg:"idle"});
        }, 2000);
    }else if(req.body.op=="getCondition"){
        CRUD.searchData(req.body.op,"condition",req.body.name).then((stat)=>{
            res.send({result:"getCondition",stat:stat[0]});
        });
    }
}