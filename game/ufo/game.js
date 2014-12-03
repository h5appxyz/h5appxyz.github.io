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
        shareLink="http://zt.bjnews.com.cn/microMessager/game/ufo20141119/";
        shareTitle=document.title;
        //shareIcon="http://"+window.location.host+"/res/logo.png";
        shareIcon="http://zt.bjnews.com.cn/microMessager/game/ufo20141119/res/icon.png";
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url":shareIcon,
                "img_width": "100",
                "img_height": "100",
                "link": shareLink,
                "desc": "世界互联网大会召开，一大波IT大咖却被困火星，《新京报》带你去营救！",
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
                "desc": "世界互联网大会召开，一大波IT大咖却被困火星，《新京报》带你去营救！",
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
        //
        document.querySelector("#line_l").style.display="none";
        document.querySelector("#line_m").style.display="none";
        document.querySelector("#line_r").style.display="none";
        
        //
        var oclass=obj.getAttribute("class");
        if(oclass.indexOf("1")!=-1){
            document.querySelector("#line_l").style.display="block";
        }
        if(oclass.indexOf("2")!=-1){
            document.querySelector("#line_m").style.display="block";
        }
        if(oclass.indexOf("3")!=-1){
            document.querySelector("#line_r").style.display="block";
        }
        obj.setAttribute("class",oclass+"_fly");
        setTimeout(function(){
            var g=document.querySelector("#getmans").innerHTML;
            g=parseInt(g);
            g++;
            document.querySelector("#getmans").innerHTML=g;
            document.querySelector("#line_l").style.display="none";
            document.querySelector("#line_m").style.display="none";
            document.querySelector("#line_r").style.display="none";
            document.querySelector("#ufo").style.WebkitAnimation="ufo_go 2s ease-out 0s infinite";
            setTimeout(function(){
                ____next();
            },800);
        },200);
    }else{
        ___gameover();
        
    }
    //obj.setAttribute("class","man_1_fly");
}
function ____next(){
    _v_time=11;
    loop=true;
    document.querySelector("#mans").innerHTML="";
    document.querySelector("#ufopan").innerHTML='<div id="ufo"><p id="com"></p></div>';
    if(data.mans.length>0){
        var index=Math.floor(Math.random()*data.mans.length);
        document.querySelector("#com").innerHTML=data.mans[index].com;
        
        
        var arr=data.mans[index].names;
        function randomsort(a,b) {
            return Math.random()>0.5?-1:1;
            //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
        }
        arr=arr.sort(randomsort);
        for(i=0;i<arr.length;i++){
            console.log(arr[i]);
            //
            var man=document.createElement("div");
            man.setAttribute("class","man_"+(i+1));
            man.setAttribute("value",arr[i].value);
            man.addEventListener("touchstart",function(){
                _____check(this);
            });
            var span=document.createElement("span");
            span.innerHTML=arr[i].name;
            man.appendChild(span);
            man.style.backgroundImage="url(res/man.png),url(face/"+arr[i].name+".png)";
            if(arr[i].name=="马云"){
                man.style.backgroundImage="url(res/man.png),url(face/"+arr[i].name+i+".png)";
            }
            document.querySelector("#mans").appendChild(man);
            //
        }
        data.mans.splice(index,1);
        setTimeout(function(){
            document.querySelector("#ufo").style.WebkitAnimation="ufo 1s ease 0s infinite";
        },500);
        
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
    _v_time=11;
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
    shareTitle="我把"+num+"个IT大咖救回地球！不服你来！";
    document.querySelector("#msg").innerHTML=outmsg;
    document.querySelector("#you_win_image").style.display="none";
    document.querySelector("#game_over_image").style.display="none";
    if(num==all){
        shareTitle="我把所有IT大咖救回地球！不服你来！";
        document.querySelector("#you_win_image").style.display="block";
    }else{
        document.querySelector("#game_over_image").style.display="block";
    }
    document.querySelector("#gameover").style.display="block";
    document.querySelector("#app").innerHTML='<a id="download_button" href="http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.bjnews.newsroom&g_f=991653">下载新京报APP 看互联网大会直播</a>';
}
function __bind(){
    document.querySelector("#share_button").addEventListener("touchstart",___share,false);
    document.querySelector("#restart_button").addEventListener("touchstart",___restart,false);
    document.querySelector("#start_button").addEventListener("touchstart",___restart,false);
}
function __data_init(){
  
  data={
      "manifest_version": 2,
      "name": "IT大咖被困火星，新京报带你去营救！",
      "title": "IT大咖被困火星，新京报带你去营救！",
      "description": "世界互联网大会召开，一大波IT大咖却被困火星，《新京报》带你去营救！",
      "version": "1.0",
      "designer": "许英剑",
      "editor": "陈璐",
      "author": "宫文博",
      "copyright": "新京报新媒体",
      "mans": [
          /*
          state:
          0:排号中
          1:等待飞行器
          2:已经会去了
          */
          {"com":"腾讯","names":[{"name":"马化腾","value":1},{"name":"马云","value":0},{"name":"马布里","value":0}]},
          {"com":"阿里巴巴","names":[{"name":"马云","value":1},{"name":"马云","value":1},{"name":"马云","value":1}]},
          {"com":"百度","names":[{"name":"李泽楷","value":0},{"name":"李彦宏","value":1},{"name":"王力宏","value":0}]},
          {"com":"京东","names":[{"name":"罗永浩","value":0},{"name":"奶茶","value":0},{"name":"刘强东","value":1}]},
          {"com":"搜狐","names":[{"name":"陈羽凡","value":0},{"name":"张朝阳","value":1},{"name":"任志强","value":0}]},
          {"com":"奇虎360","names":[{"name":"周鸿祎","value":1},{"name":"周立波","value":0},{"name":"马化腾","value":0}]},
          {"com":"网易","names":[{"name":"张朝阳","value":0},{"name":"丁磊","value":1},{"name":"王中磊","value":0}]},
          {"com":"新浪","names":[{"name":"曹国伟","value":1},{"name":"丁磊","value":0},{"name":"陈彤","value":0}]},
          {"com":"58同城","names":[{"name":"姚劲波","value":1},{"name":"周立波","value":0},{"name":"吴秀波","value":0}]},
          {"com":"小米","names":[{"name":"刘强东","value":0},{"name":"雷军","value":1},{"name":"罗永浩","value":0}]},
          {"com":"猎豹","names":[{"name":"傅盛","value":1},{"name":"丁磊","value":0},{"name":"马化腾","value":0}]},
          {"com":"锤子","names":[{"name":"高晓松","value":0},{"name":"杜海涛","value":0},{"name":"罗永浩","value":1}]},
          {"com":"携程","names":[{"name":"周鸿祎","value":0},{"name":"范敏","value":1},{"name":"姚劲波","value":0}]},
          {"com":"facebook","names":[{"name":"扎克伯格","value":1},{"name":"库克","value":0},{"name":"盖茨","value":0}]},
          {"com":"盛大","names":[{"name":"马化腾","value":0},{"name":"陈天桥","value":1},{"name":"李彦宏","value":0}]},
          {"com":"谷歌","names":[{"name":"施密特","value":1},{"name":"乔布斯","value":0},{"name":"巴菲特","value":0}]},
          {"com":"苹果","names":[{"name":"盖茨","value":0},{"name":"库克","value":1},{"name":"扎克伯格","value":0}]},
          {"com":"去哪儿","names":[{"name":"姚劲波","value":0},{"name":"范敏","value":0},{"name":"庄辰超","value":1}]},
          {"com":"优酷土豆","names":[{"name":"古永锵","value":1},{"name":"曹国伟","value":0},{"name":"陈彤","value":0}]},
          {"com":"唯品会","names":[{"name":"陈欧","value":0},{"name":"雷军","value":0},{"name":"沈亚","value":1}]},
          {"com":"联想","names":[{"name":"杨元庆","value":1},{"name":"潘石屹","value":0},{"name":"李彦宏","value":0}]},
          {"com":"当当","names":[{"name":"刘强东","value":0},{"name":"李国庆","value":1},{"name":"杨元庆","value":0}]},
          {"com":"陌陌","names":[{"name":"唐岩","value":1},{"name":"李开复","value":0},{"name":"马化腾","value":0}]},
          {"com":"巨人网络","names":[{"name":"姚明","value":0},{"name":"任志强","value":0},{"name":"史玉柱","value":1}]},
          {"com":"亚马逊","names":[{"name":"贝佐斯","value":1},{"name":"张朝阳","value":0},{"name":"李开复","value":0}]},
          {"com":"凤凰网","names":[{"name":"曾毅","value":0},{"name":"玲花","value":0},{"name":"刘爽","value":1}]},
          {"com":"聚美优品","names":[{"name":"陈天桥","value":0},{"name":"陈彤","value":0},{"name":"陈欧","value":1}]},
          {"com":"爱奇艺","names":[{"name":"古永锵","value":0},{"name":"龚宇","value":1},{"name":"陈年","value":0}]},
          {"com":"hao123","names":[{"name":"李兴平","value":1},{"name":"雷军","value":0},{"name":"刘强东","value":0}]},
          {"com":"脸萌","names":[{"name":"乐嘉","value":0},{"name":"郭列","value":1},{"name":"罗永浩","value":0}]},
          {"com":"搜狗","names":[{"name":"王小川","value":1},{"name":"曹国伟","value":0},{"name":"潘石屹","value":0}]},
          {"com":"豆瓣","names":[{"name":"杨勃","value":1},{"name":"刘强东","value":0},{"name":"张朝阳","value":0}]},
          {"com":"知乎","names":[{"name":"任志强","value":0},{"name":"周源","value":1},{"name":"丁磊","value":0}]},
          {"com":"果壳","names":[{"name":"姬十三","value":1},{"name":"郭列","value":0},{"name":"李彦宏","value":0}]},
          {"com":"百合网","names":[{"name":"孟非","value":0},{"name":"乐嘉","value":0},{"name":"慕岩","value":1}]},
          {"com":"凡客诚品","names":[{"name":"陈年","value":1},{"name":"陈天桥","value":0},{"name":"陈彤","value":0}]}
      ],
      "msg":[
          {"from":0,"to":5,"msg":"你是只小菜鸟，快去看新京报制作的世界互联网大会会刊吧!"},
         {"from":6,"to":10,"msg":"呵呵，你已经超越菜鸟，是不是常读新京报啊？"},
         {"from":11,"to":20,"msg":"不错哇，你是不是也想做CEO呀！"},
         {"from":21,"to":35,"msg":"哎呦！这么厉害，马上就要成为人生大赢家了！"},
         {"from":36,"to":36,"msg":"恭喜你！救回了所有被困大咖！世界互联网大会该邀请你当嘉宾！"}
      ],
      "aboutUs": [
        "url","http://www.bjnews.com.cn/"
      ]
    }
  all=data.mans.length;
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