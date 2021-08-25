//#region 초반 선언부
const express = require('express');
const port = 8002;
const fs = require('fs');
const http = require('https'); 
const download = require('image-downloader');
const path = require('path');
const moment = require('moment');
var cron = require('node-cron');
const bodyparser= require('body-parser');
const router = require('./router');
const ajax = require('./ajax');
const CRUD= require("./CRUD");
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/script',express.static(__dirname + "/script"));
app.use('/views',express.static(__dirname + "/views"));
app.use('/images',express.static(__dirname + "/images"));
app.use('/APK',express.static(__dirname + "/APK"));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

const { response, request } = require('express');
const { createConnection } = require('net');
//#endregion

//상태 변경 속도 정의
const fatigueDown = 0;
const fatigueUp = 0;
const energyDown = 0;
const conditionUp = 0;
const conditionDown = 0;
//상태
const sleep=false; //수면중
var timeCnt = 0;

//#region 리스닝 및 라우팅

//리스닝
app.listen(port, ()=>{
    console.log('8002번 포트에 대기중!');
})
console.log("server started");

//크론 배치 실행
cron.schedule('1,10,20,30,40,50 * * * * *', () => {
    if(timeCnt>5) timeCnt=1;
    else timeCnt++;
    //포만감이 떨어지는 경우 : 현재 1분에 1 감소
    if(timeCnt==6) {
        CRUD.searchData("getCondition","condition","nya").then((stat)=>{
            if(parseInt(stat.energy)>1) CRUD.updateData("energyDown","condition",parseInt(stat.energy)-1,"nya");
            console.log(timeCnt);        
        })
    }
    //컨디션이 떨어지는 경우 : 포만감 50% 이하에서 1분에 1 감소
    //피로도가 올라가는 경우 : 깨어 있는 상태에서 10분에 1 상승
    //수면 상태 : 피로도 1분에 1 감소/포만감 10분에 1 감소/컨디션 1분에 1 상승
    
});

//라우터
app.get('/', router.main);

//ajax 컨트롤러
app.post('/ajax', ajax.controller);

//#endregion