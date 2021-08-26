const moment = require('moment');
const { MongoClient } = require("mongodb");

//몽고DB 연결
const uri =
  "mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();
const db = client.db("muscleCat");

//Read
exports.searchData = async function (op,col,param){
    var collection = db.collection(col);

    if(op=="init") res = await collection.find({name:param}).sort({date : -1}).toArray();
    else if(op=="getCondition") res = await collection.find({name:param}).toArray();
    else if(op=="getAllCondition") res = await collection.find().toArray();
    
    return res;
}

//Update
exports.updateData = async function (op,col,param,name){
  //console.log(op+" , "+param);
  var collection = db.collection(col);

  if(op=="fatigue"){
      var filter = {name:name};
      var doc={$set:{fatigue : param}};
  }else if(op=="energy"){
    var filter = {name:name};     
    var doc={$set:{energy : param}};
  }else if(op=="condition"){
    var filter = {name:name};     
    var doc={$set:{condition : param}};
  }else if(op=="feed"){
      console.log("feed");
      var filter = {name:name};     
      var doc={$set:{energy : param}};
  }else if(op=="sleep"){
    console.log("sleep status changed. sleep = "+ param);
    var filter = {name:name};     
    var doc={$set:{sleep : param}};
}
  await collection.updateOne(filter,doc);
}