1、

```javascript
interface Obj {
  name: string;
}

function iSay(arg: Obj[]): Obj {
  console.log(arg.length);
  return arg[0];
}

iSay([
  {
    name: '111',
  },
]);
```

现在 isSay 是固定的返回，如下图
![avatar](./assets/iSay1.png)

怎么让他变成动态的类型推断，isSay 入参的对象，是动态的，能够获取入参对象的返回——利用**泛型**
![avatar](./assets/iSay2.png)

```javascript
interface Obj {
  name: string;
}

function iSay<T>(arg: T[]): T {
  console.log(arg.length);
  return arg[0];
}

iSay([
  {
    name: '111',
    age: 123,
  },
]);
```

如何限定这个 T 只能是对象——**利用 extends ——泛型约束**

```javascript
    interface Obj {
     name: string
    }
// 这里是限制为只能是对象
    function iSay<T extends Record<string, any>>(arg: T[]): T {
     console.log(arg.length);
     return arg[0];
    }
// 这里是限制在Obj的基础上，没有name属性不行
    function iSay<T extends Obj >(arg: T[]): T {
     console.log(arg.length);
     return arg[0];
    }

    iSay([{
       name: '111',
       age: 123,
      }]);
```

2、infer 关键字

```javascript
    type ReturnType<T> = T extends (
        ...args: any[]
       ) => infer R ? R : T;
    // 等价于以下形式：
    type GetRest<T> = T extends infer Rest ? Rest : T;
// 如何让他能获取到除了第一项，之后的数组？

        type GetRest<T extends number[]> = T extends [infer start, ...infer Rest] ? Rest : T;


const arr: GetRest<[1, 2, 3]>; //结果是[2, 3]
```

infer 相当于占位符，将传入的参数保存到变量中，这里的 start 是 1，Rest 是[2, 3]
这里的意思是如果传进来的 T 的形式是[1, 2, 3]的话，就返回[2, 3]，否则返回 T，所以需要...infer Rest， 否则 T 不满足[1, [2, 3]]，返回的结果就是[1, 2, 3]
