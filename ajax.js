const CRUD= require("./CRUD");

exports.controller = function(req,res,next) {
    
    if(req.body.op=="test"){
        console.log("ajax called");
        res.send({result:req.body.op,msg:"test"});
    }else if(req.body.op=="face1"){
        res.send({result:req.body.op,msg:"face1"});
    }else if(req.body.op=="face2"){
        res.send({result:req.body.op,msg:"face2"});
    }else if(req.body.op=="feed"){
        CRUD.searchData("init","stat").then((stat)=>{
            CRUD.updateData("feed","stat",parseInt(stat.energy)+10);
            res.send({result:req.body.op,energy:parseInt(stat.energy)+10});
        });
    }else if(req.body.op=="idle"){
        setTimeout(() => {
            res.send({result:req.body.op,msg:"idle"});
        }, 2000);
    }else if(req.body.op=="getCondition"){
        CRUD.searchData("init","stat").then((stat)=>{
            res.send({result:"getCondition",stat:stat});
        });
    }
}