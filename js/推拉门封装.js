/**
 * Created by Administrator on 2016/5/25.
 */

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
                animate(inner,{left:0},1000);
                animate(li2,{width:248},1000);
            }
            if(e.target ==li3){
                animate(li3,{width:248},1000);
                animate(inner,{left:0},1000);
            }
            if(e.target ==li4){
                animate(inner,{left:0},1000);
                animate(li4,{width:248},1000);
            }
            if(e.target ==li5){
                animate(inner,{left:0},1000);
                animate(li5,{width:248},1000);
            }
        }
    }
}
