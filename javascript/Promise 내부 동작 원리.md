## 프라미스 객체 생성

- 프라미스 객체 구조 (내부 슬롯)

  - [[PromiseState]]
    - Promise의 현재 상태를 나타냄
    - "pending", "fulfilled", "rejected"
  - [[PromiseResult]]
    - Promise 작업 완료 값을 저장
    - 성공시 결과 값, 실패시 오류 객체
  - [[PromiseIsHandled]]
  - [[PromiseFulfillReactions]]
  - [[PromiseRejectReactions]]
  - etc...

- Promise Capability 레코드가 생성
  - JS엔진이 Promise객채 생성시 내부에서 관리하는 코드

### `resolve` 실행

- [[PromiseState]] "fufilled"로 변경
- [[PromiseResult]]는 resolve로 넘긴 값으로 변경

### `reject` 실행

- [[PromiseState]] "rejected"로 변경
- [[PromiseResult]]는 reject로 넘긴 값으로 변경

---

- ### [[PromiseFulfillReactions]]

  - Promise Reaction 포함

    - 프로미스의 `then` 핸들러 체이닝 생성
    - `then`에 전달한 콜백 보관하는 [[Handler]] 프로퍼티 포함
    - Promise 실행하면 `Microtask Queue`에 추가, 접근 가능

  - Promise 실행 후 [[PromiseResult]]의 값을 인자로 받으면 `Microtask Queue`로 간다

    - `Microtask Queue`?

      - 이벤트 루프에 있는 특수한 대기열
        - 이벤트 루프?<br/>
          비동기 함수들을 적절한 시점에 실행시키는 관리자
      - `Microtask Queue`는 callstack이 빈경우 이벤트 루프는 Task Queue 이전에 `Microtask Queue`를 확인한다.

---

### 예시

```javascript
new Promise((resolve) => {
  setTimeout(() => resolve('Done!'), 100);
}).then((result) => console.log(result));
```

1. callstack에 new Promise 생성자 추가
2. 실행 함수 실행 (callstack에 추가된 `settimeout`)
3. 타이머 생성자 모두 callstack을 빠져 나오면 callstack에 then(콜백함수) 가 추가된다.
4. [[PromiseState]]가 여전히 "pending" 상태이기 때문에, Promise Reaction 레코드는 [[PromiseFulfillReactions]] 목록에 추가
   <br/>
5. 100ms후 실행되는 `()=>resolive()`는 TaskQueue에 추가 CallStack으로 바로 넘어감
6. `resolve` 호출 [[PromiseState]] "fulfilled"로 변경 [[PromiseResult]] "Done"로 변경
7. [[PromiseFulfillReactions]]에 생성된 PromiseReaction객체 `Microtask Queue`로 이동

**참조**
https://www.youtube.com/watch?v=Xs1EMmBLpn4
