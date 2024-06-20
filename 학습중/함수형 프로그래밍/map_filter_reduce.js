const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// # map
// # 이터러블 프로토콜을 따르면 훨씬 다양하게 사용가능

const nameList = [];

for (const p of products) {
  nameList.push(p.name);
}

const map = (f, iter) => {
  let res = [];
  for (const p of iter) {
    res.push(f(p));
  }
  return res;
};

// console.log(
//   map((p) => {
//     return p.name;
//   }, products)
// );

// querySelectorAll 사용시
// console.log(document.querySelectorAll('*').map());
// map 사용 불가 => querySelectorAll은 array가 아닌 nodeList를 반환해 map 메서드가 없음

// 하지만 위 map 함수로는 가능
// map(el => el.nodeName ,documentQuerySelectorAll('*'))
// array는 아니지만 이터러블을 가지고 있기 때문에 for...of문을 순회해 가능하도록 함

// 이터러블을 생성하는 제네레이터 역시 map으로 활용 가능
function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

// console.log(map((num) => num * num, gen())); // 4, 9 ,6

let m = new Map();
m.set('a', 10);
m.set('b', 20);
const it = m[Symbol.iterator]();
// console.log(it); // 이터레이터 상성

// console.log(
//   map(([key, value]) => {
//     return key;
//   }, m)
// );

// => 위에서 만든 어레이 다시 맵 객체로 만들기
// console.log(
//   new Map(
//     map(([key, value]) => {
//       return [key, value * 2];
//     }, m)
//   )
// );

//
//
// # filter
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}

const filter = (fun, iter) => {
  let newList = [];
  for (const p of iter) if (fun(p)) newList.push(p);
  return newList;
};

// console.log(...filter((p) => p.price < 20000, products));

// 이터러블 프로토콜을 따르기 때문에
// 제네레이터,
//

// # reduce
const numList = [1, 2, 3, 4, 5];

// 역할
let total = 0;
for (const num of numList) {
  total += num;
}
// console.log(total);

const reduce = (fun, iter, initial) => {
  let acc = initial;

  if (acc === undefined) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const num of iter) {
    acc = fun(acc, num);
  }

  return acc;
};

// console.log(
//   reduce(
//     (acc, b) => {
//       return acc + b;
//     },
//     [1, 2, 3, 4, 5],
//     5
//   )
// );

// console.log(reduce((total, { price }) => total + price, products, 0));

// map+filter+reduce 중첩 사용과 함수형 사고
// 가격이 2배 올랐을때 4만원 이하인 물건들의 총 합
// 코드는 오른쪽에서 위로 읽으면 된다.
// console.log('중첩 사용');
// console.log(
//   reduce(
//     (acc, price) => acc + price,
//     filter(
//       (p) => p < 40000,
//       map((p) => p.price * 2, products)
//     )
//   )
// );

module.exports = { map, reduce, filter };
