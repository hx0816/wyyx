//判断—个任意—个数是否是素数
function isPrime(num) {
    if (num == 1) {//1不是素数
        return false
    }
    for (var i = 2; i < num; i++) {
        if (num % i == 0) {//不是素数
            return false
        }
    }
    return true//是素数
}
//绑定id
function $(idName) {
    return document.getElementById(idName);
}
//min-max之间的随机整数
function getRand(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}
//num位随机验证码
function getYZM(num) {
    var yzm = "";
    var rand;
    for (var i = 0; i < num; i++) {
        rand = getRand(48, 122)
        if (rand >= 58 && rand <= 64 || rand >= 91 && rand <= 96) {
            i++;
        } else {
            yzm += String.fromCharCode(rand)
        }
    }
    return yzm
}
//获取本地时间
function getLocalDate(date) {
    var y = date.getYear() + 1900;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    return y + "-" + toDB(m) + "-" + d
}
function toDB(num) {
    return num < 10 ? "0" + num : num
}
//获取时间差(秒)
function getDftTime(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / 1000
}
//获取随机颜色
function getColor() {
    var color;
    var r = getRand(0, 255);
    var g = getRand(0, 255);
    var b = getRand(0, 255);
    return "rgb(" + r + "," + g + "," + b + ")"
}
//去除字符串左右空格
function myTrim(str) {
    var newStr = "";
    var start, end;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) != 32) {
            start = i;
            //    console.log(i)
            break;
        }
    }
    for (var j = str.length - 1; j >= 0; j--) {
        if (str.charCodeAt(j) != 32) {
            end = j;
            //    console.log(j)
            break;
        }
    }
    newStr = str.substring(start, end + 1);
    return newStr;
}
//封装方法与list.contains类似的功能方法,hasClass(ele,val);
function hasClass(ele, val) {
    var cName = myTrim(ele.className)
    if (cName.length == 0) {
        return false
    }
    var cNameList = cName.split(" ")
    for (var i = 0; i < cNameList.length; i++) {
        if (val == cNameList[i]) {
            return true
        }
    }
    return false
}
////封装方法与list.remove类似的功能方法,removeClass(ele,val);
function removeClass(ele, val) {
    cName = myTrim(ele.className);
    cNameList = cName.split(" ")
    for (var i = 0; i < cName.length; i++) {
        if (cName == "") return;
        if (cNameList[i] == val) {
            cNameList.splice(i, 1);
            i--;
        } else if (cNameList[i] == "") {
            cNameList.splice(i, 1);
            i--;
        }
    }
    ele.className = cNameList.join(" ")
}
//list.add类似的功能方法
function addClass(ele, val) {
    var ele = document.querySelector("ele");
    var cName = myTrim(ele.className);
    var cNameList = cName.split(" ")
    console.log(cNameList)
    if (cName.length == 0) {
        ele.className = val
    }
    if (hasClass(ele, val)) return;
    ele.className += " " + val
}
//list.toggle类似的功能方法
function toggleClass(ele, val) {
    var cName = ele.className;
    var cNameList = cName.split(" ");
    var arr = [];
    var isRound = true
    for (var i = 0; i < cNameList.length; i++) {
        if (cNameList[i] == val) {
            cNameList.splice(i, 1)
            div.className = cNameList.join(" ");
            isRound = false;
        }
    }
    if (isRound) div.className += " " + val
}
//获取子元素节点集合
function getChildren(obj) {
    var childList = obj.childNodes;
    var list = [];
    for (var i = 0; i < childList.length; i++) {
        if (childList[i].nodeType == 1) {
            list.push(childList[i])
        }
    }
    return list
}
//获取第一个子元素节点
function getFirstEle(obj) {
    var ele = getChildren(obj)[0]
    return ele ? ele : null
}
//获取最后一个子元素节点
function getLastEle(obj) {
    var list = getChildren(obj)
    var lastEle = list[list.length - 1]
    if (!!lastEle) {
        return lastEle
    } else {
        return null
    }
}
//获取上一个兄弟节点
function getPreviousSibling(ele) {
    var pEle = ele.parentNode;
    var firstEle = getChildren(pEle)[0];
    if (firstEle == ele) return null;
    //向上找上一个元素节点
    var prevNode = ele.previousSibling;
    if (prevNode.nodeType != 1) {
        return getPreviousSibling(prevNode);
    }
    return prevNode
}
//获取下一个兄弟元素节点
function getNextSibling(ele) {
    var pEle = ele.parentNode;
    var lastEle = getLastEle(pEle)
    if (lastEle == ele) return null;
    var nextNode = ele.nextSibling;
    if (nextNode.nodeType != 1) {
        return getNextSibling(nextNode);
    }
    return nextNode
}
//获取非行间属性
function getStyle(dom, attr) {
    return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom)[attr]
    //dom.currentStyle在IE8下返回一个对象，谷歌下返回undefined
}
//阻止事件冒泡
function stopProp(e) {
    !!e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
}
//绑定DOM2级事件
function addEvent(ele, event, callBack, flag) {
    if (!!ele.addEventListener) {
        ele.addEventListener(event, callBack, flag)
    } else {
        ele.attachEvent("on" + event, callBack)
    }
}
//解除DOM2级事件绑定
function removeEvent(item,event,callback){
    return !!item.removeEventListener ? item.removeEventListener('click',fn) : item.detachEvent('on'+event,fn)
 }
 //page属性兼容
 function getPage(e){
    var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    var sTop = document.documentElement.scrollTop || document.body.scrollTop
    return {
        x:e.clientX + sLeft,
        y:e.clientY + sTop
    }
}
//多属性运动
function animate(dom, options, callBack) {
    for (var attr in options) {
        if (attr == 'opacity') {
            var current = parseInt(getComputedStyle(dom)[attr] * 100)
            var target = options[attr] * 100
        } else if (attr.indexOf('scroll') !== -1) {
            var current = dom[attr]
            var target = options[attr]
        } else {
            var current = parseInt(getComputedStyle(dom)[attr])
            var target = options[attr]
        }
        options[attr] = {
            'current': current,
            'target': target
        }
    }
    clearInterval(dom.timer)
    dom.timer = setInterval(function () {
        for (var attr in options) {
            var current = options[attr].current
            var target = options[attr].target
            var speed = (target - current) / 10
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            if (Math.abs(target - current) <= Math.abs(speed)) {
                if (attr === 'opacity') {
                    dom.style[attr] = target / 100
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = target
                } else {
                    dom.style[attr] = target + "px"
                }
                delete options[attr]
                for (var attr in options) {
                    return false
                }
                typeof callBack == 'function' ? callBack() : ''
                clearInterval(dom.timer)
            } else {
                options[attr].current += speed
                if (attr == 'opacity') {
                    dom.style[attr] = options[attr].current / 100
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = options[attr].current
                } else {
                    dom.style[attr] = options[attr].current + "px"
                }
            }
        }
    }, 20)
}
//ajax
function ajax(options) {
    // data -> 'key=value&key=value'
    // 1.创建数据交互对象
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest() // 非IE5 6
    } else {
        var xhr = new ActiveXObject('Microsoft.XMLHTTP') // IE5 6
    }

    // 判断并格式化参数data
    var data = ''
    if (isObject(options.data)) {
        // 把对象格式化成 -> 'k1=v1&k2=v2&k3=v3'
        for (var key in options.data) {
            data += key + '=' + options.data[key] + '&'
        }
        // data = 'k1=v1&k2=v2&k3=v3&'
        data = data.substring(0, data.length - 1)
    }

    if (typeof options.data === 'string') {
        data = options.data
    }

    // 判断请求方式
    if (options.type.toLowerCase() === 'get') {
        var time = ''
        time = options.cache ? '' : Date.now()
        // 2.打开连接
        xhr.open(options.type, options.url + '?' + data + '&_=' + time, true) // 默认true，异步
        // 3.发送请求
        xhr.send(null) // get请求传null
    }
    if (options.type.toLowerCase() === 'post') {
        // 2.打开连接
        xhr.open(options.type, options.url, true) // 默认true，异步
        // post 请不会有缓存问题

        // 设置请求头，作用 模拟表单 post 请求提交数据，在send方法之前设置
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

        // 3.发送请求
        xhr.send(data) // post请求 要传递的参数在此传
    }

    // 4.等待请求/响应状态
    // xhr.readyState  请求状态，0-4状态改变会触发一个readystatechange事件
    xhr.onreadystatechange = function () {
        // console.log( xhr.readyState );// 2 3 4
        if (xhr.readyState === 4) {// 请求完成
            // xhr.status 响应状态
            if (xhr.status === 200) {// OK 响应就绪
                // xhr.responseText 响应的数据
                // options.success(xhr.responseText)
                // 支持dataType配置
                if (options.dataType === 'json') {
                    var json = JSON.parse(xhr.responseText)
                    options.success(json)
                } else if (options.dataType === 'xml') {
                    options.success(xhr.responseXML)
                } else {
                    options.success(xhr.responseText)
                }
            } else {
                // console.log(xhr.status);
                options.error(xhr.status)
            }
        }
    }
}
//判断是不是对象
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]' ? true : false
}
//获取单个选择器
function $1(selector) {
    return document.querySelector(selector)
}
//获取选择器数组
function $2(selector) {
    return document.querySelectorAll(selector)
}
//jsonp
function jsonp(options) {
    // options.success 变成全局函数
    // options.jsonpCallback = 'hehe'
    window[options.jsonpCallback] = options.success

    // 判断 options.data的数据类型
    // 如果字符串，直接赋值data变量
    // 如果是对象，转成参数序列的字符串
    var data = ''
    if (typeof options.data === 'string') {
        data = options.data
    }
    if (isObject(options.data)) {
        for (var key in options.data) {
            data += key + '=' + options.data[key] + '&'
        }
        data = data.substring(0, data.length - 1)
    }

    // 创建 script标签
    var oScript = document.createElement('script')
    // 给src属性赋值（url+接口参数）
    oScript.src = options.url + '?' + options.jsonp + '=' + options.jsonpCallback + '&' + data
    // 把script插入文档中
    document.body.appendChild(oScript)
    // script标签加载完成时，删除此标签
    oScript.onload = function () {
        document.body.removeChild(oScript)
    }
}
//
function promiseAjax(options) {
    return new Promise((resolve, reject) => {
        // data -> 'key=value&key=value'
        // 1.创建数据交互对象
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest() // 非IE5 6
        } else {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP') // IE5 6
        }

        // 判断并格式化参数data
        var data = ''
        // if (typeof options.data === 'object' && options.data !== null && options.data.constructor === 'Object') {
        if (isObject(options.data)) {
            // 把对象格式化成 -> 'k1=v1&k2=v2&k3=v3'
            for (var key in options.data) {
                data += key + '=' + options.data[key] + '&'
            }
            // data = 'k1=v1&k2=v2&k3=v3&'
            data = data.substring(0, data.length - 1)
        }

        if (typeof options.data === 'string') {
            data = options.data
        }

        // 判断请求方式
        if (options.type.toLowerCase() === 'get') {
            var time = ''
            time = options.cache ? '' : Date.now()
            // 2.打开连接
            xhr.open(options.type, options.url + '?' + data + '&_=' + time, true) // 默认true，异步
            // 3.发送请求
            xhr.send(null) // get请求传null
        }
        if (options.type.toLowerCase() === 'post') {
            // 2.打开连接
            xhr.open(options.type, options.url, true) // 默认true，异步
            // post 请不会有缓存问题

            // 设置请求头，作用 模拟表单 post 请求提交数据，在send方法之前设置
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

            // 3.发送请求
            xhr.send(data) // post请求 要传递的参数在此传
        }

        // 4.等待请求/响应状态
        // xhr.readyState  请求状态，0-4状态改变会触发一个readystatechange事件
        xhr.onreadystatechange = function () {
            // console.log( xhr.readyState );// 2 3 4
            if (xhr.readyState === 4) {// 请求完成
                // xhr.status 响应状态
                if (xhr.status === 200) {// OK 响应就绪
                    // xhr.responseText 响应的数据
                    // options.success(xhr.responseText)
                    // 支持dataType配置
                    if (options.dataType === 'json') {
                        var json = JSON.parse(xhr.responseText)
                        resolve(json)
                    } else if (options.dataType === 'xml') {
                        resolve(xhr.responseXML)
                    } else {
                        resolve(xhr.responseText)
                    }
                } else {
                    // console.log(xhr.status)
                    reject(xhr.status)
                }
            }
        }
    })
}
//设置cookie
function setCookie(options) {
    options.days = options.days || 0
    options.path = options.path || ''
    if (options.days === 0) {
        document.cookie = options.key + '=' + options.val + '; path=' + options.path
    } else {
        var d = new Date()
        d.setDate(d.getDate() + options.days)
        document.cookie = options.key + '=' + options.val + '; expires=' + d + '; path=' + options.path
    }
}
//获取cookie
function getCookie(key) {
    var arr = document.cookie.split('; ')
    var arr2;
    for (var i = 0, len = arr.length; i < len; i++) {
        arr2 = arr[i].split('=')
        if (arr2[0] === key) {
            return arr2[1]
        }
    }
    return null
}
//删除cookie
function removeCookie(key) {
    setCookie({
        key: key,
        val: '',
        days: -2
    })
}
