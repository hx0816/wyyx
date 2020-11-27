//获取元素
var tLogin = $1('.title_login');
var mask = $1('#mask');
var login = $1('#login');
var close = $1('#login .close');
var zh = $1('.title_zh')//登录后的账号
var zhList = $1('.title_zh ul')//登录账号的下拉选项
var logout = $1('.logout a')//退出登录
var out = $1('#logout')//退出登录界面
var cel = $1('#logout .cancel')//取消退出
var con = $1('#logout .confirm')//确定退出
var pLogin = $1('#login .phone');//手机登录
var eLogin = $1('#login .email');//邮箱登录
var vLogin = $1('#login .verify');//验证码登录
var pInner = $1('.phone_login');//手机登录内容
var eInner = $1('.email_login');//邮箱登录内容
var vInner = $1('.verify_login');//密码验证登录内容
var pIpt = $1('.phone_login input');//输入手机号
var getYzm = $1('.getverify button');//获取验证码按钮
var yzmVal = $1('.getverify input');//获取验证码值
var eAccount = $1('.eAccount')//邮箱账号
var ePassword = $1('.ePassword')//邮箱账号
var hint = $1('.login_hint');//提示
var slide = $1('#login .slide')//滑块
var short = $1('.shortcut-login')//快速登录
var onLine = $1('.service_cen')//在线客服

// header头部
var hSearch = $1('.header_center_search input')




var consent = $1('.consent input')//条款
var goBack = $1('.service_btm');//返回顶部




//登录注册

//点击登录/注册弹出界面
tLogin.onclick = function () {
    loginAdd()
    phoneLogin()
}

//所有登录方式共用操作
function loginAdd() {
    mask.style.display = 'block';
    login.style.display = 'block';
    consent.checked = true;
    pIpt.value = getCookie('username')
    //点x关闭
    close.onclick = function () {
        mask.style.display = 'none';
        login.style.display = 'none';
    }
}
//手机登录
pLogin.onclick = function () {
    pInner.style.display = 'block';
    vLogin.style.display = 'block';
    eInner.style.display = 'none';
    vInner.style.display = 'none';
    short.innerText = '手机号快捷登录'
}
//邮箱登录
eLogin.onclick = function () {
    pInner.style.display = 'none';
    vLogin.style.display = 'none';
    eInner.style.marginTop = '50px';
    eInner.style.display = 'block';
    vInner.style.display = 'none';
    short.innerText = '登录'
}
var i = 0
//验证码登录
vLogin.onclick = function () {
    if (i % 2 == 0) {
        vInner.style.display = 'block';
        eInner.style.display = 'none';
        pInner.style.display = 'none';
        vLogin.innerText = '短信快捷登录';
    } else {
        pInner.style.display = 'block';
        vInner.style.display = 'none';
        vLogin.innerText = '使用密码验证登录';
    }
    i++
    short.innerText = '登录'
}

//手机号登录函数
function phoneLogin() {
    //获取验证码
    getYzm.onclick = function () {
        yzmVal.style.border = '1px solid white'
        var val = pIpt.value;
        var reg = /1[3-8]\d{9}/g;
        if (val == '') {
            hint.style.display = 'block';
            hint.children[1].innerText = '请输入手机号';
        } else if (reg.test(val)) {
            hint.style.display = 'block';
            hint.children[1].innerText = '请先拖动滑块进行安全验证'
        } else {
            hint.style.display = 'block';
            hint.children[1].innerText = '手机号格式错误';
        }
    }
    //拖动滑块
    slide.onmouseover = function () {
        slide.onmousedown = function (eve) {
            var e = eve || event;
            var x = e.offsetX;
            var y = e.offsetY;
            document.onmousemove = function (eve) {
                var e = eve || event;
                var l = e.pageX - 787 - x;
                var maxL = slide.parentNode.offsetWidth - slide.clientWidth;
                if (l <= 0) {
                    l = 0
                } else if (l >= maxL) {
                    l = maxL
                }
                slide.style.left = l + 'px';
                slide.previousElementSibling.style.width = l + 'px';
                slide.previousElementSibling.style.border = '1px solid #1991fa';
                slide.previousElementSibling.style.background = '#d1e9fe';
                slide.nextElementSibling.innerText = '';
                slide.style.color = 'white'
                slide.style.background = '#1991fa'
                document.onmouseup = function () {
                    if (l >= maxL) {//成功
                        setTimeout(() => {
                            slide.previousElementSibling.style.border = '1px solid #52ccba'
                            slide.previousElementSibling.style.background = '#d2f4ef'
                            slide.style.background = '#52ccba'
                            slide.innerText = '√'
                            hint.style.display = 'none'
                            document.onmousedown = function () {
                                slide.onmouseover = null;
                                this.onmousemove = null
                            }
                            document.onmouseup = function () {
                                slide.onmouseover = null;
                                this.onmousemove = null
                            }
                        }, 1000)
                        getYzm.onclick = function () {
                            var val = pIpt.value;
                            var reg = /1[3-8]\d{9}/g;
                            if (val == '') {
                                hint.style.display = 'block';
                                hint.children[1].innerText = '请输入手机号';
                            } else if (reg.test(val)) {
                                ajax({
                                    url: './json/test2.txt',
                                    type: 'get',
                                    dataType: 'json',
                                    success: function (json) {
                                        yzmVal.value = json
                                    }
                                })
                                var i = 30
                                getYzm.innerText = i + '秒后重发'
                                var timer = setInterval(() => {
                                    i--;
                                    if (i <= 0) {
                                        clearInterval(timer);
                                        getYzm.innerText = '获取验证码'
                                    }
                                    getYzm.innerText = i + '秒后重发'
                                    getYzm.onclick = null
                                }, 1000);
                                var reg1 = /\d{4}/
                            } else {
                                hint.style.display = 'block';
                                hint.children[1].innerText = '手机号格式错误';
                            }
                        }
                        return
                    } else {
                        document.onmousemove = null
                        setTimeout(() => {
                            slide.previousElementSibling.style.border = '1px solid #f57a7a'
                            slide.previousElementSibling.style.background = '#fce1e1'
                            slide.style.background = '#f57a7a'
                            slide.innerText = 'x'
                            slide.style.color = 'white'
                            setTimeout(() => {
                                slide.style.left = 0
                                slide.previousElementSibling.style.border = 'none'
                                slide.previousElementSibling.style.background = '#fff'
                                slide.style.background = '#fff'
                                slide.innerText = '→'
                                slide.style.color = '#333'
                            }, 1000)
                        }, 1000);
                    }
                }
            }
        }
    }
    //点击快速登录
    short.onclick = function () {
        var val = pIpt.value;
        var reg = /1[3-8]\d{9}/g;
        var reg1 = /\d{4}/
        if (val == '') {
            hint.style.display = 'block';
            hint.children[1].innerText = '请输入手机号';
        } else if (reg.test(val)) {
            if (yzmVal.value == '') {
                hint.style.display = 'block';
                hint.children[1].innerText = '请输入短信验证码'
                yzmVal.style.border = '1px solid red'
                yzmVal.onfocus = function () {
                    yzmVal.style.border = '1px solid white'
                    hint.style.display = 'none'
                }
            } else if (yzmVal.value === '1234') {
                //判断是否勾选条件条款
                conChecked()
            } else {
                hint.style.display = 'block';
                hint.children[1].innerText = '验证码错误'
            }
        } else {
            hint.style.display = 'block';
            hint.children[1].innerText = '手机号格式错误'
        }
    }
}

