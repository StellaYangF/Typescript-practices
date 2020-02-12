namespace c {
    /**
     * 定义
     */
    class Person {
        name: string;
        getName(): void {
            console.log(this.name);
        }
    }
    let p1 = new Person();
    // p1.name = 1;
    p1.name = 'Stella';
    p1.getName();


    /**
     * 存取器
     */
    class User {
        myname: string;
        constructor(myname: string) {
            this.myname = myname;
        }
        get name() { // A 'get' accessor must return a value.
            return this.myname;
        }
        set name(value: string) {
            value !== this.myname && (this.myname = value);
        }
    }
    let u = new User('Stella');
    u.name = 'Vivian';
    console.log(u);


    /**
     * 参数属性
     */
    class Student {
        constructor(public myname: string) { }
        get name() {
            return this.myname;
        }
        set name(value: string) {
            this.myname = value;
        }
    }
    let s = new Student('Stella');
    s.name = 'Vivian';
    console.log(s.name);

    /**
     * readonly
     */
    class Animal {
        public readonly name: string;
        constructor(name: string) {
            this.name = name;
        }
        changeName(name: string) {
            // this.name = name; 
            // Cannot assign to 'name' because it is a read-only property.
        }
    }

    /**
     * 继承
     */
    class Man {
        name: string;
        age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
        getName(): string {
            return this.name;
        }
        setName(name: string): void {
            this.name = name;
        }
    }

    class Tutor extends Man {
        no: number;
        constructor(no: number, name: string, age: number) {
            super(name, age);
            this.no = no;
        }
        getNo() {
            return this.no;
        }
    }
    let t = new Tutor(1, 'Jassada', 18);
    console.log(t.getNo());
    console.log(t);

    /**
     * 类里面的修饰符  
     * public     //类里面 子类 其它任何地方外边都可以访问
     * protected  //类里面 子类 都可以访问,其它任何地方不能访问
     * private    //类里面可以访问， 子类和其它任何地方都不可以访问
     */
    class Father {
        public name: string;
        protected age: number;
        private money: number;

        constructor(name: string, age: number, money: number) {
            this.name = name;
            this.age = age;
            this.money = money;
        }

        getName() {
            return this.name;
        }
        setName(name: string): void {
            this.name = name;
        }
    }

    class Child extends Father {
        constructor(name: string, age: number, money: number) {
            super(name, age, money);
        }
        desc() {
            console.log(`${this.name} ${this.age} `);
            // ${this.money}
            // Property 'money' is private and only accessible within class 'Father'.
        }
    }
    let child = new Child('Stella', 18, 2000);
    console.log(child.name);
    // console.log(child.age);
    // Property 'age' is protected and only accessible 
    // within class 'Father' and its subclasses.

    // console.log(child.money);
    // Property 'money' is private and only accessible 
    // within class 'Father'.


    /**
     * 静态属性 静态方法
     */
    class Mother {
        static className: string = 'Mother';
        static getClassName(): string {
            return this.className;
        }
    }
    console.log(Mother.className);
    console.log(Mother.getClassName());
    let m = new Mother();


    /**
     * 装饰器
     *  - 类：监视、修改、替换类定义
     *  - 属性
     *  - 方法
     *  - 参数
     * 写法
     *  - 普通装饰器
     *  - 装饰器工厂
     */
}

namespace decorator1 {
    /**
     * 类 装饰器
     */
    interface Person1 {
        name: string;
        eat(): void;
    }
    function enhancer(target: any) {
        target.prototype.name = 'Stella';
        target.prototype.eat = function () {
            console.log('eat');
            return 'eat';
        }
    }
    @enhancer
    class Person1 {
        constructor() { }
    }
    let p: Person1 = new Person1();
    console.log(p.name);
    p.eat();
}

