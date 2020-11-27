//获取元素
var minBox = $1('.con_t');
var mask1 = $1('.con_mask');
var maxBox = $1('.con_glass')
var minImgs = $2('div[name=min]')
var maxImgs = $2('.con_glass div')
var small = $2('.con_menu a')
var showIndex = 0
for (var i = 0, len = small.length; i < len; i++){
    small[i].index = i
    small[i].onmouseenter = function(){
        minImgs[showIndex].className = ''
        maxImgs[showIndex].className = ''
        showIndex = this.index
        minImgs[showIndex].className = 'active'
        maxImgs[showIndex].className = 'active'
    }
}
//移入显示
minBox.onmouseenter = function(){
    mask1.style.display = 'block'
    maxBox.style.display = 'block'
}
// 移除隐藏
minBox.onmouseleave = function(){
    mask1.style.display = 'none'
    maxBox.style.display = 'none'
}
//放大镜
minBox.onmousemove = function(eve){
    //遮罩跟着移动
    var e = eve || event
    var maskLeft = e.clientX - offset(minBox).left - mask1.clientWidth/2
    var maskTop = e.clientY - offset(minBox).top - mask1.clientWidth/2 + document.documentElement.scrollTop
    //边界处理
    if(maskLeft < 0){
        maskLeft = 0
    }
    if(maskLeft >= minBox.clientWidth - mask1.clientWidth){
        maskLeft = minBox.clientWidth - mask1.clientWidth
    }
    if(maskTop < 0){
        maskTop = 0
    }
    if(maskTop >= minBox.clientWidth - mask1.clientWidth){
        maskTop = minBox.clientHeight - mask1.clientHeight
    }
    mask1.style.left = maskLeft +'px'
    mask1.style.top = maskTop +'px'
    //计算比例
    var scaleX = maskLeft / (minBox.clientWidth - mask1.clientWidth)
    var scaleY = maskTop / (minBox.clientHeight - mask1.clientHeight)
    //大图片移动
    maxImgs[showIndex].style.left = -scaleX * (maxImgs[showIndex].clientWidth - maxBox.clientWidth) + 'px'
    maxImgs[showIndex].style.top = -scaleY * (maxImgs[showIndex].clientHeight - maxBox.clientHeight) + 'px'
}
//
var ser = $1('#service');
window.onscroll = function(){
    if(document.documentElement.scrollTop >= 135){
        ser.style.position = 'fixed'
        ser.style.top = '60px'
    }else{
        ser.style.position = 'absolute'
        ser.style.top = '210px'
    }
    
}








