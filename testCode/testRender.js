// 自定义渲染器，不仅可以在浏览器中运行，还可以在 Node.js 中运行

function createRenderer(options) {
  // 通过 options 得到操作 DOM 的 API
  const { createElement, insert, setElementText } = options;

  // 在这个作用域内定义的函数都可以访问那些 API
  function mountElement(vnode, container) {
    // 调用 createElement 函数创建元素
    const el = createElement(vnode.type);
    if (typeof vnode.children === 'string') {
      // 调用 setElementText 设置元素的文本节点
      setElementText(el, vnode.children);
    }
    // 调用 insert 函数将元素插入到容器内
    insert(el, container);
  }

  function patch(n1, n2, container) {
    // 如果 n1 不存在，意味着挂载，则调用 mountElement 函数完成挂载
    if (!n1) {
      mountElement(n2, container);
    } else {
      // n1 存在，意味着打补丁，暂时省略
    }
  }

  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        container.innerHTML = '';
      }
    }
    container._vnode = vnode;
  }

  return {
    render,
  };
}

const renderer = createRenderer({
  createElement(tag) {
    console.log(`创建元素 ${tag}`);
    return { tag };
  },
  setElementText(el, text) {
    console.log(`设置 ${JSON.stringify(el)} 的文本内容：${text}`);
    el.textContent = text;
  },
  insert(el, parent, anchor = null) {
    console.log(`将 ${JSON.stringify(el)} 添加到 ${JSON.stringify(parent)} 下`);
    parent.children = el;
  },
});

const vnode = {
  type: 'h1',
  children: 'hello',
};
// 使用一个对象模拟挂载点
const container = { type: 'root' };
renderer.render(vnode, container);

// 传入挂载节点等配置项
// 在创建 renderer 时传入配置项
const renderer2 = createRenderer({
  // 用于创建元素
  createElement(tag) {
    return document.createElement(tag);
  },
  // 用于设置元素的文本节点
  setElementText(el, text) {
    el.textContent = text;
  },
  // 用于在给定的 parent 下添加指定元素
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor);
  },
});
