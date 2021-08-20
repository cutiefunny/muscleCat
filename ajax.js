exports.controller = function(req,res,next) {
    
    if(req.body.op=="test"){
        console.log("ajax called");
        res.send({result:req.body.op,msg:"test"});
    }else if(req.body.op=="face1"){
        res.send({result:req.body.op,msg:"face1"});
    }else if(req.body.op=="face2"){
        res.send({result:req.body.op,msg:"face2"});
    }else if(req.body.op=="feed"){
        res.send({result:req.body.op,msg:"feed"});
    }else if(req.body.op=="idle"){
        setTimeout(() => {
            res.send({result:req.body.op,msg:"idle"});
        }, 2000);
    }
}