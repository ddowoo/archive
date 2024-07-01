# 인터넷 네트워크

## IP(인터넷 프로토콜)

    - 지정한 IP 주소(IP Address)에 메세지 전달
        (데이터 전송시 데이터 밖에 출발지 IP, 도착지 IP 정보로 감싸준다.) => Packet

    - 패킷(Packet)이라는 동신 단위 데이터로 전달

    - 한계

        - 비연결성

            - 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷 전송

        - 비신뢰성

            - 중간에 패킷이 사라지는 경우 (전달하는 노드 서버가 꺼진 경우)

            - 패킷이 순서대로 도착하지 않는 경우 (패킷이 도착전에 서로 다른 노드를 타고 갈 수 있음)

        - 프로그램 구분

            - 같은 IP를 사용하는 서버에서 어플리케이션이 두개 이상인 경우

        - TCP로 해결할 수 있음

<br/>

## TCP + (UDP)

- 인터넷 프로토콜 스택의 4계층

  1. 애플리케이션 계층 HTTP, FTP

  2. 전송 계층 - TCP, UDP

  3. 인터넷 계층 - IP

  4. 네트워크 인터페이스 계층

- 둘다 IP 계층 위에 있음

- 메세지를 보내는 경우(예시)

  1. Hello Wordl 전송

  2. Socket라이브러리 통해 전달

  3. 메세지에 TCP 정보 패키징

     TCP 퍠킷 정보 - 출발지 PORT, 목적지 PORT, 전송제어, 순서, 검증 정보

  4. TCP와 메세지에 IP정보 패키징해 패킷 생성

     IP 패킷 정보 - 출발지 IP, 도착지 IP

  5. 네트워크 인터페이스 (LAN)을 통해 전송 (Ethernet Frame으로 감싸진다.)

- <b>TCP 특징</b>

  - 연결 지향 - TCP 3way handshake (가상 연결)

    1. client => server SYN(접속 요청)

    2. server => client SYN-ACK

    3. client => server ACK

    4. 위 과정 마무리 후 데이터 전송

  - 데이터 전달 보증 (패킷 누락시 알 수 있음)

    - 데이터 전송후 잘 되면 서버에서 응답을 준다.

  - 순서 보장

    - 만약 패킷 순서가 순서에 맞지 않게 온 경우 서버에서 N번 패킷부터 다시 보내라고 요청

  - 신뢰할 수 있는 프로토콜

  - 대부분 TCP 사용

- UDP 특징

  - IP와 별 다른거 없음

  - IP와 다르게 PORT추가

  - 최근 뜨고있음

## PORT

- 같은 IP 내에서 프로세스 구분

  - IP는 서버 위치

  - PORT는 서버내 어플리케이션 구분 값

  - 0 ~ 65535 할당

  - 0 ~ 1023 잘 알려진 포트, 안쓰는게 좋음

    - FTP - 20,21

## DNS (Domain Name System)

    - 도메인 명을 IP 주소로 바꿀 수 있음

    - IP가 변경되도 DNS에서 도메인의 IP주소만 변경시켜주면 됨

    - 예시

        1. 클라이언트 => google.com을 DNS로 전송

        2. DNS에서 google.com의 IP주소 전달

        3. IP주소로 이동

<br/>
<br/>
<br/>

# URI와 웹 브라우저 요청 흐름

## URI (Uniform Resource Identifier)

- uri는 Locator(url)과 Name(urn)로 나눌 수 있음

- Uniform : 리소스를 식별하는 통일된 방식

- Resource : 자원, URI로 실벽할 수 있는 모든 것

- Identifier : 다른 항목과 구분하는데 필요한 정보

- URL : Locator-리소스가 있는 위치를 저장

- URN : Name - 리소스에 이름을 부여

- 위치는 변할 수 있지만 이름은 변하지 않음

- URN의 이름만으로 리소스를 찾는 방법이 보편화 되어있지 않음

- URI와 URL을 같은 의미로 봐도 ㄱㅊ

## URL

- scheme://[userInfo@]host[:port][/path][?query][#fragment]
- https://

