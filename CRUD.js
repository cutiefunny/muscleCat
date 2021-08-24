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

    if(op=="init"){
        res = await collection.find().sort({date : -1}).toArray();
    }
    return res[0];
}

//Update
exports.updateData = async function (op,col,param){
  console.log(op+" , "+param);
  var collection = db.collection(col);

  if(op=="fatigueDown"){
      console.log("fatigue decrease 1");
      var filter = {date:moment().format("YYYYMMDD")};
      var doc={$set:{fatigue : param}};
  }else if(op=="energyDown"){
    console.log("energy decrease 1");
    var filter = {date:moment().format("YYYYMMDD")};     
    var doc={$set:{energy : param}};
  }else if(op=="feed"){
      console.log("feed");
      var filter = {date:moment().format("YYYYMMDD")};     
      var doc={$set:{energy : param}};
  }
  await collection.updateOne(filter,doc);
}