var b_a = document.querySelector('.b_a')
var b_user = document.querySelector('.b_user')
var b_nane = document.querySelector('.b_nane')
var b_p = document.querySelector('.b_p')
var b_btn2 = document.querySelector('.b_btn2')
var b_btn1 = document.querySelector('.b_btn1')
var b_shang = document.querySelector('.b_shang')
var b_wenzi = document.querySelector('.b_wenzi')
var b_gwc = document.querySelector('.b_gwc')
var b_splb = document.querySelector('.b_splb')
var b_shop = document.querySelector('.b_shop')
var b_b1 = document.querySelector('.b_b1')
var b_b2 = document.querySelector('.b_b2')



jia()




ajax({
    url: './data/b_gwc.json',
    type: 'get',
    data: '',
    success: function (data) {
        var json = JSON.parse(data)
        var str = ''
        for (var i = 0, len = json.length; i < len; i++) {
            str += '<div class="b_s1" code=' + json[i].code + '><div><img src=' + json[i].imgurl + ' alt=""></div><h3>' + json[i].type + '</h3><strong>' + json[i].price + '</strong><span>加入购物车</span></div>'
        }
        b_shang.innerHTML = str
        //添加购物车
        //localStorage -> shop : '{"code":['abc1','abc4','abc6']}'
        $('.b_s1>span').on('click', function () {
            var code = $(this).parent().attr('code')
            if (localStorage.getItem("shop")) {
                arrCode = JSON.parse(localStorage.getItem('shop')).code
                num = JSON.parse(localStorage.getItem('shop')).num
            } else {
                var arrCode = []
                var num = []
            }
            if (arrCode.indexOf(code) < 0) {
                arrCode.push(code)
                num.push(1)
                alert('商品添加成功')
            } else {
                var ind = num[arrCode.indexOf(code)]
                num.splice(arrCode.indexOf(code), 1, ind - 0 + 1)
                alert('商品添加成功')
            }
            var Json = JSON.stringify({ 'code': arrCode, 'num': num })
            localStorage.setItem('shop', Json)
            location.reload();
        })
    }
})

//渲染购物车


han()

function han() {
    if (localStorage.getItem("shop")) {
        var arrcd = JSON.parse(localStorage.getItem("shop")).code
        var arrnum = JSON.parse(localStorage.getItem("shop")).num
        // console.log(arrcd)
        var str = ''
        ajax({
            url: './data/b_gwc.json',
            type: 'get',
            data: '',
            success: function (data) {
                var json = JSON.parse(data)
                for (var i = 0, len = json.length; i < len; i++) {
                    for (var j = 0; j < arrcd.length; j++) {
                        if (json[i].code == arrcd[j]) {
                            str += `<div class="b_gwccot clearfix" code=${json[i].code}>
                            <div>
                                <input type="checkbox" class="checkAll">
                                <span></span>
                            </div>
                            <div><img src="${json[i].imgurl}" alt=""></div>
                            <div>${json[i].type}</div>
                            <div>${json[i].price}</div>
                            <div>
                                <div class="b_anniu">
                                    <a href="javascript:;" class="btn_left">-</a>
                                    <input type="text" value="${arrnum[j]}" class="input">
                                    <a href="javascript:;" class="btn_right">+</a>
                                </div>
                            </div>
                            <div>${parseInt(json[i].price) * arrnum[j]}元</div>
                            <div><span class="b_remove">X</span></div>
                        </div>`
                        }
                    }
                }
                b_splb.innerHTML = str
                // 商品数量
                $('.b_gwccot').on('click', '.btn_left', function () {
                    $(this).next().val($(this).next().val() - 1)
                    if ($(this).next().val() < 1) {
                        $(this).next().val(1)
                    }
                    arrcd = JSON.parse(localStorage.getItem("shop")).code
                    arrnum = JSON.parse(localStorage.getItem("shop")).num
                    var dex = arrcd.indexOf($(this).parent().parent().parent().attr('code'))
                    arrnum[dex] = $(this).next().val()
                    var shopobj = JSON.stringify({ "code": arrcd, "num": arrnum })
                    localStorage.setItem("shop", shopobj)
                    han()
                })

                $('.b_gwccot').on('click', '.btn_right', function () {
                    $(this).prev().val($(this).prev().val() - 0 + 1)
                    arrcd = JSON.parse(localStorage.getItem("shop")).code
                    arrnum = JSON.parse(localStorage.getItem("shop")).num
                    var dex = arrcd.indexOf($(this).parent().parent().parent().attr('code'))
                    arrnum[dex] = $(this).prev().val()
                    var shopobj = JSON.stringify({ "code": arrcd, "num": arrnum })
                    localStorage.setItem("shop", shopobj)
                    han()
                })


                // 全选
                $('#checkid').click(function () {
                    $('.b_splb input').prop('checked', $(this).prop('checked'))
                    var a = 0
                    var sum = 0
                    for (var i = 0; i < $('.checkAll').length; i++) {
                        if ($('.checkAll').eq(i).prop('checked')) {
                            a += 1
                            sum += parseInt($('.checkAll').eq(i).parent().next().next().next().next().next().html())
                        }
                    }
                    $('.b_b2').html(a)
                    $('.b_em').html(sum)
                })
                // 单选
                $('.b_splb').on('click', '.checkAll', function () {
                    var bool = true;
                    $('.checkAll').each(function (index, val) {
                        if (!$(val).prop('checked')) {
                            bool = false
                            $('#checkid').prop('checked', false)
                            return;
                        }
                    });
                    $('#checkid').prop('checked', bool)
                    var a = 0
                    var sum = 0
                    for (var i = 0; i < $('.checkAll').length; i++) {
                        if ($('.checkAll').eq(i).prop('checked')) {
                            a += 1
                            sum += parseInt($('.checkAll').eq(i).parent().next().next().next().next().next().html())
                        }
                    }
                    $('.b_b2').html(a)
                    $('.b_em').html(sum)
                })

            }
        })

    }
}