1. <b>scheme</b>

   1. 주로 프로토콜 사용

   2. 프로토콜 : 어떤 방식으로 접근할 것인지에 대한 규칙

      - ex) http, https, ftp 등등

   3. http 보통 80, https는 443 포트 생략 가능

<br/>

2. [userInfo@] - 거의 사용하지 않음

3. host

   - 도메인, 혹은 ip주소 직접

   - www.google.com

4. port - 생략 가능

5. <b>path</b>

   - 리소스의 계층적 구조

   - `/members/100`

6. <b>query</b>

   - key=value 형태

   - ?로 시작, &로 추가 가능

     - ?key=aValue&keyTwo=bValue

   - 쿼리 파라미터, 쿼리 스트링 등으로 불림

7. fragment

   - html 내부 북마크

     - ex) 특정 위치로 자동 스크롤 됨

   - 서버에 위치 X

## 웹 브라우저 요청 흐름

1. DNS 조회 => IP, PORT 정보 획득

2. HTTP 요청 메세지 생성

<br/>
<br/>
<br/>

# HTTP 기본

모든 것을 HTTP로 전송

- HTML, TEXT, IMAGE, 음성, 영상, 파일, JSON, XML 등...

HTTP/1.1 가장 중요한 버전

기반 프로토콜

- TCP: HTTP/1.1, HTTP/2

- UDP: HTTP/3 (3 way handshake와 같은 과정의 생략으로 성능 개선 가능)

<br/>

## 클라이언트 서버 구조

- 클라이언트는 서버에 요청을 보내고, 응답을 대기

- 서버가 요청에 대한 결과를 만들어서 응답

- 클라이언트와 서버의 독립적 진화가 가능한게 중요

<br/>

## 무상태 프로토콜

- 서버가 클라이어튼의 상태를 보존 X

- 클라이어느 요청이 증가해도 서버 증설에 유리 (중간에 점원 바껴도 상관 없음)

- 무상태의 한계를 극복해야함

  - 로그인한 경우 로그인 했다는 상태를 서버에 유지 (이후 설명)

  - 전송시 데이터 많음

<br/>

## 비연결성

- 요청을 주고 받을때만 연결하고 연결을 유지 하지 않기 때문에 최소한의 자원만 사용할 수 있음

- 한계와 극복

  - TCP/IP 연결을 새로 맺어야함 => 3 way handshake 시간 추가

  - 웹 브라우저 요청시 HTML,CSS,JS + 이미지 등 엄청 많은 자료를 받아야함

  - 지금은 Persistent Connections로 문제 해결

  - HTTTP2,3에서는

- 선착순 이벤트와 같이 한번에 발생하는 대규모 트래픽에서는 Stateless를 반드시 기억하자

## HTTP 메세지

### 구조

1. <b>start-line</b>

   - 요청메세지

     1. HTTP 메서드

     2. 요청 대상

        - absolute-path[?query] 절대경로 쿼리

     3. HTTP 버전

     (EX) GET /search?q=hello&hl=ko HTTP/1.1

   - 응답 메세지

     1. HTTP 버전

     2. HTTP 상태 코드

        200 : 성공

        400 : 클라이언트 요청 오류

        500 : 서버 내부 오류

     3. dlab ansrn : 사람이 이해할 수 있는 짧은 상태 코드

     (EX) HTTP/1.1 200 OK

2. <b>header</b>

   - 요청

     - header

   - 용도

     - HTTP 전송에 필요한 모든 부가정보

     - (EX) 메세지 바디의 내용, 크기, 압축, 인증, 요첟 클라이언트(브라우저) 정보 등

     - 임의의 헤더도 추가 할 수 있음

3. crlf(공백 라인)

4. message body?

<br/>
<br/>
<br/>

# HTTP 메서드

## API URI 고민

- 리소스와 행위 분리

- URI는 리소스 식별만

  - 회원 목록 /memebrs

  - 회원 조회 /memebrs/{id}

  - 회원 등록 /memebrs/{id}

  - 회원 수정 /memebrs/{id}

  - 회원 삭제 /memebrs/{id}

