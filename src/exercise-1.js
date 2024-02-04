// 练习 1
// ==============
// 通过局部调用（partial apply）移除所有参数

import { curry, filter, map, match, reduce, split } from 'ramda'

const words = split(' ')

// 练习 1a
// ==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组

const sentences = map(words)

console.log('sentences() :>> ', sentences(['zx/cas/d']))

// 练习 2
// ==============
// 通过局部调用（partial apply）移除所有参数

const filterQs = filter(match(/q/i))

console.log('fillterQs :>> ', filterQs(['quick', 'camels', 'quarry', 'over', 'quails']))

// 练习 3
// ==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
const _keepHighest = function (x, y) { return x >= y ? x : y }

// 重构这段代码:
const max = reduce(_keepHighest, Number.NEGATIVE_INFINITY)
console.log('max :>> ', max([8, 6, 7, 5, 3, 0, 9]))

// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
// //[1,2,3].slice(0, 2)
const slice = curry((start, end, xs) => {
  return xs.slice(start, end)
})

console.log('slice :>> ', slice(0)(2)([1, 2, 3]))

// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
const take = slice(0)
console.log('take :>> ', take(6, 'abcdefghijklmno'))
