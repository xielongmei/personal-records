## scoped 原理

给 HTML 的 DOM 节点加一个不重复 data 属性(形如：data-v-2311c06a)来表示他的唯一性。
在每句 css 选择器的末尾（编译后的生成的 css 语句）加一个当前组件的 data 属性选择器（如[data-v-2311c06a]）来私有化样式。
**这也是修改 element-ui 内部组件的样式一般不能写在 scoped CSS 的原因，就算要写，也需要借助深度作用选择器。**

### &符号：父选择器

- 使用场景：在 hover 等伪类选择器前面用得多，但是在任何地方都可以使用；
- 使用原因： sass 解开嵌套规则时，直接把父选择器加到子选择器前面，导致在使用伪类元素 hover 等情况时，不管什么场景都被改变样式

### 变量 $

### 群组选择器

- 比如

```javascript
  .button, button {
  margin: 0;
  }
```

- 嵌套的群组选择器

```javascript
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

### 子组合选择器：>

选择一个元素的直接子元素

### 同层相邻组合选择器：+

选择元素后紧跟的同层元素

### 同层全体组合选择器：~

选择所有跟在元素后的同层元素，不管它们之间隔了多少其他元素

### 属性嵌套

把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中。就像 css 选择器嵌套一样，sass 会把你的子属性一一解开，把根属性和子属性部分通过中划线-连接起来，最后生成的效果与你手动一遍遍写的 css 样式一样：

```javascript
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
```

### 混合器@minix（与@include 混合使用）

- 混合器
  这个标识符给一大段样式赋予一个名字，这样你就可以轻易地通过引用这个名字重用这段样式。解决不停地重复一段样式的问题。

```javascript
  @mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

在需要调用混合器的地方使用@include

```javascript
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```

// upload test
