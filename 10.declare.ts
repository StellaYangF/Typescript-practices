/**
 * 类型声明
 *  - 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统
 *  - 类型声明在编译的时候都会被删除，不会影响真正的代码
 */

namespace b {
    declare const $:(selector: string) => {
        click(): void
        width(length: number): void
    }
    $('').click();
    declare let name: string;
    declare let age: number;
    declare function getName(): string;
    declare class Animal { 
        name: string
    }
    console.log(name, age);
}

/**
 * 外部枚举
 *  - 外部枚举是使用declare enum定义的枚举类型
 *  - 外部枚举用来描述已经存在的枚举类型的形状
 */
namespace c {
    declare enum Seasons {
        Spring,
        Summer,
        Autumn,
        Winter,
    }
    let seasons = [
        Seasons.Spring,
        Seasons.Summer,
        Seasons.Autumn,
        Seasons.Winter,
    ]
    console.log(seasons);
}