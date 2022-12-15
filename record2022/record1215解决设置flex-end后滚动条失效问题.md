#### record1215 解决设置 flex-end 后滚动条失效问题

在做智慧工单的过程中，发现处置工单的对话框与聊天界面很像，但是却简陋许多——消息是从上往下显示，并且点击输入框中间的盒子的高度还不会自动减小，后一个问题好解决，但是前一个问题呢？

- 首次尝试： 使用 flex 布局，
  ```javascript
    flex-direction:column;
    justify-content: flex-end;
    overflow-y: auto;
  ```
  本意是利用 justify-content: flex-end;使盒子内的元素从下至上显示，但是设置后发现，即使元素超过盒子高度，也不会出现滚动条，无法向上滑动——overflow 失效了
  - 原因：滚动条方向默认是向下或向右，只有容器下方（或右侧）内容有多余，才需要滚动，而设置了 flex-end 后，盒子内容溢出方向是向上的，也就无法滑动了。

尝试了这个方法后发现也无法实现

```javascript
  &::before , &::after {
      content:'';
      flex:1;
}
替换 justify-content: flex-end;
```

- 最后的解决方法：
  ```javascript
  flex-direction:column-reverse;
  overflow-y: auto;
  ```
  设置 flex-direction 为 column-reverse;，这样会导致消息显示倒转——本来是时间早的在上方，时间近的在下方，但设置后反过来了，只要将要显示的数据的数组反转即可 replyList.reverse(); 这样就可以成功使滚动条是从下至上滑动了。
