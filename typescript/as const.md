# as const

- 변수에 더 좁은 타입을 제공하는 타입스크립트 기능

- 상수가 아닌 것을 상수로 선언

- 아래와 같이 타입 선언을 생략 할 수도 있다.

  - <b>타입 직접 입력</b>

    ```typescript
    type Colour = 'red' | 'green' | 'blue';
    type Variant = 'light' | 'dark';
    type ColourVariant = `${Variant}-${Colour}`;
    // "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"

    function createColourVariant(colour: Colour, variant: Variant): ColourVariant {
      return `${variant}-${colour}`;
    }
    ```

  - <b>as const 사용</b>
    ```typescript
    function createColourVariant(colour: Colour, variant: Variant) {
      return `${variant}-${colour}` as const;
    }
    // function createColourVariant(colour: Colour, variant: Variant): "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"
    ```

<br/>

## 객체

- 객체에서 `as const`는 모든 속설을 읽기 전용(readonly)으로 만듬

  ```typescript
  const myObject = {
    foo: 'bar',
    baz: 7,
  };

  /*
  const myObject: {
      foo: string;
      baz: number;
  }
  */

  const myObject = {
    foo: 'bar',
    baz: 7,
  } as const;

  /*
  const myObject: {
      readonly foo: "bar";
      readonly baz: 7;
  }
  */
  ```

- 속성값 변경 불가능

  ```typescript
  const numbers = {
    one: 1,
    two: 2,
  } as const;

  numbers.two = 3;
  // Cannot assign to 'two' because it is a read-only property.(2540)
  ```

- 객체, 배열 변형 메서드도 사용 불가

  ````typescript
  const numbers = [1,2,3] as const

      numbers.push(0)
      // Property 'push' does not exist on type 'readonly [1, 2, 3]'.(2339)

      ```

  <br/>
  <br/>
  ````

## 배열

- 읽기 전용 튜플로 변경

  ````typescript
  const numbers = [1,2,3]
  // const numbers: number[]

      const numbers = [1,2,3] as const
      // const numbers: readonly [1, 2, 3]
      ```

  <br/>

  ````

- return 값으로 사용시 유용

  - ex) hooks

    ```typescript
    function useToggle(defaultValue = false) {
      const [active, setActive] = useState(false);
      const toggle = () => setActive((v) => !v);

      return [active, toggle];
    }
    // (boolean | (() => void))[]
    ```

    <b>as const 사용</b>

    ```typescript
    function useToggle(defaultValue = false) {
      const [active, setActive] = useState(false);
      const toggle = () => setActive((v) => !v);

      return [active, toggle] as const;
    }
    // readonly [boolean, () => void]
    ```
