/**
 * typeof 类型保护
 */
namespace one {
    function double(input: string | number | boolean) {
        if (typeof input === 'string') {
            return input.repeat(2);
        } else  {
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

/**
 * null 保护
 */

/**
 * 链判断运算符
 */


/**
* 可辨识的联合类型
*/

/**
 * in操作符
 */

/**
 * 自定义的类型保护
 */
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