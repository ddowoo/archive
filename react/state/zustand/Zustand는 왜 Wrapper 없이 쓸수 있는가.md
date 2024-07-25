- Context API를 사용하지 않는다.

- Context는 일부만 바꿔도 다 바꿔서 문제잖아.

- zustand는 useRef로 생성한 Ref객체에 상태값을 담아두고 레퍼런스로만 관리

- 그럼 zustand는 useState를 안쓰는데 어떻게 react 생명 주기에 맞춰서 행동할까?

```ts
useIsomorphicLayoutEffect(() => {
  const listener = () => {
    try {
      const nextState = api.getState();
      const nextStateSlice = selectorRef.current(nextState);

      if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
        stateRef.current = nextState;
        currentSliceRef.current = nextStateSlice;
        forceUpdate();
      }
    } catch (error) {
      erroredRef.current = true;
      forceUpdate();
    }
  };

  const unsubscribe = api.subscribe(listener);

  return unsubscribe;
}, []);
```

- 갱신이 필요한 경후 `forceUpdate` 호출

- forceUpdate 함수는 훅을 재실행하는 일종의 트릭

```ts
const [, forceUpdate] = useReducer((n) => n + 1, 0);
```

![Untitled](../screenshot/intent_error.png)
