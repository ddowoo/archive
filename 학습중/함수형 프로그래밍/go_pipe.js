const { reduce, filter, map } = require('./map_filter_reduce');

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// # 코드를 값으로 다루어 표현력 높이기
// EX 복잡해

const add = (a, b) => a + b;

const go = (...args) => reduce((a, f) => f(a), args);
const pipe =
  (f, ...fs) =>
  (...aList) =>
    go(f(...aList), ...fs);

go(
  add(0, 1),
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  console.log
);

// # pipe

const nF = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);
console.log(nF(0, 1));

// console.log(
//   reduce(
//     (acc, price) => acc + price,
//     filter(
//       (p) => p < 40000,
//       map((p) => p.price * 2, products)
//     )
//   )
// );

go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  console.log
);

// ## curry
// 1. 함수를 받아 함수를 리턴
const curry =
  (f) =>
  (a, ...args) =>
    args.length
      ? // 2. 실행됐을때 파라미터가 두개 이상 => 바로 실행
        f(a, ...args)
      : // 3. 파라미터가 하나인 경우 이후 들어온 인자들을 가지고 실행될 함수를 반환
        (...args) => f(a, ...args);

const mult = curry((a, b) => a * b);
console.log(mult(1));
console.log(mult(3)(2)); // 6

const mult3 = mult(3);
console.log(mult3(5)); // 15

// go 함수 축약하기
const curryMap = curry(map);
const curryFilter = curry(filter);
const curryReduce = curry(reduce);
go(
  products,
  (products) => curryFilter((p) => p.price < 20000)(products),
  (products) => curryMap((p) => p.price)(products),
  (prices) => curryReduce(add)(prices),
  console.log
);

console.log('함수를 부분적으로 실행');

go(
  products,
  curryFilter((p) => p.price < 20000),
  curryMap((p) => p.price),
  curryReduce(add),
  console.log
);

// # 함수 조합으로 함수 만들기

const totalPrice = pipe(
  curryMap((p) => p.price),
  curryReduce(add)
);

const baseTotalPrice = (predi) => pipe(curryFilter(predi), totalPrice);

go(
  products,
  baseTotalPrice((p) => p.price >= 20000),
  console.log
);
