var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//1.callback
// function callback(){
//     console.log('Done');
// }
// console.log('before setTimeout');
// setTimeout(callback,1000);
// console.log('after settTimeout()');

//2.promise
//promise 意义在于将异步的主进程函数和回调函数内容分开，代码结构易读
//并且promise对象是链式结构，then和catch方法的结果仍是一个promise对象；
// function prom(resolve,reject){
//     const timeOut = Math.random()*2;
//     console.log(`set timeout to: ${timeOut} seconds`);
//     setTimeout(()=>{
//         if(timeOut<1){
//             console.log('call resolve');
//             resolve('done');
//         } else{
//             console.log('call reject');
//             reject('failed');
//         }
//     },timeOut*1000)
// }
// const p1 = new Promise(prom);
// const p2 = p1.then((result)=>{console.log(result)});
// const p3 = p2.catch((result)=>{console.log(result)});
//2.1 promise多任务异步
//从主任务开始，then的回调函数resolve执行返回一个新的promise对象，即新的任务。一直到任务结束或catch错误为止
// function multiply(input){
//     return new Promise((resolve,reject)=>{
//         console.log(`caculating ${input} * ${input}`);
//         setTimeout(resolve,500,input*input)
//     })
// }
// function add(input){
//     return new Promise((resolve,reject)=>{
//         console.log(`caculating ${input} + ${input}`);
//         setTimeout(resolve,500,input+input)
//     })
// }
// const prom = new Promise((resolve,reject)=>{
//     console.log('start promise chain');
//     resolve(123);
// })
// prom.then(multiply).then(add).then((result)=>{
//     console.log(`get result: ${result}`)
// }).catch(()=>{console.log('error')})
//3.promise+ajax
//设置请求函数，绑定参数，返回一个promise对象，
//promise对象的主任务定义了http的请求过程，初始化请求，发送请求
//resolve处理请求的返回结果，reject处理错误
//then定义如何处理请求成功的返回结果，
function ajax(method,url,data){
    const request = new XMLHttpRequest();
    return new Promise((resolve,reject)=>{
        request.onreadystatechange = ()=>{98
            if (request.readyState === 4){
                if(request.status === 200){
                    resolve(request.responseText);
                } else{
                    reject(request.status);
                }
            }
        }
        request.open(method,url);
        request.send(data);
    })
}
const p = ajax('GET','http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice');
p.then((text)=>{
    console.log(text)
})


















































































































































































































































































































































































































































































































































































