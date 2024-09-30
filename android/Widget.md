# Widget의 기본 작동 원리와 실행 방법

## 위젯

위젯은은 Android의 activity와 service와 같은 컴포넌트 중 하나로 홈 화면, 잠금화면에서 사용 가능

기본 원리는 `BroadcastReceiver`를 기반으로 한다.

<aside>
💡

`BroadcastReceiver` 란?

BroadcastReceiver는 핸드폰의 시스템 혹은 다른 앱에서의 이벤트를 수신해 앱에 전달해 주는 역할을 한다.

(ex : 베터리 부족)

</aside>

## 위젯의 생명주기

**`onUpdate()`**

- 위젯이 업데이트될 때 호출
  - `receiver` 에 연결된 `appwidget-provider` 에 설정 값중 `updatePeriodMillis`를 설정하면 일정시간 마다 정기적 업데이트가 가능

**`onEnabled()`**

- 위젯이 처음 추가될 때 한 번 호출
- 여러개 위젯 추가되도 최초 한 번만

**`onDisabled()`**:

- 위젯이 더 이상 홈 화면에 존재하지 않게 되는 시점에서 호출

**`onDeleted()`**:

- 사용자가 위젯을 홈 화면에서 삭제하면 호출

**`onReceive()`**:

- 위젯이 시스템 브로드캐스트를 받을 때 호출

## 위젯 동작 원리

- **`AppWidgetProvider`**

  - 위젯 클래스
  - 위젯 생명 주기를 다룬다.
  - `BroadcastReceiver` 의 하위 클래스 이기 때문에 `intent` 로부터 외부의 데이터를 받아 상호작용한다.

- **`RemoteViews`**

  - 위젯의 UI를 조정하는데 사용하는 클래스
  - Widget UI를 조작하는데 필요한 정보를 담고 있다.
  - Activity처럼 UI를 직접 조작하는 방식이 아닌 RemoteViews를 시스템에 넘기면 시스템이 widget을 업데이트 하는 방식이다.

- **`AppWidgetManager`**
  - `RemoteViews` 에 담긴 위젯의 업데이트 정보를 시스템에 전달하는 역할을 한다.

## 사용하기

- 위젯 생성
  - `app/src/main/package` 에서 우클릭 → new 위젯 추가
    - AndroidManifest receiver 셋팅 추가 (AppWidget)
    - AppWidget.kt : **`AppWidgetProvider`** 상속 클래스
    - app_widget_info.xml : **`appwidget-provider`** 위젯의 기본 속성 및 동작 지정 (위젯의 메타데이터)
      - 위젯 사이즈 지정
      - 위젯 사이즈 조정 여부
      - 업데이트 주기
      - 위젯 UI xml 파일 연동
    - app_widget.xml : 위젯의 UI 관련
- 앱 사용중 업데이트 하기

  - 예시 코드

    ```kotlin
    private fun updateWidget(title: String?) {
            // 위젯의 RemoteViews 생성
            val remoteViews = RemoteViews(themedReactContext.packageName, R.layout.app_widget)
            remoteViews.setTextViewText(R.id.appwidget_text, title)

            // PendingIntent 생성: 위젯 클릭 시 해당 인텐트가 실행되도록 설정
            // 사용자가 위젯을 클릭하면 앱이 열리도록 하는 인텐트 생성
    				val intent = Intent(context, MainActivity::class.java)
    				val pendingIntent = PendingIntent.getActivity(
    				    context,
    				    0,
    				    intent,
    				    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
    				)

            // 터치 이벤트 설정: 위젯 레이아웃의 특정 부분에 클릭 시 PendingIntent 실행
            // widget_layout은 app_widget.xml의 가장 외부 layout view
            remoteViews.setOnClickPendingIntent(R.id.widget_layout, pendingIntent)

            // AppWidgetManager를 통해 위젯 업데이트
            val appWidgetManager = AppWidgetManager.getInstance(themedReactContext)
            val widgetComponent = ComponentName(themedReactContext, AppWidget::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(widgetComponent)

            appWidgetManager.updateAppWidget(appWidgetIds, remoteViews)
        }
    ```

- `remoteView`와 `AppWidgetManager` 를 활용해 UI 업데이트를 해준다.
- remoteView에 클릭 이벤트를 설정하고 클릭시 필요한 정보를 `Intent`에 담아 `PendingIntent`로 보낸다
