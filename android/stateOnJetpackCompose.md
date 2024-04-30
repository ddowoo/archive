# Jetpack Compose에서 State

- `remember`

  - remember에 의해 생성된 값으 초기 컴포지션 중에 메모리에 저장

  - 저장 값은 리컴포지션시 반환

- 선언 방법

  - 구성

    - `mutableStateOf(default)` : 상태에 값을 보유할 MutableState 객체 반환, 상태의 초기 값은 파라미터로 넘긴다

    - `remember{}` : 컴포저블 함수가 재구성 되더라도 람다{}를 실행하지 않고, 전달된 값을 기억해야 한다고 컴포즈에 말한다.

    - `by` : kotlin delegates 키워드, 이 키워드를 이용해 변수 조회시 mutableStateOf 객체가 아닌 value값을 반환하는 것 처럼 해줌

  1. `val mutableState = remember { mutableStateOf(default) }`

     - mutableStateOf() 함수를 사용하여 만든 상태를 remember 스코프에 보존

     - 상태값 변경시 `mutableState.value = x`와 같은 형태로 value에 넣어준다.

  2. `val value by remember { mutableStateOf(default) }`

     - 위와 동일하나 value를 직접 참조하지 않고 알아서 반환

  3. `val (value, setValue) = remember { mutableStateOf(default) }`

     - react의 hooks 패턴과 유사

     - setValue를 통해 값을 변경할 수 있음
