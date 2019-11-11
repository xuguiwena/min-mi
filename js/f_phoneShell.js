$(function () {

    $.ajax({
        type: 'get',
        url: 'data/f_phoneShell.json',
        dataType: 'json',
        cache: 'false',
        success: function (json) {
            var str1 = '';
            var str2 = ''
            $.each(json, function (index, value) {
                // console.log(value);
                // str2 = ''
                str1 += `<div class="item">
                <div class="imgBox">
                    <a href="#"><img src="${value.img}" alt=""></a>
                </div>
                <h2><a href="#">${value.title}</a></h2>
                <div class="goodsPrice">
                    <span>${value.Nprice}</span>
                    <span>${value.Yprice}</span>
                </div>
                <div class="goodsColor">
                    <ul>
                       
                    </ul>
                </div>
                <div class="flags">
                    <span><img src="${value.pic}" alt="">${value.text}</span>
                </div>
            </div>`
                $.each(value.goodsColor, function (num, val) {
                    str2 += `<li class="list"><img src="${val.color}" alt=""></li>`
                })
                $('.goodsShow').html(str1)
                $('.goodsColor ul').html(str2)
                str2 = ''
            })




        }

    })







})