/*
author cssbird
www.cssbird.com
2014-11-17
last update 2014-11-19
*/
function ___processStateChange() {
    if (req.readyState == 4) { // Complete
        if (req.status == 200) {  // OK response
            document.getElementById("titles").innerHTML = req.responseText;
        }else{
            alert("Problem: " + req.statusText);
        }
    }
}
function __loadJson(){
    req = new XMLHttpRequest();
    req.onreadystatechange = ___processStateChange;
    try {
        req.open("GET", "data.json", true);
    }catch (e) {
        alert(e);
    }
    req.send(null);
}
//
function __init_wx(){
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        shareLink="http://www.dobezoo.com/games/birds/";
        shareTitle=document.title;
        //shareIcon="http://"+window.location.host+"/res/logo.png";
        shareIcon="http://www.dobezoo.com/games/birds/res/icon.jpg";
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url":shareIcon,
                "img_width": "100",
                "img_height": "100",
                "link": shareLink,
                "desc": "",
                "title": shareTitle
            }, function (res) {
                ___welcome();
                _report('send_msg', res.err_msg);
                
            })
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url":shareIcon,
                "img_width": "100",
                "img_height": "100",
                "link": shareLink,
                "desc": "",
                "title": shareTitle
            }, function (res) {
                ___welcome();
                _report('timeline', res.err_msg);
                document.location.reload();
            });
        });
    }); 
    //           
}
//
function __page_hide(){
    var pages=document.querySelectorAll(".page");
    for(i=0;i<pages.length;i++){
        pages[i].style.display="none";
    }
}
function _welcome(){
    __page_hide();
    document.querySelector("#welcome").style.display="block";
}
function _____check(obj){
    loop=false;
    var value=obj.getAttribute("value");
    if(value==1){
        var g=document.querySelector("#getmans").innerHTML;
        g=parseInt(g);
        g++;
        document.querySelector("#getmans").innerHTML=g;
        ____next();
    }else{
        ___gameover();
        
    }
}
function ____next(){
    _v_time=16;
    loop=true;
    document.querySelector("#names").innerHTML="";
    document.querySelector("#facepan").innerHTML='';
    if(data.faces.length>0){
        var index=Math.floor(Math.random()*data.faces.length);
        var facesrc="face/"+data.faces[index].face+".jpg";
        var img=document.createElement("img");
        img.src=facesrc;
        document.querySelector("#facepan").appendChild(img);
        var arr=data.faces[index].names;
        function randomsort(a,b) {
            return Math.random()>0.5?-1:1;
            //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
        }
        arr=arr.sort(randomsort);
        for(i=0;i<arr.length;i++){
            console.log(arr[i]);
            //
            var facename=document.createElement("div");
            facename.setAttribute("class","name");
            facename.setAttribute("value",arr[i].value);
            facename.addEventListener("touchstart",function(){
                _____check(this);
            });
            facename.innerHTML=arr[i].name;
            document.querySelector("#names").appendChild(facename);
            //
        }
        data.faces.splice(index,1);
        
    }else{
        ___gameover();
    }
}
function ___welcome(){
    __page_hide();
    document.querySelector("#welcome").style.display="block";
}
function ___restart(){
    __data_init();
    __page_hide();
    document.querySelector("#getmans").innerHTML=0;
    document.querySelector("#canvas").style.display="block";
    _v_time=16;
    document.querySelector("#time").innerHTML=_v_time;
    loop=true;
    ____next();
}
function ___share(){
    __page_hide()
    document.querySelector("#share").style.display="block";
}
function ___gameover(){
    __page_hide();
    var num=document.querySelector("#getmans").innerHTML;
    num=parseInt(num);
    var outmsg="";
    for(i=0;i<data.msg.length;i++){
        if(num>=data.msg[i].from && num<=data.msg[i].to){
            outmsg=data.msg[i].msg;
        }
    }
    shareTitle="我一共认出"+num+"种鸟！";
    document.querySelector("#msg").innerHTML=outmsg;
    document.querySelector("#you_win_image").style.display="none";
    document.querySelector("#game_over_image").style.display="none";
    if(num==all){
        shareTitle="我认出了所有的鸟！";
        document.querySelector("#you_win_image").style.display="block";
    }else{
        document.querySelector("#game_over_image").style.display="block";
    }
    document.querySelector("#gameover").style.display="block";
}
function __bind(){
    document.querySelector("#share_button").addEventListener("touchstart",___share,false);
    document.querySelector("#restart_button").addEventListener("touchstart",___restart,false);
    document.querySelector("#start_button").addEventListener("touchstart",___restart,false);
}
function __data_init(){
  
  data={
      "manifest_version": 2,
      "name": "你认识多少种鸟？",
      "title": "你认识多少种鸟？",
      "description": "你认识多少种鸟？",
      "version": "1.0",
      "designer": "",
      "editor": "",
      "author": "",
      "copyright": "dobeZoo",
      "faces": [
          {"face":"鹌鹑","names":[{"name":"鹌鹑","value":1},{"name":"大肚鸟","value":0},{"name":"小头鸟","value":0},{"name":"印第安鸟","value":0}]},
          {"face":"火鸡","names":[{"name":"火鸡","value":1},{"name":"黑孔雀","value":0},{"name":"红脖鸟","value":0},{"name":"土鸵鸟","value":0}]},
          {"face":"巨嘴鸟","names":[{"name":"巨嘴鸟","value":1},{"name":"啄木鸟","value":0},{"name":"黄嘴鸟","value":0},{"name":"墨西哥鸟","value":0}]},
          {"face":"老鹰","names":[{"name":"老鹰","value":1},{"name":"白头翁","value":0},{"name":"中华雕","value":0},{"name":"渡鸦","value":0}]},
          {"face":"麻雀","names":[{"name":"麻雀","value":1},{"name":"鹌鹑","value":0},{"name":"鸳鸯","value":0},{"name":"夜莺","value":0}]},
          {"face":"秃鹫","names":[{"name":"秃鹫","value":1},{"name":"红脸鹰","value":0},{"name":"中华雕","value":0},{"name":"鸵鸟","value":0}]},
          {"face":"鸵鸟","names":[{"name":"鸵鸟","value":1},{"name":"秃鹫","value":0},{"name":"长腿鸟","value":0},{"name":"烈火鸟","value":0}]},
          {"face":"乌鸦","names":[{"name":"乌鸦","value":1},{"name":"黑鸟","value":0},{"name":"喜鹊","value":0},{"name":"老鹰","value":0}]},
          {"face":"喜鹊","names":[{"name":"喜鹊","value":1},{"name":"乌鸦","value":0},{"name":"白肚鸟","value":0},{"name":"黑尾鹰","value":0}]},
          {"face":"啄木鸟","names":[{"name":"啄木鸟","value":1},{"name":"鸭头鸟","value":0},{"name":"鸡冠鸟","value":0},{"name":"彩色鹦鹉","value":0}]},
          {"face":"蜂鸟","names":[{"name":"蜂鸟","value":1},{"name":"绿头鸟","value":0},{"name":"玲珑鸟","value":0},{"name":"尖嘴鸟","value":0}]}
      ],
      "msg":[
          {"from":0,"to":2,"msg":"你个菜鸟，就认识这么几个啊!"},
          {"from":2,"to":5,"msg":"呵呵，你看所有的鸟都一样啊？"},
          {"from":5,"to":8,"msg":"不错哇，你认识这么多的鸟啊！"},
          {"from":8,"to":10,"msg":"哎呦！这么厉害，你是宠物店老板吧！"},
          {"from":11,"to":11,"msg":"靠，你肯定是兽医！兽医！"}
      ],
      "aboutUs": [
        "url","http://www.dobezoo.com/"
      ]
    }
  all=data.faces.length;
}
function _init(){
    //__loadJson()
    __data_init();
    oarr=data.mans;
    document.title=data.title;
    __init_wx();
    __bind();
    _welcome();
    loop=false;
    setInterval(function(){
        if(loop){
                _v_time--;
                document.querySelector("#time").innerHTML=_v_time;
                if(_v_time==0){
                    ___gameover();
                }
        }
    },1000);
}

window.addEventListener("load",_init,false);