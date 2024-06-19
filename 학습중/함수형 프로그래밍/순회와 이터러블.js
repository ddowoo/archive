// ES5에서 순회
const list = [1, 2, 3];
for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}

const strList = '123';
for (let i = 0; i < list.length; i++) {
  console.log(strList[i]);
}

//ES6에서 순회
for (const num of list) {
  console.log(num);
}

for (const str of strList) {
  console.log(str);
}

//
//
// ############################ 이터러블 이터레이터 프로토콜 ############################
// ---------------------------------------
// for ~ of는 데이터 타입에 맞춰 알아서 순회해줌
// Array
const arr = [1, 2, 3];
console.log('Array---------');
for (const a of arr) console.log(a);

// Set
const set = new Set([1, 2, 3]);
console.log('Set---------');
for (const a of set) console.log(a);

// Map
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
console.log('Map---------');
for (const a of map) console.log(a);

//어떻게 다르게 순회할까?
console.log(arr[Symbol.iterator]); // [Function: values]
console.log(set[Symbol.iterator]); //[Function: values]
console.log(map[Symbol.iterator]); //[Function: entries]

// 이터러블/ 이터레이터 프로토콜
// - 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
// - 이터레이터: {value, done} 객체를 리턴하는 next() 를 가진 값
// - 이터러블/ 이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록 규약

// 이터러블을 활용해 이터레이터를 받고 이터레이터를 이요해 순회함
//  => 이터러블이 없으면 순회를 못하는 이유
const iter1 = arr[Symbol.iterator]();
console.log(iter1.next()); // { value: 1, done: false }
console.log(iter1.next()); // { value: 2, done: false }
console.log(iter1.next()); // { value: 3, done: false }
console.log(iter1.next()); // { value: undefined, done: true }
// next를 이용해 순회하고 순회가 끝나면 done이 true 값으로 나온다.
for (const a of iter1) console.log(a); // 순회가 끝나서 아무것도 안봉여줌

const notIterableArr = [...arr];
notIterableArr[Symbol.iterator] = null;
// for (const a of notIterableArr) console.log(a); //TypeError: brokenArr is not iterable

// 그렇기 때문에 set이 set[1]로 접근하는 방식이 아니더라도 이터레이터를 받아 for문을 돌 수 있는거임
const setIter = set[Symbol.iterator]();
console.log(setIter.next()); //{ value: 1, done: false }
console.log(setIter.next()); //{ value: 2, done: false }
console.log(setIter.next()); //{ value: 3, done: false }
console.log(setIter.next()); //{ value: undefined, done: true }

// map의 keys, values, entries로 리턴받는 값은 이터러블을 가지고 있음
for (let a of map.keys()) console.log(a);
for (let a of map.values()) console.log(a);
for (let a of map.entries()) console.log(a);

//
//
// ############################ 사용자 정의 이터러블 ############################
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
for (const a of iterable) console.log(a); // 3,2,1
// for문은 [Symbol.iterator]()을 이용해 이터레이터를 생성하고
// 그 안에는 next(가 있음)
// next를 실행시키면서 value을 뱉고, done이 true로 끝나기 때문에 iterable는 for..of문으로 순회 할 수 이씀

// 웰품드 이터레이터는
// 1. 이터레이터에도 이터러블이 있어야함
// 2. 일정부분 진행후 순회도 가능해야함
const goodIterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
      // 잘 만들어진 이터레이터가 되기 위해서는
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

const goodIterator = goodIterable[Symbol.iterator]();
goodIterator.next();
for (const a of goodIterator) console.log(a); // 2,1

// 위 개념으로
// for(const a of document.querySelectorAll('*'))console.log(a)
// 위와 같은 domList도 순회 할 수 있게됨

//
//
// ############################ 전개 연산자 ############################
const a = [1, 2, 3];
console.log(...a); //1 2 3
a[Symbol.iterator] = null;
console.log(...a); //TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function
