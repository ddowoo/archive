# Glide?

- Glide는 안드로이드에서 이미지 로딩 및 캐싱을 라이브러리
- 네트워크나 로컬 스토리지에서 이미지를 효율적으로 가져오고 표시하는 데 사용됩니다.
- 빠른 성능과 메모리 최적화에 중점, 특히 이미지의 비동기 로딩
- 주로 네트워크 이미지를 로드해서 화면에 그리는데 사용
- react-native-fast-image에서 사용하는게 glide

## 사용중 팁

### 에러 로딩 대응

```kotlin
Glide.with(context)
    .load("https://example.com/image.jpg")
    .placeholder(R.drawable.loading)  // 로딩 중 보여줄 이미지
    .error(R.drawable.error)          // 에러 발생 시 보여줄 이미지
    .into(imageView)
```

<br/>

### 이미지 변형 (Transformation)

#### radius, crop, blur등의 처리를 transformtion에서 실행한다.

```kotlin
Glide.with(context)
    .load("https://example.com/image.jpg")
    .transform(CenterCrop(), RoundedCorners(16)) // 센터 크롭 + 둥근 모서리
    .into(imageView)
```

### gif 로드

```kotlin
Glide.with(context)
    .asGif()
    .load("https://example.com/animation.gif")
    .into(imageView)
```

### 비디오 썸네일 로딩

#### 비디오 파일의 첫 번째 프레임을 썸네일로

```kotlin
Glide.with(context)
    .load(Uri.fromFile(File("path/to/video.mp4")))
    .into(imageView)
```

### RecycleerView 최적화

#### RecyclerView 처럼 스크롤 상황에 따라 화면을 렌더링 하는 뷰에서 이미지 최적화를 하기에 좋다.

```kotlin
class MyAdapter(private val imageUrls: List<String>) : RecyclerView.Adapter<MyViewHolder>() {
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        Glide.with(holder.itemView.context)
            .load(imageUrls[position])
            .into(holder.imageView)
    }
}
```
