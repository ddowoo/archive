# Github Workflow

## on

워크플로우의 실행 시점을 정한다

- 하나

  ```yml
  name: My Workflow
  on: push
  ```

- 여러개 (배열 형태로 넘긴다)

  ```yml
  name: My Workflow
  on: [push, pull_request]
  ```

- 디테일 ver
  `yml
  name: My Workflow
  on:
      push:
          branches: [main]
      pull_request:
          types: [opened, ready_for_review]
  `
  <br/>

주요 이벤트 트리거

- pull_request : PR이 열리거나 업데이트 될 떄
- issues : 이슈가 생성되거나 업데이트 될 때
- push : 푸시의 경우
- release : 릴리즈 생성 혹은 업데이트 될때
- [참고](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)

## jobs

워크플로우에서 실행할 작업을 나열한다.

다음 문단에는 실행할 작업의 이름을 적는다.

- workflows에서 커밋 정보 가져오기

  ```yml
  jobs:
    get-commit-info:
      runs-on: ubunto-latest
      steps:
        - run: echo "ref_name=${{ github.ref_name }}"
        - run: echo "sha=${{ github.sha }}"
        - run: echo "event_name=${{ github.event_name }}"
        - run: echo "action=${{ github.event.action }}"
  ```

## needs

특정 작업이 끝날때까지 기다린 후 실행 시킨다

## if

- success(): needs의 작업이 성공한 경우 실행 시킨다.
- failure(): needs의 작업이 실패한 경우 실행 시킨다.

### 내 워크 플로 만들기

- pr 생성시 테스트 진행후 실패하면 pr을 close하기
