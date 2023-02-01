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

3、keyof
原题：

```javascript
const getVal = (obj: Record<string, unknown>, key: string) => {
  return obj[key];
};

const obj = {
  name: 'kiana',
  age: 100,
};

getVal(obj, 'name');
```

要求：实现 getVal 的自动推断 obj 的 key，当传入第一个参数 obj 对象时，第二个参数能自动推断 obj 对象有哪些 key，如图：
![avatar](./assets/keyof.png)

利用泛型工具 key of，获取传入的类型的 key

```javascript
  const getVal = <T extends Record<string, unknown>>(obj: T, key: keyof T) => {
     return obj[key];
    };

    const obj = {
     name: 'kiana',
     age: 100,
    };

    getVal(obj, '');

```

4、第 3 题进阶, 实现 pick 函数的类型推断，能够自动推断出传入第一个参数 obj 的时候，第二个参数的数组,受到第一个参数的限定，要是字符串数组，并且值只能是一个或多个第一个参数 obj 的 key

```javascript
const pick = (obj: Record<string, any>, arr: any[]) => {
  const _obj: any = {};
  for (const key in obj) {
    if (arr.includes(key)) {
      _obj[key] = obj[key];
    }
  }
  return _obj;
};

pick({ a: '1', b: '2' }, ['a']);
```

错误的点：arr 不知道如何定义为字符串数组，keyof T 拿到的只是字符串，如何让 arr 是字符串数组呢？非常低级的错误，因为我忘记了在 TS 中怎么定义字符串数组，不会举一反三，
定义字符串数组 —— arr: string[]; 定义限定字符的字符串数组： arr: (keyof T)[]

```javascript
  const pick = <T extends Record<string, unknown>>(obj: T, arr: (keyof T)[]) => {
     const _obj: any = {};
     for (const key in obj) {
       if (arr.includes(key)) {
       _obj[key] = obj[key];
      }
     }
     return _obj;
    };

    pick({ a: '1', b: '2' }, ['a']); //传入的第二个参数是['c']就会报错
```
