# assign vs spread

# 1. assign(target, source1, source2)

- 객체를 변수에 그대로 선언하는 경우

```jsx
const user = { name: 'hello', age: 'world' };
const _user = user;
user.name = 'bye';
console.log(user); // {name: 'bye', age: 'world'}
console.log(_user); // {name: 'bye', age: 'world'}
```

\_user에는 객체가 아닌 객체의 정보를 담고있는 참조 값이 대입되기 때문에 위와 같은 경과가 나온다

- assign을 사용하는 경우

```jsx
const user = { name: 'hello', age: 'world' };
const _user = Object.assign({}, user);
user.name = 'bye';
console.log(user); // {name: 'bye', age: 'world'}
console.log(_user); // {name: 'hello', age: 'world'}
```

\_user는 assign의 첫번째 인자인 {}에 user의 값을 복사한 값을 받게 된다.

-key값이 동일한 경우 더 뒤에 위치한 객체의 값으로 덮어쓴다.

```jsx
const user = { name: 'hello', age: 'world' };
const koreanUser = { name: 'hello', age: 'korea' };
const _user = Object.assign({}, user, koreanUser);
user.name = 'bye';
console.log(user); // {name: 'bye', age: 'world'}
console.log(_user); // {name: 'hello', age: 'world'}
```

- assign vs spread

위와 같은 결과는 spread를 이용해서도 만들 수 있다.

```jsx
const user = { name: 'hello', age: 'world' };
const _user = { ...user };
user.name = 'bye';
console.log(user); // {name: 'bye', age: 'world'}
console.log(_user); // {name: 'hello', age: 'world'}
```

그럼 둘의 차이는?

spread는 새로운 객체를 반환하고 assign은 target 객체를 조작한다.

```tsx
const user = { name: 'hello', age: 'world' };
const otherUser = { name: 'hi', age: 'world' };
const _user = Object.assign(otherUser, user);
user.name = 'bye';
console.log(user); // {name: 'bye', age: 'world'}
console.log(otherUser); // {name: 'hello', age: 'world'}
console.log(_user); // {name: 'hello', age: 'world'}
```

assign에 첫번째 인자로 들어간 otherUser를 조작한 값을 반환하기 때문에
\_user = 조작된otherUser와 동일하다.
즉 \_user와 otherUser는 동일한 참조 값을 보기 때문에 다음과 같은 결과가 나온다.

```jsx
console.log(_user === otherUser); // true
```
