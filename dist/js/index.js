//滑入滑出
var prev = $1('.first_prev');
var next = $1('.first_next');
var list = $1('.first_inner_list')
var showIndex = 0;
prev.onclick = function(){
    showIndex--
    next.style.background = '#e2c199'
    if(showIndex <= 0){
        showIndex = 0
        prev.style.background = '#e7e2d7'
    }
    animate(list,{
        scrollLeft:1200 * showIndex,
        speed:500,
    })
}
next.onclick = function(){
    showIndex++
    prev.style.background = '#e2c199'
    if(showIndex >= 3){
        showIndex = 3
        next.style.background = '#e7e2d7'
    }
    animate(list,{
        scrollLeft:1200 * showIndex,
        speed:500,
    })
}