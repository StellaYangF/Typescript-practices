namespace c {
    /**
     * 定义
     */
    class Person {
        name: string;
        getName(): void {
            console.log(this.name);
        }
    }
    let p1 = new Person();
    // p1.name = 1;
    p1.name = 'Stella';
    p1.getName();

    
    /**
     * 存取器
     */
    class User {
        myname: string;
        constructor(myname: string) {
            this.myname = myname;
        }
        get name() { // A 'get' accessor must return a value.
            return this.myname;
        }
        set name(value: string) {
            value !== this.myname &&  (this.myname = value);
        }
    }
    let  u = new User('Stella');
    u.name = 'Vivian';
    console.log(u);


    /**
     * 参数属性
     */
    class Student{
        constructor(public myname: string) { }
        get name() {
            return this.myname;
        }
        set name(value: string) {
            this.myname = value;
        }
    }
    let s = new Student('Stella');
    s.name = 'Vivian';
    console.log(s.name);

    /**
     * readonly
     */
    class Animal {
        public readonly name: string;
        constructor(name: string) {
            this.name = name;
        } 
        changeName(name: string) {
            // this.name = name; 
            // Cannot assign to 'name' because it is a read-only property.
        }
    }

    /**
     * 继承
     */
    class Man {
        name: string;
        age: number;
        constructor (name: string, age: number) {
            this.name = name;
            this.age = age;
        }
        getName():string {
            return this.name;
        }
        setName(name: string): void {
            this.name = name;
        }
    }

    class Tutor extends Man {
        no: number;
        constructor(no: number, name: string, age: number) {
            super(name, age);
            this.no= no;
        }
        getNo() {
            return this.no;
        }
    }
    let t = new Tutor(1, 'Jassada', 18);
    console.log(t.getNo());
    console.log(t);

    /**
     * 类里面的修饰符  
     * public     //类里面 子类 其它任何地方外边都可以访问
     * protected  //类里面 子类 都可以访问,其它任何地方不能访问
     * private    //类里面可以访问， 子类和其它任何地方都不可以访问
     */
    class Father {
        public name: string;
        protected age: number;
        private money: number;

        constructor(name: string, age: number, money: number) {
            this.name = name;
            this.age = age;
            this.money = money;
        }

        getName() {
            return this.name;
        }
        setName(name: string): void {
            this.name = name;
        }
    }

    class Child extends Father {
        constructor(name: string, age: number, money: number) {
            super(name, age, money);
        }
        desc() {
            console.log(`${this.name} ${this.age} `);
            // ${this.money}
            // Property 'money' is private and only accessible within class 'Father'.
        }
    }
    let child = new Child('Stella', 18, 2000);
    console.log(child.name);
    // console.log(child.age);
    // Property 'age' is protected and only accessible 
    // within class 'Father' and its subclasses.
    
    // console.log(child.money);
    // Property 'money' is private and only accessible 
    // within class 'Father'.

    
    /**
     * 静态属性 静态方法
     */
    class Mother{
        static className: string = 'Mother';
        static getClassName(): string {
            return this.className;
        }
    }
    console.log(Mother.className);
    console.log(Mother.getClassName());
    let m = new Mother();
}
