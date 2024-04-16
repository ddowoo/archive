# React-Hook-Form + Zod

# Zod?

Zod는 TypeScript 우선 스키마 선언 및 유효성 검사 라이브러리입니다

중복된 유형 선언을 제거하는것이 목표로 만들어졌다. 유효성 검사를 선언하면 Zod는 자동으로 Typescript 유형을 추론할수있다.

## 사용 조건

- Typescript 4.5+

```tsx
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true
  }
}

```

## 기본 사용법

```tsx
import { z } from "zod"

// schema to string
const mySchema = z.string();

mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }

---------

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// 스키마에서 타입을 추론할 수 있음
type User = z.infer<typeof User>;
// { username: string } (type)

```

---

# React-Hook-Form + Zod

react-hook-form에 zod를 함께 쓰면 react-hook-form에서 유효성 검사 코드를 zod에 내장된 유효성 검사 메서드를 활용해 간단하게 작성 수 있고 유효성 관련 코드를 별도로 분리 할 수 있다.

### 예시

유효성 검사 코드

**zod 미사용**

- register 마다 셋팅을 해줌

```tsx
<input
  {...register("password", {
    minLength: {
      value: 10,
      message: "비밀번호는 10글자 이상이어야 한다.",
    },
  })}
  type="password"
  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
{errors.password && <p className="text-red-500">{errors.password.message}</p>}
...
<input
  {...register("chkPassword")}
  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
{errors.chkPassword && <p className="text-red-500">{errors.chkPassword.message}</p>}
```

**zod 사용**

```tsx

<input
  {...register("password")}
  type="password"
  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
{errors.password && <p className="text-red-500">{errors.password.message}</p>}
...
<input
  {...register("chkPassword")}
  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>
{errors.chkPassword && <p className="text-red-500">{errors.chkPassword.message}</p>}
```