- 행위는 메서드로 구분 짓는다.

## HTTP 메서드 - GET, POST

1. GET: 리소스 조회

   - 리소스 조회

   - 서버에 전달하고 싶은 데이터는 query를 통해서 전달

   - 메세지 바디를 사용해 데이터 전달 가능 하지만 지원하지 않는 곳이 많아서 권장X

2. POST: 리소스 조회

   - 메세지 바디를 통해 서버로 요청 데이터 전달

   - 서버는 요청 데이터를 <b>처리</b>

   - 주로 전달된 데이터로 신규 리소스 등록, 프로세스 처리에 사용

   - 요청 데이터를 어떻게 처리한다는거야?

     - 새 리로스 생성(등록)

     - 요청 데이터 처리

       - 단순히 생성 변경뿐이 아닌 프로세스 처리를 해야하는 경우(상품 주문 => 배달 시작 => 배달 완료)

       - 리소스로 URI 설계가 불가능한 경우 컨트롤 URI 사용

         ex) POST /orders/{orderId}/start-delivery(컨트롤 URI 통사로 시작)

     - 다른 메서드로 처리하기 애매한 경우 POST 사용

3. PUT : 리소스 대체

   - 리소스 있으면 대체, 없으면 생성

   - <b>클라이언트가 리소스를 식별</b>

     - 클라이언트가 리소스 위치를 알고 URI 지정

     - POST와 차이점

4. PATCH : 리소스 부분 변경

5. DELETE : 리소스 제거

6. 기타

   1. HEAD
   2. OPTION
   3. CONNECT
   4. TRACE

## HTTP 메서드의 속성

### 안전

- 호출해도 리소스 변경 없음

### 멱등

- 한 번 호출하든 두 번 호출하든 결과가 같다.

- 멱등 메서드

  - GET : 한 번 조회하든, 두 번 조회하든 같은 결과

  - PUT : 결과를 대체 따라서 몇번을 하던 결과 동일

  - DELETE : 결과 삭제

  - POST(멱등이 아님)

### 캐시가능

- 응답 결과 리소스를 캐시해서 사용해도 되는가?

- GET, HEAD, POST, PATCH 캐시가능

- 실제로는 GET, HEAD 정도만 캐시로 사용

  - POST,PATCH는 본문 내용까지 캐시 키로 고려해야 하는데 쉽지 않음

<br/>
<br/>
<br/>

# 클라이언트에서 서버로 데이터 전송

### 데이터 전달 방식은 2가지

- 쿼리 파라미터를 통한 데이터 전송

  - GET

- 메세지 바디를 통한 데이터 전송

  - POST, PUT, PATCH

- HTML Form 데이터 전송

  - Content-Type :

<br/>

## HTTP API 설계 예시

### API 설계

#### POST 기반 등록

- 회원 목록 /members -> GET

- 회원 등록 /members -> POST

- 회원 조회 /memebrs/{id} -> GET

- 회원 수정 /members/{id} -> PATCH, PUT, POST

  - PUT은 지우고 덮음

  - PATCH 부분 수정 가능 (개념적으로 추천)

- 회원 삭제 /members/{id} -> DELETE

- 컬렉션(Collection)

  - 서버가 관리하는 리소스 디렉토리

    - 예시

      - 클라이언트는 등록될 리소스의 URI 모름

      - 서버가 새로 등록된 리소스 URI를 생성해준다.

#### PUT 기반 등록

- 파일 목록 /files -> GET

- 파일 조회 /files/{filename} -> GET

- 파일 등록 /files/{filename} -> PUT

- 파일 삭제 /files/{filename} -> DELETE

- 파일 대량 등록 /files -> POST

- 클라이언트가 리소스 URI를 알아야 한다.

  - 파일 등록시 PUT /files/star.jpg

- 스토어(Store)

  - 클라이언트가 관리하는 리소스 저장소

  - 클라이언트가 리소스의 URI를 알고 관리

### HTML FORM 사용

