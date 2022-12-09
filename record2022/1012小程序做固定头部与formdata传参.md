#### 小程序不支持 formData

W:请求接口时报 500，检查参数发现没有问题，后来才知道小程序不支持 formData，需要进行转换，
请求头：

```javascript
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
```

这时就可以传入 body 参数了

#### 小程序怎么做固定头部

要用微信组件 scroll-view

```javascript
<template>
  <div class="top">...</div>
  <scroll-view class="main">
  ...
  </scroll-view>
</template>
<style>
  .top{
    height: 12%;
        position: fixed;
    z-index: 10;
    top: 0%;
  }
  .main{
    position: relative;
    top: 12%;
    height: 88%;
  }
</style>
```

#### 登录

登录鉴权，前端要做的就是将信息传给后端（以及限定一些规则），将返回的 token 存储到 cookies 里，

```javascript
// 表单验证提交
const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await login(loginForm);
      if (res?.token) {
        cookies.set('satoken', res.token); // 将返回的token存储到cookies里
        router.replace('/');
      }
    }
  });
};
```

####

1、单点登录？  
2、后端实现的方法是：守卫？nest.js
3、目录导航的实现，如果是树形结构的话要怎么做？————拍扁？将其变为一维结构？或者在不常操作的时候，直接用树形结构遍历？
参考 sioc 的
src\product\Micro\module\DisasterReductionAccount\useHooks\useInit.ts
4、以树形结构显示左侧分组

// upload test
