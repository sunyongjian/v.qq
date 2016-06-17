/**
 * Created by Sunyongjian on 2016/5/18.
 */
~function () {
    /* 搜索框*/
    (function searchInput() {
        var search_ipt=utils.getElementsByClass("search_ipt")[0];
        var smartBox=utils.getElementsByClass("mod_smartbox")[0];
        var reg=/^(| +)$/;
        search_ipt.onfocus=search_ipt.onkeyup=function (e) {
            e=e||window.event;
            if(this.value==this.defaultValue){
                this.value="";
            }
            smartBox.style.display=reg.test(this.value)?"none":"block";
        };
        document.body.onclick=function (e) {
            e=e||window.event;
            e.target=e.target||e.srcElement;

            if(e.target!=search_ipt){
                smartBox.style.display="none";
            }
            if(e.target.tagName.toUpperCase()=="LI"&&e.target.parentNode.id=="sgt_list"){
                search_ipt.value=e.target.innerHTML;
            }
    }
    })()

    /*导航栏*/
    var nav=document.getElementById("nav_main");

    ~function navChange() {
        var f=0;
        var list=nav.getElementsByTagName("li");
        var divs=utils.getElementsByClass("navigation_sub",nav);
        var cur=null;
        nav.onmouseover=function (e) {
            e=e||window.event;
            e.target=e.target||e.srcElement;
            if(e.target.parentNode.tagName.toUpperCase()=="LI"&&e.target.parentNode.className=="list_item"){
                cur=utils.next(e.target);
                detailFn.call(e.target.parentNode);
                e.preventDefault();
            }
        };
        nav.onmouseleave=function () {
            f=0;
            utils.addClass(cur,"selectSub");
            utils.css(cur,{height:44,opacity:1});
            setTimeout(function () {
                animate(cur,{height:0,opacity:0},500,function () {
                    utils.removeClass(cur,"selectSub");
                    utils.css(cur,{height:44,opacity:1});
                })
            },800);
        };
        for(var i=0;i<list.length;i++){
            (function (i) {
                list[i].onmouseleave=function () {
                    utils.removeClass(divs[i],"selectSub");
                }
            })(i)
        }
        function detailFn() {
            for(var i=0;i<list.length;i++){
                if(list[i]==this){
                        if(!f){
                            utils.css(divs[i],{height:0,opacity:0});
                            animate(divs[i],{opacity:1,height:44},1000);
                            utils.addClass(divs[i],"selectSub");
                            f++;
                        }
                        else {
                            utils.addClass(divs[i],"selectSub");
                        }
                }
            }
        }
    }();

    /*滚动条滚动*/
    var headLogo=utils.getElementsByClass("head_logo")[0];
    var winT=document.documentElement.scrollTop||document.body.scrollTop;
    var head=document.getElementById("head");

    window.onscroll=function () {

        var curWinT=(document.documentElement.scrollTop||document.body.scrollTop);
        if(winT<curWinT){
            $(nav).stop().animate({top:-54},50,"swing");
            $(headLogo).stop().animate({top:-110},50,"swing");
        }else{
            $(headLogo).stop().animate({top:0},50);
            $(nav).stop().animate({top:77},50);
        }
        winT=document.documentElement.scrollTop||document.body.scrollTop;

    };

    /*数据绑定*/

    var jsonBanner=null;
    (function () {
       var xhr=new XMLHttpRequest();
        xhr.open('get','jsonBanner.txt',false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&/^2\d{2}/.test(xhr.status)){
                jsonBanner=utils.jsonParse(xhr.responseText);
                console.log(jsonBanner)
            }
        }
        xhr.send(null)
    })()


    /*轮播图*/
    ~(function () {
        var site_focus=document.getElementById("site_focus");
        var focus_img_come=document.getElementById("focus_img_come");
        var focus_img_prev=document.getElementById("focus_img_prev");
        var focus_tips_inner=document.getElementById("focus_tips_inner");
        var list=focus_tips_inner.getElementsByTagName("li");
        var btn_left=document.getElementById("btn_left");
        var btn_right=document.getElementById("btn_right");
        var prevS=sibling().pre;
        var nextS=sibling().nex;
        var step=0;
        function sibling() {
            var pre=[],nex=[];
            for(var i=0;i<list.length;i++){
                i>6?nex.unshift(list[i]):pre.push(list[i]);
            }
            return {pre:pre,nex:nex};
        }
        function changeTips() {
            focusOn();

        /*    if(step<6){
                if(!/list-item/.test(prevS[0].getAttribute("style"))){
                    for(var i=0;i<prevS.length;i++){
                        prevS[i].style.display="list-item";
                        nextS[i].style.display="none"
                    }
                }
            }
            if(step>6){
                if(/list-item/.test(prevS[0].getAttribute("style"))){
                    for(var i=0;i<prevS.length;i++){
                        prevS[i].style.display="none";
                        nextS[i].style.display="list-item"
                    }
                }
            }*/
            if(step>=14){
                step=0;
            }
            changeBanner();
            fadeIn();
            utils.addClass(list[step],"current");
            step++;
        }

        function focusOn() {
            for(var i=0;i<list.length;i++){
                if(step>=7){
                    list[i].style.display= i>6?"list-item":"none"
                }
                utils.removeClass(list[i],"current");
            }
            if(step>=14){
                for(var j=0;j<list.length;j++){
                    list[j].style.display= j>6?"none":"list-item"
                }
            }
        }
        function changeBanner() {
            for(var i=0;i<jsonBanner.length;i++){
                if(i==step){
                    /*if(step>=14){
                        focus_img_come.style.background="url("+jsonBanner[0].img+")";
                        return;
                    }*/
                    focus_img_come.style.background="url("+jsonBanner[i].img+")";
                  /*  if(step>=13){
                        focus_img_prev.style.background="url("+jsonBanner[0].img+")";
                        return;
                    }
                    focus_img_prev.style.background="url("+jsonBanner[i+1].img+")";*/
                }
            }
        }
        function fadeIn() {
            utils.css(focus_img_come,{opacity:0});
            animate(focus_img_come,{opacity:1},1500);
        }
      //  var Ftimer=window.setInterval(changeTips,3000);
        
        site_focus.onmouseover=function (e) {
           // clearInterval(Ftimer);
            e=e||window.event;
            var tar=e.target||e.srcElement,tarP=tar.parentNode.parentNode;
            if(tarP.tagName.toUpperCase()=="LI"){
              //  clearInterval(Ftimer);
                step=utils.index(tarP);
                changeTips();
            }
        }
        site_focus.onmouseleave=function () {
             //  Ftimer=window.setInterval(changeTips,3000)

        }

        btn_left.onclick=btn_right.onclick=function () {
           // clearTimeout(Ftimer);
            if(/list-item/.test(prevS[0].getAttribute("style"))){
                for(var i=0;i<prevS.length;i++){
                    prevS[i].style.display="none";
                    nextS[i].style.display="list-item"
                }
            }else {
                for(var i=0;i<prevS.length;i++){
                    nextS[i].style.display="none";
                    prevS[i].style.display="list-item"
                }
            }
        };


    })()

    /*小轮播图*/

    ~function () {
        var adList=document.getElementById("ad_list");
        var adList1=document.getElementById("ad_list1");
        var adList2=document.getElementById("ad_list2");
        var adList3=document.getElementById("ad_list3");
        function zIndexTabChange(ele){
            var lis=ele.getElementsByTagName("li");
            var items=utils.getElementsByClass("page_item",utils.next(ele));
            var step=0;
            window.setInterval(autoMove,3000);
            function autoMove() {
                step++;
                if(step>lis.length-1){
                    step=0;
                }
                change();
                select();
            }
            function change() {
                for(var i=0;i<lis.length;i++){
                    lis[i].style.zIndex=1;
                }
                lis[step].style.zIndex=2;
                animate(lis[step],{opacity:1},800,function () {
                    for(var i=0;i<lis.length;i++){
                        i!==step?utils.css(lis[i],"opacity",0):null;
                    }
                })
            }
            function select() {
                for(var i=0;i<items.length;i++){
                    i!==step?utils.removeClass(items[i],"current"):utils.addClass(items[i],"current");
                }
            }
        }
        zIndexTabChange(adList)
        zIndexTabChange(adList1)
        zIndexTabChange(adList2)
        zIndexTabChange(adList3)
    }()
  


    /*推拉门*/


