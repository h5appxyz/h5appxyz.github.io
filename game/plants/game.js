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
        shareLink="http://zt.bjnews.com.cn/microMessager/game/itdaka/";
        shareTitle=document.title;
        //shareIcon="http://"+window.location.host+"/res/logo.png";
        shareIcon="http://zt.bjnews.com.cn/microMessager/game/itdaka/res/who.jpg";
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url":shareIcon,
                "img_width": "100",
                "img_height": "100",
                "link": shareLink,
                "desc": "你认识多少个IT大咖呢？",
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
                "desc": "你认识多少个IT大咖呢？",
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
        var facesrc="face/"+data.faces[index].face+".png";
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
    shareTitle="我一共认出"+num+"个IT大咖！";
    document.querySelector("#msg").innerHTML=outmsg;
    document.querySelector("#you_win_image").style.display="none";
    document.querySelector("#game_over_image").style.display="none";
    if(num==all){
        shareTitle="我认出了全部的IT大咖！";
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
      "name": "你认识多少个IT大咖？",
      "title": "你认识多少个IT大咖？",
      "description": "你认识多少个IT大咖？",
      "version": "1.0",
      "designer": "许英剑",
      "editor": "陈璐",
      "author": "宫文博",
      "copyright": "新京报新媒体",
      "faces": [
          /*
          state:
          0:排号中
          1:等待飞行器
          2:已经会去了
          */
          {"face":"马化腾","names":[{"name":"马化腾","value":1},{"name":"马云","value":0},{"name":"马布里","value":0},{"name":"马布里","value":0}]},
          {"face":"马云0","names":[{"name":"马云","value":1},{"name":"马云","value":1},{"name":"马云","value":1},{"name":"马布里","value":0}]},
          {"face":"李彦宏","names":[{"name":"李泽楷","value":0},{"name":"李彦宏","value":1},{"name":"王力宏","value":0},{"name":"马布里","value":0}]},
          {"face":"刘强东","names":[{"name":"罗永浩","value":0},{"name":"奶茶","value":0},{"name":"刘强东","value":1},{"name":"马布里","value":0}]},
          {"face":"张朝阳","names":[{"name":"陈羽凡","value":0},{"name":"张朝阳","value":1},{"name":"任志强","value":0},{"name":"马布里","value":0}]},
          {"face":"周鸿祎","names":[{"name":"周鸿祎","value":1},{"name":"周立波","value":0},{"name":"马化腾","value":0},{"name":"马布里","value":0}]},
          {"face":"丁磊","names":[{"name":"张朝阳","value":0},{"name":"丁磊","value":1},{"name":"王中磊","value":0},{"name":"马布里","value":0}]},
          {"face":"曹国伟","names":[{"name":"曹国伟","value":1},{"name":"丁磊","value":0},{"name":"陈彤","value":0},{"name":"马布里","value":0}]},
          {"face":"姚劲波","names":[{"name":"姚劲波","value":1},{"name":"周立波","value":0},{"name":"吴秀波","value":0},{"name":"马布里","value":0}]},
          {"face":"雷军","names":[{"name":"刘强东","value":0},{"name":"雷军","value":1},{"name":"罗永浩","value":0},{"name":"马布里","value":0}]},
          {"face":"傅盛","names":[{"name":"傅盛","value":1},{"name":"丁磊","value":0},{"name":"马化腾","value":0},{"name":"马布里","value":0}]},
          {"face":"罗永浩","names":[{"name":"高晓松","value":0},{"name":"杜海涛","value":0},{"name":"罗永浩","value":1},{"name":"马布里","value":0}]},
          {"face":"范敏","names":[{"name":"周鸿祎","value":0},{"name":"范敏","value":1},{"name":"姚劲波","value":0},{"name":"马布里","value":0}]},
          {"face":"扎克伯格","names":[{"name":"扎克伯格","value":1},{"name":"库克","value":0},{"name":"盖茨","value":0},{"name":"马布里","value":0}]},
          {"face":"陈天桥","names":[{"name":"马化腾","value":0},{"name":"陈天桥","value":1},{"name":"李彦宏","value":0},{"name":"马布里","value":0}]},
          {"face":"施密特","names":[{"name":"施密特","value":1},{"name":"乔布斯","value":0},{"name":"巴菲特","value":0},{"name":"马布里","value":0}]},
          {"face":"库克","names":[{"name":"盖茨","value":0},{"name":"库克","value":1},{"name":"扎克伯格","value":0},{"name":"马布里","value":0}]},
          {"face":"庄辰超","names":[{"name":"姚劲波","value":0},{"name":"范敏","value":0},{"name":"庄辰超","value":1},{"name":"马布里","value":0}]},
          {"face":"古永锵","names":[{"name":"古永锵","value":1},{"name":"曹国伟","value":0},{"name":"陈彤","value":0},{"name":"马布里","value":0}]},
          {"face":"沈亚","names":[{"name":"陈欧","value":0},{"name":"雷军","value":0},{"name":"沈亚","value":1},{"name":"马布里","value":0}]},
          {"face":"杨元庆","names":[{"name":"杨元庆","value":1},{"name":"潘石屹","value":0},{"name":"李彦宏","value":0},{"name":"马布里","value":0}]},
          {"face":"李国庆","names":[{"name":"刘强东","value":0},{"name":"李国庆","value":1},{"name":"杨元庆","value":0},{"name":"马布里","value":0}]},
          {"face":"唐岩","names":[{"name":"唐岩","value":1},{"name":"李开复","value":0},{"name":"马化腾","value":0},{"name":"马布里","value":0}]},
          {"face":"史玉柱","names":[{"name":"姚明","value":0},{"name":"任志强","value":0},{"name":"史玉柱","value":1},{"name":"马布里","value":0}]},
          {"face":"贝佐斯","names":[{"name":"贝佐斯","value":1},{"name":"张朝阳","value":0},{"name":"李开复","value":0},{"name":"马布里","value":0}]},
          {"face":"刘爽","names":[{"name":"曾毅","value":0},{"name":"玲花","value":0},{"name":"刘爽","value":1},{"name":"马布里","value":0}]},
          {"face":"陈欧","names":[{"name":"陈天桥","value":0},{"name":"陈彤","value":0},{"name":"陈欧","value":1},{"name":"马布里","value":0}]},
          {"face":"龚宇","names":[{"name":"古永锵","value":0},{"name":"龚宇","value":1},{"name":"陈年","value":0},{"name":"马布里","value":0}]},
          {"face":"李兴平","names":[{"name":"李兴平","value":1},{"name":"雷军","value":0},{"name":"刘强东","value":0},{"name":"马布里","value":0}]},
          {"face":"郭列","names":[{"name":"乐嘉","value":0},{"name":"郭列","value":1},{"name":"罗永浩","value":0},{"name":"马布里","value":0}]},
          {"face":"王小川","names":[{"name":"王小川","value":1},{"name":"曹国伟","value":0},{"name":"潘石屹","value":0},{"name":"马布里","value":0}]},
          {"face":"杨勃","names":[{"name":"杨勃","value":1},{"name":"刘强东","value":0},{"name":"张朝阳","value":0},{"name":"马布里","value":0}]},
          {"face":"周源","names":[{"name":"任志强","value":0},{"name":"周源","value":1},{"name":"丁磊","value":0},{"name":"马布里","value":0}]},
          {"face":"姬十三","names":[{"name":"姬十三","value":1},{"name":"郭列","value":0},{"name":"李彦宏","value":0},{"name":"马布里","value":0}]},
          {"face":"慕岩","names":[{"name":"孟非","value":0},{"name":"乐嘉","value":0},{"name":"慕岩","value":1},{"name":"马布里","value":0}]},
          {"face":"陈年","names":[{"name":"陈年","value":1},{"name":"陈天桥","value":0},{"name":"陈彤","value":0},{"name":"马布里","value":0}]}
      ],
      "msg":[
          {"from":0,"to":5,"msg":"你个菜鸟，就认识这么几个人啊!"},
          {"from":6,"to":10,"msg":"呵呵，你是不是脸盲啊？"},
          {"from":11,"to":20,"msg":"不错哇，你是不是也想做CEO呀！"},
          {"from":20,"to":36,"msg":"哎呦！这么厉害，基本上大咖你都认识呀！"},
          {"from":36,"to":36,"msg":"靠，你是风投吧！这些人你竟然全认识！"}
      ],
      "aboutUs": [
        "url","http://www.bjnews.com.cn/"
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