// 设置cookie函数
function setCookie(key,val,day){
    if(day){
        var d=new Date();
        d.setDate(d.getDate()+day)
        document.cookie=key+'='+escape(val)+';expires='+d;
    }else{
        document.cookie=key+'='+escape(val);
    }
}


// 获取cookie
function getCookie(key){
    var arr=document.cookie.split('; ');
    for(var i=0,len=arr.length;i<len;i++){
        var arr1=arr[i].split('=')
        if(arr1[0]==key){
            return unescape(arr1[1]);
        }
    }
    return null;
}


// 删除cookie
function remove(key){
    setCookie('key','333',-3)
}