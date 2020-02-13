namespace typeSwap {
    /**
     * 交叉类型
     *  - 交叉类型（Intersection Types）表示将多个类型合并为一个类型
     */
    interface Bird {
        name: string
        fly(): void
    }
    interface Person {
        name: string
        talk(): void
    }
    type BirdPerson = Bird & Person
    let p: BirdPerson = {
        name: 'stella',
        fly() { },
        talk() { }
    }


    /**
     * typeof
     *  - 可以获取一个变量的类型
     */
    // 先定义类型，再定义变量
    type People = {
        name: string
        age: number
        gender: number
    }
    let p1: People = {
        name: 'Stella',
        age: 18,
        gender: 1
    }

    // 先定义变量，再定义类型
    let p2 = {
        name: 'string',
        age: 1,
        gender: 1,
    }
    type People1 = typeof p2;
    let p3: People1 = p2;
    function getName(p: People1): string {
        return p.name;
    }


    /**
     * 索引访问操作符 
     *  - 可以通过[]获取一个类型的子类型
     */
    interface Person1 {
        name: string,
        age: number,
        gender: number,
        job: {
            name: string,
            age: number,
        },
        interests: {
            name: string
            level: number
        }[]
    }
    let FrontEndJob: Person1['job'] = {
        name: 'Front-End-Engineer',
        age: 10,
    }
    let interestLevel: Person1['interests'][0]['level'] = 2



    /**
     * keyof 
     *  - 索引类型查询操作符
     */
    interface Person2 {
        name: string,
        age: number,
        gender: 'male' | 'female'
    }
    type PersonKey = keyof Person2
    function getValueByKey(p: Person2, key: PersonKey) {
        return p[key];
    }

    /**
     * 映射类型
     *  - 在定义的时候用in操作符去批量定义类型中的属性
     */
    type PartPerson = {
        [Key in keyof Person2]?: Person2[Key]
    }
    let p7: PartPerson = {}
    type Part<T> = {
        [Key in keyof T]?: T[Key]
    }
    let p8: Part<Person2> = {}


    /**
     * 内置工具类型
     *  - TS 中内置了一些工具类型来帮助我们更好地使用类型系统
     */
    // Partial
    type Partial<T> = {
        [K in keyof T]?: T[K]
    }
    interface A {
        a1: string,
        a2: number,
        s3: boolean,
    }
    type aPartial = Partial<A>
    const a: aPartial = {}

    // Required
    // Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。
    type Required<T> = {
        [K in keyof T]-?: T[K]
    }
    interface Person9 {
        name: string
        age: number
        gender?: 'male' | 'female'
    }
    let p10: Required<Person9> = {
        name: '',
        age: 0,
        gender: 'male',
    }
}


/**
 * Readonly
*/
namespace two {
    type Readonly<T> = {
        readonly [K in keyof T]: T[K]
    }
    interface Person {
        name: string,
        age: number,
    }
    let p: Readonly<Person> = {
        name:'',
        age: 0,
    }
    // p.name = 's';
    // Cannot assign to 'name' because it is a read-only property.
}

/**
 * Pick
 *  - Pick 能够帮助我们从传入的属性中摘取某一项返回
 */
namespace pick {
    interface Animal {
        name: string,
        age: number,
        gender: number,
    }
    interface Person {
        name: string,
        age: number,
        married: boolean,
    }
    function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>{
        const result: any = {};
        keys.map(key => result[key] = obj[key]);
        return result;
    }
    let person: Person = {
        name: '',
        age: 10,
        married: true,
    }
    let result: Pick<Person, 'name' | 'age'> = pick<Person, 'name' | 'age'>(person, ['name', 'age'])
    console.log(result);
}

/**
 * Record -------- ambiguous
 */
namespace record {
    function mapObject<K extends string | number, T, U>(obj: Record<K, T>, map: (x: T) => U): Record<K, U> {
        let result: any = {};
        for (const key in obj) {
            result[key] = map(obj[key]);
        }
        return result;
    }
    let names = { 0: 'hello', 1: 'world' };
    let lengths = mapObject<string | number, string, number>(names, (s: string) => s.length);
    console.log(lengths);
}

/**
 * Proxy
 */
namespace proxy {
    type Proxy<T>  = {
        get(): T
        set(value: T): void 
    }
    type Proxify<T> = {
        [P in keyof T]: Proxy<T[P]>
    }
    function proxify<T> (obj: T): Proxify<T> {
        let result = {} as Proxify<T>;
        for (const key in obj) {
            result[key] = {
                get: () => obj[key],
                set: value => obj[key] = value
            }
        }
        return result;
    }
}

/**
 * 条件类型
 *  - 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
 */

/**
 * 定义条件类型
 */
namespace two {
    interface Fish {
        name: string
    }
    interface Water {
        name: string
    }
    interface Bird {
        name: string
    }
    interface Sky {
        name: string
    }
    type Condition<T> = T extends Fish ? Water :Sky
    let condition: Condition<Fish> = {
        name: 'water'
    }
}

/**
 * 条件类型的分发
 */
namespace three {
    interface Bird {
        bird: string
    }
    interface Water {
        water: string
    }
    interface Fish {
        fish: string
    }
    interface Sky {
        sky: string
    }
    type Condition<T> = T extends Fish ? Water : Sky
    let c: Condition<Fish | Bird> = {
        water: '',
        sky: '',
    }
}

/**
 * 内置条件类型
 */
namespace four {
    type Extract<T, U> = T extends U ? T : never;
    type E = Extract<string| number, string>
    let e: E = '';


    /**
     * NonNullable
     *  - 从 T 中排除 null 和 undefined
     */
    type NonNullable<T> = T extends null | undefined ? never : T;
    type E1 = NonNullable<string| number | null | undefined>
    let e1: E1 = 'null';


    /**
     * ReturnType
     *  - 获取函数类型的返回类型
     */
    function getUserInfo() {
        return {
            name: '',
            age: 0,
        }
        type UserInfo = ReturnType<typeof getUserInfo>
        const userA: UserInfo = {
            name: '',
             age: 0,
        }
        type ReturnType2<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
    }
}

/**
 * Parameters
 */
namespace parameters {
    declare function f1(arg: { a: number, b: string }):void;
    type T0 = Parameters<() =>string>
}

/**
 * InstanceType
 *  - 获取构造函数类型的实例类型
 */
namespace instanceType {
    class Person {
        name: string
        constructor(name: string) {
            this.name = name;
        }
        getName (): string {
            return this.name;
        }
    }
    type constructorParameters = ConstructorParameters<typeof Person>
    let params: constructorParameters = ['s'];
    type Instance = InstanceType<typeof Person>
    let instance: Instance = {
        name: '',
        getName(): string{
            return this.name
        }
    }
}

/**
 * infer ----- ambiguous
 */
namespace infer {
    type ElementType<T> = T extends any[] ? T[number] : T
    type e1 = ElementType<string>;
    type e2 = ElementType<string[]>;

    type GetElementType<T> = T extends Array<infer U> ? U : T
    type e3 = GetElementType<string[]>
    type e4 = GetElementType<string>

    interface Action<T> {
        payload?: T
        type: string
    }
}