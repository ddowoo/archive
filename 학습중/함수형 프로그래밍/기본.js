// js에서 함수는 일급
// -> 함수를 값으로 다룰수 있음
const add = (a) => a + 5;
console.log(add);
console.log(add(5));

// 함수의 결과값으로 함수가 사용
const f1 = () => () => 1;
console.log(f1());

// # 고차함수
// 1. 함수를 인자로 받아 실행하는 함수 (콜백함수)
const apply = (f) => f(1);
const add2 = (a) => a + 1;
console.log(apply(add2));
console.log(apply((a) => a - 2));

const times = (f, n) => {
  let i = -1;
  while (++i < n) f(i);
};

times(console.log, 5);

// 2. 함수를 만들어서 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
const addMaker = (a) => (b) => a + b;
const add10 = addMaker(10);
console.log(add10);
console.log(add10(2));
