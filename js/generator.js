//0.generator函数 调用结果 返回一个可遍历对象，iterator。
//1.1.generator函数中每一个yield之后的表达式和done状态作为一个对象构成iterator的一个数据，
//return表达式和done：true作为可遍历对象最后一个数据，如果没有return，则为undefined，done:true
//1.2.iterator.next() 每次调用都会返回可遍历对象的下一个对象数据，直到done为true
// function* gen(x){
//     var y = yield x+2;
//     yield x+3;
//     yield x+4;
//     return y;
// }
// var g = gen(1);
// console.log(g.next());

//2.1 return只能执行一次，即一个函数只能返回一次值；yield能执行多次，即一个generator可以返回多个值，即可遍历对象；
//甚至可以使用循环返回无限个值，但是yield只能用在generator里
//2.2 yield* 执行一个可遍历对象，将可遍历对象的每一个数据都yield生成generator的可遍历对象
//2.3 yield在另一个表达式中必须用(yield)，作为函数参数，和赋值表达式的值 不需要括号

//3.使用generator，调用对象symbol.itertator方法,生成对象的遍历器对象,使对象可遍历，使用...运算符
// var myIterable = {};
// myIterable[Symbol.iterator] = function* (){
//     yield 1;
//     yield 2;
//     yield 3;
// };
// var i = [...myIterable];
// console.log(i)

//4.0 next()会执行generator函数中上一个yield之后到下一个yield之间的语句，并且返回yield的表达式之后作为可遍历对象的value；
//4.1 next()的参数会被当作上一个yield及其后表达式,即替换上一个yield语句，
//从而在generator开始运行后，继续向函数体内部注入值，从而调整函数运行
//4.2 第一次调用next()是启动generator的，没有上一个yield，所以没有参数；
//4.3 每一次next带有参数的调用，都会彻底覆盖调yield表达式；影响下一个next()调用的结果；
// function* f(){
// console.log('hello');
// console.log(`1. ${yield 'daniel'}`)
// console.log(`2. ${yield 'yin'}`)
// return 'world';
// }
// var g = f();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());

//5.generator内部部署try..catch代码块，使用throw方法抛出error,throw的参数会被catch接收，当catch在内部执行过后，将不会接收新的throw
//而外部try..catch代码块会接受，多余的throw error
//5.1 throw前必须执行一次 next()即启动generator；
//5.2 throw被捕获之后，会附带执行下一条yield表达式，即执行一次next
//5.3 generator执行过程中抛出错误，没有被内部捕获，就不会执行下去，next()返回undefined，done
// var g = function* (){
//         try{
//             yield console.log('a');
//         } catch (e){
//             // console.log('internal catch',e)
// }
//         yield console.log('b');
//         yield console.log('c')
// }
// var i = g();
// i.next();
// i.throw('d');
// i.next();
// try {
//     i.throw('a');
//     i.throw('b');
// } catch(e){
//     console.log('external catch',e)
// }
// function* gen1(x){
//     try{
//         var y = yield x + 2;
//     } catch(e){
//         console.log(e)
//     }
//     return y;
// }
// var g = gen1(1);
// console.log(g.next());
// g.throw('error');

//6.generator return 返回给定的值，并终结遍历器
