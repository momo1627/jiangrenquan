//1.generator 每次next返回内部指向的yield后面的表达式。直到只想return结束
// function* gen(x){
//     var y = yield x+2;
//     yield x+3;
//     yield x+4;
//     return y;
// }
// var g = gen(1);
// console.log(g.next());
//2.generator next(参数)的参数会取代return后的表达式
// console.log(g.next(2));
// console.log(g.next(2));
// console.log(g.next(2));
//3.generator 使用throw方法抛出error
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
//4.generator async
var fetch = require('node-fetch');
function* gen(){
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio)
}
var g = gen();
var result = g.next();
