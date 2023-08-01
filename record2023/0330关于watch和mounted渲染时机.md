       #### 要等数据请求完之后，并且渲染dom完成之后，获取到dom进行动态操作
        场景： 
        sioc项目: src\product\Campus\FunModule\InspectionSupervision\components\Patrol\Patrol.vue;
        实现这个轮播图，渲染条形需要获取到dom,但是请求数据需要时间，我需要在获取完数据后再进行渲染是吧，也就是mounted()里面，我看了一下，这部分也不是我写的，是cv过来的，下面的定时器延时设置得太长，我设置的时间短的话，又会渲染失败
        也就是说数据还没请求完，dom就渲染上去了，所以我获取到了dom但是没有数据对吗
        - 那肯定是异步的问题 是的 你得数据获取完后 再加载dom
     
          甚至还用到了Updated，最后也差不多没问题，但是我不知道是watch还是Updated起的作用 
          这个不要用
          为什么 因为他是只要属性变化 都会执行 这明显不好的 你本来只需要数据改变才渲染的
         属性改变？ 那watch和它一样吗 不一样 watch 是监听某个属性 而这个是组件内所有属性 只要有响应式的数据改变过 都会执行
        原来如此
        不过我用watch也不太行 感觉偶然性很大 有时候能渲染得出来有时候不行 那就证明代码有问题

         数组属于对象类型，得深度监听 
         watch里执行的时候, dom还没渲染，拿不到.bar? 这个情况会有吗
         watch是在dom渲染完成之后才执行的吗？ 这得看这个数据是否在dom渲染之后改变的还是之前 可能会出现这个情况
         但是你这个方法不是用了nextTick吗，所以不会有这种情况
         drawProcessBar没用23333 在mounted里是用了 mounted用nextTick 有跟没有是一个效果的 
         所以我应该在watch里也用nextTick 对啊呜呜 你应该在这个drawProcessBar方法里用nextTick
        在watch里加上nextTick

        总结：因为是在父组件请求的数据用props下发到子组件的，所以，如果不用做切换效果的话，在父组件加v-if控制数据请求完成之后再渲染子组件就可以；如果涉及到切换，那就用watch;

        