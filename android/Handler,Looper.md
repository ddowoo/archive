# Looper, Handler

<aside>
💡

CPU의 활용성을 확보하는 작업을 찾다보니 대세는 코루틴이지만 전통적인건 Looper,Handler란다

아직 java도 많으니 이것도 뭔지 좀 보자

</aside>

## 쓰이는 경우

- **UI 쓰레드**와 **백그라운드 쓰레드** 사이의 작업 전달 및 처리
  - UI 업데이트
  - 파일 I/O, 네트워크 요청, 복잡한 계산 등 긴 작업을 백그라운드에서 처리
  - 특정 작업 지연처리

## 기본 개념

### Looper

- Looper는 쓰레드에 메세지 큐에 작업을 전달하는 역할
- 메인쓰레드(UI Thread)에는 Looper가 있지만 별도의 쓰레드에는 Looper 존재X
  - 그렇기 때문에 별도의 Thread의 메세지 큐에 작업을 전달하고 싶으면 Looper를 생성해야한다.
  ```kotlin
  val thread = Thread {
      // Looper 준비
      Looper.prepare()

      // 새로운 쓰레드에 Looper가 연결된 Handler 생성
      val handler = Handler(Looper.myLooper()!!)

      // Runnable 작업 등록
      handler.post {
          // 여기서 백그라운드 작업을 처리
          println("백그라운드에서 작업 실행")
      }

      // Looper 시작: 이 루프가 실행되어야 메시지를 처리할 수 있음
      Looper.loop()  // 무한 루프: 메시지 큐에 있는 작업을 처리하고 계속 대기
  }

  thread.start()
  // 스레드를 3초 후에 종료시키는 예시
  Thread.sleep(3000)
  thread.interrupt()  // 쓰레드를 강제로 종료하려면 스레드 인터럽트 사용

  // 혹은 안전하게 종료를 원할 경우:
  // Looper.myLooper()?.quitSafely()
  // or Looper.myLooper()?.quit()
  ```

### Handler

- Handler는 Looper와 연결된 **메시지 큐에 작업(Runnable, Message)을 넣는 역할**을 한다.
- 쓰레드(공장)로 작업을 넘기는 역할을 한다.
- Handler 인스턴스 생성시 Looper로 부터 어떤 쓰레드로 넘길지 받아 온다.
  ```kotlin
  val handler = Handler(Looper.getMainLooper()) // 메인 스레드에서 동작하는 핸들러
  ```
- Handler의 **delay, postDelay** 통해 특정 작업을 넘길 수 있다.

### (Sub)Runnable

- 작업 단위를 묶는 역할을 한다.
- 작업을 묶어서 명시적으로 표현하고 싶으면 사용하면 된다.
- 람다의 경우에는 생략할 수있다.
- CPU 성능 개선 등의 이유로 **특정 작업**을 다른 쓰레드에서 실행시키고 싶을때 Runnable에 담아 다른 쓰레드로 넘겨야 한다.
  - **여기서 다른 작업**이란
    - file I/0
    - network
    - 이외 연산이 복잡한 계산 등 UI Thread와 상관 없는 일

## Thread가 아닌 Looper, Handler를 사용하는 이유는?

- 다른 Thread에서 실행을 시키고 싶으면 그냥 Thread에 담아서 사용하면 되는데 왜 Handler,Looper를 쓸까?
- Looper를 주로 사용하는 이유는 **메인 쓰레드에서 작업을 시키고 싶어서**
- 메인에 실행시키고 싶으면 그냥 쓰레드 생성하지 않고 하면 되는거 아냐?
  - X 무거운 작업을 별도의 Thread에서 작업하고 해당 작업의 결과를 메인스레드에 적용시키고 싶을 수 있다.
    ```kotlin
    // 메인 스레드에서 실행되는 Handler 생성
    val handler = Handler(Looper.getMainLooper())

    // 새로운 스레드에서 네트워크 작업 또는 긴 작업 실행
    val thread = Thread {
        // 예: 긴 작업 수행 (네트워크 작업 등)
        val result = "작업 결과"

        // 작업이 완료된 후 UI 업데이트를 메인 스레드에서 해야 함
        handler.post {
            // 메인 스레드에서 UI 업데이트
            textView.text = result
        }
    }
    thread.start()
    ```
