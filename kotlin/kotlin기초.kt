fun main() {
    println("Hello, world!!!")

    // 반복문
    val items = listOf(1,2,3,4,5)
    items.forEach{item -> println(item)}
    for(i in 0..items.size - 1){
        println(items[i])
    }

    //List
    val items = mutableListOf(1,2,3,4,5)
    items.add(6)
    items.remove(3)

    //Null Safety
    val name:String? = null
    var name2: String = ""
    
    if(name != null){
        name2 = name
    }

    name2 = name!!

    name?.let{
        name2 = it
    }
} 

fun sum(a:Int,b:Int) : Int{
    return a + b
}

// 간략한 표현 방식
fun sum2(a:Int,b:Int) = a - b 
// 파라미터 순서가 아닌 명시적 지정 가능
print(sum(b=5, a=3))

// class 생성시 기본 생성자를 함수 파라미터? 위치에 적어줌다.
class Person (val name:String, var age:Int) 
// 단순 객체 생성기면 대괄호 생략 가능
// {
//     이건 자바식
//     // val name: String
//     // val age: Int
// }
{
    var hobby = "농구"
        private set // 외부에서 설정 못하도록
        get() = "취미 :  $field"
}


data class PersonTwo (val name:String, var age:Int) 


fun runPerson() {
    val john = Person("John",20)
    val john2 = Person("John",20)

    println(john == john2) // false

    val john = PersonTwo("John",20)
    val john2 = PersonTwo("John",20)

    println(john == john2) // true

}


// 추상클래스는 상속 되지만 일반 클래스는 불가능
// 일반 클래스는 open을 해줘야함
abstract class Animal{  
    // override를 허용하려면 open 더함
    open fun move(){ 
        println("이동")
    }
}

//interface 
interface Drawable {
    fun draw(){
        
    }
}

class Dog:Animal(),Drawable {
    // fun move(){}
    // overrid
    override fun move(){
        println("껑충")
    } 

    override fun draw(){
        println("그리다")
    }
}

class Cat:Animal() {
    // fun move(){}
}

fun typeCheck(){
    val dog = Dog()
    val cat = Cat()

    if(dog is Dog){
        println("멍멍이 맞아")
    }
}

// 명시적 => 하지만 사용시 타입추론으로 타입 명시 안해도 괜츈
class Box<T>(val value:T)

// void가 아닌 Unit
fun myFunc(callback:() -> Unit){
    callback()
}

fun myFuncTwo(a:Int ,callback:() -> Unit ){
    callback()

}

// suspend -> 정지함수 실행되고 끝날때까지 기다려줘야함
// 메인스레드에서 실행 할 수 없음
suspend fun myFuncThree(){

}


fun myMyFunc() {
    // 파라미터가 콜백함수 하나인 경우
    myFunc{
        println("콜백 함수")
    }
    // 나란히 소괄호에 둘수도 있지만 콜백함수는 별도로 뺄 수 있음
    myFuncTwo(10){
        println("콜백 함수")
    }
}
