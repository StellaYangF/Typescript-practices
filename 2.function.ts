namespace b {
    /**
     * 定义
     * 指定 参数的类型和返回值的类型
     */
    function hello(name: string): void {
        console.log('hello', name);
    }
    hello('Stella');

     /**
     * 表达式
     * 定义函数类型
     */
    type GetUsernameFunction = (x: string, y: string) => string;
    let getUsernameFunction: GetUsernameFunction = function(familyName, lastName) {
        return familyName + lastName;
    }
     /**
     * 没有返回值
     */
    let hello2 = function (name: string): void {
        console.log('hello2', name);
        return undefined;
    }

     /**
     * 可选参数
     */
    function print(name: string, age?: number): void {
        console.log(name, age);
    }
    print('stella');

     /**
     * 默认参数
     */
    function ajax(url: string, method: string = 'GET') {
        console.log(url, method);
    }
    ajax('/api/user');

     /**
     * 剩余参数
     */
    function sum(...numbers: Array<number>): number {
        return numbers.reduce((prev, next) => prev + next);
    }
    console.log(sum(1,2,3));

     /**
     * 重载
     * Java中的重载，指的是两个或者两个以上的同名函数，参数不一样
     * 在TypeScript中，表现为给同一个函数提供多个函数类型定义
     */
    let obj: any = {};
    function attr(val: string):void;
    function attr(val: number): void;
    function attr(val: boolean): void;
    function attr(val: any): void {
        if (typeof val === 'string') {
            obj.name = val;
        } else {
            obj.age = val;
        }
    }
    attr(1);
    attr('Stella');
    attr(true);
    console.log(obj);
}