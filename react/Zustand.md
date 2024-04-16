# Zustand의 사용 이유

[Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)

zustand는 빠르고, 가볍고, 보일러 코드가 없는 상태 관리 코드

## **recoil** vs **zustand**

recoil은 atom의 string key 값을 참조하고 provider로 감싸줘야 한다

recoil과 달리 suspense, Errorboundary에 대한 제공이 없음

## 기본 사용법

- store

```tsx
import { create } from 'zustand';

type States = {
  count: QuizCount;
  level: QuizLevel;
};

type Actions = {
  setCount: (count: QuizCount) => void;
  setLevel: (level: QuizLevel) => void;
};

export const useQuizConfig = create<States & Actions>((set) => ({
  count: null,
  level: null,
  setCount: (count: QuizCount) => set({ count }),
  setLevel: (level: QuizLevel) => set({ level }),
}));
```

- **Component**

```tsx
const quizConfig = useQuizConfig();

const handleQuizCount = quizConfig.setCount;
const handleQuizLevel = quizConfig.setLevel;
```

## 추천 패턴

- 단일 스토어
  글로벌 상태값은 하나의 단일 스토어에 존재해야함 (Redux와 같이)
  만약 어플리 케이션이 너무 커서 스토어를 나누고 싶다면 아래와 같은 방법 제공
  [Zustand Documentation](https://docs.pmnd.rs/zustand/guides/slices-pattern)

## 결론

1. 문서에 Typescript에 대한 코드가 잘 되어있다.
2. 사용방법이 간단하고 코드도 깔끔하다
3. Susepnse, Errorboundary와 같은 부분을 제공 하지 않지만 실제로 위 코드는 서버데이터를 요청하면서 필요한 경우이고 서버 데이터는 React-Query에서 관리하기 때문에 문제되지 않을것 같다.
4. 상태 변경에 대한 function들을 store에 미리 다 셋팅해둘 수 있기 때문에 component단 코드는 가벼워지고 recoil 보다 더 명령형 선언형 방식의 코드를 작성할 수 있을것 같다
5. React-Native flipper에서 디버깅도 제공하는 듯 이건 체크해봐야함 (recoil보다 낫네)

### ⇒ 바꾸자!!!

1. 컴포넌트 밖에서도 상태 변경이 가능하다
2. 사용성이 단순해 러닝커브가 낮다
3. 보일러 플레이트 코드가 없다
4. Redux Devtools 확장 프로그램 활용 가능
