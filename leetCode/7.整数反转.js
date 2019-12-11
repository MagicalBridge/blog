/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (32.23%)
 * Total Accepted:    168.4K
 * Total Submissions: 512.4K
 * Testcase Example:  '123'
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 
 * 示例 1:
 * 
 * 输入: 123
 * 输出: 321
 * 
 * 
 * 示例 2:
 * 
 * 输入: -123
 * 输出: -321
 * 
 * 
 * 示例 3:
 * 
 * 输入: 120
 * 输出: 21
 * 
 * 
 * 注意:
 * 
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回
 * 0。
 * 
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  // 转换为数组
  let numberToArray = String(Math.abs(x).split(''))
  // 转换为字符串
  let result = ''
  for (const i = 0; i < numberToArray.length;) {
    result += numberToArray.pop()
  }
  reslut = x > 0 ? Number(result) : Number(result)
  // 越界操作 [-Math.pow(2,31), Math.pow(2,31)-1] 判断
  if (result > Math.pow(2, 31) - 1 || result < -Math.pow(2, 31)) {
    result = 0
  }
  return result
};

