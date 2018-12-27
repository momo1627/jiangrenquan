// 异步遍历器，为异步操作提供原生的遍历器接口，即value和done也是异步产生；
//也就是遍历器对象调用next()方法，并不会同步得到value和done对象

//1.异步遍历器的核心：调用next()，返回一个promise对象，
//这个promise对象的resolve的then方法回调函数的参数是{value:xxx,done:xxx}对象；

//2.对象异步遍历器接口部署在：Symbol.asyncIterator属性，只要这个属性有值，就表示应该对他进行异步遍历；
//2.1 当asyncIterator.next()调用时，返回一个promise对象
//2.2 当asyncIterator.next().then(resolve)调用时，返回当前遍历器对象{value:xxx,done:xxx}
// asyncIterator.next().then(
//     iteratorResult1=>{
//         console.log(iteratorResult1);
//         return asyncIterator.next();
//     }
// )
// ,then(iteratorResult2=>{
//     console.log(iteratorResult2);
//     return asyncIterator.next();
// });
//2.3 异步遍历器实质是 next()方法返回一个 promise对象作为中介，
//使用await 执行此promise对象即next()方法，await返回的即使resolve的参数，也就是当前遍历器对象{value:xxx,done:xxx}；
//async await改写异步遍历器
// async function f(){
//     console.log(await asyncIterator.next());//iteratorResult1
//     console.log(await asyncIterator.next());//iteratorResult2
//     console.log(await asyncIterator.next());//iteratorResult3
// }
//2.4 异步遍历器的next()可以连续调用，可以把所有next方法放在promise.all方法里；然后解构赋值；
// const [{value:v1},{value:v2}]=await Promise.all([asyncIterator.next(),asyncIterator.next()])

//3 for await x of xs循环 用于遍历异步的iterator接口;
//3.1 createAsyncIterable返回一个拥有异步遍历器接口的对象；
//3.2 for of 循环自动调用这个异步遍历器接口对象的next()方法，得到promise对象
//3.3 await 处理promise对象，promise对象状态为resolve时，resolve的参数就是x，传入循环代码块中；
// async function f(){
//     for await (const x of createAsyncIterable(['a','b'])){
//         console.log(x)
//     }
// }
//3.4 将for await of放入try catch(e)代码块 捕获promise.reject的结果；
// async function f(){
//     try {
//         for await (const x of createAsyncIterable(['a','b'])){
//             console.log(x)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//3.5 for await of也可以执行同步遍历器；
// (async function(){
//     for await(const x of ['a','b']){
//         console.log(x);
//     }
// })()

//4 node v10 stream异步遍历器应用
//传统写法；
// var fs = require('fs');
// function main(inputFilePath){
//     const readStream = fs.createReadStream(
//         inputFilePath,
//         {encoding:'utf-8',highWaterMark:1024}
//     );
//     readStream.on('data',(chunk)=>{
//         console.log('>>>' + chunk);
//     })
//     readStream.on('end',()=>{
//         console.log('### Done ###')
//     })
// }
// main('./1.txt')
//异步遍历器写法：fs.createReadStream返回的是异步遍历器，
//调用其next()方法返回promise对象，再调用then()方法返回文件每一行的内容
// async function main1(inputFilePath){
//     const readStream = fs.createReadStream(
//         inputFilePath,
//         {encoding:'utf-8',highWaterMark:1024}
//     );
//     for await (const chunk of readStream){
//         console.log('>>>' + chunk);
//     }
//     console.log('### Done ###')
// }
// main1('./2.txt')

//5 异步generator函数，返回一个异步遍历器对象，即async函数 与 generator函数结合
//generator.next()方法返回一个promise对象，promise对象resolve状态下，
//then()方法的参数，是yield后表达式的值和done属性组成的对象；
// async function* gen(){
//     yield 'hello';
//     yield 'world';
// }
// const genObj = gen();
// genObj.next().then(x=>{console.log(x.value)})
//5.1 async generator函数可以用同一套接口处理同步操作和异步操作；
//异步操作的next()返回promise对象，在async中使用await执行；
//异步generator函数中，await引入外部值入函数
//yield输出内部值到函数外，每次next()输出yield后promise对象
// async function* readLines(path){
//     let file = await fileOpen(path);
//     try {
//         while(!file.EOF){
//             yield await file.readLine();
//         }
//     } finally {
//         await file.close();
//     }
// }
// const rs = readLines('./1.txt');
// rs.next().then(x=>{console.log(x)})
//5.2 异步generator每个yield返回一个promise对象
//所以可以用一个async函数 await 每一个generator对象
//(async function(){
//     for await (const line of readLines(filePath)){
//         console.log(line)
//     }
// })
//5.3 for await ... of {yield} 异步generator函数内部也可以使用；
//5.4 async generator 返回一个异步遍历器iterator，每次调用next()返回一个promise对象，而不是直接的value，done对象
//也就是函数内部，yield后面是一个promise对象，即使不是，也会自动包装成promise对象
//promise对象resolve的参数，即是iterator的value，done对象 
//5.5 yield* 也可以跟一个异步遍历器 async iterator
var fetch = require('node-fetch');
function fetchRandom(){
    const url = 'https://www.random.org/decimal-fractions/' + '?num=1&dec=10&col=1&format=plain&rnd=new';
    return fetch(url);
}
async function* asynG(){
    console.log('start');
    const result = await fetchRandom();
    yield 'Result: '+await result.text();
    console.log('done')
}
//5.4.1 ag.next()返回一个promise即 await result.text()
//5.4.2 asynG开始执行到yield语句，然后停在yield
//5.4.3 第一个await 完成赋值给result变量
//5.4.4 第二个await 返回一个promise对象给iterator,等待再一次调用next()
//5.4.5 iterator 调用then()其回调函数的参数是{value,done}对象
//5.4.6 value的值是yield之后的表达式await result.text()的返回值
const ag = asynG();
ag.next().then(x=>{
    console.log(x)
});
//6.普通async函数返回一个promise对象
//6.1 async generator 返回一个异步iterator对象，他的每一个next()方法，返回一个promise
//6.2 他们都是封装异步操作的方法，但是async generator 需要一个执行器，通过for await of 执行 generator的特性

//7 4种函数 function； async； generator； async generator；
//如果一系列有顺序的异步函数，考虑使用async
//如果一系列产生相同数据结构的异步操作，例如一行一行读取文件，可以使用异步generator 

