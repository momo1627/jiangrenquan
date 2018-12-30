//1.传统原型继承类prototype
//1.1 构造函数创建对象的属性和方法
// function NewClass(x,y){
//     this.x = x;
//     this.y = function(){console.log(y)}
// }
//1.2 new 语句创建新的对象
// var example = new NewClass('haha','hehe')
//1.3 原型prototype.method 和 prototype.property 动态定义类的属性和方法
//动态添加在构造函数原型的属性或方法会立即添加在所以构造函数创建的对象上
// NewClass.prototype.z = console.log('xixi')
// example.z;

//2.class概念传统的面向对象；作为类的语法糖，让对象原型的写法更清晰，更像面向对象编程语法
//2.1 class是构造函数另一种写法，类的原型属性依然存在；相当于newClass.prototype = {constructor(){},otherFunction(){}}
//2.2 constructor()构造方法，在其中定义属性；
//2.3 方法在class中直接定义；
class NewClass{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        console.log(this.x)
    }
}
//3.class 相关新对象方法
//3.1 Object.assign(Classname.prototype,{new properties,new methods})
//3.2 类内部定义方法都是不可枚举的，只能用getOwnPropertyNames(class.prototype);
//3.3 constructor 方法默认返回实例对象，即this指向实例对象

//4. 类的实例
//4.1 类的实例对象自身属性都在constructor中，
//4.2 但是其他方法是原型对象属性，定义在类的prototype上
//4.3 所有实例对象共享一个原型对象，instance.__protp__和class.prototype是相等的，都可以添加属性；
//但是不推荐用实例对象的原型添加新的属性，会改变类的原始定义；

//5.get和set函数

//6.属性表达式
//let methodname = 'getArea'; class Square{[methodname](){}};
//7.class表达式
//cosnt Myclass = class Me{...} 或 class {}

//7.注意点
//7.1 默认严格模式
//7.2 类不存在变量提升;
//7.3 class其实是构造函数的包装，许多特性都有继承，比如name属性
//7.4 对象也可以有generator函数
//7.5 class内所有this都指向实例对象；但是如果提取出对象的方法，容易出错
//7.5 所以两种方法，1.constructor里使用this.method=this.method.bind(this)
//2.使用箭头函数，可以自动绑定this


// 8.静态方法 static
//8.1类中定义的方法前 用static定义静态方法，则此方法直接通过类调用，并且不继承给实例对象
//8.2静态方法中的this指向类而不是实例
//8.3静态方法可被子类继承

//9.实例属性的新写法
//9.1 属性可以写在constructor里，也可以写在对象类的最顶层
//9.2 静态属性只有写在类的最顶层才有用，这样不需要通过原型定义静态属性

//10.私有方法和私有属性
//10.1 可以_functionname(){}表明是对象内部私有方法属性，只在对象内部调用
//10.2 在class外部定义私有属性
//10.3 通过symbol对象定义唯一命名，在class内部通过属性表达式[name]定义属性和方法，如此达到私有效果
//10.4 最新提案 命名前#表示私有属性，只能在内部调用 this.#name 外部报错

//11. new.target属性 new命令的属性
//用来确定构造函数是怎么调用的，返回new作用于的哪个构造函数
//class内部调用返回当前calss
//子类返回子类，因此可以写出不能独立使用，必须继承后才能使用的类
class Shape{
    constructor(){
        if(new target === shape){
            throw new Error('本类不能实例化')
        }
    }
}
class Rectangle extends Shape{
    constructor(){
        super();
    }
}
// 此例中 Shape类不能定义实例，因为他的类就是他本身，他的子类，target指向子类本身，可以定义实例