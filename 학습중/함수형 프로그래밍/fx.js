const { reduce, filter, map } = require('./map_filter_reduce');

// 첫번째 값을 가지고 계속해서 이후 파라미터(함수들)을 순회
const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
  (f, ...fList) =>
  (...aList) =>
    go(f(...aList), ...fList);

const curry =
  (f) =>
  (a, ...args) =>
    args.length ? f(a, ...args) : (...args) => f(a, ...args);

const cMap = curry(map);
const cFilter = curry(filter);
const cReduce = curry(reduce);

module.exports = {
  go,
  pipe,
  curry,
  cMap,
  cFilter,
  cReduce,
};
