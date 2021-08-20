//#region 초반 선언부
const express = require('express');
const port = 8001;
const fs = require('fs');
const http = require('https'); 
const download = require('image-downloader');
const path = require('path');
const moment = require('moment');
const cron = require('node-cron');
const bodyparser= require('body-parser');
const router = require('./router');
const ajax = require('./ajax');
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/script',express.static(__dirname + "/script"));
app.use('/views',express.static(__dirname + "/views"));
app.use('/images',express.static(__dirname + "/images"));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

const { MongoClient } = require("mongodb");
const { response, request } = require('express');
const { createConnection } = require('net');
//#endregion

//#region DB연결 및 라우팅
//몽고DB 연결
const uri =
  "mongodb+srv://cutiefunny:ghks1015@macrodb.srkli.mongodb.net/macroDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

//리스닝
app.listen(port, ()=>{
    console.log('8001번 포트에 대기중!');
})
console.log("server started");

//라우터
app.get('/', router.main);

//ajax 컨트롤러
app.post('/ajax', ajax.controller);

//#endregion