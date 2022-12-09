## 柯里化函数、虚拟 DOM、弹窗相关（结合实际项目）

### 一、虚拟 DOM

后续要深入学习，现在只是了解到了相关概念

#### 首先是$openDynamicMapDialog 函数的使用：

```javascript
const $openDynamicMapDialog: (params: Record<string, any>,
{ mainContent, header }: ContentNode) => Promise<any>
```

- 第一个参数：params 对象； 第二个参数：ContentNode 类型的头部 header 和主内容 mainContent（(property) ContentNode.mainContent: VNodeTypes），可以是组件，也可以使用创建 vnode 函数即 h()直接传入一个虚拟 DOM
- h()函数的使用

```javascript
import { h } from 'vue';

const vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [
    /* children */
  ]
);
// 直接调用h()，children 可以是一个字符串
h('div', { id: 'foo' }, 'hello');
```

- 创建好虚拟 DOM 后使用 render 函数将其渲染

// upload test
