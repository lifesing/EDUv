// 获取当前时间
// function getDate() {
//     var date = new Date();
//     return date;
// }
// 获取cookie
function getCookie() {
    // debugger
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

// 删除cookie
function removeCookie(name) {
    debugger
    // console.log('name=' + name + '; path=' + path + '; domain=' + domain + '; max-age=0');
    document.cookie = name + '=' + '';
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
    // debugger

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

/**
 * 数组循环
 */
function each(_objects, _fn) {
    for (var i = 0, len = _objects.length; i < len; i++) {
        _fn(_objects[i], i);
    }
}

/**
 * 根据id获取元素
 */
function getById(id) {
    return document.getElementById(id);
}


/**
 * 根据class获取元素
 */
function getByClass(className, element) {

    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className);
    } else {
        //ie不支持getElementsByClassName
        var children = (element || document).getElementsByTagName('*');
        var elements = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split('');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {

                    elements.push(child);
                    break
                }
            }
        }

        return elements;
    }
}

/**
 * event封装
 */
var EventUtil = {
    /* 添加时间处理程序 */
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    /* 获取event对象的引用 */
    getEvent: function(event) {
        return event ? event : window.event;
    },
    /* 获取事件的目标 */
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    /* 取消事件的默认函数 */
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    /* 移除时间处理程序 */
    removeHandler: function() {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    /* 阻止事件流继续传播 */
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    /* 获取相关元素 */
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    }
};