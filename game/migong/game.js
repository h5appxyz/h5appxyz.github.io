/**
 * Created by gong on 2014/9/3.
 */
loop=false;//全局控制


player_x=10;
player_y=10;
player_w=20;
player_h=20;

player_last_x=player_x;
player_last_y=player_y;

player_step=1;
fps=1000/512;

function player_save(){
    player_last_x=player_x;
    player_last_y=player_y;
}
function player_to_left(){
    if(loop){
        player_save();
        player_x-=player_step;
        if(player_x<=0){
            player_x=0;
        }
    }
    player()
}
function player_to_right(){
    if(loop){
        player_save();
        player_x+=player_step;
        if(player_x>=canvas_width-player_w){
            player_x=canvas_width-player_w;
        }
    }
    player()
}
function player_to_up(){
    if(loop){
        player_save();
        player_y-=player_step;
        if(player_y<=0){
            player_y=0;
        }
    }
    player()
}
function player_to_down(){
    if(loop){
        player_save();
        player_y+=player_step;
        if(player_y>=canvas_height-player_h){
            player_y=canvas_height-player_h;
        }
    }
    player()
}
function player_to_back(){

        //回到原来的地点
        player_x=player_last_x;
        player_y=player_last_y;
    loop=true;

    
}
function player(){
    
    //
        
        checking();
    //
}
function printTime(){
    c.font="30px Georgia";
    c.fillText(time,100,30);
}

function printBG(){
    c.drawImage(bg_print,0,0,300,387);
}
function printBG_check(){
    c.drawImage(bg_check,0,0,300,387);
}
function welcome(){
    //隐藏正在载入的div
    document.getElementById("loading").style.display="none";
    //显示欢迎页div
    document.getElementById("welcome").style.display="block";
}
function success(){
    loop=false;
    document.getElementById("success").style.display="block";
    document.title="我"+time+"秒就让月饼回到家了，你行吗？";
    document.getElementById("msg_success").innerHTML=document.title;
}
function gameover(){
    loop=false;
    document.getElementById("gameover").style.display="block";
    document.title="我在第"+time+"秒挂掉了，没有让月饼回到家，好桑心。。。";
    document.getElementById("msg_gameover").innerHTML=document.title;
}
function restart(){
    
    time=0;
    player_x=230;
    player_y=320;
    loop=true;
    
    //隐藏正在载入的div
    document.getElementById("loading").style.display="none";
    //欢迎页隐藏
    document.getElementById("welcome").style.display="none";
    //隐藏gameover的div
    document.getElementById("gameover").style.display="none";
    //隐藏success的div
    document.getElementById("success").style.display="none";
}
loadingResurcesNum=0;
//判断资源是否载入
function loadIsOk(){
    if(loadingResurcesNum==4){
        //已经载入 清除判断载入计时器
        clearInterval(loadInterval);
        //欢迎画面
        welcome();
    }
}
//载入资源
function loadingResurces(){
    player_img=new Image();
    player_check_img=new Image();
    bg_print=new Image();
    bg_check=new Image();
    player_img.onload = function() {
        loadingResurcesNum++;
        //
    }
    player_check_img.onload = function() {
        loadingResurcesNum++;
        document.getElementById("loading").innerHTML+="<br> player ok";
        //
        c.clearRect(0, 0,canvas_width,canvas_height);
        c.globalCompositeOperation = 'source-over';
        c.drawImage(player_check_img,player_x,player_y,player_w,player_h);
        player_data = c.getImageData(player_x,player_y,player_w,player_h).data;
        //
    }
    player_check_img.src="resoures/player_check.png";
    bg_print.onload = function() {
        loadingResurcesNum++;
        document.getElementById("loading").innerHTML+="<br> change ok";
    }
    bg_check.onload = function() {
        loadingResurcesNum++;
        document.getElementById("loading").innerHTML+="<br> yuebing ok";
    }
    document.getElementById("loading").innerHTML+="<br> loading player...";
    player_img.src="resoures/player.png";
    document.getElementById("loading").innerHTML+="<br> loading change...";
    bg_print.src="resoures/bg_print.png";
    document.getElementById("loading").innerHTML+="<br> loading yuebing...";
    bg_check.src="resoures/bg_check.png";
}
//初始化
function init(){
    time=0;
    //canvas_width=document.body.scrollWidth;
    //canvas_height=document.body.scrollHeight;
    //canvas_width=document.getElementById("loading").scrollWidth;
    //canvas_height=document.getElementById("loading").scrollHeight;
    canvas=document.getElementById("myCanvas");
    canvas_width = 300;
    canvas_height = 387;
    canvas.width=canvas_width;
    canvas.height=canvas_height;
    canvas.top = 0;
    canvas.left = 0;
    c = canvas.getContext('2d');
    //

    canvas.addEventListener('touchstart', function (e) {
        if(loop){
            var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
            startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
            //starty = parseInt(touchobj.clientY) // get x position of touch point relative to left edge of browser
            //statusdiv.innerHTML = 'Status: touchstart<br /> ClientX: ' + startx + 'px'
            e.preventDefault();
        }
    }, false);

    canvas.addEventListener('touchmove', function (e) {
        if(loop){
            var touchobj = e.changedTouches[0] // reference first touch point for this event
            var distX = parseInt(touchobj.clientX) - startx;
            //var distY = parseInt(touchobj.clientY) - starty;

            if (distX > 0) {
                player_to_right();
            }
            if (distX < 0) {
                player_to_left();
            }
            startx = parseInt(touchobj.clientX);
            /*
            if (distY > document.body.scrollWidth/3) {
                //gameCtrl.down();
            }
            if (distY < -document.body.scrollWidth/3) {
                //gameCtrl.up();
            }
            */
            //gameCtrl.player.x+=distX;
            //gameCtrl.player.y+=distY;
            //statusdiv.innerHTML = 'Status: touchmove<br /> Horizontal distance traveled: ' + dist + 'px'
            e.preventDefault();
        }
    }, false);

    canvas.addEventListener('touchend', function (e) {
        if(loop){
            var touchobj = e.changedTouches[0] // reference first touch point for this event
            //statusdiv.innerHTML = 'Status: touchend<br /> Resting x coordinate: ' + touchobj.clientX + 'px'
            e.preventDefault();
        }
    }, false);
    //载入资源
    loadingResurces();
    //判断资源是否已经载入
    loadInterval=setInterval(loadIsOk,1000);
}
setInterval(function(){
    time++;
},1000);
window.addEventListener("load",init,false);
document.addEventListener("keypress", function (e) {
    // body...
    var keyCode = 0;
    var e = e || window.event;
    keyCode = e.keyCode || e.which || e.charCode;
    //alert(keyCode);
    if(loop){
        if (keyCode == 109) {
            //w
        }
        if (keyCode == 115) {
            //s
            player_to_down();
            //showPlayer();
        }
        if (keyCode == 97) {
            //a
            player_to_left();
            //showPlayer();
        }
        if (keyCode == 100) {
            //d
            player_to_right();
            //showPlayer();
        }
        if (keyCode == 119) {
            //w
            player_to_up();
            //showPlayer();
        }
        if (keyCode == 32) {
            //fire
        }
    }
    //
}, false);

