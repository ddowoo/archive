# Reassure

- React Native에서 **퍼포먼스를 빌드없이 확인할 수 있는** 도구

- CI, 로컬 환경에서 RN의 성능 테스트

- 앱 성능 테스트를 자동화 할 수 있음

- 런타임 환경으로 인해 발생하는 오차의 범위를 줄이기 위해 테스트를 여러번 실행한다.

- 성능 테스트 비교 후 **요약된 문서로 작성**해준다.



---

#### Reassure 시작 전 테스트 내용

- 성능 개선 한 코드

  - Flatlist 최적화 작업

  - 아이템 변경 부분만 렌더링 되도록 작업

  - 개선 전/ 개선 후

| 개선전 ![개선전](https://velog.velcdn.com/images/ddowoo/post/bb42fbb3-7858-466a-92c4-845f3fd208d8/image.gif) | 개선후 ![개선후](https://velog.velcdn.com/images/ddowoo/post/08c75d58-0d0f-4db7-9b1a-3ad7d9d08629/image.gif) |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |




---

## 셋팅

### 1. 라이브러리 설치

> yarn add --dev reassure@next //1.x 버전 다운 (2024.05 기준 1.0버전은 rc버전만 있음)

> yarn add --dev reassure



### 2. Jest, React Native Testing Libary 설치

> yarn add --dev @testing-library/react-native

- React라면 React Testing Library



### 3. jest.config.js 셋팅

- reassure은 설치된 테스트 라이브러리를 감지하려고 시도

- RN, React Testing Library 모두 있는 경우 경고 (기본 우선순위는 RN Testing Library)

- 설정을 통해 명시적으로 할 수 있음

```javascript
/// jest.setup.js

// react-native
configure({ testingLibrary: 'react-native' });

//react
configure({ testingLibrary: 'react' });
```



---

## 테스트 코드 작성

### 1. 기준(baseline) 파일 만들기

- 테스트 코드 작성

```typescript
import React from 'react';
import { test } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';
import { measureRenders } from 'reassure';
import DefaultItemList from './defaultList';

test('Flatlist 렌더링 최적화 전,후 비교', async () => {
  // 비교할 시나리오 작성
  const scenario = async () => {
    const button = screen.getByTestId('item-1');
    // 버튼 누르기
    fireEvent.press(button);
  };

  // 기본 리스트 , 0 버전 대에서는 measurePerformance 사용
  await measureRenders(<DefaultItemList />, { scenario });

  // runs option값을 조정해 테스트 횟수 변경 가능
  //await measureRenders(<DefaultItemList />, { scenario, runs: 20 });
});
```

- 기준으로 설정

  > yarn run reassure --baseline

- `.reassure` 디렉토리 위치에 측정 결과 기록 생성 됨



### 2. 비교 코드 테스트

- 테스트 코드 작성

```javascript
// 기준 코드와 동일한 시나리오에 컴포넌트만 변경
await measureRenders(<OptimizationList />, { scenario });
```

- 비교 테스트 실행
  > yarn run reassure



### 3. 결과

#### - 1. 터미널

- 수치에 따라 `Signficant changes to duration` 혹은 `Meanineless changes to duration`에 표시  
  <br/>
- 성능 향상 결과는 일치, 반대의 경우로 테스트시 성능 감소로 일치되는 결과
  ![](https://velog.velcdn.com/images/ddowoo/post/5aff2846-3f53-4988-8ab5-f324164d730a/image.png)



#### - 2. .reassure 디렉토리

- **output.json**

  - 비교 내용이 json 파일로 추출됨

- **output.md 내용**

  ### Performance Comparison Report

  - **Current**: main (0377a81587384c79e284ced26723935198b5e717) - 2024-05-22 07:05:21Z
  - **Baseline**: main (0377a81587384c79e284ced26723935198b5e717) - 2024-05-22 07:04:01Z

  #### Meaningless Changes To Duration

     <details>
     <summary>Show entries</summary>

  | Name                              | Type   | Duration                              | Count |
  | --------------------------------- | ------ | ------------------------------------- | ----- |
  | Flatlist 렌더링 최적화 전,후 비교 | render | 12.1 ms → 8.7 ms (-3.4 ms, -28.1%) 🟢 | 2 → 2 |

     </details>

     <details>
     <summary>Show details</summary>

  | Name                              | Type   | Duration                                                                                                                                                                                                                     | Count                                                                                                                                                                             |
  | --------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Flatlist 렌더링 최적화 전,후 비교 | render | **Baseline**<br/>Mean: 12.1 ms<br/>Stdev: 2.1 ms (17.8%)<br/>Runs: 11 10 13 12 12 14 13 12 13 17 16 12 14 12 11 9 10 8 11 12<br/><br/>**Current**<br/>Mean: 8.7 ms<br/>Stdev: 0.9 ms (10.9%)<br/>Runs: 10 8 8 10 8 9 9 7 9 9 | **Baseline**<br/>Mean: 2<br/>Stdev: 0 (0.0%)<br/>Runs: 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2<br/><br/>**Current**<br/>Mean: 2<br/>Stdev: 0 (0.0%)<br/>Runs: 2 2 2 2 2 2 2 2 2 2 |

     </details>




---

### 다른 브런치랑 비교하기

> yarn reassure --branch [branch name] --commit-hash [commit hash]

ex) 최적화 작업을 한 `opti` 브런치오 비교
`yarn reassure --branch opti --commit-hash 6e088d1d7d`

#### 결과

![](https://velog.velcdn.com/images/ddowoo/post/f93185f0-9056-420f-b91f-a2f36725de62/image.png)



---

### CI 셋팅

#### 1. 셋팅 명령어 실행

> yarn reassure init

- 파일 생성

- reassure-tests.sh

  - 서로 다른 두개의 브런치에 성능을 측정하는 스크립트 작성

  - 간단한 버전이 자동 작성되어 있음

- dangerfile.ts/js



#### 2. danger js 설치

> yarn add danger --dev

- CI 프로세스 중에 실행되며 규칙에 따라 Danger가 메세지 생성

- `.reassure/output.md` 작성 역할



#### 3. CI 작성

```yml
- name: Run performance tests
  run: ./reassure-tests.sh

- name: Run Danger.js
  run: yarn danger ci
  env: GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```



#### 4. 결과

- 성능이 중요한 경우 결과에 따라 머지 여부를 결정해면 좋을것 같다.

![](https://velog.velcdn.com/images/ddowoo/post/2b379880-8159-4da4-ad2e-b706e50075ae/image.png)




### 참조

[Reassure](https://callstack.github.io/reassure/)
