# Array vs List

## Array

- <b>내부 구현</b>
   ```kotlin
    class Array<T> private constructor() {
        val size: Int
        operator fun get(index: Int): T
        operator fun set(index: Int, value: T): Unit

        operator fun iterator(): Iterator<T>
    }
    ```


- <b>특징</b>

    - 정적 데이터 

    - 생성 순간 사이즈 고정, <b>삭제 추가 불가</b>

    - 사이즈 내 원소값 변경 가능

    - 원소값 서로 다른 타입 가능

<br/>

- <b>장점</b>

    - 인덱스를 통한 검색 용이

    - 연속된 메모리 공간을 사용해 메모리 관리 용이

<br/>

- <b>단점</b>

    - 배열 값 삭제해도 크기 그대로이기 때문에, 메모리 낭비 될수도 있음

    - 배열의 크기 재조정할 수 없기 때문에 사용하기 까다로움

<br/>

- <b>활용하기</b>

    - `arrayOf` 키워드 활용해 선언
        ```kotlin
        val colors = arrayOf("red", "blue")
        ```

    - `arrayOfNulls<T>(num)` 값이 빈 특정 길이의 배결 생성
        ```kotlin
        val colors = arrayOfNulls<String>(2)
        ```

    - 값 할당, 및 사용 동일하게 `array[index]` 형식
        


<br/>
<br/>


## List

- <b>내부 구현</b>
   ```kotlin
    public interface List<out E> : Collection<E> {

        override val size: Int
        override fun isEmpty(): Boolean
        
        public fun indexOf(element: @UnsafeVariance E): Int
        public fun lastIndexOf(element: @UnsafeVariance E): Int
        public fun listIterator(): ListIterator<E>
        public fun listIterator(index: Int): ListIterator<E>
        public fun subList(fromIndex: Int, toIndex: Int): List<E>
    }
    ```


- <b>특징</b>

    - 순서가 있는 자료형 집합

    - 불연속적인 메모리 공간 점유 -> 포인터로 값에 접근

    - `listOf`,`mutableListOf`를 활용해 생성

    - `List`는 Null 을 포함할 수 있고, 중복 요소를 허용

    - 두 리스트의 <b>인덱스와 내용이 모두 같으면 같은 리스트</b> (오? JS랑 많이 다르네)



   
<br/>

- <b>장점</b>

    - 삽입과 삭제 동작 빠름

    - 사이즈 변경 가능

    - 메모리 재사용 용이

<br/>

- <b>단점</b>

    - `array` 보다 검색 성능 떨어짐
 
    - 포인터를 통해 다음 값을 가르키므로 포인터를 담기 위한 추가적인 메모리 공간이 필요함(무슨 말인지 모르겠음)


<br/>

- <b>활용하기</b>

    - `listOf` : 내용 변경 불가 
        ```kotlin
        val oceans = mutableListOf("Atlantic", "Pacific")
        println(oceans[0]) //Atlantic
        oceans[0] = "을왕리" // Error
        ```

    - `mutableListOf` : 내용 변경 가능 => ArrayList
        ```kotlin
        val oceans = mutableListOf("Atlantic", "Pacific")
        println(oceans[0]) //Atlantic
        oceans[0] = "을왕리"
        println(oceans[0]) //을왕리
        ```

        - `add`, `indexOf` 등 다양한 메서드와 함께 사용 가능

<br/>
<br/>

        

