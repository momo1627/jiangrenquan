//destructuring 解构赋值的本质是模式匹配，只要两边模式相同，左边的变量就会赋予对应的值
//1. 数组
//1.1 基本用法
let [a,b,c] = [1,2,3];
//1.1.1 嵌套 按照嵌套对应赋值
let [a,[[b],c]] = [1,[[2],3]];
//1.1.2 缺省赋值 按照位置跳过缺省变量对应的值
let[x,,y] = [1,2,3]
//1.1.3 解构不成功 变量声明成功但undefined
let[x,y,z] = [1]
//1.1.4 扩展运算符 spread spread必须放在最后，赋值多余的值，
//如果结构不成功，spread变量数组声明成功，但数组为空
let[d,...arr] = [1,2,3]
//1.1.5 不完全结构 左边只匹配右边一部分，结构依然成功
let[a,[b],d] = [1,[2,3],4]
//1.1.6 右边不是可遍历结构，将会报错 只要是可遍历结构，都可以赋值成功
let[...arr] = [可遍历]
//1.1.7 默认值 可以设置默认值，但是必须是undefined才能使用，也就是结构不成功，或undefined赋值
let[x,y='b'] = ['a'];
// 默认值可以设置为前一个变量,不论前一个默认值还是结构成功，
let[x='a',y=x] = ['b']
 
//2.对象赋值 对象赋值后的变量是普通变量，而不是整个对象的属性
//对象结构赋值的本质 属性名对应后，值赋值给变量，属性名只是匹配模式
let {foo:foo,bar:bar} = {foo:'aaa',bar:'bbb'}
//2.1 对象赋值是根据属性名，取到对应的值，属性名不对应 则声明赋值undefined
let {foo,baz} = {foo:'aaa',bar:'bbb'} //实际省略了左边对象的属性名
//2.2 非对应属性名赋值，给新变量作为对应属性名的值 //由于不对应，不能省略属性名
let {foo:baz,bar} = {foo:'aaa',bar:'bbb'}
//2.3 嵌套匹配 要分清匹配模式和变量
//由于p是匹配模式，所以p本身不会赋值，右边对象整体也不会赋值给变量
let {p:[x,{y}]} = {p:['hello',{y:'world'}]} 
//2.4 对象整体匹配 即匹配模式和变量名相同，
let {p} = {p:['hello',{y:'world'}]} 
//2.5 变量属性赋值和数组赋值
let obj={};arr=[];({foo:obj.prop,bar:arr[0]}={foo:123,bar:true})
//2.6 对象也可以默认赋值
//2.7 已声明变量用于解构赋值，要用()包裹，因为会被识别为代码块
let x; ({x}={x:1})

//2.8 解构赋值的常用应用，从一个现有对象的方法或属性，复制到某个变量
let {log,sin,cos} = Math;
let {state:props} = this.state;

//3.字符串类似数组一样解构赋值

//4.数值和布尔值解构赋值；如果右边是数值和布尔值则作为对象看待

//5.函数参数的解构赋值
//5.1 数组参数
//函数调用时参入传入就被解构成变量x和y，函数内部会只是别变量x，y而不是一个数组
function add([x,y]){return x+y} add([1,2]) 
//5.2 对象参数
function add({x=0,y=0}){return [x,y]} add({x:3,y:8})

//6 圆括号使用 可能导致模式和变量歧义时，不能使用圆括号。
//只要有可能就不要在模式中使用括号
//6.1 不能使用圆括号的情况
//6.1.1 变量生命语句
//6.1.2 函数参数
//6.1.3 赋值语句的模式 不能出现括号

//6.2使用括号情况 赋值语句的非模式部分
//即只要不是对象的模式名，或者变量名

//7. 用途
//7.1 交换变量值
[x,y] = [y,x]
//7.2 从函数返回多个值
function example(){return [1,2,3]}
let [a,b,c] = example()
function example(){
    return{foo:1,bar:2}
}
let {foo,bar} = example();
//7.3 函数参数的定义
//参数是一组有序的值，用数组
function f([x,y,z]){} f([1,2,3]);
//参数是一组无序的值，用对象
function f({x,y,z}){} f({z:3,y:2,x:1})

//7.4 提取对象中的数据，尤其是JSON
let{id,status,data:number} = JSON({id:42,status:'ok',data:[123,456]})

//7.5 函数参数默认值
function ajax(ur,{async=true,cathe=true});

//7.6 遍历Map结构
for (let [key,value] of map){}

//7.7 模块
//es5 
const {aaa,bbb} = require('ccc');
//es6
import React,{Component} from 'react';
