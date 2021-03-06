// 将一个node api 转换成 promsie api
// fs 模块接收三个参数  url  encoding编码  fn回调函数
let fs = require('fs');
const { type } = require('os');
let path = require('path')
let namePath = path.resolve(__dirname, '../../name.txt');
let agePath = path.resolve(__dirname, '../../age.txt');
let Promise = require('../index')
// 怎样用一个node api 变成一个promsie api
// 自定义实现 promise化的函数 这个函数接收一个 函数，返回一个函数 它是一个高阶函数
function promisify(fn) {
  // 返回一个新的方法
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

// 返回一个函数 这个函数内部又返回一个 promsie 
// 因此嫩够调用then方法
let read = promisify(fs.readFile);

// 调用的时候 使用这种方式
read(namePath, 'utf8');
read(agePath, 'utf8');
// promsie.all是一个函数 接收一个数组作为参数
// 因为可以调用then方法，可以调用then方法，输出的结果 是按照顺序返回的
// 有一个出错了就会走到err中 全部成功才算成功一个失败就算失败。
// Promise.all([read(namePath, 'utf8'), read(agePath, 'utf8')]).then(data => {
//   console.log(data);
// })

// 1 接收一个数组 values：any 类型 一般是一些异步封装的方法
// 2、可以调用then 方法说明返回一个promise实例
// 3、所有的方法都执行，这种场景下使用循环去做
// 4、对于数组的每一项，需要判断当前是否是promsie，因为如果是普通值，promsie.all 方法会直接返回这个结果
// 5、计数器的使用 是其中的一个小的技巧, 方案统计成功调用次数和传如value中的值是否一致
function isPromise(value) {
  // 根据promsieA+ 规范可知 promise可以是一个对象或者是函数，且必须拥有then方法。
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    if (typeof value.then === 'function') {
      return true
    }
  }
  return false;
}
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    // 用于将结果收集起来
    let arr = [];
    // 使用计数器，判断是否全部执行完毕
    let times = 0;
    function collectResult(val, key) {
      console.log(times);
      // key 是索引  val 是当前值
      arr[key] = val;
      // 无论是promsie 还是普通值 调用的次数和 数组长度相同
      // 说明已经将所有的任务执行完毕
      if (++times === values.length) {
        // 返回 收集的数组
        resolve(arr);
      }
    }
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      // 单独封装一个方法，判断当前的值是否是promise
      if (isPromise(value)) {
        // value 是 promsie 执行自身的 then 方法
        // 如果成功 拿到当前的结果
        value && value.then((y) => {
          collectResult(y, i);
        }, reject)
      } else { // 如果是普通值
        collectResult(value, i);
      }
    }
  })
}
Promise.all([read(namePath, 'utf8'), read(agePath, 'utf8'), 0]).then(data => {
  console.log(data);
})