var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
function deviceMotionHandler(eventData){
        var acceleration = eventData.accelerationIncludingGravity;
        //document.querySelector("#msg").innerHTML=acceleration;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 100) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

            if (speed > SHAKE_THRESHOLD) {

                num++;

            }
            //document.querySelector("#msg").innerHTML=x;
            //重力感应
            last_x = parseInt(x);
            last_y = parseInt(y);
            last_z = parseInt(z);
        }
}
window.addEventListener("devicemotion",deviceMotionHandler,false);
function checking(){
    
    c.clearRect(0, 0,canvas_width,canvas_height);
    printBG_check();
    //以猪八戒为新的坐标获取data，对比原来的猪八戒图片，看像素是否重叠。
    var data = c.getImageData(player_x,player_y,player_w,player_h).data;
    //不每个像素都进行对比
    var step=0;

    for (var i = 3; i < data.length; i += 4) {
        if(loop){
            step++;
            //每1个像素进行对比 速度提升0倍
            if(step==1){
                //
                if (data[i]>0 && player_data[i] > 0) {
                    //遇到障碍物
                    if(data[i-3]==255 && data[i-2]==153 && data[i-1]==0){
                       //alert('yellow'); 
                        loop=false;
                        player_to_back();
                        console.log("yellow")
                        console.log(player_y);
                        console.log(player_last_y);
                        
                    }
                    //遇到红色（敌人）悬崖等
                    else if(data[i-3]==255 && data[i-2]==0 && data[i-1]==0){
                       gameover();
                        loop=false;
                        //#f00
                    }
                    //遇到蓝色  回家 闯关成功 下一个关卡
                    else if(data[i-3]==0 && data[i-2]==153 && data[i-1]==255){
                       //success();
                        //#f00
                        success();
                        loop=false;
                    }

                    break;
                }
                //
                step=0;
            }
        }

    }
    c.clearRect(0, 0,canvas_width,canvas_height);
    printBG();
    c.drawImage(player_img,player_x,player_y,player_w,player_h);
    printTime();
    
    //c.clearRect(0, 0,canvas_width,canvas_height);
}
function looping(){
    if(loop){
        //
        if(last_x>1){
            //left
            player_to_left();
        }
        if(last_x<-1){
            //right
            player_to_right();
        }
        if(last_y>1){
            //left
            player_to_down();
        }
        if(last_y<-1){
            //right
            player_to_up();
        }
        //
        //c.clearRect(0, 0, canvas_width, canvas_height);
        printBG();
        player();
        printTime();
        //checking();
    }
}
setInterval(looping,fps);