//邮箱登录函数

//登录后和退出
function conChecked() {
    if (consent.checked) {//登录成功
        mask.style.display = 'none'
        login.style.display = 'none'
        tLogin.children[0].innerText = '消息'
        setCookie({
            key: 'username',
            val: pIpt.value,
        })
        zh.children[0].innerText = getCookie('username')
        tLogin.onclick = null;
        onLine.onclick = null;
        zh.onmouseenter = function () {//显示账号下拉菜单
            zhList.style.display = 'block'
            //退出登录
            logout.onclick = function () {
                mask.style.display = 'block'
                out.style.display = 'block'
                cel.onclick = function () {//取消退出
                    mask.style.display = 'none'
                    out.style.display = 'none'
                }
                con.onclick = function () {//确定退出
                    mask.style.display = 'none'
                    out.style.display = 'none'
                    zh.style.display = 'none'
                    tLogin.children[0].innerText = '登录/注册'
                    location.reload()
                    tLogin.onclick = function () {
                        loginAdd()
                    }
                    onLine.onclick = function () {
                        loginAdd()
                    }

                }
            }
        }
        zh.onmouseleave = function () {
            zhList.style.display = 'none'
        }
    } else {
        hint.style.display = 'block';
        hint.children[1].innerText = '你必须同意相关的条款'
    }
}

//登录注册



//在线客服
onLine.onclick = function () {
    loginAdd()
}

//导航栏
var lis = $2('#nav li')
var showIndex = 0
for (var i = 0, len = lis.length; i < len; i++) {
    lis[i].index = i
    lis[i].onclick = function () {
        lis[showIndex].className = ''
        this.className = 'active'
        showIndex = this.index
    }
}

//下拉导航
var nav = $1('#nav2')
var lis1 = $2('#nav2 li')
var showIndex1 = 0
for (var i = 0, len = lis1.length; i < len; i++) {
    lis1[i].index = i
    lis1[i].onclick = function () {
        lis1[showIndex1].className = ''
        this.className = 'active'
        showIndex1 = this.index
    }
}

//滚动条滚动
var ser = $1('#service');
var hot = $1('.first_hot')
window.onscroll = function () {
    if (document.documentElement.scrollTop >= 153) {
        nav.style.display = 'block'
    } else if (document.documentElement.scrollTop < 153) {
        nav.style.display = 'none'
    }
    if (document.documentElement.scrollTop >= 567) {
        hot.style.position = 'fixed';
        hot.style.top = '60px';
        hot.style.left = '270px';
        ser.style.position = 'fixed';
        ser.style.top = '65px';
    } else if (document.documentElement.scrollTop < 567) {
        ser.style.position = 'absolute'
        ser.style.top = '620px'
        hot.style.position = 'absolute'
        hot.style.top = '23px'
        hot.style.left = '-136px'
    }
    if (document.documentElement.scrollTop >= 1000) {
        goBack.style.display = 'block'
    } else if (document.documentElement.scrollTop < 1000) {
        goBack.style.display = 'none'
    }
}

//返回顶部
goBack.onclick = function () {
    document.documentElement.scrollTop = 0
}



//header头部



hSearch.onkeydown = function () {
    ajax({
        url: 'https://you.163.com/xhr/search/searchAutoComplete.json',
        type: 'get',
        dataType: 'json',
        data: {
            'csrf_token': 'b0eb5b7ac0113691e90256ffa91c638d',
           ' keywordPrefix': hSearch.value,
        },
        success: function (json) {
            console.log(1);
        }
    })
}






//header头部



