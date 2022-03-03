// a标签的点击切换注册和登录界面的功能
let link_reg = document.querySelector('#link-reg')
let link_login = document.querySelector('#link-login')
let reg_box = document.querySelector('.reg-box')
let login_box = document.querySelector('.login-box')
    // 点击去注册账号页面
link_reg.addEventListener('click', function() {
        login_box.style.display = "none"
        reg_box.style.display = "block"
    })
    // 点击去登录页面
link_login.addEventListener('click', function() {
    login_box.style.display = "block"
    reg_box.style.display = "none"
})

// 表单初验证
let log_uname = document.querySelector('#log-uname')
let form_login = document.querySelector('.form-login')
let iptPassword = document.querySelector('[name=password]')
    // 登录界面正则验证
    // change事件，监听输入内容是否合法
log_uname.addEventListener('change', verify_log_uname)

function verify_log_uname() {
    // 定义正则
    let patternUsername = /^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{2,10}$/
    if (!patternUsername.test(log_uname.value.trim())) {
        log_uname.nextElementSibling.style.display = "block"
        log_uname.nextElementSibling.innerHTML = "请输入2-10位用户名"
        return
    }
    log_uname.nextElementSibling.innerHTML = ''
    log_uname.nextElementSibling.style.display = "none"
    return true

}

iptPassword.addEventListener('change', verify_iptPassword)

function verify_iptPassword() {
    let patternUsername = /^[\S]{6,12}$/
    if (!patternUsername.test(iptPassword.value.trim())) {
        iptPassword.nextElementSibling.style.display = "block"
        iptPassword.nextElementSibling.innerHTML = "请输入6-12位密码"
        return
    }
    iptPassword.nextElementSibling.innerHTML = ''
    iptPassword.nextElementSibling.style.display = "none"
    return true

}

// 待完成项目
form_login.addEventListener('submit', function(e) {
    e.preventDefault()


})



// 注册页面
let signUsername = document.querySelector('[name=signUsername]')
let newPassword = document.querySelector('[name=newpassword]')
let rePassword = document.querySelector('[name=repassword]')
    // 验证用户名
signUsername.addEventListener('change', verify_signUsername)

function verify_signUsername() {
    // 定义正则
    let patternUsername = /^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{2,10}$/
    if (!patternUsername.test(signUsername.value.trim())) {
        signUsername.nextElementSibling.style.display = "block"
        signUsername.nextElementSibling.innerHTML = "请输入2-10位用户名,不能有特殊字符"
        return
    }
    signUsername.nextElementSibling.innerHTML = ''
    signUsername.nextElementSibling.style.display = "none"
    return true

}
// 验证新密码
newPassword.addEventListener('change', verify_newPassword)

function verify_newPassword() {
    // 定义正则
    let patternUsername = /^[\S]{6,12}$/
    if (!patternUsername.test(newPassword.value.trim())) {
        newPassword.nextElementSibling.style.display = "block"
        newPassword.nextElementSibling.innerHTML = "密码必须6到12位，且不能出现空格"
        return
    }
    newPassword.nextElementSibling.innerHTML = ''
    newPassword.nextElementSibling.style.display = "none"
    return true

}

// 判断两次密码是否一致
rePassword.addEventListener('change', verify_rePassword)

function verify_rePassword() {
    // 定义正则
    if (rePassword.value !== newPassword.value) {
        rePassword.nextElementSibling.style.display = "block"
        rePassword.nextElementSibling.innerHTML = "两次密码输入不一致"
        return
    }
    newPassword.nextElementSibling.innerHTML = ''
    newPassword.nextElementSibling.style.display = "none"
    return true
}
// 监听注册页面表单的提交事件，注册
let form_sign = document.querySelector('#form-sign')
form_sign.addEventListener('submit', function(e) {
    e.preventDefault()
    $.post('http://www.liulongbin.top:3007/api/reguser', {
            username: signUsername.value,
            password: newPassword.value
        },
        function(res) {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            let tmsg = document.querySelector('.tmsg')
            tmsg.style.display = 'block'
            tmsg.innerHTML = '注册成功，去登录'

            setTimeout(() => {
                tmsg.style.display = 'none'
                link_login.click()
            }, 1000)

        })

})

// 监听登录页面的表单提交事件，登录
form_login.addEventListener('submit', function(e) {
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: 'http://www.liulongbin.top:3007/api/login',
        data: {
            username: log_uname.value,
            password: iptPassword.value,
        },
        success: function(res) {
            if (res.status !== 0) {
                let tmsg = document.querySelector('.tmsg')
                tmsg.style.display = 'block'
                tmsg.innerHTML = `${res.message}`
                setTimeout(() => {
                    tmsg.style.display = 'none'
                }, 1000)
                return
            }
            let tmsg = document.querySelector('.tmsg')
            tmsg.style.display = 'block'
            tmsg.innerHTML = `${res.message}`
            setTimeout(() => {
                tmsg.style.display = 'none'
            }, 1000)
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})