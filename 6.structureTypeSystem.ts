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
    function f1(a: number, b: number):number {
        return a + b;
    }
    sum = f1;

    // 可省略一个参数
    function f2(a:number): number {
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
    sum = f4;
    // Type '(a: number, b: number, c: number) => number' 
    // is not assignable to type 'sumFunc'.
}