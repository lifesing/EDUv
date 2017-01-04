// 获取当前时间
// function getDate() {
//     var date = new Date();
//     return date;
// }
// 获取cookie
function getCookie() {
    var cookie = {};
    var all = document.cookie;
    if (all === '') return cookie;
    var list = all.split('; ');
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}

// 设置cookie
function setCookie(name, value, expires, path, domain, secure) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires)
    // cookie += ';expires=' + expires.toGMTString();
        cookie += ';expires=' + expires;
    if (path)
        cookie += ';path=' + path;
    if (domain)
        cookie += ';domain=' + domain;
    if (secure)
        cookie += ';secure=' + secure;
    document.cookie = cookie;
}

// 事件绑定
// function addEvent(elem, type, listener) {
//     if (elem.addEventListener) {
//         elem.addEventListener(type, listener, false);
//     } else {
//         elem.addEvent("on" + elem, listener);
//     }
// }

// get请求封装
function get(url, options, callback) { //定义get函数
    //查询参数序列化
    function serialize(options) {
        if (!options) { //如果没有查询参数
            return ""; //返回空字符
        } else { //否则
            var pairs = []; //定义一个数组
            for (var name in options) { //遍历对象属性
                if (!options.hasOwnProperty(name)) continue; //过滤掉继承的属性和方法
                if (typeof options[name] === "function") continue; //过滤掉方法
                var value = options[name].toString(); //属性值转字符串
                name = encodeURIComponent(name); //URI编码
                value = encodeURIComponent(value); //URI编码
                pairs.push(name + "=" + value); //属性名和属性值放入数组
            }
            return pairs.join("&"); //返回字符串
        }
    }

    var xhr = new XMLHttpRequest(); //创建Ajax对象
    xhr.open("get", url + '?' + serialize(options)); //开启一个异步请求
    xhr.send(null); //发送请求
    xhr.onreadystatechange = function() { //注册事件 处理返回数据
        if (xhr.readyState == 4) { //若请求完毕
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) { //若请求成功
                callback(xhr.responseText); //调用回调函数处理响应结果
            } else { //若请求失败
                console.log('Requst was unsuccessful:' + xhr.status); //返回请求失败原因

            }

        }

    }

}