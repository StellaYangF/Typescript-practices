let namaa: number = 10;

let flag: boolean = true;

let age: number = 20;

let arr: Array<boolean> = [false, true, false];
let arr1: string[] = ['a', 'c', 'b'];

// tuple
let tuple: [number, string] = [1, 'string'];
console.log(tuple.length);

// 枚举类型
// 普通枚举 
enum Grender {
    GIRL,
    BOY,
}

// 常数枚举
const enum Colors {
    Red,
    Yellow,
    Blue = 'ge',
}

let myColors = [Colors.Red, Colors.Blue]

console.log(myColors);

// 任意类型 any
// let root: any = document.getElementById('root');

// let root1: (HTMLElement | null) = document.getElementById('root');
// root1!.style.color = 'red';

// null 和 undefined
// "strictNullChecks": false,
let x: number;
x = 1;
x = undefined;
x = null;

let y: number | undefined | null;
y = 1;
y = undefined;
y = null;

let z: null | number;
z = undefined;
z = 1;

// void 类型
function add(a: string, b: string): void {
    let c: string = a + b;
    return null;
}

// never 类型
function minus(a: number, b: number): never {
    let value: number;
    throw new Error('Something wrong.');
}
function neverFunction(): never {
    while (true) {};
}
function fn(x: number | string) {
    if (typeof x === 'number') {

    } else if (typeof x === 'string') {

    }
}

let a = 1;
a = undefined;
a = null;


namespace b {
    let a: Symbol = Symbol();
    
    /** 
     * 包装对象 (Wrapper Object)
    */
    let name = 'Stella';
    console.log(name.toUpperCase());
    console.log(new String('Stella').toLocaleUpperCase());

    let isOK: boolean = true;
    let isOK2: boolean = Boolean(1);
    // let isOK3: boolean = new Boolean(1); 
    // Type 'Boolean' is not assignable to type 'boolean'.

    /**
     *  联合类型 (Union Types): 限定值的类型
    */
    let name1: string | number;
    console.log(name1.toString());
    name1 = 3;
    name1.toFixed();
    name1 = 'Stella';
    name1.toUpperCase();

    /**
     * 类型断言
     * 
     */
    let name2: string | number;
    (name2 as string).toLocaleUpperCase();
    (name2 as number).toFixed();
    // (name2 as boolean)
    // Conversion of type 'string | number' to type 'boolean' may be a mistake 
    // because neither type sufficiently overlaps with the other. 
    // If this was intentional, convert the expression to 'unknown' first.
    // Type 'number' is not comparable to type 'boolean'.

    /**
     * 字面量类型 限定某个值
     */
    type SType = 1 | 'stella' | false;
    let t1: SType = 1;
    t1 = 'stella';
    t1 = false;
    // let t1: SType = 2;
    // Type '2' is not assignable to type 'SType'.
}

