const { go, pipe, curry, cMap, cFilter, cReduce } = require('./fx.js');

const products = [
  { name: '반팔티', price: 15000, quantity: 1 },
  { name: '긴팔티', price: 20000, quantity: 2 },
  { name: '핸드폰케이스', price: 15000, quantity: 3 },
  { name: '후드티', price: 30000, quantity: 4 },
  { name: '바지', price: 25000, quantity: 5 },
];

const add = (a, b) => a + b;

// const sum = (f, iter) => go(iter, cMap(f), cReduce(add));
const sum = curry((f, iter) => go(iter, cMap(f), cReduce(add)));

const getTotalQutantity = sum((p) => p.quantity);

console.log(getTotalQutantity(products));

// const getTotlaPrice = pipe(
//   cMap((p) => p.price * p.quantity),
//   cReduce((a, b) => a + b),
//   console.log
// );

const getTotlaPrice = (products) => sum((p) => p.price * p.quantity, products);
getTotlaPrice(products);
