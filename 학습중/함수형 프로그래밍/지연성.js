const { cReduce, go, cMap, curry } = require('./fx');

const add = (a, b) => a + b;

// #range

const range = (limit) => {
  let i = -1;
  const res = [];
  while (++i < limit) {
    // console.log('range i : ', i);
    res.push(i);
  }

  return res;
};

console.log(range(3));
// console.log(cReduce(add, range(3)));

// #Lazy Range 느긋한 range함수 만들기
// Generator함수를 이용해 이터레이터를 만들도록
const LazyRange = function* (limit) {
  let i = -1;
  while (++i < limit) {
    //generator함수이기 때문에 함수를 실행한다고 해도 이러테리터를 순회하지 않는 이상 아래 로그는 찍히지 않는다.
    // console.log('L.range i : ', i);
    yield i;
  }
};

// const L = {};
// L.range = function* (limit) {
//   let i = -1;
//   while (++i < limit) {
//     yield i;
//   }
// };

//
const list = LazyRange(3);
console.log(list);
// next를 하는 순간에 L.range로그가 가 찍힌다.
console.log(list.next());
console.log(list.next());
// console.log(list);
// console.log(cReduce(add, LazyRange(3)));

//---------------------
// range 함수로 만든 배열은 사실 순회하기 전까지 아직 필요한 값이 아닐 수도 있음
// LazyArange로 만들면 평가 받는 순간에만 순회할 수 있도록 할 수 있음
// 그래서 더 효율적임

const take = (limit, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === limit) return res;
  }
  return res;
};

const cTake = curry(take);

console.time();
console.log(take(5, range(100000))); // 0~9까지 있는 배열을 만들고 0~4를 자름
console.timeEnd(); // default: 1.083s

console.time();
console.log(take(5, LazyRange(Infinity))); // 0~4까지만 순회하여 배열을 만듬 => 숫자가 커지면 훨씬 호율적임
console.timeEnd(); // default: 0.134ms

// --------------------- 지연평가  ---------------------
// 필요한 순간까지 평가를 미루다 평가할떄 필요한 값들을 만드는것
// 배열을 밀이 만들어 두는 것이 아닌 => generator를 이용해 필요한 순간까지만 순회하기
// 이터러블 중심 프로그래밍

const L = {};

// iter를 순회하며 iterator
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};

L.filter = function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
};
const it = L.filter((a) => a % 2, [1, 2, 3, 4]);
console.log(it.next());
console.log(it.next());

// ------------- range, map, filter, take, reduce 중첩 사용 ---------------
go(
  range(10),
  cMap((n) => n + 10),
  cTake(3),
  console.log
);

L.map = curry(function* (f, iter) {
  const res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value();
    res.push(a);
  }
  return res;
});
