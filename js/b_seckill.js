var li_btn = document.querySelector('.li_btn')
var oUl = document.querySelector('.b_content>ul')
var li1 = document.querySelector('.li1')
var li2 = document.querySelector('.li2')
var li3 = document.querySelector('.li3')
var li4 = document.querySelector('.li4')
var li5 = document.querySelector('.li5')
var b_djs = document.querySelector('.b_djs')

// if (localStorage.getItem('user')) {
//     li_btn.innerHTML = '立即抢购'
// } else {
//     li_btn.innerHTML = '登入后抢购'
// }


$('.b_content>ul').on('click', 'li', function () {
    for (var i = 0; i < 5; i++) {
        $('.b_content>ul>li')[i].classList.remove('bgcol')
    }
    $(this).addClass('bgcol')
})


ajax({
    url:'./data/b_seckill.json',
    type:'get',
    data:'',
    success:function(data){
        var json=JSON.parse(data)
        var str=''
        for(var i=0,len=json.length;i<len;i++){
            str+=`<li class="b_shop">
            <div class="li_left">
                <img src="./img/b_qianggou/b_img1.png" alt="">
            </div>
            <div class="li_right clearfix">
                <div class="li_name">小米蓝牙耳机青春版</div>
                <div class="li_desc">6.5 克轻巧，高清通话音质</div>
                <div class="li_price">29.50元 <i>59元</i></div>
                <div class="li_btn">登入后抢购</div>
            </div>
        </li>`
        }
        $('.b_shang ul').html(str)
    }
})



//  time(23,59,59)

// function time(a,b,c) {
//     var num1 = a
//     var num2 = b
//     var num3 = c
//     var timer = setInterval(function () {
//         num1--
//         if (num1 < 0) {
//             num1 = 59
//             b_djs.lastChild.previousSibling.innerHTML = num1
//             num2--
//             if (num2 < 0) {
//                 num2 = 59
//                 b_djs.lastChild.previousSibling.previousSibling.previousSibling.innerHTML = num2
//                 num3--
//                 if (num3 < 0) {
//                     b_djs.firstChild.nextSibling.nextSibling.innerHTML = num3
//                     console.log(666)
//                 } else if (num3 < 10) {
//                     b_djs.firstChild.nextSibling.nextSibling.innerHTML = '0' + num3
//                 } else {
//                     b_djs.firstChild.nextSibling.nextSibling.innerHTML = num3
//                 }
//             } else if (num2 < 10) {
//                 b_djs.lastChild.previousSibling.previousSibling.previousSibling.innerHTML = '0' + num2
//             } else {
//                 b_djs.lastChild.previousSibling.previousSibling.previousSibling.innerHTML = num2
//             }
//         } else if (num1 < 10) {
//             b_djs.lastChild.previousSibling.innerHTML = '0' + num1
//         } else {
//             b_djs.lastChild.previousSibling.innerHTML = num1
//         }
//     }, 1000)
// }




