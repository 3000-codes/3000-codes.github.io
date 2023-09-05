# 如何判断对象是否已经被 Proxy(代理)了

简单的说一下 Proxy 的定义:**用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）**。

## 使用常用方法判断类型

```js
const obj = {};
const proxiedObj = new Proxy(obj, {});
// typeof
typeof proxiedObj; // => 'object'
// instanceof
proxiedObj instanceof Proxy; // =>Uncaught TypeError: Function has non-object prototype 'undefined' in instanceof check

// 原型链
proxiedObj.__proto__ === Proxy.prototype; // => false

// constructor
proxiedObj.constructor === Proxy; // => false

// "万能"判断:Object.prototype.toString.call
Object.prototype.toString.call(proxiedObj); // => '[object Object]'
```

震惊,万能判断都失效了!

### 为什么?

- `typeof`:根据 MDN 文档我们知道它只能准确判断部分类型,如:`undefined`,`boolean`,`number`,`bigint`,`string`,`symbol`,`function`。其他类型均返回 `object`。
  所以无论是 obj 还是 proxiedObj 的返回值都是 `object`。

- `instanceof`:用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
- `原型链`

```js
const obj = {};
const proxiedObj = new Proxy(obj, {});
let __proto__ = proxiedObj.__proto__;

while (__proto__ !== null) {
  console.log(__proto__);
  __proto__ = __proto__.__proto__;
}
```
