# React Native 0.72 변경사항

# New Metro

- Symlink 지원 (BETA)
  - 0.73부터는 기본으로 활성화할 계획이다
  - metro.config.js
  ```jsx
  const config = {
    // ...
    resolver: {
      unstable_enableSymlinks: true, // Metro에서는 추후 defualt로 지원할 계획
      unstable_enablePackageExports: true,
    },
  };
  ```
- Hermes에서 더 빠른 컴파일 및 JSON 분석

- Deprecated 요소 (RN에서 제거)
  - [슬라이더는](https://reactnative.dev/docs/next/slider)
    [@react-native-community/slider](https://github.com/callstack/react-native-slider/tree/main/package) 로 대체됩니다 .
  - [DatePickerIOS는](https://reactnative.dev/docs/next/datepickerios)
    [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker) 로 대체
  - [ProgressViewIOS는](https://reactnative.dev/docs/next/progressviewios)
    [@react-native-community/progress-view](https://github.com/react-native-progress-view/progress-view) 로 대체
