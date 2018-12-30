//1.class 继承语句 extends
class PointP{};class ColorPoint extends Point{};
//1.1 super关键字表示父类的构造函数；子类constructor必须调用super()，新建父类的this，指向继承属性和方法
//es6继承是，先用super将父类对象数学方法加到this，再用子类构造函数改造this
//子类实例构建，调用super以后，才嗯那个使用this关键字，只有super方法才能调用父类实例
//1.2 子类会默认添加constructor方法
//1.3 子类实例同时也是父类的实例

// 2 object.getPrototypeOf()
//从子类上获取父类，判断一个类是否继承了另一个类；

// 3 super 既可以当作函数，又可以当作对象
//3.1 super函数，代表父类构造函数，super内部的this指向的是B
//作为函数super()只能用在子类构造函数中
//3.2 super对象，指向父类的原型对象，静态方法中指向父类，
//3.2.1 super指向父类的原型对象，所以super是不能调用父类实例上的方法和属性的
//3.2.2 子类普通方法中，super调用父类方法时，方法的this指向当前子类实例；
//3.2.2 如果调用子类对某个属性赋值，这是super就时this，赋值的属性，会变成子类实例的属性

// 4 prototype 和 __proto__属性 两条继承链
//4.1 子类的__proto__，总是指向父类，表示构造函数的继承
//4.2 子类的prototype属性的__proto__，总是指向父类的prototype属性，表示方法的继承
//4.3 子类B的原型(__proto__)是父类A，子类B的原型对象(prototype)是父类的原型对象的实例
//B.prototype.__proto__ = A.prototype
//4.4 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性
//子类的原型的原型，是父类的原型；
//也就是修改子类实例的原型的原型属性，会影响父类的实例；

//5 Mixin 模式 多个对象合成一个新的对象，新的对象具有各个成员的接口
