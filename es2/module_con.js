//module加载
//1.浏览器加载ES6模块，也使用script标签，type='module'
//1.1 浏览器带有es6 都是异步加载，即等到页面渲染完，再执行模块，等同于defer
//1.2 如果想让模块立即执行，需要设置async属性
//1.3 外部模块脚本，模块顶层this关键字返回undefined而不是指向window

//2.ES6 特别之处
//2.1 ES是输出值引用，CommonJS输出值拷贝
//2.2 ES是编译时输出接口，CommonJS是运行时加载
//2.1.1 commonjs值拷贝，一旦输出一个值，其模块内部变化不影响这个值最初在外部的输出值
//2.1.2 es6 import之后 会生成一个只读引用，指向其模块里的原始变量，
//模块原始值变化会引起外部引用值也变化

//3.node加载
//3.1 node有commonjs格式，和es6格式区分，es6模块采用.mjs后缀文件名
//如果文件里使用import或export 格式必须是mjs
//node支持，本地路径，url路径和node_modules目录

//4.内部变量，ES6 中不能使用CommonJS模块特有内部变量
//4.1 ES6 顶层this指向undefined
//4.2 arguments/require/module/exports/__filename/__dirname不存在

//ES6 模块加载CommonJS模块
//1.Node的import命令加载CommonJS模块，Node会自动将module.exports属性，当作模块的默认输出，即等同于export default xxx

