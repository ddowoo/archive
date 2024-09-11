Runnable와 같은 타입이 파라미터로 받아는 경우 람다를 쓸 경우 함수 사용시 Runnable를 명시해주지 않아도 된다.

ex

```kotlin
fun throttle(run: Runnable){
    ~~
}

throttle(Runnable{
    Log.d(TAG, "실행")
})

// ->

throttle{
    Log.d(TAG, "실행")
}

```

이 이유는 람다를 사용하면 <b>SAM(단일 추상 메서드)</b> 인터페이스를 명시적으로 작성할 필요 X

SAM : 추상 메서드가 하나만 있는 인터페이스


