/**
 * 接口
 * interface中可以用分号或者逗号分割每一项，也可以什么都不加
 * 
 *  - 接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
 *  - 接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
 *  - 一个类可以继承另一个类并实现多个接口
 *  - 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
 *  - 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类
 */

/**
 * 对象的形状 
 *  - 接口可以用来描述`对象的形状`,少属性或者多属性都会报错
 */
namespace objectShape {
    interface Speakable {
        speak(): void;
        name?: string;
    }
    let speakman: Speakable = {
        speak() { },
        name: 'Stella',
        // greet() { }
        // Object literal may only specify known properties, 
        // and 'greet' does not exist in type 'Speakable'.
    }
}

/**
 * 行为的抽象
 *  - 接口可以在面向对象编程中表示为行为的抽象
 */
namespace abstractBehavior {
    interface Speak {
        speak(): void;
    }
    interface Jump {
        jump(): void;
    }
    interface Fly {
        fly(): void;
    }
    class Dunk implements Speak, Fly, Jump {
        speak() { }
        jump() { }
        fly() { }
        eat() { }
    }
}

/**
 * 任意属性
 *  - 无法预先知道有哪些新的属性的时候,
 *  - 可以使用 `[propName:string]:any`,propName名字是任意的
 */

namespace randomProperty {
    interface Person {
        readonly id: number;
        name: string;
        [propName: string]: any;
    }
    let p1: Person = {
        id: 1,
        name: 'Stella',
        age: 10,
        school: 'Beijing Fourth School',
        eat(val: string): void { },
    }
}

/**
 * 接口的继承
 */
namespace inheritedInterface {
    interface Speakable {
        readonly name: string;
        speak(): void;
    }
    interface SpeakChinese extends Speakable {
        speakChinese(): void;
    }
    class Person implements SpeakChinese {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        speak() { }
        speakChinese() { }
    }
}

/**
 * readonly
 */
namespace readonlyInterface {
    interface Person {
        readonly id: number;
        [propName: string]: any;
    }
    let tom: Person = {
        id: 1,
        name: 'Stella'
    }
}

/**
 * 函数类型 接口
 */
namespace one {
    interface Discount {
        (price: number): number;
    }
    let discount: Discount = function (price: number): number {
        return price * .8;
    }
    // 对比
    interface Discount1 {
        discount(price: number): number;
    }
    let discount1: Discount1 = {
        discount: function (price: number): number {
            return price * .8;
        }
    }
}

/**
 * 可索引接口
 *  - 对数组和对象进行约束
 */
namespace indexInterface {
    interface UserInterface1 {
        [index: number]: string | number;
    }
    interface UserInterface2 {
        [index: string]: string | number;
    }
    let attr: UserInterface1 = [1, 'Stella'];
    let obj: UserInterface2 = {
        1: 'Stella',
        [2]: 'Tom',
        age: 18,
    }
}

/**
 * 类 接口
 */
namespace classInterface {
    interface Speakable {
        name: string;
        speak(word: string): void;
    }
    class Dog implements Speakable {
        name: string;
        speak(word: string): void {
            console.log(c);
        }
    }
    let dog = new Dog();
    dog.speak('wangwang');

    interface Fn {
        (n: number): void;
    }
    let fn: Fn = (price: number): void => { };
    /**
     * 注意：
     *  - 接口下的函数类型，不约束函数具体的返回值，只约束行为
     */
}

/**
 * 构造函数的类型
 */
namespace two {
    class Animal {
        constructor(public name: string) { }
    }
    interface WithNameClass {
        new(name: string): Animal;
    }
    function createAnimal(clazz: WithNameClass, name: string) {
        return new clazz(name);
    }
    let a = createAnimal(Animal, 'Stella');
    console.log(a.name);
}