- GET,POST만 지원 (AJAX말고 HTML 로만 하는 경우)

<br/>
<br/>
<br/>

## 상태코드

### 1XX : 요청이 수신되어 처리중 (거의 사용되지 않음)

### 2XX : 요청 정상 처리

- 200 : OK

- 201 : Created

  - 요청 성공해서 새로운 리소스가 생성됨

  - POST => 생성된 리소스는 응답의 Location에 담겨 온다.

- 202 : Accepted

  - 요청이 접수됐으나 처리가 완료되지 않음

    (ex) 요청후 한시간 뒤 처리

- 204 : No Content

  - 서버가 요청을 성공적으로 수행 했으나, 응답 페이로드에 보낼 데이터가 없음

### 3XX : 요청을 완료하려면 추가 행동이 필요

- 리다이렉션 : 웹 브라우저는 3XX 응답에 Location 헤더가 있으면, Location 위치로 자동 이동함

  - 영구 리다이렉션

    - 리소스의 URI가 영구적으로 이동

    - 원래의 URL 사용X, 검색 엔진 등에서도 변경 인지

    - <b>301 Moved Permanantly</b>

      - 리다이렉트시 요청 메서드가 GET으로 변하고, 본문이 제거 될 수 있음

      - 요청 -> 응답 -> Location으로 위치 이동 -> 최초 요청시 body에 담긴 데이터 없이 이동

    - <b>308 Permanant Redirect</b>

      - 301과 같은 기능

      - 리다이렉트 요청 메서드와 본문 유지

      - 요청 -> 응답 -> Location으로 위치 이동 -> 최초 요청시 body에 담긴 <b>데이터 유지</b>

  - 일시적 리다이렉션 => 실무에서 많이 사용

    - 리소스 URI가 일시적으로 변경

    - 따라서 검색 엔진에서 URL을 변경하면 안됨

    - <b>302 Found</b>

      - 리다이렉트 요청시 메서드가 GET으로 변하고, 본문이 제거 될 수 있음

    - <b>307 Temporary Redirect</b>

      - 302와 기능은 같음

      - 리다이렉트시 요청 메서드와 본문 유지 (요청 메서드 변경 X)

    - <b>303 See Other</b>

      - 302와 기능은 같음

      - 리다이렉트시 요청 메서드와 본문 유지 (요청 메서드 변경 X)

    - PRG: Post/Redirect/Get

      - POST로 주문 후에 웹 브라우저를 새로고침하면? => 요청도 새로고침 될 수 있음(중복 주문)

      - 클라이언트 측에서 방지하기

        - POST 주문 후에 새로 고침으로 인한 중복 주문 방지

        - POST로 주문 후에 주문 결과 화면을 GET 메서드로 Redirect

  - 특수 리다이렉션

    - 300 Multiple Choices 안쓴다.

    - 304 Not Midified

      - 캐시를 목적으로 사용

      - 클라이언트에게 리소스가 수정되지 않았음을 알려줌

      - 304 응답은 응답에 메세지 바디를 포함하면 안된다.

      - 조건부 GET,HEAD 요청시 사용

### 4XX : 클라이언트 오류, 잘못된 문법 등으로 서버가 요청을 할 수 없음

- 400 Bad Request

  - API 스펙 안맞는 경우 등

- 401 Unauthorized

  - 인증 되지 않음

- 403 Forbidden

  - 승인(로그인 했음) 자격 있음 하지만 접근 권한이 불충분

- 404 Fot Found

  - 요청 리소스가 서버에 없음

### 5XX : 서버 오류, 서버가 정상적으로 처리하지 못함

- 서버 내부 문제로 오류 발생

- 503 서비스 이용 불가

  - 서버가 일시적인 과부하 또는 예정된 작업으로 잠시 요청을 처리할 수 없음

  - Retry-After 헤더 필드로 얼마뒤에 복구되는지 보낼 수 있음

### 클라이언트가 인식할 수 없는 상태코드 반환하면?

- 클라이언트는 상위 상태코드로 해석해서 처리

