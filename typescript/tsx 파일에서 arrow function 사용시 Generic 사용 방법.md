### 상황

- tsx 파일내 화살표 함수에서 Generic을 사용하는 경우 에러가 생기는 이유

### 원인

- JSX 문법과 충돌
  - 컴파일러가 Generic의 `<T>`를 JSX 태그로 혼동하기 때문에 에러 발생

### 해결 방법

- <b>쉼표 사용</b>

  - 예시
    ```tsx
    const GenericComponent = <T,>(param: T) => x;
    ```

- <b>extends 활용</b>

  - 예시
    ```tsx
    export const getTestNavigation = <T extends {}>() => {
        ...
    };
    ```
