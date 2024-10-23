# LiveData vs StateFlow

- **A View**가 **window**에 붙은 이후 **B View**를 연결하는 작업에서 **LiveData**를 사용해 A View가 연동된 시점을 추적하려고 했음.

- **LiveData**는 특정 상태값을 통해 **UI를 업데이트**하는 것이 주목적이므로, 해당 작업은 가능하지만 **원래 목적과는 다르게 사용된 사례**였음. (LiveData는 **UI 스레드**에서 동작)

- 이에 적합한 대안으로 **StateFlow**를 찾아봤고, 이는 **코루틴** 기반으로 작동함.

<br/>

## 생명주기(Lifecycle)

- **LiveData**:

  - **UI 컴포넌트의 생명주기**에 따라 자동으로 관리됨.
  - 수명 주기가 끝나면 자동으로 구독 해제됨.

- **StateFlow**:
  - **코루틴**과 함께 동작하며 **UI 생명주기와 무관**하게 유지됨.
  - **코루틴이 완료**되면 데이터가 자동으로 소멸되기 때문에 **메모리 누수** 걱정이 없음.

<br/>

## 초기값과 상태 전달

- **LiveData**:

  - 관찰자가 새로 등록되면 **마지막 상태**가 자동으로 전달됨.
  - **관찰자가 있는 경우에만** 값이 업데이트됨.

- **StateFlow**:
  - **구독 여부와 상관없이 항상 최신 데이터**가 유지됨.
  - 상태가 최신화되어 **누구든지 현재 값을 받을 수 있음**.

<br/>

## 사용 방법

### **LiveData**

````kotlin
val liveData = MutableLiveData<String>()

// 데이터 업데이트
liveData.value = "Hello LiveData"

// 관찰자 등록
liveData.observe(this, Observer { data ->
    println("Received: $data")
})

- <b>StateFlow</b>

```kotlin
val stateFlow = MutableStateFlow("Hello StateFlow")

// 데이터 업데이트
stateFlow.value = "New StateFlow Value"

// 코루틴에서 수집
lifecycleScope.launch {
    stateFlow.collect { data ->
        println("Received: $data")
    }
}
````