- <ex>

  - 299 ??? -> 2xx (Successful)
  - 451 ??? -> 4xx (Client Error)

  - 599 ??? -> 2xx (Server Error)

---

# HTTP 헤더

## 표현

- Content-Type: 표현 데이터의 형식

  - 미디어 타입, 문자 인코딩

  - 컨텐트 바디에 들어가는 내용이 무엇인지

    - text/html; charset=utf-8

    - application/json

    - image/png

- Content-Encoding: 표현 데이터 압축 방식

  - 표현 데이터를 압축하기 위해 사용

  - 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가

  - 데이터를 읽는 쪽에서 헤더를 읽고 압축 해제

- Content-Language: 표현 데이터의 자연 언어

- Content-Length: 표현 데이터의 길이

  - 바이트 단위

  - Transfer-Encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨

- 표현 헤더는 전송 응답 둘다 사용

```
Content-Type: text/html;charset=UTF-8
Content-Encoding: gzip
Content-Encoding: en
Content-Length: 3423
```

## 협상(컨텐츠 네오시에이션)

클라이언트가 원하는 표현에 맞춰서 전달하는 것

- Accept: 클라이언트가 선호하는 미디어 타입 전달

- Accep-Charset: 클라이언트가 선호하는 문자 인코딩 전달

- Accept-Encoding: 클라이언트가 선호하는 압축 이코딩

- Accept-Language: 클라이언트가 선호하는 자연언어

  - Quality Values 값 사용

  - 0~1,클수록 우선순위 높음 (생략하면 1)

- 협상 헤더는 요청시에만 사용

- Quality Values

  - 구체적인 것이 우선순위

    Accept : text/\*, text/plain, text/html

  - 구체적인 것을 기준으로 미디어 타입을 맞춘다.

apple.com에서 확인한 헤더

```
Accept: */*
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: ko,ja;q=0.9,ko-KR;q=0.8,en-US;q=0.7,en;q=0.6,ja-JP;q=0.5
```

## 전송방식

- 단순전송

  - Content-Length

- 압축전송

  - Content-Encoding(추가)

- 분할 전송

  - Transfer-Encoding: chunked

- 번위 전송

  - Content-Range

## 일반 정보

- From

  - 잘 사용하진 않음

  - 검색 에진 같은 곳에서 주로 사용

  - 요청에서 사용

- <b>Referer</b>

  - 이전 웹 페이지 주소

  - 유입 경로 분석 가능

  - 요청에서 사용

- <b>User-Agent</b>

  - 크라리언트 애플리케이션 정보(웹 브라우저 정보)

  - 통계 정보

  - 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능

  - 요청에서 사용

- <b>Server</b>

  - 요청을 처리하는 ORIGIN 서버의 소프트웨어 정보

  - 응답에서 사용

- <b>Date</b>

  - 메세지가 발생한 날짜와 시간

  - 응답에서만 사용

## 특별 정보

- Host

  - 요청에서 사용

  - 필수값

  - 하나의 서버가 여러 도메인을 처리해야 할 때

  - 하나의 IP주소에 여러 도메인이 적용되어 있을 때

- Location

  - 3XX 응답에 Location이 있으면 자동으로 Location으로 이동

  - 201 : Location 값은 요청에 의해 생성된 리소스 URI

- Allow (많이 쓰진 않음)

  - 405 (Method Now Allowed)에서 응답에 포함해야함

- Retry-After

  - 503(Service Unavailable) : 서비스가 언제까지 불능인지 알려 줄 수 있음

## 인증

- Authorization

  - 클라이언트의 인증 정보를 서버에 전달

- WWW-Authemticate

  - 리소스 접근시 필요한 인증 방법 정의

  - 401 Unauthorized 응답과 함께 사용

<br/>

---

<br/>

# 쿠키

- Set-Cookie 서버에서 클라이언트로 쿠키 전달(응답)

- Cookie 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청시 서버로 전달

