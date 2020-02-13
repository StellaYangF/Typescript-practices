/**
 * module
 *  - 模块是TS中外部模块的简称，侧重于代码复用
 *  - 模块在期自身的作用域里执行，而不是在全局作用域里
 *  - 一个模块里的变量、函数、类等在外部是不可见的，除非你把它导出
 *  - 如果想要使用一个模块里导出的变量，则需要导入
 */

export const a = 1;
export const b = 2;
export default 'Stella';

/**
 * 明明空间
 */
export namespace zoo {
    export class Dog {
        eat () {
            console.log('zoo dog');
        }
    }
    export function add() {
        console.log('add');
    }
}

export namespace home {
    export class Dog {
        eat () {
            console.log(`home dog`);
        }
    }
}
let dog_of_zoo = new zoo.Dog();
let add = zoo.add();