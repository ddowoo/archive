# Babel

- 구형 브라우저나 환경에서 ES6 이상의 기능을 사용하기 위해서 다운그레이드 시켜주는 역할
- 각 Browser들은 ES6생성 이후

## 사용법

#### preset

- arrow function을 변형해주는 플러그인을 해서 변경

```javascript
const fn = () => '화살표 함수';

//-------- 바벨 적용시 아래와 같이 변경 -------//

function fn() {
  return '화살표 함수';
}
```

- 화살표, Map, Set 등 변경하려면 매번 플러그인 설치 해주는건 비효율 적이기에 **babel 플러그인이 미리 셋팅되어 있는 preset**을 활용

#### polyfill

- 구형 브라우저에서 지원하지 않는 최신 기능을 지원하고자 가져오는 코드 뭉치
- Preset과 플러그인으로 트랜스파일이 되지 않는 메서드들을 Polyfill이 보완해준다.
- 대부분의 pollyfill은 core-js에 모여있음
- pollyfill 내 array.slice

```javascript
$(
  { target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE },
  {
    slice: function slice(start, end) {
      if (nativeArrayBufferSlice && end === undefined) {
        return nativeArrayBufferSlice(anObject(this), start); // FF fix
      }
      var length = anObject(this).byteLength;
      var first = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
      var viewSource = new DataView(this);
      var viewTarget = new DataView(result);
      var index = 0;
      while (first < fin) {
        setUint8(viewTarget, index++, getUint8(viewSource, first++));
      }
      return result;
    },
  }
);
```

- **사용 방법**

  - useBuiltIns

    - entry

    - useag (권장)

      실제 필요한 폴리필만 삽입

### core js 단독 사용의 문제점

- 전역 스코프 오염 가능성
- @babel/plugin-transform-runtime 을 core-js와 함께 사용한다.

### babel.config.json vs babelrc.json

- **babel.config.json**

  - 여러 패키지 디렉토리를 가진 프로젝트에서 하나의 바벨을 설정하고 싶을때
    (node modules도 적용할때)

- **babelrc.json**

  - 프로젝트 내에 서드파티 라이브러리가 바벨에 의해 트랜스폼 되기를 바라지 않는 경우
  - 특정 부분만 적용되길 바라는 경우

### Webpack에서 Babel

- babel loader로 webpack과 연결
