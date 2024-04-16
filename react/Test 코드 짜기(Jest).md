# 테스트 코드 짜기(JEST)

## **테스트 코드 종류?**

- **유닛 테스트**
  유닛 테스트는 함수, 메소드 또는 클래스와 같은 작은 단위를 테스트한다.
- **통합 테스트**
  여러 개의 유닛 또는 컴포넌트를 함께 작동하는 방식을 테스트한다.
- **e2e 테스트**
  전체적인 작동을 테스트하는 것으로, 사용자의 관점에서 시나리오를 재현하여 테스트한다.

위와 같은 테스트 종류 중 JEST는 유닛 테스트와 통합 테스트를 위해 사용된다.

그리고 React 환경에서 이루어 지기 때문에 Jest와 함께 **[React Testing Library](https://testing-library.com/react)**를 함께 사용해 테스트 코드를 짠다.

---

## JEST?

Jest는 페이스북에서 만든 자바스크립트 테스팅 프레임워크이다.  React의 테스트를 위해 쓸수 있지만 이외의 다양한 환경에서도 쓸 수 있다.(바벨, 타입스크립트, 노트, 리액트 등) 또한 라이브러리를 설치하면 별도의 설정 없이 바로 쓸수 있다.(필요한 경우도 존재)

브라우저가 아닌 CLI환경에서 테스트 코드를 실행 시키는 특징이다.

---

## 테스트할 프로젝트

CRA로 프로젝트를 만들면 별도의 설치 없이 **Jest와 React Testing Libary가 셋팅**이 되어있기 때문에 바로 테스트 코드를 실행할 수 있어 CRA로 프로젝트르 만들었다.

(퀴즈를 갯수와 난이도를 선택하면 퀴즈 시작 버튼이 활성화가 되고 퀴즈를 풀수 있다.)

---

## JEST, **@testing-library/react** API

각 라이브러리에서 다양한 API를 제공하지만 그중 오늘 테스트에서 사용하는 API에 대해 정리하면 아래와 같다

### **JEST**

**`test(name, fn, timeout)` , `it(name, fn, timeout)`**

- 테스트 코드를 실행하는 함수

```tsx
it('기능1 테스트', () => {});
test('기능2 테스트', () => {});
```

**`describe(name, fn)`**

- 여러 테스트를 그룹화 하는데 사용. 필수는 아니지만 테스트를 그룹화 하는데 유용

```tsx
describe('컴포넌트 테스트', () => {
  it('기능1 테스트', () => {});

  test('기능2 테스트', () => {});
});
```

**`beforeEach(name, fn)`**

- 각 테스트가 실행되기 전에 함수를 실행

```tsx
beforeEach(() => {
  // 테스트 전 실행 코드 작성
});
```

<aside>
💡 [JEST API  알아보기](https://jestjs.io/docs/api)

</aside>

<aside>
💡 [JEST API  알아보기](https://jestjs.io/docs/api)

</aside>

### **@testing-library/react**

`**render**`

- 컴포넌트를 화면에 그리는 작업을 해준다.

```tsx
render(<App />);
```

`**screen**`

- 브라우저의 `document.body` 와 같은 역할로 렌더링된 노드에 접근할 수 있다.

```tsx
import { render, screen } from '@testing-library/react';

render(
  <div>
    <label htmlFor="example">Example</label>
    <input id="example" />
  </div>
);

const exampleInput = screen.getByLabelText('Example');
```

**`fireEvent(node: HTMLElement, event: Event)`**

- 사용자 interaction을 발생시킨다. (브라우저에서 실행되는 사용자 interaction과 정확히 일치하지 않는다, `**userEvent**` 를 활용하면 사용자 행동과 유사하게 작동한다.)

```tsx
fireEvent.click(screen.getByText('Load'));
```

<aside>
💡 **[@testing-library/react API 알아보기](https://testing-library.com/docs/react-testing-library/api)**

</aside>

---

## 테스트 작성

테스트 코드를 짤때는 다음의 규칙을 따라서 작업했다.

1. **Given** - 사전 조건, 상황
2. **When** - 유저의 클릭, 입력과 같은 이벤트 등 무언가가 실행됨
3. **Then** - 그로인해 다음과 같은 결과가 기대됨

회사마다 저마다의 규칙을 가지고 있는것 같은 곳도 있었지만 처음에는 위와 같은 규칙으로 짜길 권했다.

(또한 위 방식은 AAA (Arrange, Act, Assert)로 불리기도 한다.)

### 첫번째 테스트

### Given

**퀴즈 선택 컴포넌트 렌더링**

우선 테스트할 환경을 동일하게 만들어 주기 위해 테스트할 Home컴포넌트가 렌더링 되는 동일한 환경(Reocil, React-Query)을 만들고 화면을 그렸다.

```tsx
import { createMemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
...
descrbie('홈 컴포넌트 테스트',()=>{
		it('퀴즈 조건 선택 후 퀴즈 시작버튼 활성화', ()=>{
				const routes = [
				  {
				    path: "",
				    element: <Home />,
				  },
				];

				// **createMemoryRouter**
				const router = createMemoryRouter(routes, {
				  initialEntries: ["/"],
				  initialIndex: 0,
				});

				render(
				  <QueryClientProvider client={queryClient}>
				      <PageLayout>
				        <RouterProvider router={router} />
				      </PageLayout>
				  </QueryClientProvider>
				);
		})

})
```

<aside>
💡 **createMemoryRouter**
Jest는 브라우저가 아닌 CLI 환경에서 테스트 코드가 실행됩니다. 이 때, 브라우저에서와 마찬가지로 메모리에서 라우팅 스택을 관리하고, 이벤트로 인해 경로가 변경되는 상황을 시뮬레이션하여 해당 경로로 컴포넌트가 제대로 렌더링되었는지를 체크할 수 있습니다. 이를 가능하게 하는 것이 **`createMemoryRouter`**와 같은 메모리 라우터입니다. 이를 통해 Jest 환경에서도 실제 브라우저에서의 동작과 유사한 방식으로 라우팅 로직을 테스트할 수 있습니다

</aside>

### When

**퀴즈 갯수, 난이도 선택**

갯수와 레벨을 선택하는 버튼 노드에 접근해 fireEvent API를 활용해 해당 노드들을 클릭하는 이벤트를 실행시킨다.

```tsx
import { render, fireEvent, screen } from "@testing-library/react";

...
const countRadioBtn = screen.getByLabelText("5개");
const levelRadioBtn = screen.getByLabelText("medium");

fireEvent.click(countRadioBtn);
fireEvent.click(levelRadioBtn);
...
```

<aside>
💡 **노드 접근 방식**

- **getBy...**: 일치하는 첫 번째 노드를 반환하며, 일치하는 요소가 없거나 둘 이상이면 오류 발생(이 경우getAllBy)
- **queryBy...**: 일치하는 첫 번째 노드를 반환하며, 일치하는 요소가 없으면 null을 반환. 둘 이상 일치하면 에러(이 경우 queryAllBy)
- **findBy...**: 일치하는 요소를 Promise로 반환하며, 시간 내에 발견하지 못하면 테스트 실패합니다.
</aside>

### Then

**퀴즈 풀기 버튼 활성화**

퀴즈 버튼 노드를 접근해 disabled프로퍼티의 값이 false인지 체크

```tsx
...
const quizBtn = screen.getByText("퀴즈풀기");
expect(quizBtn).toHaveProperty("disabled", false);
...
```

---

### `BeforeEach`

위의 테스트에 이어서 퀴즈풀기를 누르면 새로운 페이지로 잘 이동하는지 체크하는 테스트를 추가했다.

보면 routes를 생성하고 render하는 부분에서 위에 테스트와 코드가 겹친다. 이렇게 **각 테스트 마다 반복되는 코드는** **`beforeEach`** 를 활용하면 해당 코드를 반복해 쓸 필요가 없다.

- **수정전**

```tsx
it('퀴즈 풀기 클릭 시 Quiz로 이동', () => {
  // Given : 퀴즈 컴포넌트 렌더링
  const routes = [
    {
      path: '',
      element: <Home />,
    },
    {
      path: '/quiz',
      element: <Quiz />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });
  render(
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <RouterProvider router={router} />
      </PageLayout>
    </QueryClientProvider>
  );

  //When,Act - 퀴즈풀기 버튼을 눌러 퀴즈 페이지로 넘어가기
  const countRadioBtn = screen.getByLabelText('5개');
  const levelRadioBtn = screen.getByLabelText('medium');
  const quizBtn = screen.getByText('퀴즈풀기');

  fireEvent.click(countRadioBtn);
  fireEvent.click(levelRadioBtn);
  fireEvent.click(quizBtn);

  //Then,Asser - 퀴즈페이지
  expect(screen.getByText('제출하기')).toBeInTheDocument();
});
```

**수정한 코드**

- **beforeEach**

```tsx

describe("홈 컴포넌트 테스트", () => {
  beforeEach(() => {
    // Given : 퀴즈 조건 선택 화면 렌더링
    const routes = [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
    render(
      <QueryClientProvider client={queryClient}>
        <PageLayout>
          <RouterProvider router={router} />
        </PageLayout>
      </QueryClientProvider>
    );
  });
	...
});

```

- **수정된 테스트 코드**

```tsx

describe("홈 컴포넌트 테스트", () => {
	...
  it("퀴즈 조건 선택 후 퀴즈 시작버튼 활성화", () => {
    //When,Act - 퀴즈 갯수와 난이도 설정
    const countRadioBtn = screen.getByLabelText("5개");
    const levelRadioBtn = screen.getByLabelText("medium");

    fireEvent.click(countRadioBtn);
    fireEvent.click(levelRadioBtn);

    //Then,Asser - 퀴즈 풀기 버튼이 활성화
    const quizBtn = screen.getByText("퀴즈풀기");
    expect(quizBtn).toHaveProperty("disabled", false);
  });

  it("퀴즈 풀기 클릭 시 Quiz로 이동", () => {
    //When,Act - 퀴즈풀기 버튼을 눌러 퀴즈 페이지로 넘어가기
    const countRadioBtn = screen.getByLabelText("5개");
    const levelRadioBtn = screen.getByLabelText("medium");
    const quizBtn = screen.getByText("퀴즈풀기");

    fireEvent.click(countRadioBtn);
    fireEvent.click(levelRadioBtn);
    fireEvent.click(quizBtn);

    //Then,Asser - 퀴즈페이지
    //홈 컴포넌트 컴포넌트 내 버튼이 있는지 체크
    expect(screen.getByText("제출하기")).toBeInTheDocument();
  });
});

```

---

### React-Query + Nock

react-query를 활용해 서버상태값을 관리하고 이를 테스트 하려면

**`@testing-library/react`**의 **`renderHook` ,`waitFor`**을 사용한다.

- query hook

```tsx
export const useQuiz = (count: QuizCount, level: QuizLevel) => {
  return useQuery(['quiz'], () => getQuestionListFetch(count, level), {
    // staleTime: Infinity,
    // suspense: true,
    // useErrorBoundary: true,
  });
};
```

<aside>
💡 suspense를 사용하면 test에서 에러가 생겨서 테스트시 우선 끄고 실행했습니다.

</aside>

- test code (React v 18>)

```tsx
describe('홈 컴포넌트 테스트', () => {
  it('react query useQuiz 테스트', async () => {
    const { result } = renderHook(() => useQuiz(10, 'medium'), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.length).toBe(10);
  });
});
```

위와 같이 useQuiz를 렌더링 시키고 waitFor로 useQuery의 isSuccess가 true이길 기다렸다. 그리고 받아온 데이터의 길이(퀴즈 수)가 10개가 맞는지 체크했다.

React-Query를 사용하는 가장 큰 이유는 네트워크 요청을 캐시하는 것이기 때문에 데이터가 잘 캐시가 되어있는지 체크해야 하는데 이를 구현할때는 **Nock**를 활용한다.

---

### Routes 테스트

위 테스트 코드에서는 화면이 잘 넘어갔는지를 테스트 할 때 해당 화면을 특정할 수 있는 컴포넌트의 존재 여부를 체크했다.

하지만 아직 개발되지 않은 경우를 체크하기 위해서는 위 방법이 맞지 않을 수도 있다. 이러한 경우에는 라우팅을 담당하는 react-router-dom을 재정의해 테스트 할 수 있다.

현재 화면을 옮기는 코드는 아래와 같다.

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const handleStartQuiz = () => navigate('/quiz?idx=0');
```

여기서 `useNavigate`를 재정의 하면 위의 방법이 아닌 다른 방법으로 화면전환을 체크 할 수 있다.

- 재정의 코드

```tsx
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
```

react-router-dom에서 useNavigate만 재정의 해준다.

useNavigate를 재정의 했으니 `<MemoryRouter/>`를 이용하지 않고 바로 테스트 하려는 컴포넌트를 렌더링 해준다.

- 테스트 코드

```tsx
it('퀴즈 풀기 클릭 시 Quiz로 이동', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Home />
      </PageLayout>
    </QueryClientProvider>
  );

  //When,Act - 퀴즈풀기 버튼을 눌러 퀴즈 페이지로 넘어가기
  const countRadioBtn = screen.getByLabelText('5개');
  const levelRadioBtn = screen.getByLabelText('medium');
  const quizBtn = screen.getByText('퀴즈풀기');

  fireEvent.click(countRadioBtn);
  fireEvent.click(levelRadioBtn);
  fireEvent.click(quizBtn);

  //Then,Asser - 퀴즈페이지
  expect(mockNavigate).toHaveBeenNthCalledWith(1, '/quiz?idx=0');
  // expect(screen.getByText("제출하기")).toBeInTheDocument();
});
```

<aside>
💡 **`toHaveBeenNthCalledWith`**
모의 함수를 사용하는 경우 n번째 호출된 인수가 무엇인지를 테스트하는데 사용한다.
위 코드에서는 navigate()로 넘어가는 경로가 의도와 맞는지 파악한다.

</aside>
