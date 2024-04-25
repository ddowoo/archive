# Metro(작성중)

# Metro 개념

- 자바스크립트 번들러
- 종속성을 포함한 모든 코드를 하나의 자바스크립트 파일로 만들어 준다.
- 메트로 번들링 프로세스는 세가지 과정을 거침
  - **Resolution**
    - 진입정에서 모든 모듈의 그래프 작성 (다른 파일이 어떤 파일에서 필요한지)
    - 위 과정에서 **resolver** 사용
    - 이 과정은 Transformation과 함께 실행됨
  - **Transformation**
    - 모든 파일이 거침
    - **Transformation은** 대상 플랫폼(RN)에서 이해할수 있는 형식으로 변환하는 역할을 담당
    - 코어 수에 따라 병렬로 작업된다
  - Serialization
    - Metro에서 Serialization은 **Transformation**을 통해 변환된 파일을 하나의 번들 파일로 만드는 것을 의미
