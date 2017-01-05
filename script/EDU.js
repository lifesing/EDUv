// 幻灯片效果

window.onload = function () {




    flag = 0;
    slider = document.getElementById("slide");
    a = document.querySelectorAll(".astyle");
    li = document.getElementById("pointer").children;
    li[0].style.background = "#000000"; //默认选中颜色
    a[0].style.display = "inline";
    time = setInterval("turn();", 5000);
    slider.onmouseover = function () {
        clearInterval(time);
    }
    slider.onmouseout = function () {
            time = setInterval("turn();", 5000);
        }
        // for (var num = 0; num < li.length; num++) {
        //     li[num].onmouseover = function() {
        //         debugger
        //         turn(li[num]);
        //         clearInterval(time);
        //     }
        //     li[num].onmouseout = function() {
        //         debugger
        //         time = setInterval("turn();", 5000);
        //     }
        // }

}



//选项卡切换
function tabChange(tit_id, con_id, activeclass, this_num) {

    var tabTit = document.getElementById(tit_id);
    var tabTitC = tabTit.children;
    var tabNum = tabTitC.length;
    for (i = 0; i < tabNum; i++) {
        tabTitC[i].firstChild.className = "";
    }
    tabTitC[this_num].firstChild.className = activeclass;
    this_num == 0 ? query.type = 10 : query.type = 20;
    getLessonList(query);
}


// 顶部提示条
function tips() {
    var tips = document.querySelector(".m-tips");
    var closeTips = document.querySelector(".closetips");
    var cookie = getCookie();
    if (!cookie.noTips) {
        tips.style.display = 'block';
    };
}
tips();

function closeTips() {

    var tips = document.querySelector(".m-tips");
    var closeTips = document.querySelector(".closetips");
    setCookie("noTips", 1, new Date());
    //setCookie("noTips", 1, new Date() + 3600 * 24);
    tips.style.display = 'none';
}


// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function(callback) {
//     if (xhr.readyState == 4) {
//         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//             callback(xhr.responseText);
//         } else {
//             alert('Request was unsuccessful:' + xhr.status);
//         }
//     }
// }
// xhr.open('get', 'http://study.163.com/webDev/couresByCategory.htm', true);


// 轮播效果
var turn = function (value) {

    if (value != null) {
        flag = value - 1;
    }
    if (flag < li.length - 1) {
        flag++;
    } else {
        flag = 0;
    }
    for (var j = 0; j < li.length; j++) {
        li[j].style.backgroundColor = "#ffffff";
        a[j].style.display = "none";
    }
    li[flag].style.backgroundColor = "#000000";
    // 淡入效果
    // var obj = a[flag];
    // var Fadeflag = true;

    // function Fade() {
    //     this.hide = function(obj) {
    //         var num = 0;
    //         if (Fadeflag) {
    //             var st = setInterval(function() {
    //                 num++;
    //                 Fadeflag = false;
    //                 obj.style.opacity = num / 10;
    //                 if (num <= 0) {
    //                     clearInterval(st);
    //                     Fadeflag = true;
    //                 }
    //             }, 100);
    //         }
    //     }
    // }
    // var fade = new Fade();
    // fade.hide(obj);
    a[flag].style.display = "inline";
}

function showVideo() {
    // debugger
    var box = document.getElementById("playVideo");
    box.style.display = "block";

}

// 关闭
function closeBox() {
    var box = document.querySelector(".m-popBox");
    box.style.display = "none";
}

function closeVideo() {
    var box = document.getElementById("playVideo");
    box.style.display = "none";
}

function showAtt() {
    // debugger
    var cookie = getCookie();
    if (cookie == loginSuc) {
        var att = document.querySelector(".m-att");
        att.style.display = "none";
        var hasAtt = document.querySelector(".m-hasAtt");
        hasAtt.style.display = "block";
    } else {
        var login = document.getElementById("login");
        login.style.display = "block";
    }
}


// 最热排行模块
// 获取数据
function topModule() {
    var url = "http://study.163.com/webDev/hotcouresByCategory.htm";
    get(url, null, intoTop);
    var ul = document.querySelector(".topUl");
    // 写入到页面
    function intoTop(response) {
        var list = JSON.parse(response);
        for (var i = 0; i < list.length; i++) {
            var li = document.createElement("li");
            li.setAttribute("class", "clearfix topLi");
            li.innerHTML = '<div class="f-fl"><img src="' +
                list[i].bigPhotoUrl +
                '" height="50 px " width="50 px "></div><div class="mrg10L f-fl"><p class="topTxt">' +
                list[i].name + '</p><div class="pNum">' + list[i].learnerCount + '</div></div>';
            ul.appendChild(li);
        }
        // 实现滚动更新热门课程的效果
        setInterval(changeTM, 5000);
        i = 0;

        function changeTM() {
            var firstLi = ul.children[0];
            var cLi = firstLi.cloneNode(true);
            ul.appendChild(cLi);
            ul.removeChild(ul.children[0]);
            i++;
        }
    }
}
topModule();

//获取课程列表
function getLessonList(query) {

    get('http://study.163.com/webDev/couresByCategory.htm', query, function (response) {
        var html = '';
        var lessonListData = JSON.parse(response);
        each(lessonListData.list, function (item, i) {
            html += '<div class="m-courseBox f-fl"><div class="course">';
            html += '<div class="imgBox"> <img src="' + item.middlePhotoUrl + '" width="100%" height="124"/></div>';
            html += '<p class="title">' + item.name + '</p>';
            html += '<span class="category">' + item.provider + '</span>';
            html += '<div class="number"><span>' + item.learnerCount + '</span></div>';
            if (item.price == 0) {
                html += '<div class="price"><strong>免费</strong></div>';
            } else {
                html += '<div class="price"><strong>' + item.price + '</strong></div>';
            }
            html += '</div>';

            html += '<div class="course-detail"><div>';
            html += '<div style="margin:10px 10px 20px 10px;height:126px;">';
            html += '<div class="f-fl"><img src="' + item.middlePhotoUrl + '" height="124" width="221"/></div>';
            html += '<div class="f-fl mrg20L">';
            html += '<h3>' + item.name + "</h3>";
            html += '<div class="pNum">' + item.learnerCount + '人在学</div>';
            html += '<div class="text">发布者：' + item.provider + '</div>';
            html += '<div class="text">分类：' + item.provider + '</div>';
            html += '</div>';
            html += '</div>';

            html += '<div style="background:#f8f8f8;">';
            html += '<p class="pad20A">' + item.description + '</p>';;
            html += '</div>';
            html += '</div></div>';
            html += '</div>';
        });

        getById('course-list').innerHTML = html;
    });
}

var query = {
    pageNo: 1,
    psize: 20,
    type: 10
};

getLessonList(query); //课程列表初始化