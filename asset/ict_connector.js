var is_online = false;
var flag_img = new Image();//img for checking network
var user_name;//username
var password;//password
var temp_pass;
var final_pass;


window.onload = function () {
    check_internet_status();
};

function check_internet_status() {
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
    setTimeout("check_internet_status()", 10000);
}

function check_input() {
    user_name = document.form1.username.value;
    password = document.form1.user_password.value;
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

function setRealPass() {
    password = document.getElementById("user_password").value;
    /*temp_pass = hex_md5(password);*/
    temp_pass = "pppaaassswwwooorrrd" + password + "password";
    final_pass = temp_pass.substr(8, 16);
    document.getElementById("password").value = final_pass;
}


var check_flag = 0;
var running = false;
var timer = null;
function do_login() {
    if (running === true) {
        clearInterval(timer);
        document.getElementById("username_div").style.display = "block";
        document.getElementById("password_div").style.display = "block";
        document.getElementById("login_div").value = "Run";
        running = false;
        return;
    } else {
        check_flag = check_input();
        if (check_flag != 0) { //error
            document.getElementById("username_div").style.display = "block";
            document.getElementById("password_div").style.display = "block";
            document.getElementById("login_div").value = "Run";
            return;
        }

        document.getElementById("username_div").style.display = "none";
        document.getElementById("password_div").style.display = "none";
        document.getElementById("login_div").value = "Stop";
        running = true;

        timer = setInterval(function () {
            if (is_online) {
                setRealPass();
                document.getElementById("main_form").submit();
            }
        }, 3000);
    }
}
