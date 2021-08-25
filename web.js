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

//타임 카운트
var timeCnt = 0;

//#region 리스닝 및 라우팅

//리스닝
app.listen(port, ()=>{
    console.log('8002번 포트에 대기중!');
})
console.log("server started");

//크론 배치 실행
cron.schedule('1 * * * * *', () => {
    if(timeCnt>9) timeCnt=1;
    else timeCnt++;
    CRUD.searchData("getAllCondition","condition").then((allStat)=>{
        console.log("change condition");
        allStat.forEach(stat => {
            if(!stat.sleep){ //잠든 상태가 아니면
                //1분에 포만감 1 감소
                if(parseInt(stat.energy)>1) CRUD.updateData("energy","condition",parseInt(stat.energy)-1,stat.name)
                .then( console.log(stat.name + ".energy : " + stat.energy)  ) ;
                //2분에 피로도 1 증가
                if(timeCnt%2==0 && parseInt(stat.fatigue)<100 ) CRUD.updateData("fatigue","condition",parseInt(stat.fatigue)+1,stat.name)
                .then( console.log(stat.name + ".fatigue : " + stat.fatigue)  ) ;
                //배가 고프면 1분에 컨디션 1 감소. 최소 30
                if(parseInt(stat.energy)<31 && parseInt(stat.condition)>30) CRUD.updateData("condition","condition",parseInt(stat.condition)-1,stat.name)
                .then( console.log(stat.name + ".condition : " + stat.condition)  ) ;
                //피곤하면 1분에 컨디션 1 감소. 최소 10
                if(parseInt(stat.fatigue)>89 && parseInt(stat.condition)>10) CRUD.updateData("condition","condition",parseInt(stat.condition)-1,stat.name)
                .then( console.log(stat.name + ".condition : " + stat.condition)  ) ;
            }else{ //잠든 상태이면
                //1분에 피로도 1 감소
                if(parseInt(stat.fatigue)>0) CRUD.updateData("fatigue","condition",parseInt(stat.fatigue)-1,stat.name)
                .then( console.log(stat.name + ".fatigue : " + stat.fatigue)  ) ;
                //10분에 포만감 1 감소
                if(timeCnt==9 && parseInt(stat.energy)>1) CRUD.updateData("energy","condition",parseInt(stat.energy)-1,stat.name)
                .then( console.log(stat.name + ".energy : " + stat.energy)  ) ;
                //(배가 부르면) 1분에 컨디션 1 증가
                if(parseInt(stat.energy)>30 && parseInt(stat.condition)<100) CRUD.updateData("condition","condition",parseInt(stat.condition)+1,stat.name)
                .then( console.log(stat.name + ".condition : " + stat.condition)  ) ;
            }
            
        });
    })
    //컨디션이 떨어지는 경우 : 포만감 50% 이하에서 1분에 1 감소
    //피로도가 올라가는 경우 : 깨어 있는 상태에서 10분에 1 상승
    //수면 상태 : 피로도 1분에 1 감소/포만감 10분에 1 감소/컨디션 1분에 1 상승
    
});

//라우터
app.get('/', router.main);

//ajax 컨트롤러
app.post('/ajax', ajax.controller);

//#endregion