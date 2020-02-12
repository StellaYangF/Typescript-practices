/**
 * 接口的兼容性
 *  - 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
 *  - 原理是Duck-Check,就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的
 */
namespace compatible {
    interface Animal {
        name: string;
        age: number;
    }
    interface Person {
        name: string;
        age: number;
        gender: number;
    }
    function getName(animal: Animal): string {
        console.log(animal);
        return animal.name;
    }
    let p = {
        name: 'Stella',
        age: 18,
        gender: 1,
    }
    getName(p);
    let a: Person = {
        name: 'Stella',
        age: 10,
        gender: 1,
    }
}

/**
 * 基本类型的兼容性
 */
namespace two {
    let num: string | number;
    let str: string = 'Stella';
    num = str;

    let num2: {
        toString(): string
    }
    let str2: string = 'Stella';
    num2 = str2;
}

/**
 * 类的兼容性
 *  - 在TS中是结构类型系统，只会对比结构而不在意类型
 */
namespace three {
    class Animal {
        name: string
    }
    class Bird extends Animal {
        swing: number;
    }
    let a: Animal;
    a = new Bird();
    let b: Bird;

    // b = new Animal();
    // Property 'swing' is missing in type 'Animal' 
    // but required in type 'Bird'.
}

/**
 * 函数的兼容性
 *  - 比较函数的时候是要先比较函数的参数，再比较函数的返回值
 */

namespace four {
    type sumFunc = (a: number, b: number) => number;
    let sum: sumFunc;
    function f1(a: number, b: number): number {
        return a + b;
    }
    sum = f1;

    // 可省略一个参数
    function f2(a: number): number {
        return a;
    }
    sum = f2;

    // 可省略两个参数
    function f3(): number {
        return 1;
    }
    sum = f3;

    // 多一个参数不行
    function f4(a: number, b: number, c: number): number {
        return a + b + c;
    }
    // sum = f4;
    // Type '(a: number, b: number, c: number) => number' 
    // is not assignable to type 'sumFunc'.
}

/**
 * 比较返回值
 */
namespace five {
    type GetPerson = () => { name: string, age: number };

    let getPerson: GetPerson;

    function g1() {
        return { name: 'Stella', age: 18 };
    }
    getPerson = g1;

    function g2() {
        return {
            name: 'Stella',
            age: 18,
            gender: 'female',
        }
    }
    getPerson = g2;

    function g3() {
        return {
            name: 'Stella',
        }
    }
    // getPerson = g3;
    // Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'.

}

/**
 * 函数参数的协变
 */
namespace six {
    let sourceFn = (args: number | string) => { }
    let targetFn1 = (args: number | string) => { }
    let targetFn2 = (args: number | string | boolean) => { }
    sourceFn = targetFn1;
    sourceFn = targetFn2;

    interface Event {
        timestamp: number
    }
    interface MouseEvent extends Event {
        eventX: number
        eventY: number
    }
    interface EventType extends Event {
        keyCode: number
    }
}

/**
 * 泛型的兼容
 *  - 接口内容为空没用到泛型的时候是可以的
 */

namespace seven {
    interface Empty<T> { }
    //  1.接口内容为空没用到泛型的时候是可以的
    let x: Empty<string>;
    let y: Empty<number>;
    x = y;

    // 2.接口内容不为空的时候不可以
    interface NotEmpty<T> {
        data: T;
    }
    let x1: NotEmpty<string>;
    let y1: NotEmpty<number>;
    // x1 = y1;
    // Type 'number' is not assignable to type 'string'.

}

/**
 * 枚举的兼容性
 *  - 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
 *  - 不同枚举类型之间是不兼容的
 */
namespace eight {
    enum Colors {
        Red,
        Yellow,
    }
    let c: Colors;
    c = Colors.Red;
    console.log(c);
    c = 1;
    console.log(c);
    // c = '1';
    // Type '"1"' is not assignable to type 'Colors'.

    let n: number;
    n = 1;
    n = Colors.Red;
}