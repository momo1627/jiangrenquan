//import es6模块不是对象，二十输出代码块，静态加载所选的代码块；
//1.export 用于规定模块的对外接口，使外部能够读取模块内部的某个变量
//1.1 export 可以输出变量，函数，对象
//1.2 export写法 要么在声明变量时输出，要么在{}里输出
//1. export var/const variable/function(){}/object{}
//2. export {variable1,variable2,...}
//3. export {variable1 as name1,variable2 as name2}
//1.3 export 输出代码块内动态的实时值

//2. import 用于加载其他模块的export输出的接口
//2.1 import {variable as name,...} from 'path_module'
//2.2 import 输入都是只读，不允许加载模块改写接口
//2.3 但是如果是一个对象，却可以改写对象的属性，但不要轻易改变对象属性
//2.4 import路径，可以相对也可以绝对，也可以时文件名，但是需要配置文件

//3.特殊命令
//3.1 import * as object_name；将模块内所有输出内容，引入到一个对象中，
//3.1.1通过对象属性调用，并且不能改变
//3.2 export default 输出匿名默认变量，使用import加载时，需要命名
//3.2.1 输出或输入默认变量，都不需要{}
//3.2.2 export default 只能使用一次
//3.2.3 本质上就是输出一个叫做default的变量或方法，export {add as default}/import {default as add} from
//3.2.4 因此export default后面不能跟变量声明语句，实质是将一个变量或方法赋值给default
//3.2.5 普通变量/方法/类 export/import需要用{}或输出声明语句
//3.2.5 default变量/方法/类 不需要；只要语法正确，可同时输出输入普通和默认

//4.export和import复合写法
//4.1 转发接口 export {var1,var2} from 'my_module';直接转发，当前模块并没有导入var
//4.2 接口改名 export {var1 as name1} from 'my_module';
//4.3 整体输出 export * from 'my_module'
//4.4 改默认输出 export {name as default} from 'my_module';
//4.5 默认改具名 export {default as name} from 'my_module';
//4.6 通过整体输出和改名可以实现module的继承

//5.跨模块常量
//当前模块将常量模块整体导入，并且引入一个constants变量中
//5.1 常量很多时候可以建专门的constants目录，将各种常量写在目录下不同文件里
//5.2 将所有常量文件在index文件中全部转发，使用时直接加载index文件就可以了
//export{db} from './db'; export{users} from './users';import {db,users} from './constants/index'

//6.import(specifier)，动态加载，即加载命令可以放入其他语句执行；
//6.0 import('./module.js')返回一个promise对象,reslove import载入的内容变量
//6.1按需加载；例如事件监听，加载某个模块
//6.2条件加载，if语句中，满足条件加载某个模块
//6.3动态模块路径 import(f()).then(...)
//6.4 使用指南
//6.4.1 .then(结构赋值)使用结构赋值获取输出接口
//6.4.2 .then(defualt=>{})default接口直接用参数获得
//6.4.3 多个加载promise.all([import(),import().import()]).then(([module1,module2,module3])=>{})
//6.4.4 async function main(){await promise.all([import(),import()])}

