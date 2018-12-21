// //generator 异步
// //generator异步主要依靠其半协程属性，当generator遇到yield语句时，会将流程的执行权交给yield后的语句即新的任务，再使用next()恢复generator本身的执行权
// //即将异步操作的后续操作放在yield后面，等到需要时用next()调用，获得异步任务结果，再使用next()重新执行主任务，改写回调函数；
// var fetch = require('node-fetch');
// //使用生成器定义一个fetch请求，yield调用fetch，并赋值给result，主任务输出result
// function* gen(){
//     var url = 'https://api.github.com/users/github';
//     var result = yield fetch(url);
//     console.log(result.bio);
// }
// //调用生成器gen返回一个可遍历对象赋值给g
// //g第一次调用next()方法，执行生成器并在yield表达式完成后暂停，即完成fetch
// //g.next()返回yield之后的内容,即fetch(url)返回一个promise对象
// var g = gen();
// var result = g.next();
// console.log(result);
// //next().value返回fetch(url)的promise对象
// //promise.then()处理请求的结果，即json解析返回的data
// result.value.then(
//     (data)=>{
//     return data.json();
// }).then(
// //将json数据data处理之后，关键一步
// //将data作为next()参数，改变生成器的内容，继续执行生成器
// //在gen中result赋值为next()传入的解析过的data数据，并log出result.bio
//     (data)=>{
//         g.next(data)
//     }
// )


//generator 函数的流程管理
//Thunk函数控制generator函数的流程
//thunkify函数将给参数的函数绑定一个回调函数参数
// var fs = require('fs');
// var thunkify = require('thunkify');
// var readFileThunk = thunkify(fs.readFile);
// var gen = function* (){
//     var r1 = yield readFileThunk('1.txt');
//     console.log(r1.toString());
//     var r2 = yield readFileThunk('2.txt');
//     console.log(r2.toString())
// }
//使用thunk函数，在回调函数里，将执行权还给generator
//g执行之后，返回第一个rf的结果 
// var g = gen();
// var r1 = g.next();
// console.log(r1)
// //r1的value是一个带有回调函数的fs函数，处理读取1.txt的内容，

// r1.value(
//     (err,data)=>{
//         if(err) {throw err};
// //r1回调函数将1.txt的返回结果使用next(data)传回gen并且恢复生成器执行执行console.log
// //gen中再次yield返回一个rf结果r2，r2和r1一样，是一个thunkify处理的含有回调参数的fs，得到2.txt内容
//         var r2 = g.next(data);
//         r2.value((err,data)=>{
//             if(err) throw err;
// //r2回调函数将2.txt的返回结果使用next(data)传回gen并且恢复生成器执行console.log
//             g.next(data)
//         })

//     }
// )
//thunk函数自动处理generator
//run函数内部有一个next函数，next就是thunk函数的回调函数
//传入的generator yield表达式必须是一个thunk函数
//next函数内部，1.调用run传入的生成器；2.调用next()方法，赋值给result；
//3.判断遍历器对象done是否结束；4.遍历器对象得到的value继续调用next函数，继续调用next方法
// function run(fn){
//     var gen = fn();
//     function next(err,data){
//         var result = gen.next(data);
//         if(result.done) return;
//         result.value(next);
//     }
//     next();
// }
// run(gen);

//co 模块 自动执行generator模块，不再需要编写执行器和thunk函数
//co函数传入一个生成器，返回一个promise对象，用then添加回调函数
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);
var gen = function* (){
    var r1 = yield readFileThunk('1.txt');
    console.log(r1.toString());
    var r2 = yield readFileThunk('2.txt');
    console.log(r2.toString())
}
var co = require('co');
co(gen).then(
    ()=>{
        console.log('生成器完成')
    }
);

