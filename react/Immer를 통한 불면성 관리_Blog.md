# Immer를 통한 불변성 관리

테오님의 오픈카톡방에서 객체와 배열의 **불변성을 위해** map, filter, 전개연산자를 쓰는지 Immer를 쓰는지 물어보셨고 대부분의 분들이 전자를 답변으로 주셨다. 그리고 나 역시도 그랬다.

그리고 생각해 보니 그동안 Immer를 필요로 할 정도로 복잡한 구조의 객체 데이터를 다루지 않았던건지 immer의 사용법을 모르기 때문에 작업중 관성으로 immer없이 js만으로 구현한것 같다는 생각이 들었다.

나중에 필요한 순간이 올 때 immer 역시도 나의 선택지가 될수 있도록 immer에 대해서 알아보았다.

우선 immer의 사용법 전에 immer를 왜 써야하는지 부터 파악해보자

Immer는 불변 데이터가 필요한 상황에서 쓰는 라이브러리인데 불변성이란 무엇일까?

---

## **불변성이란?**

JavaScript에서 불변성은 객체가 생성된 후에 그 상태를 변경할 수 없음을 의미한다. 다시 말해, 객체의 프로퍼티를 변경할 수 없다는 것이다.

원시데이터의 불변성을 예시로 보면 이를 이해하기가 쉽다.

```jsx
jsxCopy code
let a = 'coffee';
let b = a;
a = 'coke';
console.log(a); // 'coke'
console.log(b); // 'coffee'

```

여기서 b는 a를 할당받았지만, a를 가리키는 것이 아니라 초기에 할당 받았을 때의 'coffee'를 가리키고 있다. 그래서 a에 다른 값을 할당해도 b는 변하지 않고 'coffee'를 출력한다.

그에 반해, 객체와 배열은 가변성(mutable)의 데이터다.

```jsx
jsxCopy code
const a = { drink: 'coffee' };
const b = a;
a.drink = 'coke';
console.log(a); // { drink: 'coke' }
console.log(b); // { drink: 'coke' }

```

이번에는 a에 객체를 할당하고 그 안에 'coffee'라는 프로퍼티를 가진 객체를 만들었다. 그 후에 a를 b에 할당하고, a의 프로퍼티를 ‘coke’로 변경했다. 그 결과 a와 b는 모두 변경된 값을 가르키고 있기 때문에 coke를 출력하고 있다. 이로써 불변성을 유지하지 못하고 있음을 확인할 수 있다.

그렇기 때문에 Javascript의 객체와 배열에서 불변성을 유지 하기 위해서는 map, filter, 전개 연산자와 같은 방법을 사용해야한다.

특히 **React에서는 상태 업데이트를 위해 불변성 관리**가 굉장히 중요하다.

React에서 virtual DOM을 활용하여 화면의 업데이트를 할 때 객체 내부의 데이터가 아닌 참조값만 비교하는 형식의 얕은 비교를 수행한다.

그렇기 때문에 배열이나 객체를 state값으로 사용하고 setState를 할 때는 새로운 배열과 객체를 만들어 setState를 하는 이유는 React가 상태값의 변화를 알아차리게 하기 위함이다.

---

## Immer

## JS가 아닌 Immer를 쓰는 이유

불변성 유지가 React에서 중요하단건 알았다. 근데 Javascript에서 map, filter, assign 등 이와 같은 기능을 충분히 제공하는데 굳이 Immer을 쓰는 이유는 무엇일까?

js에서 제공해주는 기능들로 불변성을 유지시키면 코드의 가독성과 유지보수의 측면에서 다소 불리하다.

예를 들어 아래와 같이 유저의 정보를 가지고 있는 객체가 있다고 가정을 하자.

```jsx
const originalObject = {
  user: {
    name: {
      first: '길동',
      last: '홍',
    },
    age: 30,
    address: {
      city: '양천구',
      state: '서울특별시',
      zip: '12345',
    },
    // ... 더 많은 중첩된 프로퍼티들
  },
  // ... 더 많은 프로퍼티들
};
```

그리고 이러한 객체의 이름과 주소를 변경한다 했을때 전개연산자를 사용해 불변성을 유지하려 하면 아래와 같이 코드가 다소 지저분해진다.

```jsx
// 원본 객체를 복사
const updatedObject = { ...originalObject };

// 이름 업데이트
updatedObject.user.name = { ...updatedObject.user.name, last: '김' };

// 주소 업데이트
updatedObject.user.address = {
  ...updatedObject.user.address,
  city: '이태원',
};
```

이런 이유는 전개연사자를 통해 중첩된 객체나 배열을 복사할때는 객체의 최상위 레벨만 복사되고 중첩된 객체 배열은 참조값이 복사되게 된다. 그렇기 때문에 뎁스가 깊은 데이터값을 수정하기 위해서는 위와 같은 코드가 나온다.

하지만 Immer를 쓰면 위와 같은 문제를 해결해 줄수 있다.

### Immer 사용법

Immer의 사용법은 매우 간단하다.

```jsx
import produce from 'immer';

const updatedObject = produce(originalObject, (draft) => {
  draft.user.name.last = '김';
  draft.user.address.city = '이태원';
});
```

immer라이브러리를 produce라는 이름으로 받고

사용시 첫번째 인자로는 복사 대상의 객체를 두번째 인자로는 해당 객체의 업데이트 하는 함수를 넣어주면 된다.

## 그럼 무조건 Immer?

물론 아니다.

Immer를 사용하면 JS의 기본 내장 함수를 이용해 작업하는 것보다 코드는 깔끔해지나 성능이 떨어진다.

immer은 es6의 Proxy를 활용하는데 만약 구형 브라우저의 환경과 같이 es6가 아니 es5의 사용을 하게되면 성능 차이는 더더욱 커지게 된다.

그렇기 때문에 데이터가 복잡해 지는것을 방지하고 JS만으로는 해결이 불가능한 경우에 immer를 쓰는 것이 추천되고 있다.

---

참조

[https://react.vlpt.us/basic/23-immer.html](https://react.vlpt.us/basic/23-immer.html)

[https://immerjs.github.io/immer/#a-quick-example-for-comparison](https://immerjs.github.io/immer/#a-quick-example-for-comparison)

[https://wandering-bear.tistory.com/66#Immutable%--type%--vs%--Mutable%--type](https://wandering-bear.tistory.com/66#Immutable%25--type%25--vs%25--Mutable%25--type)
