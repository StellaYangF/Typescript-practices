var c;
(function (c) {
    /**
     * 定义
     */
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.getName = function () {
            console.log(this.name);
        };
        return Person;
    }());
    var p1 = new Person();
    // p1.name = 1;
    p1.name = 'Stella';
    p1.getName();
    /**
     * 存取器
     */
    var User = /** @class */ (function () {
        function User(myname) {
            this.myname = myname;
        }
        Object.defineProperty(User.prototype, "name", {
            get: function () {
                return this.myname;
            },
            set: function (value) {
                value !== this.myname && (this.myname = value);
            },
            enumerable: true,
            configurable: true
        });
        return User;
    }());
    var u = new User('Stella');
})(c || (c = {}));
