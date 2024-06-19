// 제너레이터/ 이터레이터
// 제너레이터 : 이터레이터이자 이터러블을 생성하는 함수
// 여러개의 값을 필요에 따라 하나씩 반환 할 수 있음
//일반 함수에 * 을 더해 이터레이터를 생성
function* gen() {
  yield 1;
  yield 2;
  yield 5;
  return 10; // 리턴은 순회와 무관
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter); // true
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.next()); // { value: 5, done: false }
console.log(iter.next()); // { value: 100, done: true }

for (const a of gen()) console.log(a); // 1,2,5

// 홀수 순회 이터레이터 만들기

function* odds(limit) {
  for (let i = 1; i <= limit; i = i + 2) {
    yield i;
  }
}

const iterator = odds(22);
for (const a of iterator) console.log(a);

// for of , 전개 연산자, 구조 분해, 나머지 연산자
console.log(...odds(10));
console.log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
console.log(head);
console.log(tail);

const [a, b, ...rest] = odds(10);
console.log(a);
console.log(b);
console.log(rest);
