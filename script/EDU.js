/**
 * 幻灯片效果
 */
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
}

/**
 * 选项卡切换
 */
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


/*
 * 顶部提示条
 */
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
    var date = new Date();
    date.setDate(new Date() + 7); //保存1天
    setCookie("noTips", 1, date);
    tips.style.display = 'none';
}

/*
 * 轮播效果
 */
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
    a[flag].style.display = "inline";
}

function showVideo() {
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

// 登录和关注模块
function showAtt() {
    var cookie = getCookie();
    if (cookie.loginSuc == 1) {
        var att = document.querySelector(".m-att");
        att.style.display = "none";
        var hasAtt = document.querySelector(".m-hasAtt");
        hasAtt.style.display = "block";
    } else {
        var login = document.getElementById("login");
        login.style.display = "block";
    }
}

/**
 * 登录
 */
function login() {

    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    var options = {
        userName: md5(userName),
        password: md5(password)
    };

    var url = "http://study.163.com/webDev/login.htm";
    get(url, options, function (response) {

        if (response == 1) {
            var login = document.getElementById("login");
            login.style.display = "none";
            var date = new Date();
            date.setDate(new Date() + 7); //保存7天
            setCookie("loginSuc", 1, date);
            followAPI();
        } else {
            alert("账号密码错误");
        }
    });

    function followAPI() {

        var url = "http://study.163.com/webDev/attention.htm";
        get(url, null, function (response) {
            if (response == 1) {
                var date = new Date();
                date.setDate(new Date() + 7); //保存7天
                setCookie('followSuc', 1, date);
                setFollowStatus();
            }
        });
    }
}

/**
 * 设置页面关注状态
 */
function setFollowStatus() {

    var cookie = getCookie();
    var att = document.getElementsByClassName("m-att");
    var hasAtt = document.getElementsByClassName("m-hasAtt");
    if (cookie.followSuc == 1) {
        att[0].style.display = "none";
        hasAtt[0].style.display = "block";
    } else {
        att[0].style.display = "block";
        hasAtt[0].style.display = "none";
    }
}

setFollowStatus();

/**
 * 取消关注
 */
function cancel() {
    removeCookie("followSuc");
    removeCookie("loginSuc");
    var att = document.getElementsByClassName("m-att");
    var hasAtt = document.getElementsByClassName("m-hasAtt");
    att[0].style.display = "block";
    hasAtt[0].style.display = "none";
}

/**
 * 最热排行模块
 * 获取数据
 */
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

/**
 * 获取课程列表
 */
function getLessonList(query) {

    get('http://study.163.com/webDev/couresByCategory.htm', query, function (response) {
        var html = '';
        var lessonListData = JSON.parse(response);
        each(lessonListData.list, function (item, i) {
            html += '<div class="m-courseBox f-fl"><div class="course">';
            html += '<div class="imgBox"> <img src="' + item.middlePhotoUrl + '" width="100%" height="124"/></div>';
            html += '<p class="title">' + item.name + '</p>';
            html += '<p class="category">' + item.provider + '</p>';
            html += '<div class="number"><span>' + item.learnerCount + '</span></div>';
            if (item.price == 0) {
                html += '<div class="price"><strong>免费</strong></div>';
            } else {
                html += '<div class="price"><strong>￥' + item.price + '</strong></div>';
            }
            html += '</div>';

            html += '<div class="course-detail"><a href="#"><div>';
            html += '<div style="margin:10px 10px 20px 10px;height:126px;">';
            html += '<div class="f-fl"><img src="' + item.middlePhotoUrl + '" height="124" width="221"/></div>';

            html += '<div class="f-fl mrg20L" style="width:200px;">';
            html += '<h3class="detail-title">' + item.name + "</h3>";

            html += '<div class="pNum">' + item.learnerCount + '人在学</div>';
            html += '<div class="text">发布者：' + item.provider + '</div>';
            html += '<div class="text">分类：' + item.provider + '</div>';
            html += '</div>';
            html += '</div>';

            html += '<div style="background:#f8f8f8;height:83px;">';
            html += '<p class="detail-des mrg20A pad20T">' + item.description + '</p>';;
            html += '</div>';
            html += '</div></a></div>';
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

/**
 * 跳转到指定页
 */
function goPage(pageNo) {
    query.pageNo = pageNo;
    getLessonList(query)
    activeCurrentPageNo(query.pageNo);
    v
}

/**
 * 上一页
 */
function lastPage() {
    if (query.pageNo <= 1) {
        return false;
    }
    query.pageNo = query.pageNo - 1;
    getLessonList(query)
    activeCurrentPageNo(query.pageNo);
}

/**
 * 下一页
 */
function nextPage() {
    if (query.pageNo >= 3) {
        return false;
    }
    query.pageNo = query.pageNo + 1;
    getLessonList(query)
    activeCurrentPageNo(query.pageNo);
}

/**
 * 高亮当前页码
 */
function activeCurrentPageNo(pageNo) {

    var pageList = getByClass('m-page', document)[0].children;
    if (pageList) {

        each(pageList, function (child, num) {
            child.className = '';
            if (child.innerText == pageNo) {
                child.className = 'z-crt';
            }
        });
    }
}