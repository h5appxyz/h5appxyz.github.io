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
                "desc": "传媒一百单八将，你认识几个？",
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
                "desc": "传媒一百单八将，你认识几个？",
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
    shareTitle="我一共认出"+num+"个媒体人！";
    document.querySelector("#msg").innerHTML=outmsg;
    document.querySelector("#you_win_image").style.display="none";
    document.querySelector("#game_over_image").style.display="none";
    if(num==all){
        shareTitle="我认出了全部的媒体人！";
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
      "name": "传媒一百单八将，你认识几个？",
      "title": "传媒一百单八将，你认识几个？",
      "description": "传媒一百单八将，你认识几个？",
      "version": "1.0",
      "designer": "记者站",
      "editor": "逗比工作室",
      "author": "记者站",
      "copyright": "逗比工作室",
      "faces": [
          /*
          state:
          0:排号中
          1:等待飞行器
          2:已经会去了
          */
          {"face":"白岩松","names":[{"name":"李咏","value":0},{"name":"崔永元","value":0},{"name":"白岩松","value":1},{"name":"撒贝宁","value":0}]},
          {"face":"蔡方华","names":[{"name":"蔡方华","value":1},{"name":"戴自更","value":0},{"name":"陈彤","value":0},{"name":"何力","value":0}]},
          {"face":"曹林","names":[{"name":"梁文道","value":0},{"name":"曹林","value":1},{"name":"方三文","value":0},{"name":"邱兵","value":0}]},
          {"face":"柴静","names":[{"name":"陈菊红","value":0},{"name":"杨澜","value":0},{"name":"柴静","value":1},{"name":"张泉灵","value":0}]},
          {"face":"陈宝成","names":[{"name":"王克勤","value":0},{"name":"陈宝成","value":1},{"name":"曹林","value":0},{"name":"马昌博","value":0}]},
          {"face":"陈朝华","names":[{"name":"陈朝华","value":1},{"name":"苗炜","value":0},{"name":"封新城","value":0},{"name":"陈彤","value":0}]},
          {"face":"陈菊红","names":[{"name":"王跃春","value":0},{"name":"陈菊红","value":1},{"name":"南香红","value":0},{"name":"江艺平","value":0}]},
          {"face":"陈彤","names":[{"name":"曹国伟","value":0},{"name":"陈彤","value":1},{"name":"李学凌","value":0},{"name":"罗永浩","value":0}]},
          {"face":"程益中","names":[{"name":"程益中","value":1},{"name":"喻华峰","value":0},{"name":"李承鹏","value":0},{"name":"李海鹏","value":0}]},
          {"face":"迟宇宙","names":[{"name":"崔永元","value":0},{"name":"迟宇宙","value":1},{"name":"单士兵","value":0},{"name":"白岩松","value":0}]},
          {"face":"仇子明","names":[{"name":"仇子明","value":1},{"name":"邓飞","value":0},{"name":"喻华峰","value":0},{"name":"方三文","value":0}]},
          {"face":"崔永元","names":[{"name":"高晓松","value":0},{"name":"赵本山","value":0},{"name":"崔永元","value":1},{"name":"方舟子","value":0}]},
          {"face":"戴自更","names":[{"name":"杨斌","value":0},{"name":"戴自更","value":1},{"name":"高晓松","value":0},{"name":"程益中","value":0}]},
          {"face":"单士兵","names":[{"name":"单士兵","value":1},{"name":"胡赳赳","value":0},{"name":"贺延光","value":0},{"name":"韩福东","value":0}]},
          {"face":"邓飞","names":[{"name":"牛文文","value":0},{"name":"邓飞","value":1},{"name":"黄章晋","value":0},{"name":"龚晓跃","value":0}]},
          {"face":"丁时照","names":[{"name":"丁时照","value":1},{"name":"韩福东","value":0},{"name":"郭国松","value":0},{"name":"贺延光","value":0}]},
          {"face":"范卫锋","names":[{"name":"胡一虎","value":0},{"name":"范卫锋","value":1},{"name":"黎瑞刚","value":0},{"name":"李海鹏","value":0}]},
          {"face":"方三文","names":[{"name":"方文山","value":0},{"name":"李海华","value":0},{"name":"方三文","value":1},{"name":"李学凌","value":0}]},
          {"face":"高海浩","names":[{"name":"高海浩","value":1},{"name":"李德林","value":0},{"name":"陈彤","value":0},{"name":"梁文道","value":0}]},
          {"face":"高昱","names":[{"name":"李海鹏","value":0},{"name":"邓飞","value":0},{"name":"高昱","value":1},{"name":"喻华峰","value":0}]},
          {"face":"龚曙光","names":[{"name":"龚曙光","value":1},{"name":"罗振宇","value":0},{"name":"刘万永","value":0},{"name":"石扉客","value":0}]},
          {"face":"龚晓跃","names":[{"name":" 魏寒枫","value":0},{"name":"龚晓跃","value":1},{"name":"张路","value":0},{"name":"李承鹏","value":0}]},
          {"face":"郭国松","names":[{"name":"郭国松","value":1},{"name":"郭振玺","value":0},{"name":"王海涛","value":0},{"name":"简光洲","value":0}]},
          {"face":"韩福东","names":[{"name":"王星","value":0},{"name":"庄树雄","value":0},{"name":"韩福东","value":1},{"name":"李月刚","value":0}]},
          {"face":"何力","names":[{"name":"何力","value":1},{"name":"何刚","value":0},{"name":"水皮","value":0},{"name":"秦朔","value":0}]},
          {"face":"贺延光","names":[{"name":"解海龙","value":0},{"name":"郭铁流","value":0},{"name":"贺延光","value":1},{"name":"谢子明","value":0}]},
          {"face":"洪晃","names":[{"name":"李多钰","value":0},{"name":"曾子墨","value":0},{"name":"洪晃","value":1},{"name":"苏芒","value":0}]},
          {"face":"胡赳赳","names":[{"name":"陈鸣","value":0},{"name":"胡赳赳","value":1},{"name":"谭人玮","value":0},{"name":"王星","value":0}]},
          {"face":"胡舒立","names":[{"name":"胡舒立","value":1},{"name":"洪晃","value":0},{"name":"王跃春","value":0},{"name":"陈菊红","value":0}]},
          {"face":"胡锡进","names":[{"name":"王文","value":0},{"name":"胡锡进","value":1},{"name":"单仁平","value":0},{"name":"孔庆东","value":0}]},
          {"face":"胡勋璧","names":[{"name":"胡勋璧","value":1},{"name":"韩福东","value":0},{"name":"胡锡进","value":0},{"name":"陈朝华","value":0}]},
          {"face":"胡一虎","names":[{"name":"胡一虎","value":1},{"name":"窦文涛","value":0},{"name":"董嘉耀","value":0},{"name":"尉迟琳嘉","value":0}]},
          {"face":"胡展奋","names":[{"name":"陈鸣","value":0},{"name":"胡展奋","value":1},{"name":"胡赳赳","value":0},{"name":"徐克明","value":0}]},
          {"face":"黄章晋","names":[{"name":"黄章晋","value":1},{"name":"何雄飞","value":0},{"name":"五岳散人","value":0},{"name":"邓飞","value":0}]},
          {"face":"简光洲","names":[{"name":"左志坚","value":0},{"name":"杨潇","value":0},{"name":"简光洲","value":1},{"name":"权义","value":0}]},
          {"face":"江艺平","names":[{"name":"蒋方舟","value":0},{"name":"胡舒立","value":0},{"name":"江艺平","value":1},{"name":"闾丘露薇","value":0}]},
          {"face":"蒋方舟","names":[{"name":"张寒","value":0},{"name":"周凯丽","value":0},{"name":"蒋方舟","value":1},{"name":"章泽天","value":0}]},
          {"face":"黎瑞刚","names":[{"name":"田明","value":0},{"name":"简光洲","value":0},{"name":"黎瑞刚","value":1},{"name":"王天鹰","value":0}]},
          {"face":"李承鹏","names":[{"name":"董路","value":0},{"name":"张路","value":0},{"name":"李承鹏","value":1},{"name":"李大眼","value":0}]},
          {"face":"李德林","names":[{"name":"马昌博","value":0},{"name":"柴会群","value":0},{"name":"李德林","value":1},{"name":"李楠","value":0}]},
          {"face":"李海鹏","names":[{"name":"李承鹏","value":0},{"name":"黄永明","value":0},{"name":"李海鹏","value":1},{"name":"陈一鸣","value":0}]},
          {"face":"李岷","names":[{"name":"鄢烈山","value":0},{"name":"褚朝新","value":0},{"name":"李岷","value":1},{"name":"李铁","value":0}]},
          {"face":"连清川","names":[{"name":"连岳","value":0},{"name":"黄章晋","value":0},{"name":"连清川","value":1},{"name":"王小山","value":0}]},
          {"face":"梁文道","names":[{"name":"窦文涛","value":0},{"name":"杨锦麟","value":0},{"name":"梁文道","value":1},{"name":"罗振宇","value":0}]},
          {"face":"林楚方","names":[{"name":"马昌博","value":0},{"name":"林楚方","value":1},{"name":"傅剑锋","value":0},{"name":"方可成","value":0}]},
          {"face":"林天宏","names":[{"name":"林天宏","value":1},{"name":"林楚方","value":0},{"name":"唐为忠","value":0},{"name":"陈小川","value":0}]},
          {"face":"林治波","names":[{"name":"林楚方","value":0},{"name":"孔庆东","value":0},{"name":"胡锡进","value":0},{"name":"林治波","value":1}]},
          {"face":"凌华薇","names":[{"name":"柴静","value":0},{"name":"张燕","value":0},{"name":"凌华薇","value":1},{"name":"胡紫薇","value":0}]},
          {"face":"刘炳路","names":[{"name":"刘万永","value":0},{"name":"刘炳路","value":1},{"name":"田科武","value":0},{"name":"罗昌平","value":0}]},
          {"face":"刘长乐","names":[{"name":"刘春","value":0},{"name":"符新才","value":0},{"name":"刘长乐","value":1},{"name":"张长明","value":0}]},
          {"face":"刘春","names":[{"name":"刘春","value":1},{"name":"高群书","value":0},{"name":"孔二狗","value":0},{"name":"陈彤","value":0}]},
          {"face":"刘东华","names":[{"name":"牛文文","value":0},{"name":"刘鹤","value":0},{"name":"刘东华","value":1},{"name":"李德林","value":0}]},
          {"face":"刘虎","names":[{"name":"胡一虎","value":0},{"name":"刘虎","value":1},{"name":"郑直","value":0},{"name":"刘炳路","value":0}]},
          {"face":"刘坚","names":[{"name":"李铁","value":0},{"name":"高海浩","value":0},{"name":"刘坚","value":1},{"name":"张国庆","value":0}]},
          {"face":"刘万永","names":[{"name":"鄢烈山","value":0},{"name":"石述思","value":0},{"name":"刘万永","value":1},{"name":"高明勇","value":0}]},
          //{"face":"刘洲伟","names":[{"name":"庄慎之","value":0},{"name":"沈颢","value":0},{"name":"刘洲伟","value":1}1{"name":"程益中","value":0}]},
          {"face":"龙志","names":[{"name":"龙志","value":1},{"name":"牛文文","value":0},{"name":"苗炜","value":1},{"name":"罗振宇","value":0}]},
          {"face":"许知远","names":[{"name":"许知远","value":1},{"name":"牛文文","value":0},{"name":"梁文道","value":1},{"name":"罗振宇","value":0}]},
          {"face":"陈鲁豫","names":[{"name":"胡舒立","value":0},{"name":"陈鲁豫","value":1},{"name":"许戈辉","value":0},{"name":"吴小莉","value":0}]},
          {"face":"闾丘露薇","names":[{"name":"闾丘露薇","value":1},{"name":"南香红","value":0},{"name":"柴静","value":0},{"name":"杨澜","value":0}]},
          {"face":"罗昌平","names":[{"name":"封新城","value":0},{"name":"鄢烈山","value":0},{"name":"罗昌平","value":1},{"name":"刘铁男","value":0}]},
          {"face":"罗振宇","names":[{"name":"罗永浩","value":0},{"name":"傅剑锋","value":0},{"name":"罗振宇","value":1},{"name":"申音","value":0}]},
          {"face":"马昌博","names":[{"name":"马昌博","value":1},{"name":"林天宏","value":0},{"name":"林楚方","value":0},{"name":"邱兵","value":0}]},
          {"face":"苗炜","names":[{"name":"谭人玮","value":0},{"name":"苗炜","value":1},{"name":"宋金波","value":0},{"name":"王小峰","value":0}]},
          {"face":"南香红","names":[{"name":"刘瑜","value":0},{"name":"陈菊红","value":0},{"name":"南香红","value":1},{"name":"王跃春","value":0}]},
          {"face":"牛文文","names":[{"name":"牛文文","value":1},{"name":"刘春","value":0},{"name":"李想","value":0},{"name":"刘东华","value":0}]},
          {"face":"欧阳常林","names":[{"name":"尉迟琳嘉","value":0},{"name":"欧阳常林","value":1},{"name":"欧阳智薇","value":0},{"name":"刘长乐","value":0}]},
          {"face":"欧阳夏丹","names":[{"name":"欧阳智薇","value":0},{"name":"欧阳夏丹","value":1},{"name":"海霞","value":0},{"name":"李梓萌","value":0}]},
          {"face":"秦朔","names":[{"name":"邱兵","value":0},{"name":"秦朔","value":1},{"name":"裘新","value":0},{"name":"王朔","value":0}]},
          {"face":"邱兵","names":[{"name":"简光洲","value":0},{"name":"邱兵","value":1},{"name":"戴自更","value":0},{"name":"吴海民","value":0}]},
          {"face":"邱启明","names":[{"name":"赵普","value":0},{"name":"邱启明","value":1},{"name":"王凯","value":0},{"name":"郎永淳","value":0}]},
          {"face":"裘新","names":[{"name":"邱兵","value":0},{"name":"龚晓岳","value":0},{"name":"裘新","value":1},{"name":"李钊","value":0}]},
          {"face":"沈颢","names":[{"name":"左志坚","value":0},{"name":"许知远","value":0},{"name":"沈颢","value":1},{"name":"周斌","value":0}]},
          {"face":"十年砍柴","names":[{"name":"十年砍柴","value":1},{"name":"五岳散人","value":0},{"name":"马伯庸","value":1},{"name":"方舟子","value":0}]},
          {"face":"石扉客","names":[{"name":"李海鹏","value":0},{"name":"石扉客","value":1},{"name":"石述思","value":0},{"name":"马昌博","value":0}]},
          {"face":"石述思","names":[{"name":"杨海鹏","value":0},{"name":"石扉客","value":0},{"name":"十年砍柴","value":0},{"name":"石述思","value":1}]},
          {"face":"时寒冰","names":[{"name":"刘英才","value":0},{"name":"吴佩华","value":0},{"name":"时寒冰","value":1},{"name":"时评梅","value":0}]},
          {"face":"水均益","names":[{"name":"白岩松","value":0},{"name":"水均益","value":1},{"name":"胡一虎","value":0},{"name":"芮成钢","value":0}]},
          {"face":"水皮","names":[{"name":"郭志坚","value":0},{"name":"俞力严","value":0},{"name":"水皮","value":1},{"name":"秦朔","value":0}]},
          {"face":"宋石男","names":[{"name":"李晨","value":0},{"name":"宋石男","value":1},{"name":"王海","value":0},{"name":"徐显强","value":0}]},
          {"face":"孙冕","names":[{"name":"裘新","value":0},{"name":"杨锦麟","value":0},{"name":"孙冕","value":1},{"name":"封新城","value":0}]},
          {"face":"王和岩","names":[{"name":"闾丘露薇","value":0},{"name":"王和岩","value":1},{"name":"朱柳笛","value":0},{"name":"陈中小路","value":0}]},
          {"face":"王克勤","names":[{"name":"罗昌平","value":0},{"name":"陈峰","value":0},{"name":"王克勤","value":1},{"name":"杨江","value":0}]},
          {"face":"王天定","names":[{"name":"李铁","value":0},{"name":"裘新","value":0},{"name":"王天定","value":1},{"name":"罗昌平","value":0}]},
          {"face":"王志安","names":[{"name":"张志安","value":0},{"name":"王志","value":0},{"name":"王志安","value":1},{"name":"胡锡进","value":0}]},
          {"face":"魏武挥","names":[{"name":"魏武挥","value":1},{"name":"石扉客","value":0},{"name":"王克勤","value":0},{"name":"石述思","value":0}]},
          {"face":"五岳散人","names":[{"name":"水皮","value":0},{"name":"五岳散人","value":1},{"name":"杨锦麟","value":0},{"name":"宋石男","value":0}]},
          {"face":"向熹","names":[{"name":"左方","value":0},{"name":"向熹","value":1},{"name":"孙冕","value":0},{"name":"沈颢","value":0}]},
          {"face":"徐达内","names":[{"name":"高晓松","value":0},{"name":"徐达内","value":1},{"name":"罗振宇","value":0},{"name":"王海涛","value":0}]},
          {"face":"徐沪生","names":[{"name":"王沪宁","value":0},{"name":"徐沪生","value":1},{"name":"时寒冰","value":0},{"name":"宋石男","value":0}]},
          {"face":"杨江","names":[{"name":"王克勤","value":0},{"name":"王志安","value":0},{"name":"杨江","value":1},{"name":"魏武挥","value":0}]},
          {"face":"杨锦麟","names":[{"name":"曹景行","value":0},{"name":"胡一虎","value":0},{"name":"杨锦麟","value":1},{"name":"窦文涛","value":0}]},
          {"face":"杨燕青","names":[{"name":"张泉灵","value":0},{"name":"胡舒立","value":0},{"name":"杨燕青","value":1},{"name":"柴静","value":0}]},
          {"face":"叶檀","names":[{"name":"孔璞","value":0},{"name":"胡舒立","value":0},{"name":"柴静","value":0},{"name":"叶檀","value":1}]},
          {"face":"喻华峰","names":[{"name":"杨斌","value":0},{"name":"喻华峰","value":1},{"name":"戴自更","value":0},{"name":"褚时健","value":0}]},
          {"face":"张建星","names":[{"name":"朱坤","value":0},{"name":"张建星","value":1},{"name":"杨江","value":0},{"name":"徐沪生","value":0}]},
          {"face":"张力奋","names":[{"name":"何伟","value":0},{"name":"魏寒枫","value":0},{"name":"张力奋","value":1},{"name":"刘长乐","value":0}]},
          {"face":"张泉灵","names":[{"name":"杨澜","value":0},{"name":"王小丫","value":0},{"name":"张泉灵","value":1},{"name":"春妮","value":0}]},
          {"face":"赵何娟","names":[{"name":"胡舒立","value":0},{"name":"柴静","value":0},{"name":"赵何娟","value":1},{"name":"陈中小路","value":0}]},
          {"face":"周可","names":[{"name":"封新城","value":0},{"name":"周可","value":1},{"name":"朱大可","value":0},{"name":"蒋方舟","value":0}]},
          {"face":"周智琛","names":[{"name":"徐达内","value":0},{"name":"周智琛","value":1},{"name":"鲁智深","value":0},{"name":"左志坚","value":0}]},
          {"face":"杨锦麟","names":[{"name":"刘长乐","value":0},{"name":"胡一虎","value":0},{"name":"杨锦麟","value":1},{"name":"窦文涛","value":0}]},
          {"face":"朱德付","names":[{"name":"张德付","value":0},{"name":"朱德付","value":1},{"name":"朱学东","value":1},{"name":"李德林","value":0}]},
          {"face":"朱伟","names":[{"name":"李伟","value":0},{"name":"何伟","value":0},{"name":"朱伟","value":1},{"name":"卓伟","value":0}]},
          {"face":"朱学东","names":[{"name":"朱学东","value":1},{"name":"时寒冰","value":0},{"name":"罗振宇","value":0},{"name":"林天宏","value":0}]},
          {"face":"庄慎之","names":[{"name":"庄慎之","value":1},{"name":"柳斌杰","value":0},{"name":"龙志","value":0},{"name":"罗昌平","value":0}]},
          {"face":"庄雅婷","names":[{"name":"闾丘露薇","value":0},{"name":"柴静","value":0},{"name":"庄雅婷","value":1},{"name":"张泉灵","value":0}]},
          {"face":"卓伟","names":[{"name":"李伟","value":0},{"name":"朱伟","value":0},{"name":"卓伟","value":1},{"name":"何伟","value":0}]},
          {"face":"杨澜","names":[{"name":"陈鲁豫","value":0},{"name":"杨澜","value":1},{"name":"江艺平","value":0},{"name":"闾丘露薇","value":0}]}
      ],
      "msg":[
          {"from":0,"to":20,"msg":"菜鸟，先从端茶倒水做起吧，实习生也是很有前途滴！"},
          {"from":21,"to":40,"msg":"骚年，积累人脉很重要，勇敢地上演逆袭吧！"},
          {"from":41,"to":60,"msg":"少侠，你在业内混得不错，建议转型去做公关！"},
          {"from":61,"to":80,"msg":"这位大虾，作为圈里的老油条，你还没加薪提干呐？"},
          {"from":81,"to":108,"msg":"祖师爷，失敬失敬，你认识的媒体人连起来可以绕地球一圈！"}
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