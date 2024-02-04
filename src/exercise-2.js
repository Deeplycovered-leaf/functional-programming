import {
  add,
  compose,
  concat,
  curry,
  filter,
  flip,
  head,
  join,
  last,
  map,
  prop,
  reduce,
  replace,
  sortBy,
  toLower,
} from 'ramda'
import accounting from 'accounting'

const trace = curry((tag, x) => {
  console.log(tag, x)
  return x
})

const CARS = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false },
]

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。提示：_.prop() 是 curry 函数
// const isLastInStock = function (cars) {
//   const last_car = _.last(cars)
//   return _.prop('in_stock', last_car)
// }
const isLastInStock = compose(prop('in_stock'), last)
console.log('isLastInStock :>> ', isLastInStock(CARS))

// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
const nameOfFirstCar = compose(prop('name'), head)
console.log('nameOfFirstCar :>> ', nameOfFirstCar(CARS))

// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
const _average = function (xs) { return reduce(add, 0, xs) / xs.length } // <- 无须改动

// const averageDollarValue = function (cars) {
//   const dollar_values = map((c) => { return c.dollar_value }, cars)
//   return _average(dollar_values)
// }

const averageDollarValue = compose(_average, map(prop('dollar_value')))
console.log('averageDollarValue :>> ', averageDollarValue(CARS))

// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串：
// 例如：sanitizeNames(["Hello World"]) //=> ["hello_world"]。

const _underscore = replace(/\W+/g, '_') // <-- 无须改动，并在 sanitizeNames 中使用它

// const sanitizeNames = compose(map(toLower), map(_underscore))
// const sanitizeNames = compose(map(_underscore), map(toLower))
const sanitizeNames = map(compose(_underscore, toLower))
console.log('sanitizeNames :>> ', sanitizeNames(['Hello World']))

// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices

// const availablePrices = function (cars) {
//   const available_cars = _.filter(_.prop('in_stock'), cars)
//   return available_cars.map((x) => {
//     return accounting.formatMoney(x.dollar_value)
//   }).join(', ')
// }
const formatPrice = compose(
  accounting.formatMoney,
  prop('dollar_value'),
)
const availablePrices = compose(
  join(', '),
  map(formatPrice),
  filter(prop('in_stock')),
)
console.log('availablePrices :>> ', availablePrices(CARS))

// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示：可以使用 _.flip()

// const fastestCar = function (cars) {
//   const sorted = _.sortBy((car) => { return car.horsepower }, cars)
//   const fastest = _.last(sorted)
//   return `${fastest.name} is the fastest`
// }
const append = flip(concat)
const fastestCar = compose(
  append(' is the fastest'),
  trace('after =>'),
  prop('name'),
  last,
  sortBy(prop('horsepower')),
)
console.log('fastestCar :>> ', fastestCar(CARS))
