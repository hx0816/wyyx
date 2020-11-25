"use strict";

//获取元素
var tLogin = $1('.title_login');
var mask = $1('#mask');
var login = $1('#login');
var close = $1('#login .close');
var pLogin = $1('#login .phone'); //手机登录

var eLogin = $1('#login .email'); //邮箱登录

var vLogin = $1('#login .verify'); //验证码登录

var pInner = $1('.phone_login'); //手机登录内容

var eInner = $1('.email_login'); //邮箱登录内容

var vInner = $1('.verify_login'); //密码验证登录内容

var pIpt = $1('.phone_login input'); //输入手机号

var getYzm = $1('.getverify button'); //获取验证码按钮

var yzmVal = $1('.getverify input'); //获取验证码值

var hint = $1('.login_hint'); //提示

var slide = $1('#login .slide'); //滑块

var _short = $1('.shortcut-login'); //快速登录


var consent = $1('.consent input'); //条款
//点击登录/注册弹出界面

tLogin.onclick = function () {
  mask.style.display = 'block';
  login.style.display = 'block';
  consent.checked = true;
}; //点x关闭


close.onclick = function () {
  mask.style.display = 'none';
  login.style.display = 'none';
}; //手机登录


pLogin.onclick = function () {
  pInner.style.display = 'block';
  vLogin.style.display = 'block';
  eInner.style.display = 'none';
  vInner.style.display = 'none';
}; //邮箱登录


eLogin.onclick = function () {
  pInner.style.display = 'none';
  vLogin.style.display = 'none';
  eInner.style.marginTop = '50px';
  eInner.style.display = 'block';
  vInner.style.display = 'none';
};

var i = 0; //验证码登录

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

  i++;
}; //获取验证码


getYzm.onclick = function () {
  var val = pIpt.value;
  var reg = /1[3-8]\d{9}/g;

  if (val == '') {
    hint.style.display = 'block';
    hint.children[1].innerText = '请输入手机号';
  } else if (reg.test(val)) {
    hint.style.display = 'block';
    hint.children[1].innerText = '请先拖动滑块进行安全验证';
  } else {
    hint.style.display = 'block';
    hint.children[1].innerText = '手机号格式错误';
  }
}; //拖动滑块


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
        l = 0;
      } else if (l >= maxL) {
        l = maxL;
      }

      slide.style.left = l + 'px';
      slide.previousElementSibling.style.width = l + 'px';
      slide.previousElementSibling.style.border = '1px solid #1991fa';
      slide.previousElementSibling.style.background = '#d1e9fe';
      slide.nextElementSibling.innerText = '';
      slide.style.color = 'white';
      slide.style.background = '#1991fa';

      document.onmouseup = function () {
        if (l >= maxL) {
          //成功
          setTimeout(function () {
            slide.previousElementSibling.style.border = '1px solid #52ccba';
            slide.previousElementSibling.style.background = '#d2f4ef';
            slide.style.background = '#52ccba';
            slide.innerText = '√';
            hint.style.display = 'none';

            document.onmousedown = function () {
              slide.onmouseover = null;
              this.onmousemove = null;
            };

            document.onmouseup = function () {
              slide.onmouseover = null;
              this.onmousemove = null;
            };
          }, 1000);

          getYzm.onclick = function () {
            var val = pIpt.value;
            var reg = /1[3-8]\d{9}/g;

            if (val == '') {
              hint.style.display = 'block';
              hint.children[1].innerText = '请输入手机号';
            } else if (reg.test(val)) {
              var i = 30;
              getYzm.innerText = i + '秒后重发';
              var timer = setInterval(function () {
                i--;

                if (i <= 0) {
                  getYzm.innerText = '获取验证码';
                  clearInterval(timer);
                }

                getYzm.innerText = i + '秒后重发';
                getYzm.onclick = null;
              }, 1000);
              var reg1 = /\d{4}/;
            } else {
              hint.style.display = 'block';
              hint.children[1].innerText = '手机号格式错误';
            }
          };

          return;
        } else {
          document.onmousemove = null;
          setTimeout(function () {
            slide.previousElementSibling.style.border = '1px solid #f57a7a';
            slide.previousElementSibling.style.background = '#fce1e1';
            slide.style.background = '#f57a7a';
            slide.innerText = 'x';
            slide.style.color = 'white';
            setTimeout(function () {
              slide.style.left = 0;
              slide.previousElementSibling.style.border = 'none';
              slide.previousElementSibling.style.background = '#fff';
              slide.style.background = '#fff';
              slide.innerText = '→';
              slide.style.color = '#333';
            }, 1000);
          }, 1000);
        }
      };
    };
  };
}; //点击快速登录


_short.onclick = function () {
  var val = pIpt.value;
  var reg = /1[3-8]\d{9}/g;
  var reg1 = /\d{4}/;

  if (val == '') {
    hint.style.display = 'block';
    hint.children[1].innerText = '请输入手机号';
  } else if (reg.test(val)) {
    if (yzmVal.value == '') {
      hint.style.display = 'block';
      hint.children[1].innerText = '请输入短信验证码';
    } else if (reg1.test(yzmVal.value)) {
      hint.style.display = 'block';
      hint.children[1].innerText = '登录成功';
    }
  } else {
    hint.style.display = 'block';
    hint.children[1].innerText = '手机号格式错误';
  }
};