// 删除
$('.b_splb').on('click', '.b_remove', function () {
    arrcd = JSON.parse(localStorage.getItem("shop")).code
    arrnum = JSON.parse(localStorage.getItem("shop")).num
    var index = arrcd.indexOf($(this).parent().parent().attr('code'))
    console.log(arrcd, arrnum)
    arrcd.splice(index, 1)
    arrnum.splice(index, 1)
    console.log(arrcd, arrnum)
    var shopobj = JSON.stringify({ "code": arrcd, "num": arrnum })
    localStorage.setItem("shop", shopobj)
    $(this).parent().parent().remove()
    jia()
})






var b_ul = document.querySelector('.b_ul')
var lis = b_ul.children
lis[4].onclick = function () {
    setCookie('username', '333', -3)
    jia()
}




b_btn1.onclick = function () {
    location.href = 'b_login.html'
}
b_btn2.onclick = function () {
    location.href = 'index.html'
}








function ajax(option) {
    // 1.创建XMLHttpRequest对象(数据交互对象)
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = ActiveXObject('Microsoft.XMLHTTP');//ie 5 6
    };
    // data -> 'a=123&b=456'
    if (option.type == 'get' || option.type == 'GET') {
        // 2.打开与服务器的链接
        xhr.open(option.type, option.url + '?' + option.data + '&_=' + new Date().getTime(), true);//解决缓存
        // 3.发送请求
        xhr.send(null);//get请求
    } else if (option.type == 'post' || option.type == 'POST') {
        // 2.打开与服务器的链接
        xhr.open(option.type, option.url, true);//解决缓存
        // 模拟表单form的post方式提交数据，在send之前设置
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 3.发送请求
        xhr.send(option.data);//post请求
    } else {
        alert('目前只支持get和post请求方式!');
    };

    // 4.等待服务的响应
    xhr.onreadystatechange = function () {
        // console.log(xhr.readyState);//2 3 4
        if (xhr.readyState == 4) {//请求完成
            if (xhr.status == 200) {//请求成功
                option.success(xhr.responseText);
            } else {//请求失败
                option.failed(xhr.status);
            }
        }
    };
}


function jia() {
    if (getCookie('username')) {
        b_user.classList.add('active')
        b_nane.innerHTML = getCookie('username')
        b_a.classList.remove('active')
        b_p.style.display = 'none'
        b_btn2.classList.add('act')
        b_btn1.style.display = 'none'
    } else {
        b_a.classList.add('active')
        b_user.classList.remove('active')
        b_p.style.display = 'block'
        b_btn2.classList.remove('act')
        b_btn2.style.display = 'inline-block'
        b_btn1.style.display = 'inline-block'
    }
    if (JSON.parse(localStorage.getItem("shop"))) {
        if (JSON.parse(localStorage.getItem("shop")).code.length > 0) {
            b_gwc.style.background = 'none'
            b_shop.style.display = 'block'
            b_wenzi.style.display = 'none'

        } else {
            b_gwc.style.background = 'url("img/b_gwcimg/b1.png") no-repeat 120px 0'
            b_wenzi.style.display = 'block'
            b_shop.style.display = 'none'
        }

        var arrcd = JSON.parse(localStorage.getItem("shop")).code
        b_b1.innerHTML = arrcd.length
    }else{
        b_gwc.style.background = 'url("img/b_gwcimg/b1.png") no-repeat 120px 0'
        b_wenzi.style.display = 'block'
        b_shop.style.display = 'none'
    }



    var a = 0
    var sum = 0
    for (var i = 0; i < $('.checkAll').length; i++) {
        if ($('.checkAll').eq(i).prop('checked')) {
            a += 1
            sum += parseInt($('.checkAll').eq(i).parent().next().next().next().next().next().html())
        }
    }
    $('.b_b2').html(a)
    $('.b_em').html(sum)
}
