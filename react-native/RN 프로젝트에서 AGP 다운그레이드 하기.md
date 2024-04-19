# RN 프로젝트에서 AGP 다운그레이드 하기

Android Sutdio Iguana로 변경후

- 안내에 따라 agp ⇒ 8버전 대로 바꿈
- 8버전대는 jv 17부터 제공
- 내 리넥 프로젝트 대부분은 0.72이하이기 때문에 11이어야함
- 그리고 코틀린이 1.8이상이어야 한다고 나옴 ⇒ maybe AGP 8버전대 부터는 코틀린이 1.8부터 인듯? (자료 못찾음)

[https://www.notion.so](https://www.notion.so)

**결론**

**agp 8.3버전대에서 다시 7.4 버전대로 낮추기**

### project수준의 build.gradle 확인

```json
classpath('com.android.tools.build:gradle:8.3.2') // 8버전대임
```

- **7.4로 낮추기**

```json
classpath('com.android.tools.build:gradle:7.4.1') // 8버전대임
```
