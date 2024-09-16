# GIST는 뭐지?

https://github.com/techinpark/appstore-status-bot으로 회사 iOS 앱의 App Store 상태에 따라 알림이 오는 작업을 처리하는 데 GitHub에서 Gist라는 기능을 사용했다.

## GIST란?

GitHub에서 간단하게 코드 스니펫, 메모, 텍스트 파일 등을 저장하고 공유할 수 있는 기능으로 간단한 정보 저장에 적합하다.
특히, <b>버전 관리 기능도 제공</b>되어 간단한 기록을 남기거나 변경 사항을 추적하기에 유용하다.

그럼 위에 appstore-status-bot에서 Gist를 왜 쓰냐?</br>

appstore-status-bot이 상태를 파악하는 방식은:

- 15분마다 github actions에서 Fastlane을 통해 App Store의 현재 앱 상태를 가져옴.
- 가져온 앱 상태를 Gist에 저장.
- Gist에 저장된 이전 상태와 새로 가져온 상태를 비교하여, 상태가 변경되었으면 Slack으로 메시지를 보내 상태 변화를 알림.

Gist는 다음과 같은 이유로 appstore-status-bot에 적합한 도구다:

아래와 같은 작업을 할떄 Gist를 떠올리면 좋을것 같다.

<b>간단한 상태 저장</b>: Gist는 작은 양의 데이터를 저장하고 기록하기에 매우 적합하다. GitHub Actions나 외부 서비스에서 데이터를 주고받으며, 상태를 추적하는 간단한 저장소로 활용할 수 있다.

<b>버전 관리</b>: 이전 상태와 현재 상태를 비교하기 위해 Gist의 버전 관리 기능을 활용할 수 있다. 상태가 변경될 때마다 자동으로 히스토리가 남아, 변경 사항을 쉽게 추적할 수 있다.

<b>쉬운 통합</b>: GitHub API와 쉽게 통합할 수 있어, Fastlane과 같은 자동화 도구나 GitHub Actions에서 Gist에 접근해 데이터를 읽고 쓰기가 용이하다.

<b>간편한 공유</b>: Gist는 외부와도 쉽게 공유가 가능하다. 예를 들어, 특정 시점의 앱 상태를 다른 팀원이나 시스템에 전달해야 할 때 링크 하나로 공유할 수 있다.
