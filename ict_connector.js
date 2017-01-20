var is_online = false;
var flag_img = new Image();//img for checking network
var xml_http_request = (window.XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
var user_name;//username
var password;//password
var temp_pass;
var final_pass;
var drop; //useless element
var data;
var post_result;
var temp_reg;

window.onload = function(){
    check_internet_status();
};

function check_internet_status(){
    flag_img.onload = function () {
        is_online = true;
        document.getElementById("check_internet_img").setAttribute("src", flag_img.src);
        document.getElementById("warning").style.display = "none"
        document.getElementById("presenter").style.display = "block"
    };
    flag_img.onerror = function (){
        is_online = false;
        console.log("Offline! Ready for login...")
        document.getElementById("check_internet_img").setAttribute("src", "asset/image/blue_cross_128px.png");
        document.getElementById("warning").style.display = "block";
        document.getElementById("presenter").style.display = "none"
    };
    flag_img.src = "https://yasicyu.com/static/Images/blue_ok_128px.png?random=" + Math.random();
    setTimeout("check_internet_status()", 10000);
}

function check_input() {
    if (user_name == "") {
        alert("请填写用户名");
        document.form1.uname.focus();
        return 1;
    }

    if (password == "") {
        alert("请填写密码");
        document.form1.pass.focus();
        return 1;
    }

    return 0;
}

function post_data(theAction, theMethod, theData) {
    switch(theMethod) {
        case "post":
            xml_http_request.open("POST", theAction, false);
            xml_http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xml_http_request.send(theData);
            break;
        default:
            return "";
    }
    return xml_http_request.responseText;
}

function do_post_data() {
    //密码md5加密传送
    temp_pass = hex_md5(password);
    final_pass = temp_pass.substr(8, 16);
    drop = 1;
    data = "username=" + user_name + "&password=" + final_pass + "&drop=" + drop + "&type=1&n=100";

    //return "123";
    return post_data("http://159.226.39.22/cgi-bin/do_login", "post", data);
}

function show_error_info() {
    switch (post_result) {
        case "user_tab_error":
            alert("认证程序未启动");
            break;

        case "username_error":
            alert("用户名错误");
            document.form1.uname.focus();
            break;

        case "non_auth_error":
            alert("您无须认证，可直接上网");
            break;

        case "password_error":
            alert("密码错误");
            document.form1.pass.focus();
            break;

        case "status_error":
            alert("用户已欠费，请尽快充值。");
            break;

        case "available_error":
            alert("用户已禁用");
            break;

        case "ip_exist_error":
            alert("您的IP尚未下线，请等待2分钟再试。");
            break;

        case "usernum_error":
            alert("用户数已达上限");
            break;

        case "online_num_error":
            alert("该帐号的登录人数已超过限额\n如果怀疑帐号被盗用，请联系管理员。");
            break;

        case "mode_error":
            alert("系统已禁止WEB方式登录，请使用客户端");
            break;

        case "time_policy_error":
            alert("当前时段不允许连接");
            break;

        case "flux_error":
            alert("您的流量已超支");
            break;

        case "minutes_error":
            alert("您的时长已超支");
            break;

        case "ip_error":
            alert("您的IP地址不合法");
            break;

        case "mac_error":
            alert("您的MAC地址不合法");
            break;

        case "sync_error":
            alert("您的资料已修改，正在等待同步，请2分钟后再试。");
            break;

        default:
            alert("找不到认证服务器");
            break;
    }
}

var check_flag = 0;
function do_login() {
    user_name = document.form1.uname.value;
    password = document.form1.pass.value;

    check_flag = check_input();
    if (check_flag != 0){
        document.getElementById("login_button").style.display = "block";
        document.getElementById("username_div").style.display = "block";
        document.getElementById("password_div").style.display = "block";
        document.getElementById("online_ready").style.visibility = "hidden";
        return;
    }

    if (is_online) {
        document.getElementById("login_button").style.display = "none";
        document.getElementById("username_div").style.display = "none";
        document.getElementById("password_div").style.display = "none";
        document.getElementById("online_ready").style.visibility = "visible";
    }
    else {

        document.getElementById("login_button").style.display = "none";
        document.getElementById("username_div").style.display = "none";
        document.getElementById("password_div").style.display = "none";
        document.getElementById("online_ready").style.visibility = "visible";

        post_result = do_post_data();
        temp_reg = /^[\d]+$/;
        if (temp_reg.test(post_result)) { //login successful
            console.log("Login successful!");
        } else { //show error info
            show_error_info();
            document.getElementById("login_button").style.display = "block";
            document.getElementById("username_div").style.display = "block";
            document.getElementById("password_div").style.display = "block";
            document.getElementById("online_ready").style.visibility = "hidden";
        }
    }
    setTimeout("do_login()", 1000);
}