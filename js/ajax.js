//1.新建http请求对象
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const success = (result)=>{
    console.log(result);
}
var request = new XMLHttpRequest()
//2.设置请求对象onreadystatechange事件，即定义请求处理
request.onreadystatechange = ()=>{
//3.request.readyState是请求状态，4代表成功，即可以处理请求结果
    if (request.readyState === 4){
//4.request.status是请求的响应结果，即http请求/响应状态码，200为成功返回结果
        if(request.status === 200){
//5.异步结果处理，响应成功，使用success函数处理响应结果，request.responseText
            success(request.responseText);
            success(request.responseURL);
        } else{
//6.异步结果处理，相应失败，使用失败函数处理
            console.log('failed')
            console.log(request.status)
        } 
    } else{
        console.log('waiting request')  
    }
}
//7.request.open(),初始化请求，定义请求模式，目标等等
request.open('GET','/api/categories');
//8.request.send()发送请求
request.send()
