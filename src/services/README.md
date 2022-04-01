**RTK query**

```typescript
export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => ({
        url: '/posts',
      }),
    }),
  }),
})
```

- baseQuery - Линк для запроса
- endpoints - фунцкия которая возвращает объект

  - fetchAllUsers - Название метода с помощью которого можно получать или изменять данные

    - build.query - получение данных (GET)
    - build.mutation - изменение данных (POST / PUT )

---

build.query возвращает объект

```typescript
      query: () => ({
        url: '/posts',
      }),
```

url это endpoint который будет добавляься к baseQuery
https://jsonplaceholder.typicode.com + /posts

---

с дженериками и лимитамии  
(без IPost ts выдавал ошибку)
IPost[], number - В джинерике передается 2 параметра - это поулчаемый массив и параметр (к примеру для паг)
param - текст в адресной строке после ссылки для работы с API

```typescript
export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (build) => ({
    fetchAllUsers: build.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: '/posts',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})
```

---

**RTK query Сам обрабатывает ошибки и индикацию загрузки**

```typescript
import React from 'react'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem'

const PostContainer = () => {
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(5)

  return (
    <div>
      <div className='post__list'>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default PostContainer
```