- <b>생명주기</b>

  - Set-Cookie : expires

    - 만료일 생성

    - GMT 기준

  - Set-Cookie : max-age=3600 (3600초)

    - 0이나 음수를 지정하면 쿠키 삭제

  - 세션 쿠키 : 만료 날짜를 생략하면 브라우저 종료시 까지만 유지

  - 영속 쿠키 : 만료 날짜를 입력하면 해당 날짜까지만 유지

- <b>도메인</b>

  - 명시 : 명시 기준 도메인 + 서브 도메인

    - domain = example.org -> dev.example.org 접근 가능

  - 생략 : 현재 문서 기준만 접근

    - domain = example.org -> dev.example.org 접근 불가

- 경로

  - 경로를 포함한 하위 경로 페이지만 쿠키 접근

  - 일반적으로는 path=/

  - EX

    - /home

    - /home/firset , /home/secones

    - /hello (X)

- Secure

  - 적용시 https인 경우에만 쿠키 전송

- HttpOnly

  - XXS 공격 방지

  - 자바스크립트에서 접근 불가

  - HTTP 전송 에서만 사용

- SameSite

  - XSRF 공격 방지

  - 요청 도메인과 쿠키 설정 도메인이 같은 경우에만 전송 가능

# 캐시

- 응답 헤더에 <b>Cache-Control</b>

Cache-Control: public, max-age=86400, no-transform

- 요청시 캐시를 머저 찾고 시간이 유효하면 서버에 요청하지 않고 캐시된 데이터를 이용한다.

## 검증헤더와 조건부 요청

<b>Last-Modified</b>
<br/>
<b>if-Modified-Since</b>

- 캐시 유효 시간을 초과해 서버에 다시 요청 할 때 데이터가 동일한 경우

- 헤더에 Last-Modified로 마지막 수정 날짜를 기록해둔다.

- 유효 시간 초과로 다시 요청할때 Last-Modified가 있으면 if-Modified-Since 헤더에 마지막 수정 날짜를 보낸다.

- 만약 서버에서 가지고 있는 데이터와 캐싱된 데이터가 동일하면 HTTP Body에 데이터를 넘기지 않고 304 Not Modified로 응답값을 보낸다.

- 캐시 데이터 유효시간 연장 후 다시 사용

단점

- 날짜 기반 로직 , 1초단위 이하 불가능

- 데이터 수정해서 날짜는 다르지만, 같은 데이터를 수정해 결과가 같은 경우

<b>E Tag</b>

- 캐시용 데이터에 임의의 버전 값을 둔다.

- 데이터가 바뀌면 E Tag를 변경

- E Tag 같으면 유지 다르면 다시 받기로 바뀜

- 캐싱 초과 이후 E Tag 존재시 <b>If-None-Match</b> 헤더를 추가해 서버에 요청 => 서버와 E Tag값이 동일하면 304 Not Modified를 보낸다.

## 캐시와 조건부 요청 헤더

1. <b>Cache-Control</b>

- Cache-Control: max-age

  캐시 유효시간 초 단뒤

- Cache-Control: no-cache

  데이터는 캐시해도 되지만, 항상 원(origin) 서버에 검증 후 사용

- Cache-Control: must-revalidate

  캐시 시간 만료 후 원(origin) 서버에 검증 후 사용

  원서버에 접근이 불가능 한 경우 504 에러를 보낸다. (no-cache와 다른 부분)

- Cache-Control: no-store

  민감한 정보가 있으므로 사용하고 빨리 삭제

- Cache-Control: public

  응답이 public 캐시에 저장되어도 됨 (public 캐시는 프록시 서버 위치)

<br/>

2. Cache-Control

- Pragma: no-cache

- HTTP 1.0 하위 호환

<br/>

3. Expires

- 캐시 만료일을 정확한 날짜로 지정

- max-age와 같이 사용되면 무시됨

<br/>

## 캐시 무효화

브라우저가 임의로 캐시를 해버릴 수 있기 떄문에 절대 캐시되면 안되는 데이터를 아래 모든 헤더를 포함 시켜준다.

- Cache-Control : no-cache, no-store, must-revalidate

- Pragma: no-cache
