# Reanimated

사용 이유

react-naitve에서 제공하는 animated API를 활용해서도 애니메이션은 구현 가능

위 API는 fire & forget 방식의 애니메이션을 구현하는데는 성능적 문제 X

유저의 gesture를 받아 구현하는데에서는 js thread와 ui thread가 통신하는데 성능 장애가 생길 수 있음

reanimted를 사용하면 ui thread에서만 작동하도록 구현해 성능 개선 사용 가능

- 이를 가능 하게 해주는건 <b>worklets</b>

- worklets은 ui thread에서 js 함수가 돌아가게 해주는 것
