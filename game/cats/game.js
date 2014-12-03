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
        shareLink="http://www.dobezoo.com/games/cats/";
        shareTitle=document.title;
        //shareIcon="http://"+window.location.host+"/res/logo.png";
        shareIcon="http://www.dobezoo.com/games/cats/res/icon.jpg";
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
    shareTitle="我一共认出"+num+"种猫咪！";
    document.querySelector("#msg").innerHTML=outmsg;
    document.querySelector("#you_win_image").style.display="none";
    document.querySelector("#game_over_image").style.display="none";
    if(num==all){
        shareTitle="我认出了全部的猫咪！";
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
      "name": "你认识多少种猫？",
      "title": "你认识多少种猫？",
      "description": "你认识多少种猫？",
      "version": "1.0",
      "designer": "",
      "editor": "",
      "author": "",
      "copyright": "dobeZoo",
      "faces": [
          {"face":"阿比西尼亚猫","names":[{"name":"阿比西尼亚猫","value":1},{"name":"埃及猫","value":0},{"name":"奥西猫","value":0},{"name":"巴厘猫","value":0}]},
          {"face":"埃及猫","names":[{"name":"埃及猫","value":1},{"name":"奥西猫","value":0},{"name":"巴厘猫","value":0},{"name":"波米拉猫","value":0}]},
          {"face":"奥西猫","names":[{"name":"奥西猫","value":1},{"name":"巴厘猫","value":0},{"name":"波米拉猫","value":0},{"name":"挪威森林猫","value":0}]},
          {"face":"巴厘猫","names":[{"name":"巴厘猫","value":1},{"name":"波米拉猫","value":0},{"name":"德文卷毛猫","value":0},{"name":"中国狸花猫","value":0}]},
          {"face":"波米拉猫","names":[{"name":"波米拉猫","value":1},{"name":"波斯猫","value":0},{"name":"布偶猫","value":0},{"name":"缅因猫","value":0}]},
          {"face":"波斯猫","names":[{"name":"波斯猫","value":1},{"name":"伯曼猫","value":0},{"name":"东方猫","value":0},{"name":"美国短毛猫","value":0}]},
          {"face":"伯曼猫","names":[{"name":"伯曼猫","value":1},{"name":"土耳其梵猫","value":0},{"name":"美国短尾猫","value":0},{"name":"呵叻猫","value":0}]},
          {"face":"布偶猫","names":[{"name":"布偶猫","value":1},{"name":"德文卷毛猫","value":0},{"name":"英国短毛猫","value":0},{"name":"英国短毛猫","value":0}]},
          {"face":"德文卷毛猫","names":[{"name":"德文卷毛猫","value":1},{"name":"东方猫","value":0},{"name":"索马里猫","value":0},{"name":"苏格兰折耳猫","value":0}]},
          {"face":"东方猫","names":[{"name":"东方猫","value":1},{"name":"东奇尼猫","value":0},{"name":"英国短毛猫","value":0},{"name":"波米拉猫","value":0}]},
          {"face":"东奇尼猫","names":[{"name":"东奇尼猫","value":1},{"name":"俄罗斯蓝猫","value":0},{"name":"哈瓦那棕猫","value":0},{"name":"波斯猫","value":0}]},
          {"face":"俄罗斯蓝猫","names":[{"name":"俄罗斯蓝猫","value":1},{"name":"哈瓦那棕猫","value":0},{"name":"土耳其梵猫","value":0},{"name":"波米拉猫","value":0}]},
          {"face":"哈瓦那棕猫","names":[{"name":"哈瓦那棕猫","value":1},{"name":"美国短尾猫","value":0},{"name":"斯芬克斯猫","value":0},{"name":"德文卷毛猫","value":0}]},
          {"face":"呵叻猫","names":[{"name":"呵叻猫","value":1},{"name":"孟买猫","value":0},{"name":"波斯猫","value":0},{"name":"阿比西尼亚猫","value":0}]},
          {"face":"美国短尾猫","names":[{"name":"美国短尾猫","value":1},{"name":"日本短尾猫","value":0},{"name":"东奇尼猫","value":0},{"name":"土耳其梵猫","value":0}]},
          {"face":"孟买猫","names":[{"name":"孟买猫","value":1},{"name":"西伯利亚森林猫","value":0},{"name":"土耳其梵猫","value":0},{"name":"中国狸花猫","value":0}]},
          {"face":"缅甸猫","names":[{"name":"缅甸猫","value":1},{"name":"缅因猫","value":0},{"name":"德文卷毛猫","value":0},{"name":"索马里猫","value":0}]},
          {"face":"缅因猫","names":[{"name":"缅因猫","value":1},{"name":"英国短毛猫","value":0},{"name":"波斯猫","value":0},{"name":"东方猫","value":0}]},
          {"face":"挪威森林猫","names":[{"name":"挪威森林猫","value":1},{"name":"日本短尾猫","value":0},{"name":"俄罗斯蓝猫","value":0},{"name":"德文卷毛猫","value":0}]},
          {"face":"日本短尾猫","names":[{"name":"日本短尾猫","value":1},{"name":"土耳其梵猫","value":0},{"name":"英国短毛猫","value":0},{"name":"东方猫","value":0}]},
          {"face":"斯芬克斯猫","names":[{"name":"斯芬克斯猫","value":1},{"name":"英国短毛猫","value":0},{"name":"缅因猫","value":0},{"name":"哈瓦那棕猫","value":0}]},
          {"face":"苏格兰折耳猫","names":[{"name":"苏格兰折耳猫","value":1},{"name":"索马里猫","value":0},{"name":"俄罗斯蓝猫","value":0},{"name":"奥西猫","value":0}]},
          {"face":"土耳其梵猫","names":[{"name":"土耳其梵猫","value":1},{"name":"孟买猫","value":0},{"name":"波米拉猫","value":0},{"name":"中国狸花猫","value":0}]},
          {"face":"索马里猫","names":[{"name":"索马里猫","value":1},{"name":"日本短尾猫","value":0},{"name":"奥西猫","value":0},{"name":"美国短尾猫","value":0}]},
          {"face":"西伯利亚森林猫","names":[{"name":"西伯利亚森林猫","value":1},{"name":"哈瓦那棕猫","value":0},{"name":"阿比西尼亚猫","value":0},{"name":"埃及猫","value":0}]},
          {"face":"新加坡猫","names":[{"name":"新加坡猫","value":1},{"name":"索马里猫","value":0},{"name":"缅因猫","value":0},{"name":"阿比西尼亚猫","value":0}]},
          {"face":"英国短毛猫","names":[{"name":"英国短毛猫","value":1},{"name":"中国狸花猫","value":0},{"name":"东方猫","value":0},{"name":"俄罗斯蓝猫","value":0}]},
          {"face":"中国狸花猫","names":[{"name":"中国狸花猫","value":1},{"name":"美国卷毛猫","value":0},{"name":"英国短毛猫","value":0},{"name":"德文卷毛猫","value":0}]},
          {"face":"美国卷毛猫","names":[{"name":"美国卷毛猫","value":1},{"name":"英国短毛猫","value":0},{"name":"中国狸花猫","value":0},{"name":"新加坡猫","value":0}]}
      ],
      "msg":[
          {"from":0,"to":5,"msg":"你个菜鸟，就认识这么几个啊!"},
          {"from":6,"to":10,"msg":"呵呵，你看所有的猫咪都一样啊？"},
          {"from":11,"to":20,"msg":"不错哇，你认识这么多的猫啊！"},
          {"from":20,"to":36,"msg":"哎呦！这么厉害，你是宠物店老板吧！"},
          {"from":36,"to":36,"msg":"靠，你肯定是兽医！兽医！"}
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