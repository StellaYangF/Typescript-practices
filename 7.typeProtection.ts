/**
 * typeof 类型保护
 */
namespace one {
    function double(input: string | number | boolean) {
        if (typeof input === 'string') {
            return input.repeat(2);
        } else {
            if (typeof input === 'number') {
                return input * 2;
            } else {
                return !input;
            }
        }
    }
}

/**
 * instanceof 类型保护 
 */
namespace two {
    class Animal {
        name: string
        constructor(name: string) {
            this.name = name;
        }
    }
    class Bird extends Animal {
        swing: string
        constructor(swing: string, name: string) {
            super(name);
            this.swing = swing;
        }
    }
    function getName(animal: Animal) {
        if (animal instanceof Bird) {
            console.log(animal.swing);
        } else {
            console.log(animal.name);
        }
    }
}

/**
 * null 保护
 *  - 如果开启了strictNullChecks选项，
 *  - 那么对于可能为null的变量不能调用它上面的方法和属性
 */
namespace three {
    function getFirstLetter(s: string | null) {
        if (s == null) {
            return '';
        }
        s = s || '';
        return s.charAt(0);
    }
    let s: any = null;
    getFirstLetter(s);
}

/**
 * 链判断运算符
 *  - ?.
 *  - 链判断运算符 还处于 stage1 阶段,TS 也暂时不支持
 */
namespace four {
    let a: any;
    a?.b;
}


/**
* 可辨识的联合类型
* - 就是利用联合类型中的共有字段进行类型保护的一种技巧
* - 相同字段的不同取值就是可辨识
*/
namespace five {
    interface WarningButton {
        class: 'warning'
        text1: 'change'
    }
    interface DangerButton {
        class: 'danger',
        text2: 'delete'
    }
    type Button = WarningButton | DangerButton
    function getButton(button: Button) {
        if (button.class === 'warning') {
            console.log(button.text1);
        }
        if (button.class === 'danger') {
            console.log(button.text2);
        }
    }
}


/**
 * in操作符
 *  - in 运算符可以被用于参数类型的判断
 */
namespace six {
    interface Bird {
        swing: string;
    }
    interface Dog {
        leg: number;
    }
    function getNumber(x: Bird | Dog) {
        if ( 'swing' in x ) {
            return x.swing
        }
        return x.leg;
    }
}

/**
 * 自定义的类型保护
 *  - TypeScript 里的类型保护本质上就是一些表达式，
 *  - 它们会在运行时检查类型信息，
 *  - 以确保在某个作用域里的类型是符合预期的 type is Type1Class就是类型谓词
 */
namespace seven {
    interface Bird {
        swing: number;
    }
    interface Dog {
        leg: number
    }
    function isBird (x: Bird | Dog): x is Bird {
        return (<Bird>x).swing == 2;
    }
    function getAnimal (x: Bird | Dog) {
        if (isBird(x)) {
            return x.swing;
        }
        return x.leg;
    }
}

/**
 * unknown
 *  - any 类型
 *  - unknown 类型
 *  - 缩小 unknown 类型范围
 *  - 联合类型中的 unknown 类型
 *  - 交叉类型中的 unknown 类型
 *  - never是unknown的子类型
 *  - keyof unknown 等于never
 *  - 只能对unknown进行等或不等操作，不能进行其它操作
 *  - 不能做任何操作
 *  - 映射属性
 */
namespace eight {
    let value: any;
    value = true;
    value = 1;
    value = '';
    value = [];
    value = {};
    value = undefined;
    value = null;
    value = Math.random;

    value.a.b;
    new value();


    let value0: unknown;
    let value1: any = value0;
    let value2: unknown = value0;
    // let value3: undefined = value0;
    // Type 'unknown' is not assignable to type 'undefined'.

}


/** 缩小 unknown 类型范围
 * 如果没有类型断言或类型细化时，不能在unknown上面进行任何操作
 * - typeof
 * - instanceof
 * - 自定义类型保护函数
 * - 可以对 unknown 类型使用类型断言
 */
namespace nine {
    const value: unknown = 'Hello World!';
    const something: string = value as string;
}


/** 
 * 联合类型中的 unknown 类型
 *  - 在联合类型中，unknown 类型会吸收任何类型。
 *  - 这就意味着如果任一组成类型是 unknown，
 *  - 联合类型也会相当于 unknown：
 */
namespace ten {
    type UnionType1 = unknown | null;
    type UnionType2 = unknown | undefined;
    type UnionType3 = unknown | string;
    type UnionType4 = unknown | number[];
}


/**
 * 交叉类型中的 unknown 类型 
 *  - 在交叉类型中，任何类型都可以吸收 unknown 类型。
 *  - 这意味着将任何类型与 unknown 相交不会改变结果类型
 */
namespace eleven {
    type IntersectionType1 = unknown & null;
    type IntersectionType2 = unknown & undefined;
    type IntersectionType3 = unknown & string;
    type IntersectionType4 = unknown & boolean[];
}

/**
 * never是unknown的子类型
 */
namespace twelve {
    type isNever = never extends unknown ? true : false;
}

/**
 *  keyof unknown 等于never 
 */
namespace thirteen {
    let string = '';
    type s = keyof string;

    type key = keyof unknown;

    /**
     * 只能对unknown进行等或不等操作，不能进行其它操作
     */
    let uni1:unknown;
    uni1 == 2;
    // uni1 += 2;  
    // uni1.name;
    // 只能对unknown进行等或不等操作，不能进行其它操作

    /**
     * 映射属性
     *  - 如果映射类型遍历的时候是unknown,不会映射属性
     */
    type getType<T> = {
        [P in keyof T]: number
    }
    type t = getType<unknown>;
    type t1 = getType<number | string>;
    let s: t1 = 1;
}