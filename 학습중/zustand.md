# Zustand DOC 학습중

### 불변성 유지 및 병합

#### 데이터 깊이가 1인 경우 병합처리

```js
const useCountStore = create((set) => ({
  count: 0,
  subCount: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
```

- replace flag

  `set`의 두번쨰 파라미터로 병합 사용 여부 설정 가능 `true`인 경우 병합이 아닌 replace

  ```js
  set((state) => newState, true);
  ```

<br/>

#### 데이터 깊이가 1인 이상인 경우

1. 전개연산

   ```js
   const useCountStore = create((set) => ({
     nested: { count: 0 },
     inc: () =>
       set((state) => ({
         nested: { ...state.nested, count: state.nested.count + 1 },
       })),
   }));
   ```

2. immer 사용

- 코드 작성하기

<br/>
<br/>

### 추천 패턴

#### 단일 스토어 유지

- 전역상태값은 하나의 store로 모여야 한다

- 프로젝트 사이즈가 큰 경우 스토어를 나누어 사용

#### 스토어 업데이트는 항상 `set`, `setState` 사용

#### 스토어 action 상태값과 같이 두기

- dispatch나 reducer 없이도 상태 업데이트 가능

  ```js
  const useBoundStore = create((set) => ({
      storeSliceA: ...,
      storeSliceB: ...,
      storeSliceC: ...,
      updateX: () => set(...),
      updateY: () => set(...),
  }))
  ```

- 경우에 따라 setState를 사용해 store외부에서 상태 변경 하도록

  ```js
  export const useBoundStore = create(() => ({
    count: 0,
    text: 'hello',
  }));

  export const inc = () => useBoundStore.setState((state) => ({ count: state.count + 1 }));

  export const setText = (text) => useBoundStore.setState({ text });
  ```

#### Redux처럼 reducer와 dispatch 패턴 사용하는것도 가능

```js
const types = { increase: 'INCREASE', decrease: 'DECREASE' };

const reducer = (state, { type, by = 1 }) => {
  switch (type) {
    case types.increase:
      return { grumpiness: state.grumpiness + by };
    case types.decrease:
      return { grumpiness: state.grumpiness - by };
  }
};

const useGrumpyStore = create((set) => ({
  grumpiness: 0,
  dispatch: (args) => set((state) => reducer(state, args)),
}));

const dispatch = useGrumpyStore((state) => state.dispatch);
dispatch({ type: types.increase, by: 2 });
```

<br/>

#### `createSelector` 사용

- 추천 패턴은 아래와 같다

  ```js
  const bears = useBearStore((state) => state.bears);
  ```

- `createSelector` 사용시

  ```js
  const useBearStoreBase = create()((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    increment: () => set((state) => ({ bears: state.bears + 1 })),
  }));

  //createSelectors 사용
  const useBearStore = createSelectors(useBearStoreBase);

  // 상태값 접근
  const bears = useBearStore.use.bears();
  // 액션 접근
  const increment = useBearStore.use.increment();
  ```

<br/>
<br/>

## 액션은 스토어에서 분리해서 사용

- 권장 사용법은 액션을 스토어에 상태값과 같이 배치하는것

  ```js
  export const useBoundStore = create((set) => ({
    count: 0,
    text: 'hello',
    inc: () => set((state) => ({ count: state.count + 1 })),
    setText: (text) => set({ text }),
  }));
  ```

- 다른 방식으로는 외부에서 선언하기

  - 코드 분리 용이

  - hooks 사용하지 않아도 됨

  ```js
  export const useBoundStore = create(() => ({
    count: 0,
    text: 'hello',
  }));

  // setState로 선언
  export const inc = () => useBoundStore.setState((state) => ({ count: state.count + 1 }));

  export const setText = (text) => useBoundStore.setState({ text });
  ```
