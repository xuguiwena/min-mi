
$(function () {
  var oLis = document.querySelectorAll('.wrapBox li');
  var oImgs = document.querySelectorAll('.swiperBox img');

  var index = 0;
  var timer;

  start();

  for (var i = 0; i < oLis.length; i++) {
    oLis[i].index = i;
    oLis[i].onmousedown = function () {
      clearInterval(timer);
      // this.index
      index = this.index;
      activeOne();
    }

    oLis[i].onmouseup = function () {
      start();
    }
  }
  function activeOne() {
    // 清除所有的激活状态
    for (var i = 0; i < oLis.length; i++) {
      oImgs[i].classList.remove('active');
      oLis[i].classList.remove('active');
    }

    oImgs[index].classList.add('active');
    oLis[index].classList.add('active');
  }

  function start() {
    timer = setInterval(function () {
      index++;
      if (index > oLis.length - 1) {
        index = 0;
      }
      activeOne();
    }, 3000);
  }

  // 回到顶部
  function offOn() {
    if ($(this).scrollTop() < 500) {
      $('.back_top').css('display', 'none')
    } else {
      $('.back_top').css('display', 'block')
    }
  }
  offOn()
  $(window).scroll(function () {
    offOn()
  })


  // 加载商品信息
  $.ajax({
    type: 'get',
    url: 'data/f_more.json',
    dataType: 'json',
    cache: false,
    success: function (json) {
      var newProducts = json.newProducts
      var hotSale = json.hotSale
      var smartAppliance = json.smartAppliance
      var toys = json.toys
      var smarttravel = json.smarttravel
      var patchPanel = json.patchPanel
      var goodSound = json.goodSound
      var lampTools = json.lampTools
      var router = json.router
      var clean = json.clean
      var parts = json.parts
      var source = json.source
      var str = ''
      function fn(name) {
        str = ''
        $.each(name, function (index, value) {
          // console.log(value);
          str += `<li code="${value.code}">
            <a href="#"><img src="${value.imgurl}" alt=""></a>
            <a href="#"><h3>${value.type}</h3></a>
            <h4>${value.title}</h4>
            <p>
              <strong>${value.Nprice}</strong><span>元</span>
              <i>${value.Yprice}</i>
            </p>
          </li>`
        })
      }
      fn(newProducts)
      $('.newProducts').html(str)

      fn(hotSale)
      $('.hotSale').html(str)

      fn(smartAppliance)
      $('.smartAppliance').html(str)

      fn(toys)
      $('.toys').html(str)

      fn(smarttravel)
      $('.smarttravel').html(str)

      fn(patchPanel)
      $('.patchPanel').html(str)

      fn(goodSound)
      $('.goodSound').html(str)

      fn(lampTools)
      $('.lampTools').html(str)

      fn(router)
      $('.router').html(str)

      fn(clean)
      $('.clean').html(str)

      fn(parts)
      $('.parts').html(str)

      fn(source)
      $('.source').html(str)
    }
  })

  // 本地存储数据
  // 假设本地存数数据为 goods : '{"codes" : ['abc1', 'abc2', 'abc3']}'
  $('.goods_inner').on('click', 'ul li a', function () {

    var code = $(this).parent().attr('code')
        // console.log(code);
        var codeArr = []
        //尾插，改变原数组  
        codeArr.push(code)
        //本地存储数据需要json字符串
        var codeStr = JSON.stringify({"goods":codeArr})
        localStorage.setItem("goods",codeStr)
  })



})