~function () {
    function pushPull(ele){
        var list=ele.getElementsByTagName("li");

        var li1=list[0],li2=list[1],li3=list[2],li4=list[3],li5=list[4];
        ele.onmouseover=function (e) {
            if(e.target.parentNode.parentNode.parentNode ==li1){
                animate(li1,{width:992},1000);
            }
            if(e.target.parentNode.parentNode.parentNode ==li2){
                animate(ele,{left:-248},1000);
                animate(li2,{width:992},1000);
            }
            if(e.target.parentNode.parentNode.parentNode ==li3){
                animate(li3,{width:992},1000);
                animate(ele,{left:-496},1000)
            }
            if(e.target.parentNode.parentNode.parentNode ==li4){
                animate(ele,{left:-744},1000);
                animate(li4,{width:992},1000);
            }
            if(e.target.parentNode.parentNode.parentNode ==li5){
                animate(ele,{left:-744},1000);
                animate(li5,{width:992},1000);
            }
        };
        for(var i = 0; i<list.length;i++){
            list[i].onmouseleave=function (e) {
                if(e.target ==li1){
                    animate(li1,{width:248},1000);
                }
                if(e.target ==li2){
                    animate(ele,{left:0},1000);
                    animate(li2,{width:248},1000);
                }
                if(e.target ==li3){
                    animate(li3,{width:248},1000);
                    animate(ele,{left:0},1000);
                }
                if(e.target ==li4){
                    animate(ele,{left:0},1000);
                    animate(li4,{width:248},1000);
                }
                if(e.target ==li5){
                    animate(ele,{left:0},1000);
                    animate(li5,{width:248},1000);
                }
            }
        }
    }

    var inner=document.getElementById("inner");
    pushPull(inner);
    var inner1=document.getElementById("inner1");
    pushPull(inner1);
    var inner2=document.getElementById("inner2");
    pushPull(inner2);
    var inner3=document.getElementById("inner3");
    pushPull(inner3);
}()

    /*回到顶部*/
    $("#back-to-top").click(function(){
        $('body,html').animate({scrollTop:0}, 500);
        return false;
    });


}();