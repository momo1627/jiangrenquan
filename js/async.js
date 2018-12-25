
//genertor函数 实现请求的主任务流程
//1.yield request 完成异步请求 返回一个promise对象
//2.之后内容处理请求结果 console.log
//generator执行过程 实现请求内容处理
//1.调用可遍历对象 next方法 执行yield请求，返回value为请求结果promise的对象
//2.使用promise then方法 处理请求结果，data.json()
//3.调用next方法，通过next参数将请求结果重新传入generator函数，并继续主任务流程
//4.主任务return 任务完成
//通过promise处理也能实现任务，但是将所有主任务流程放入生成器函数，会使任务同步化，更容易理解
// var fetch = require('node-fetch');
// function* gen(){
//     var url = 'https://api.github.com/users/github';
//     var result = yield fetch(url);
//     console.log(result.bio);
// }
// var g = gen();
// var result = g.next();
// result.value.then((data)=>{
//     console.log(data)
//     return data.json();
// })
// .then((data)=>{
//     g.next(data);
//    console.log(data.bio);
// })

//async await是generator语法糖，使生成器异步更加同步化，更方便，更易读
 //1.async内置执行器，不需要另写co等执行函数
 //2.async await语义明确，易读
 //3.await后可接promise和原始类型数据，适用广泛
 //4.返回promise而不是iterator，更容易操作
 //async 可以看作多个异步操作，包装成一个promise对象，await就是内部的then命令

 //async语法
 //0.async调用后，返回一个promise对象
 //1.return的值，会成为then方法的回调函数的参数
//  async function f(){
//      return 'hello world';
//  }
//  f().then(v=>console.log(v))
//2.async内抛出的错误，会让promise对象reject状态的catch捕获

//  async function f(){
//      throw new Error('出错啦')
//  }
//  f().catch(e=>{console.log(e)})

//3.async返回promise对象，必须当async函数中await之后的异步执行完成，才会执行async返回promise对象的then的回调函数
// const fetch = require('node-fetch')
// async function getTitle(url){
//     let response = await fetch(url);
//     let html = await response.text();
//     // return html.match(/<title>([\s\S]+)<\/title>/i)[1];
//     return html
// }
// getTitle('https://tc39.github.io/ecma262/').then(console.log);

//4.await 一般情况await后面是一个promise对象，并返回该对象得到结果，如果不是await对象则直接返回对应值
// async function f(){
//     return await 123
// }
// f().then(console.log)
//4.1 如果await后是一个thenable对象，即定义then方法的对象，也就是类promise对象，将其等同于promise
// class Sleep{
//     constructor(timeout){
//         this.timeout = timeout
//     }
//     then(resolve,reject){
//         const startTime = Date.now();
//         setTimeout(
//             ()=>{resolve(Date.now()-startTime)},
//             this.timeout
//         )
//     }
// }
// (async()=>{
//     const actualTime = await new Sleep(1000);
//     console.log(actualTime)
// })()

//4.2 await后 promise对象进入reject状态，则reject参数会被async函数catch捕获，并且async会立即停止，不会执行之后语句；
//4.2.1为了不让一个异步操作失败中断之后其他异步操作，可以将await放入try catch结构
// async function f(){
//     try {
//         await Promise.reject('error');
//     } catch(e){
//         console.log(e)
//     }
//     return await Promise.resolve('ok')
// }
// f().then(console.log)
//4.2.2 或者可以给reject的promise对象添加catch处理方法，处理可能的错误
// async function f(){
//         await Promise.reject('error').catch(console.log);
        
//     return await Promise.resolve('ok')
// }
// f().then(console.log)

// 5.错误处理 async函数错误主要处在await后的promise进入reject状态，所以将所有await放入try catch结构中，处理错误。并且可利用循环反复尝试await的内容
//6.使用注意；
//6.1 try...catch处理await 错误
//6.2 多个await的异步操作，如果不存在继发关系，最好同时触发
//继发关系写法，前一个异步完成，再执行后一个异步，影响效率
let foo = await getFoo();
let bar = await getBar();
//同时执行写法；Promise.all()
//1
let [foo,bar] = await Promise.all([getFoo(),getBar()])
//2
let fooPromise = getFoo();let barPromise = getBar();
let foo = await fooPromise; let bar = await barPromise;
//6.3 await 只能用在async函数里(yield只能用在generator里)
//6.4 async函数可以保留运行栈堆
const a = async()=>{
    await b();
    c();
}
//当a函数执行时，b函数异步操作会停止a的执行，如果b，c发生错误，a的上下文仍然保持，a会被加入错误栈；
//如果a是普通函数，b错误前，a就已经完成，b所在上下文已经消失，a不会被放入错误栈



