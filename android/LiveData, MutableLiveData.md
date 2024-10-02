# LiveData, MutableLiveData,

view class를 생성하고 view model에서 view에 대한 이벤트를 연결하는 작업을 하려하는데 간헐적으로 view class에서 view가 아직 그려지지 않아 이벤트를 못붙이고 NPE에러가 나는 경우가 생겼다.

init 안에서 점점 연동해야 하는 view가 켜져서 생긴 문제 같은데 이를 방지하기 위해서 init의 모든 과정이 끝나고 이벤트를 연결시키면 좋겠다 라는 생각을 했고 처음에는 콜백 함수를 생각했지만 무언가 더 다른 좋은 방법이 있을 것 같아 찾다가 LiveData와 MutableLiveData에 대해서 알게 됐다

### LiveData

### 기본 개념

- **LiveData**는 **읽기 전용**의 **데이터 홀더 클래스**
- UI 컴포넌트가 관찰(`observe`)할 수 있으며, 데이터가 변경되면 자동으로 UI를 업데이트할 수 있게 해준다.

### 주요 특징

- **수명 주기를 인식**: Activity와 Fragment의 생명 주기를 인식하여, **UI가 활성화된 상태일 때만 업데이트**를 수행, 이를 통해 비활성 상태에서의 불필요한 업데이트나 메모리 누수를 방지
- **읽기 전용**: 클래스 외부에서는 데이터를 **읽기 전용**으로만 접근할 수 있다. 데이터를 변경하려면 **MutableLiveData**를 사용해야 한다.

### MutableLiveData

### 기본 개념

- **MutableLiveData**는 **LiveData의 하위 클래스**로, 데이터를 변경할 수 있다.
- 주로 **ViewModel 내부에서 데이터 상태를 관리**하는 데 사용된다.

### Observe

- LiveData의 값을 관찰하기 위해 **observe**를 사용한다.
- observe는 **LifecycleOwner**를 첫 번째 파라미터로, **Observer**를 두 번째 파라미터로 받아 변경 사항을 감지하고 반응할 수 있다.

### `observe` 메서드 구조:

```kotlin
@MainThread
public void observe(
    @NonNull androidx.lifecycle.LifecycleOwner owner,
    @NonNull androidx.lifecycle.Observer<? super T> observer
)
```

### 내가 사용한 방법

```kotlin
class A() {
    // class 내부 init이 끝난 시점을 추적하기 위한 LiveData
    private val _isInitialized = MutableLiveData(false)
    val isInitialized: LiveData<Boolean> get() = _isInitialized

    init {
        // view 초기화 작업들
        _isInitialized.value = true  // init이 끝나면 true로 설정
    }
}

class B() {
    init {
        val a = A()
        context.lifecycleOwner()?.let {
            // observe를 사용하여 A의 isInitialized 값을 추적
            a.isInitialized.observe(it) { isInitialized ->
                if (isInitialized) {
                    // isInitialized가 true가 된 후에 이벤트 처리
                    attachExoplayerViewEvent()
                }
            }
        }
    }
}

```
