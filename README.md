# 响应式对象

## npm包

    npm install @wangminghua/reactive

## 浏览器使用

      <script src="../dist/reactive.umd.js"></script>

```javascript
const { observable, reaction } = window.reactive
  // 创建对象响应式代理
  const obj = observable({
    time: ''
  })

  // 定时更新属性值
  setInterval(() => {
    obj.time = new Date().toLocaleTimeString()
  }, 1000)

  // 监听time属性，发生变化时，触发对应的函数
  reaction(() => obj.time, (val,old) => {
    document.getElementById('txt').innerHTML = `当前时间：${val} 更新前时间：${old}`
    document.getElementById('txt2').innerHTML = `当前时间：${obj.time}`
  })
```
