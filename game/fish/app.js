/**
 * Created by g on 2014/11/21.
 */
function __page_load(){
    document.querySelector("#wrap").setAttribute("class","load_page");
    document.querySelector("#loading_page").setAttribute("class","welcomekeyframe");
    document.querySelector("#logo").setAttribute("class","logokeyframe");
}
function __welcome_to_canvas_page(){
    document.querySelector("#wrap").setAttribute("class","welcome_to_canvas_page");
}
function __canvas_to_over_page(){
    document.querySelector("#wrap").setAttribute("class","canvas_to_over_page");
}
function __canvas_to_win_page(){
    document.querySelector("#wrap").setAttribute("class","canvas_to_win_page");
}
function __over_to_canvas_page(){
    document.querySelector("#wrap").setAttribute("class","over_to_canvas_page");
}
function __over_to_share_page(){
    document.querySelector("#wrap").setAttribute("class","over_to_share_page");
}
function __win_to_share_page(){
    document.querySelector("#wrap").setAttribute("class","win_to_share_page");
}
function __share_to_welcome_page(){
    document.querySelector("#wrap").setAttribute("class","share_to_welcome_page");
}
function __bint_clicks(){
    game_bind();
    document.querySelector("#start_button").addEventListener("click",function(){
        //start
        __game_start();
        __welcome_to_canvas_page();
    });
    document.querySelector("#restart_button").addEventListener("click",function(){
        //restart
        __game_start();
        __over_to_canvas_page();
    });
    document.querySelector("#share_button").addEventListener("click",function(){
        //share
        __over_to_share_page();
    });
    document.querySelector("#winshare_button").addEventListener("click",function(){
        //share
        __win_to_share_page();
    });

}
function init(){
    __page_load();
    __bint_clicks();
}
var start = null;
var element = document.getElementById("SomeElementYouWantToAnimate");
/*
function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    element.style.left = Math.min(progress/10, 200) + "px";
    if (progress < 2000) {
        window.requestAnimationFrame(step);
    }
}
window.requestAnimationFrame(step);
*/
window.addEventListener("load",init,false);