var b_btn1=document.querySelector('.b_btn1');
var b_btn2=document.querySelector('.b_btn2');
var b_btn1Box=document.querySelector('.b_btn1Box');
var b_btn2Box=document.querySelector('.b_btn2Box');
var b_logo_btn=document.querySelector('.b_logo_btn');

b_btn1.onclick=function(){
    b_btn1Box.classList.add('active');
    b_btn2Box.classList.remove('active');
    this.classList.add('col');
    b_btn2.classList.remove('col');
    
};
b_btn2.onclick=function(){
    b_btn2Box.classList.add('active');
    b_btn1Box.classList.remove('active');
    this.classList.add('col');
    b_btn1.classList.remove('col');
    
};

var user=document.getElementById('user');
var password=document.getElementById('password');

user.value=localStorage.getItem("user");


b_logo_btn.onclick=function(){
    ajax({
        url:'./data/login2.php',
        type:'get',
        data:'user='+user.value+'&pass='+password.value+'&act='+this.getAttribute('name'),
        success:function(json){
            var data=JSON.parse(json)
            if(data.msg=='登陆成功'){
                setCookie("username",user.value,1)
                location.href='./b_shopcar.html';
            }
        }
    });
};






function ajax(option){
    // 1.创建XMLHttpRequest对象(数据交互对象)
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = ActiveXObject('Microsoft.XMLHTTP');//ie 5 6
    };
    // data -> 'a=123&b=456'
    if (option.type == 'get' || option.type == 'GET') {
        // 2.打开与服务器的链接
        xhr.open(option.type,option.url + '?'+ option.data + '&_='+new Date().getTime(),true);//解决缓存
        // 3.发送请求
        xhr.send(null);//get请求
    } else if (option.type == 'post' || option.type == 'POST'){
        // 2.打开与服务器的链接
        xhr.open(option.type,option.url,true);//解决缓存
        // 模拟表单form的post方式提交数据，在send之前设置
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // 3.发送请求
        xhr.send(option.data);//post请求
    } else {
        alert('目前只支持get和post请求方式!');
    };

    // 4.等待服务的响应
    xhr.onreadystatechange = function (){
        // console.log(xhr.readyState);//2 3 4
        if (xhr.readyState == 4) {//请求完成
            if (xhr.status == 200) {//请求成功
                option.success(xhr.responseText);
            }else {//请求失败
                option.failed(xhr.status);
            }
        }
    };
}