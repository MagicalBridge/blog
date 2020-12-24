'use strict';

const PENDING = 'PENDING'; // 等待态常量
const FULFILLED = 'FULFILLED';  // 成功态常量
const REJECTED = 'REJECTED'; // 失败态常量

class Promise {
  constructor(executor) {
    // 在构造函数中创建这个状态, 每new出来一个 promise 实例 都拥有这些方法
    this.status = PENDING;
    // 一个promsie有一个成功的值和一个失败的原因
    this.value = undefined; // 成功原因
    this.reason = undefined;  // 失败原因

    this.onFulfilledCallback = []; // 成功回调的数组
    this.onRejectedCallback = []; // 失败回调数组

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // promise.then 方法是先注册的,每调用一下then方法
        // 传递两个函数 成功函数和失败函数，且可以不断的then下去
        // 遇到异步的场景，resolve 延时触发，这个时候需要数组保存
        // 提前放进数组中然后使用循环依次执行
        this.onFulfilledCallback.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 失败的时候也是一样，提前收集好所有失败处理函数，在执行reject的时候
        // 统一依次执行这些所有的失败函数。
        this.onRejectedCallback.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      this.onFulfilledCallback.push(() => { // 切片编程
        onFulfilled(this.value);
      });

      this.onRejectedCallback.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = Promise;