namespace decorator2 {
    interface Person {
        name: string;
        eat: (food: string) => void;
    }
    function enhancer(name: string) {
        return function enhancer(target: any) {
            target.prototype.name = name;
            target.prototype.eat = (food: string) => console.log(`eat ${food}`);
        }
    }
    @enhancer('Stella')
    class Person {
        constructor() { }
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat('cabbage');
}

namespace decorator3 {
    interface Person {
        name: string;
        eat(): void;
    }
    function enhancer(target: any) {
        return class {
            name: string = 'Stella';
            eat() {
                console.log('eat something spicy');
            }
        }
    }
    @enhancer
    class Person {
        constructor() { }
    }
    let p: Person = new Person();
    console.log(p.name);
    p.eat();
}

namespace decorator4 {
    /**
     * 属性装饰器
     */
    function upperCase(target: any, propertyKey: string) {
        let value = target[propertyKey];
        const getter = (): string => value;
        const setter = (newValue: string): void => {
            value = newValue.toUpperCase();
        }
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            })
        }
    }
    function noEnumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = true;
    }
    function toNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let oldMethod = target[propertyKey];
        descriptor.value = function (...args: any[]) {
            args = args.map(arg => parseFloat(arg));
            return oldMethod.apply(this, args);
        }
    }
    class Person {
        @upperCase
        name: string = 'Stella'
        public static age: number = 10
        constructor() { }
        @noEnumerable
        getName() {
            console.log(this.name);
        }
        @toNumber
        sum(...args: any[]) {
            return args.reduce((accu: number, item: number) => accu + item, 0);
        }
    }
    let p: Person = new Person();
    for (let attr in p) {
        console.log('attr=', attr);
    }
    p.name = 'jiagou';
    p.getName();
    console.log(p.sum("1", "2", "3"));
}

namespace decorator5 {
    interface Person {
        age: number;
    }
    function addAge(target: any, propertyKey: string, paramIndex: number) {
        console.log(target, 'target');
        console.log(propertyKey, 'propertyKey');
        console.log(paramIndex, 'paramIndex');
        target.age = 10;
    }
    class Person {
        login(userName: string, @addAge password: string) {
            console.log(this.age, userName, password);
        }
    }
    let p: Person = new Person();
    p.login('Stella', '123456');

}

namespace decoratorOrder {
    function Class1Decorator(target: any) {
        console.log('class decorator 1')
    }
    function Class2Decorator(target: any) {
        console.log('class decorator 2')
    }
    function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('method decorator')
    }
    function Param1Decorator(target: any, propertyKey: string, paramIndex: number) {
        console.log('param1 decorator')
    }
    function Param2Decorator(target: any, propertyKey: string, paramIndex: number) {
        console.log('param2 decorator')
    }
    function PropertyDecorator(target: any, propertyKey: string) {
        console.log(`${propertyKey} property decorator`)
    }
    @Class1Decorator
    @Class2Decorator
    class Person {
        @PropertyDecorator
        name: string = 'Stella';
        @PropertyDecorator
        age: number = 18
        @MethodDecorator
        greet(@Param1Decorator p1: string, @Param2Decorator p2: string) {
        }
    }
    // name property decorator
    // age property decorator
    // param2 decorator
    // param1 decorator
    // method decorator
    // class decorator 2
    // class decorator 1
}

/**
 * 抽象类
 * 抽象方法
 */
namespace abstract {
    abstract class Animal {
        public readonly name: string;
        abstract speak(): void;
    }
    class Cat extends Animal {
        name: string = 'Jerry';
        speak() {
            console.log('miao');
        }
    }
    // let animal = new Animal();
    // Cannot create an instance of an abstract class.
    let cat = new Cat();
    cat.speak();
}

/**
 * 抽象类： 可实现方法 和 属性初始化
 * 接口： 仅用于描述
 *  - 一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
 *  - 抽象类也可以实现接口
 */

namespace abstractClassVSInterface {
    abstract class Animal {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        abstract speak(): void;
    }
    interface Flying {
        fly(): void;
    }
    interface Drinking {
        drink(): void;
    }
    class Cat extends Animal implements Flying, Drinking {
        speak() { }
        fly() { }
        drink() {}
    }
    let cat = new Cat('Tom');
}

/**
 * 抽象方法
 *  - 抽象类和方法不包含具体实现，必须在子类中实现
 *  - 抽象方法只能出现在抽象类中
 *  - 子类可以对抽象类进行不同的实现
 */
namespace abstractMehod {
    abstract class Animal {
        name: string;
        abstract speak(): void;
    }
    class Cat extends Animal {
        name = '1';
        speak() {}
    }
    let cat = new Cat();
    console.log(cat.name);
}

/**
 * 重写 override
 * 重载 overload
 */
namespace over {
    class Animal {
        speak(word: string) {
            console.log(`动物叫：${word}`);
        }
    }
    class Cat extends Animal {
        speak(word: string) {
            console.log(`猫叫：${word}`);
        }
    }
    function speak(word: string): void;
    function speak(word: number): void;
    function speak(word: any): void {
        if (typeof word === 'string') {
            
        } else if (typeof word === 'number') {

        } else {

        }
    };
}

/**
 * 继承(Inheritance)子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
 * 多态(Polymorphism)由继承而产生了相关的不同的类，对同一个方法可以有不同的行为
 */