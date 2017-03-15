var is_online = false;//网络状态
var flag_img = new Image();//网络检测器
var checkInternetInternal = 10000; //网络检测时间间隔
var submitFormInternal = 3000; //提交表单时间间隔

window.onload = function () {
    loopCheckInternetStatus();
};

function loopCheckInternetStatus() {
    flag_img.onload = function () {
        is_online = true;
        document.getElementById("online").style.display = "block";
        document.getElementById("offline").style.display = "none";
    };
    flag_img.onerror = function () {
        is_online = false;
        console.log("Offline! Ready for login...");
        document.getElementById("online").style.display = "none";
        document.getElementById("offline").style.display = "block";
    };
    flag_img.src = "https://diycode.b0.upaiyun.com/photo/2017/c9340a81a6287cad28e9ad1befc124e0.png?random=" + Math.random();
    setTimeout("loopCheckInternetStatus()", checkInternetInternal);
}

var check_flag = 0;//输入检测
var running = false;//是否已经在运行
var timer = null;//定时器
function do_login() {
    if (running === true) {
        clearInterval(timer);
        activeInput(true);
        return 0;
    } else {
        check_flag = checkInput();
        if (check_flag != 0) { //error
            activeInput(true);
            return 0;
        }
        else {
            activeInput(false);
            timer = setInterval(submitForm, submitFormInternal);
        }
    }
}

function submitForm() {
    if (!is_online) {
        setRealPass();
        document.getElementById("main_form").submit();
    }
}

function checkInput() {
    var user_name = document.form1.username.value;
    var password = document.getElementById("user_password").value;
    if (user_name == "") {
        alert("请填写用户名");
        document.form1.uname.focus();
        return 1;
    }

    if (password == "") {
        alert("请填写密码");
        document.form1.user_password.focus();
        return 1;
    }

    return 0;
}

var password;
var final_pass;
var temp_pass;
function setRealPass() {
    password = document.getElementById("user_password").value;
    try {
        temp_pass = hex_md5(password);
    }
    catch (e){
        temp_pass = "pppaaassswwwooorrrd" + password + "password";
    } finally {
        final_pass = temp_pass.substr(8, 16);
        document.getElementById("password").value = final_pass;
    }
}

function activeInput(active) {
    if (active === true) {
        document.getElementById("username_div").style.display = "block";
        document.getElementById("password_div").style.display = "block";
        document.getElementById("login_div").value = "Run";
        running = false;
    }
    else {
        document.getElementById("username_div").style.display = "none";
        document.getElementById("password_div").style.display = "none";
        document.getElementById("login_div").value = "Stop";
        running = true;
    }
}
