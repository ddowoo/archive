# React-Native Webview 통신

<br/>

# 테스트 셋팅

- webview에서 localhost:3000에 실행한 프로젝트를 시뮬레이터에서 ip주소:3000으로 uri를 셋팅해준다.

<br/>
<br/>

# Webview 전송 RN 수신

### **전송**

- **`ReactNativeWebView`**
  - 모바일에서 웹으로 접근하면 window객체에 추가되는 객체
  - 해당 객체 내 `postMessage` 메소드를 사용해 RN으로 메세지 전송
  ```tsx
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage('send message to RN');
  }
  ```

### 수신

- **`<WebView/>`** 의 `onMessage` Props로 message에 대한 listener 생성

```tsx
const handleOnMessage = ({nativeEvent: {data}}) => console.log(data);

...
<WebView
  onMessage={handleOnMessage}
  source={{uri: 'http://192.168.0.2:3000'}}
  style={{flex: 1}}
/>
```

![스크린샷 2024-04-04 오후 7.01.47.png](/screenshot/rn_webview_console.png)

<br/>
<br/>

# RN 전송 Webview 수신

### **전송**

- `ref.postMessage()`

  ```tsx
  const onPress = () => webviewRef.current?.postMessage('send message to webview');

  <WebView
    ref={(ref) => (webviewRef.current = ref)}
    onMessage={handleOnMessage}
    source={{ uri: 'http://192.168.0.2:3000' }}
    style={{ flex: 1 }}
  />;
  ```

### 수신

- 최상위 객체가 android - `documet` , ios - `window`
- 각 최상위 객체에서 `message` 이벤트 리스너에서 받을 수 있음

```tsx
  if (window.ReactNativeWebView) {
    /** android */
    document.addEventListener("message", (e) => alert(e.data);

    /** ios */
    window.addEventListener("message", (e) => alert(e.data);
  }
```

![스크린샷 2024-04-04 오후 7.01.47.png](/screenshot/rn_webview_ex.png)
