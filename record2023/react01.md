#### React 组件
React 组件是返回标签的 JavaScript(也可以是typeScript) **函数**
**所以React 组件本质就是函数**
可以在其中进行逻辑处理
例如：
```javascript
export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```
#### 条件渲染 
在 React 中，没有特殊的语法来编写条件。因此，你将使用与编写常规 JavaScript 代码时相同的技术。例如，你可以使用 if 语句根据条件引入 JSX：
```javascript
const TableList: React.FC = () => {

  const advanceSearchForm = (
    <div>
      ...
    </div>
  );

  const searchForm = (
    <div style={{ marginBottom: 16 }}>
     ...
    </div>
  );

  return (
    <div>
      {type === "simple" ? searchForm : advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};
```

#### 渲染列表 
在 React 中，同样也没有特殊的语法来渲染列表
只能依赖 JavaScript 的特性，例如 for 循环 和 array 的 map() 函数 来渲染组件列表。
例如，假设你有一个产品数组：
```javascript
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```
在你的组件中，使用 map() 函数将一个产品数组，转换为 li 标签的元素列表:
```javascript
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```
#### 更新界面 
注意react不是基于响应式的，如果想要定义一个变量，并且该变量改变时dom渲染的内容也随之改变，只能使用useState，并且做不到？
```javascript
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);
  // ...
}
```
只能通过setCount来对count进行操作
并且调用setCount时React 将再次调用整个组件函数，包括内嵌组件