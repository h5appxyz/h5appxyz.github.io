/**
 * Created by g on 2014/11/21.
 */
loop=false;
time=16;
v=0;
seatop=0;
step=0;
function __game_start(){
    time=0;
    v=-1;
    seatop=50;
    step=0.1;
    loop=true;
}
function __game_over(){
    loop=false;
    document.querySelector("#game_over_msg").innerHTML="我解救了小鱼"+time+"秒";
    shareTitle="我解救了小鱼"+time+"秒，但是小鱼还是因为缺水而挂掉了。。。";
    __canvas_to_over_page();
}
function __game_win(){
    loop=false;
    document.querySelector("#game_win_msg").innerHTML="我"+time+"秒就成功把小鱼解救了！";
    shareTitle="我"+time+"秒就成功把小鱼解救了！";
    __canvas_to_win_page();
}
function __next(){

}
function game_bind(){
    document.querySelector("#canvas_page").addEventListener("touchstart",function(){
        if(loop){
            seatop-=5;
            document.querySelector("#game_sea").style.top=seatop+"%";
            if(seatop<0){
               __game_win();
            }
        }
    });
    __init_wx();
}
function gamelooping(){
    if(loop){
        seatop+=step;
        document.querySelector("#game_sea").style.top=seatop+"%";
        if(seatop>100){
            __game_over();
        }
    }
}
function timing(){
    if(loop){
        step+=0.1;
        time++;
        document.querySelector("#time").innerHTML=time;
    }
}
/*
var start = null;
function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    gamelooping();
    if (progress < 100) {
        window.requestAnimationFrame(step);
    }
}
window.requestAnimationFrame(step);
 */
setInterval(gamelooping,1000/16);
setInterval(timing,1000);
function __init_wx(){
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        shareLink="http://www.dobezoo.com/games/fish";
        shareTitle=document.title;
        shareDesc="";
        shareIcon="http://www.dobezoo.com/games/fish/game/fish.png";
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "img_url":shareIcon,
                "img_width": "100",
                "img_height": "100",
                "link": shareLink,
                "desc": shareDesc,
                "title": shareTitle
            }, function (res) {
                __share_to_welcome_page();
                _report('send_msg', res.err_msg);

            })
        });
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url":shareIcon,
                "img_width": "100",
                "img_height": "100",
                "link": shareLink,
                "desc": shareDesc,
                "title": shareTitle
            }, function (res) {
                __share_to_welcome_page();
                _report('timeline', res.err_msg);
                document.location.reload();
            });
        });
    });
    //
}