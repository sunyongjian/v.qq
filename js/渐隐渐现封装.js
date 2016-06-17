/**
 * Created by Sunyongjian on 2016/5/24.
 */

function zIndexTabChange(ele){
    var lis=ele.getElementsByTagName("li");
    var items=utils.getElementsByClass("page_item",utils.next(ele));
    var step=0;
    
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