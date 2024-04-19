# React Native 0.73

# 디버깅 개선

## Hermes 콘솔 로그 기록

- 이전 릴리즈 에서는 디버거가 연결되기 전까지 RN의 콘솔로그 기록 X ⇒ 초반 발생 로그 관찰 힘듬
- 이제는 `console.log` 를 백그라운드에서 캡쳐하기떄문에 볼 수 있어 디버거 연결시 볼 수 있음

## 새로운 디버깅 환경

- Flipper를 대체할 디버거 환경 개발중 (0.73부터 사용 가능)

<br/>
<br/>

# Symlink 지원

- Metro에서 심볼릭 링크 확인 지원이 **기본 활성화** (지원은 0.72부터)

<aside>

💡 <b>Symlink?</b>

`Symlink`는 `Symbolic Link`의 줄임말로, `파일` 또는 `디렉토리`에 대한 `바로가기(System shortcut)`
모노레포에서 여러 모듈들의 의존성을 연결할 때, `Symlink`를 활용

</aside>

<br/>
<br/>

# Android 템플릿 언어 Kotlin

- android 기본 언어 kotlin으로 사용

<br/>
<br/>

# Android 14

- android 14 지원 (API 34 타겟 가능)
- android 14를 지원하기 위해 android gradle plugin  `7.4.x` => `8.1.x`
- jdk 17버전 사용 (필수)
- AGP 8버전대 사용 → android/build.gradle에서 `namespace`
  - 0.71+용으로 선언된 라이브러리는 namespace추가 업뎃 필요 X
  - 이하의 라이브러리 제작자에게는 요구
    - android/build.gradle
    ```xml
    android {
    +   namespace = "com.example.mylibrary"
        ...
    }
    ```
    - AndroidManifest.xml
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
    -          package="com.example.mylibrary">
    +          >
    ...
    </manifest>
    ```

<br/>
<br/>

# 뉴 아키텍쳐

- 0.68 뉴 렌더러(fabric), 모듈 시스템 (Turbo Modules) 안정
- 새로운 아키텍쳐 BridgeLess 출시
- 이전 뉴 아키텍쳐는 Bridge 모듈 지원 RN팀의 목표는 Bridge의 완전한 제거이기 떄문에 0.73부터는 브릿지 생성을 완전 비활성화 하는 비리지리스모드 활성화 가능
- 브리지리스 모드에서 이전 모듈을 재사용할 수 있게 해주는 기본 모듈 Interop 레이어를 제공

> 💡 <b>Interop Layer</b>
>
> - 새 아키텍처 앱에서 레거시 기본 구성 요소를 재사용할 수 있는 기능<br/>
> - 레거시 구성 요소를 새 렌더러(Fabric)에 등록할 수 있게 하고 레거시 함수 호출을 새 렌더러(updateProps [함수](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Fabric/Mounting/ComponentViews/Switch/RCTSwitchComponentView.mm#L58) )의 해당 항목에 매핑

[New Renderer Interop Layer · reactwg react-native-new-architecture · Discussion #135](https://github.com/reactwg/react-native-new-architecture/discussions/135)

<br/>
<br/>

# Depracted Debugger

### Flipper

- 0.73부터 Flipper 사용 안함 (Flipper일부 플러그인 작동하지 않게됨)
- 이후 버전에서도 Flipper를 앱에 수동으로 추가하면 사용 할 수 있음

### **Remote JavaScript Debugging**

- 디버깅 모드를 실행시켜 크롬 브라우저에 연결해 디버깅 하는것 더이상 사용 불가

---

<br/>
<br/>

# **Babel 패키지**

- 바벨 관련 패키지가 Metro에서 React Native로 이동함
- ![스크린샷 2024-04-02 오후 7.19.46.png](React%20Native%200%2073%20%E1%84%87%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%84%92%E1%85%A1%E1%86%BC%202dd0f3232d174c9e80690e15bae89ae5/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-04-02_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_7.19.46.png)

- 최소 node version 18.x
- TypeScript 5.0 (template)
- : Xcode로 빌드시 Metro 자동 실행 X
- `—variant` 명령어 더이상 사용하지 않음 → `—mode`
