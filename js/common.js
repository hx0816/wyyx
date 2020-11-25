//头部

// require.config({
//     baseUrl:'../js',
//     paths:{
//         m1:'utils',
//         $:'jquery-1.8.3'
//     }
// })

//引入依赖模块
// require(['m1','$'],function(m1,$){
//     console.log(m1.name);
// })

function enterPhone() {
    lHint.style.display = 'block'
    lHint.children[1].innerText = '请输入手机号'
}
function lHint() {
    lHint.style.display = 'block'
    sLogin.style.marginTop = '25px'
}

//点击登录/注册按钮
var lp = $1('#lp');
var tLogin = $1('.title_login');
var mask = $1('#mask');
var login = $1('#login');
var lClose = $1('.close');//登录界面的X
var lPhone = $1('phone');//手机号登录
var lEmail = $1('email');//邮箱登录
var lSlide = $1('.slide');//滑块
var lSlideInner = $1('.slide span');//滑块符号
var lPz = $1('.puzzle'); //滑块整体
var plt = $1('.puzzle_text');//提示文字
var pli = $1('.puzzle_img');//验证图片
var sLogin = $1('.shortcut-login');//手机号快捷登录
var lBd = $1('.puzzle_bd');//滑块滑动后的路径
var lBtn = $1('.getverify button');//获取验证码
var lHint = $1('.login_hint')//验证提示
var lIpt = $1('.getverify input')//获取验证码
//点击弹出
tLogin.onclick = function (eve) {
    var e = eve || event;
    mask.style.display = 'block';
    login.style.display = 'block';
}
//点X关闭
lClose.onclick = function () {
    mask.style.display = 'none';
    login.style.display = 'none';
};
//拖拽滑块
lSlide.onmouseover = function (eve) {
    lSlide.onmousedown = function (eve) {
        var e = eve || event;
        var x = e.offsetX;
        var y = e.offsetY;
        document.onmousemove = function (eve) {
            var e = eve || event;
            var l = e.pageX - x - 797;
            var maxL = lPz.clientWidth - lSlide.offsetWidth;
            if (l <= 0) {
                l = 0;
            } else if (l >= maxL) {
                l = maxL;
            }
            lSlide.style.left = l + 'px';
            plt.innerText = '';
            document.onmouseup = function () {
                //判断滑块是否验证成功
                if (l >= maxL) {//成功
                    lSlideInner.innerText = '√';
                    lSlideInner.style.color = 'white';
                    lSlide.style.background = '#52ccba';
                    lSlide.style.border = '1px solid #52ccba';
                    lBd.style.width = l + lSlide.offsetWidth + 'px';
                    lBd.style.border = '1px solid #52ccba';
                    lSlide.onmousedown = null;
                    pli.style.display = 'none';
                    lHint.style.display = 'none';
                    //获取验证码
                    lBtn.onclick = function () {
                        var i = 30;
                        lBtn.innerText = i + ' 秒后重发';
                        var timer = setInterval(function () {
                            i--;
                            if (i <= 0) {
                                lBtn.innerText = '获取验证码';
                                clearInterval(timer)
                            }
                            lBtn.innerText = i + ' 秒后重发';
                        }, 1000)
                        setTimeout(function () {
                            lIpt.value = getRand(0, 9) + '' + getRand(0, 9) + '' + getRand(0, 9) + '' + getRand(0, 9) + ''
                        }, 5000)
                        return
                    }
                } else {//失败
                    lBd.style.width = l + lSlide.offsetWidth + 'px';
                    lBd.style.border = '1px solid #f57a7a';
                    lBd.style.background = '#fce1e1';
                    lSlide.style.border = 'none';
                    lSlide.style.background = '#f57a7a';
                    lSlide.style.color = 'white';
                    lSlideInner.innerText = 'x';
                    lHint()
                    lHint.children[1].innerText = '请先拖动滑块进行安全验证'
                    lBd.style.display = 'block'
                    setTimeout(function () {
                        lSlide.style.left = 0;
                        plt.innerText = '向右拖动滑块填充拼图';
                        lBd.style.width = 0
                        lBd.style.border = 'none'
                        lBd.style.background = '#fff'
                        lSlide.style.background = 'white';
                        lSlide.style.color = 'black';
                        lSlideInner.innerText = '→';
                        lSlide.style.border = '1px solid #dcdedf';
                        lBd.style.display = 'none'
                    }, 1000)
                }
                // document.onmousemove = null;
                // lBd.style.width = 0;
                // lBd.style.border = 'none';
                // lBd.style.background = '#fff';
                // lSlide.style.border = '1px solid #52ccba';
                // lSlide.style.background = '#f57a7a';
                // lSlide.style.color = '#333';
                // lSlideInner.innerText = '→';
            }
        }
    }
}
//获取验证码
lBtn.onclick = function () {
    if (lp.value = ' ') {
        enterPhone()
    } else {
        lHint()
    }
}
//手机号快捷登录
console.log(sLogin);
console.log(1);

sLogin.onclick = function(){
    if (lp.value = ' ') {
        enterPhone()
    }
}















//头部