/**
 * 泛型（Generics）是指在定义函数、接口或类的时候，
 * 不预先指定具体的类型，而在使用的时候再指定类型的一种特性
 * 泛型T作用域只限于函数内部使用
 */

/**
 * 泛型函数
 */
namespace genFunction {
    function createArray(length: number, value: any): Array<any> {
        let result: any = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    let arr = createArray(4, 'happy');
    // let arr = createArray<number>(4, 'happy');
    // Expected 0 type arguments, but got 1.
    console.log(arr);

    function createGenArray<T>(length: number, value: T): T[] {
        let result: any = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    let arr1 = createGenArray<string>(3, 'unhappy');
    console.log(arr1);
}

/**
 * 类数组
 */
namespace arrayLikeObject {
    function sum<T>(a: T, b: T, c: T) {
        let args: IArguments = arguments;
        for (let i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }
    sum<string>('OK', 'Thanks', 'All');

    // let root = document.getElementById('root');
    // let children: HTMLCollection = (root as HTMLElement).children;
    // let nodeList: NodeList = root.childNodes;
    // nodeList.length;
}


/**
 * 泛型类
 */
namespace genClass {
    class MyArray<T> {
        private list: T[] = [];
        add(value: T): MyArray<T> {
            this.list.push(value);
            return this;
        }
        getMax(): T {
            return this.list.reduce((prev, next) => prev > next ? prev : next);
        }
    }
    let arr = new MyArray<number>();
    arr.add(1).add(2).add(3);
    console.log(arr.getMax());
}

/**
 * 泛型接口
 *  - 泛型接口可以用来约束函数
 */
namespace genInterface {
    interface calculate {
        <T>(a: T, b: T): T;
    }
    const calc: calculate = function <T>(a: T, b: T): T {
        console.log(a, b);
        return a;
    }
    calc<number>(1, 2);
}

/**
 * 多个类型参数
 *  - 泛型可以有多个
 */
namespace severalGen {
    function swap<A, B>(tuple: [A, B]): [B, A] {
        return [tuple[1], tuple[0]];
    }
    let swapped = swap<string, boolean>(['Stella', true]);
    console.log(swapped);
}


/**
 * 默认泛型类型
 */
namespace defaultGeb {
    function createArray<T = number>(length: number, value: T): T[] {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    let arr = createArray(6, '--');
    console.log(arr);
}

/**
 * 泛型约束
 */
namespace genRestrict {
    function logger<T>(val: T) {
        // console.log(val.length);
        // Property 'length' does not exist on type 'T'.
    }
    interface LengthWise {
        length: number;
    }
    function logger2<T extends LengthWise>(val: T) {
        console.log(val.length);
    }
}


/**
 * 定义接口时，也可指定泛型
 */
namespace specificGen {
    interface Cart<T> {
        list: T[];
    }
    let cart: Cart<{ name: string, price: number }> = {
        list: [{ name: 'string', price: 1 }],
    }
    console.log(cart.list[0]);
}


/**
 * 泛型类型别名
 */
namespace genTypeAlias {
    type Cart<T> = { list: T[] } | T[];
    let c1: Cart<string> = { list: ['1'] };
    let c2: Cart<number> = [1];
} 
