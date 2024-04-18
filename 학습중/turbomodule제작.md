# React Native TURBO NATIVE MODULE 만들기

### turbo mdule 장점

## 1. 폴더 설정

- 모듈을 앱에서 분리된 상태로 유지하려면 모듈을 앱과 별도로 정의한 다음 나중에 앱에 종속성으로 추가하는걸 추천

- 분리해서 관리하면 오픈소스로 릴리즈 하기도 좋다.

> 문서에서는 프로젝트와 완전 분리했지만 예시는 프로젝트 내에 별도의 폴더로 관리함

- native module 폴더명은 접두사 RTN(REACT-NATIVE) 권장

- 하위 폴더로 `android`, `ios`,`js` 생성 (android만 생성)

  ![alt text](<스크린샷 2024-04-17 오후 2.11.47.png>)

</br>

## 2. Javascript 작성

- 뉴아키텍쳐는 flow, typescript와 같은 형식화를 요구

- 파일명 조건 두가지

  1. 접두사 `Native<MODULE_NAME>`

     - ex : NativeRecorder

     - Flow -> `.js` , `.jsx`
     - Typescript -> `.ts` , `.tsx`

  2. 파일은 꼭 `TurboModuleRegistrySpec`객체 export 시키기

### typescript (예시 사용)

```typescript
// RTNRecorder/js/NativeRecorder.ts

import { TurboModule, TurboModuleRegistry } from 'react-native';

// 터보 네이티브 모듈의 인터페이스 타입은 Spec으로 선언해야함
export interface Spec extends TurboModule {
  record(): () => string;
}

// 이름 전달 , 사용 가능한 경우 터보 네이티브 모듈 로드
export default TurboModuleRegistry.get<Spec>('RTCRecorder') as Spec | null;
```

1. `TurboModule` : 터보 네이티브 모듈의 기본 인터페이스 타입이 선언되어 있다.
2. `TurboModuleRegistry` : 터보 네이티브 모듈을 가져오는 기능을 하는 자바스크립트 모듈

</br>

## 3. Module Configuration

- Codegen과 auto-linking을 위한 구성 추가

- 구성중 일부는 aos,ios 공융, 일부는 플랫폼별

#### 작업 내용

- package.json 생성 (공용)

  ```json

    "name": "rtn-recorder",
    "version": "0.0.1",
    "description": "recording turbo module",
    "react-native": "js/index",
    "source": "js/index",
    "files": [
        "js",
        "android",
        "ios",
        "rtn-calculator.podspec",
        "!android/build",
        "!ios/build",
        "!**/__tests__",
        "!**/__fixtures__",
        "!**/__mocks__"
    ],
    "keywords": ["react-native", "ios", "android"],
    "author": "ddowoot@gmail.com",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/ddowoo/rn_archieve/issues"
    },
    "homepage": "https://github.com/ddowoo/rn_archieve",
    "devDependencies": {},
    "peerDependencies": {
        "react": "*",
        "react-native": "*"
    },
    "codegenConfig": {
        "name": "RTNCalculatorSpec",
        "type": "modules",
        "jsSrcsDir": "js",
        "android": {
            "javaPackageName": "com.rtncalculator"
        }
    }
  ```

  - `author` , `bugs.url`, `hompage`등 수정
  - codegenCofnig
    - name : 라이브러리명 , 어미로 `Spec` 반드시 더해야 한다
    - jsSrcsDir : codegen이 파싱할 js에 접근할 폴더
    - android.javaPackageName : codegen이 생성한 JAVA 파일에 사용한 패키지

</br>

- gradle 파일 생성

  ```gradle
  buildscript {
      ext.safeExtGet = {prop, fallback ->
          rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
      }
      repositories {
          google()
          gradlePluginPortal()
      }
      dependencies {
          classpath("com.android.tools.build:gradle:7.3.1")
          classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.7.22")
      }
  }

  apply plugin: 'com.android.library'
  apply plugin: 'com.facebook.react'
  apply plugin: 'org.jetbrains.kotlin.android'

  android {
      compileSdkVersion safeExtGet('compileSdkVersion', 33)
      namespace "com.rtncalculator" // 패키지명 작성
  }

  repositories {
      mavenCentral()
      google()
  }

  dependencies {
      implementation 'com.facebook.react:react-native'
  }
  ```

</br>

> To run Codegen, you need to enable the New Architecture in the Android app. This can be done by opening the gradle.properties files and by switching the newArchEnabled property from false to true.

- 패키지 파일 생성

  - `TurboReactPackage` 상속

  - 경로 `android/src/main/java/com/rtnrecorder`

  - 위 경로에 패키지 파일 생성 (`RecorderPackage.kt`)

- 작업 내용

```kotlin
package com.rtnrecorder; //패키지 네임

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider

class RecorderPackage : TurboReactPackage() {
  override fun getModule(name: String?, reactContext: ReactApplicationContext): NativeModule? = null

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider? = null
}
```

### Module.kt 파일

```

```
