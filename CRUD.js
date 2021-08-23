const moment = require('moment');
const { MongoClient } = require("mongodb");

//몽고DB 연결
const uri =
  "mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();

//Read
exports.searchData = async function (op,col,param){
    var db = client.db("muscleCat");
    var collection = db.collection(col);

    if(op=="init"){
        console.log("read initialize date");
        res = await collection.find().sort({date : -1}).toArray();
    }
    return res[0];
}