```tsx
import React, { useEffect } from 'react'
import PostContainer from './components/PostContainer'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchUsers } from './store/reducers/ActionCreators'

const App = () => {
  const dispatch = useAppDispatch()
  const { users, isLoading, error } = useAppSelector((state) => state.userReducer)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className='App'>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)}
    </div>
  )
}

export default App
```

## RTK query закеширует данные и не даст сделать еще 1 запрос на 1 и теже данные

---

Если Создается запрос на сервер и со временем меняется колличество информации , то RTK сам поменяет состояние
setTimeout изменяет limit и происходит перерисовка

```tsx
import React, { useEffect, useState } from 'react'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem'

const PostContainer = () => {
  const [limit, setLimit] = useState(10)

  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit, {
    pollingInterval: 1000,
  })

  useEffect(() => {
    setTimeout(() => {
      setLimit(3)
    }, 2000)
  }, [])

  return (
    <div>
      <div className='post__list'>
        <button onClick={() => refresh()}>REFRESH</button>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  )
}
```

- Метод refetch - позволяет при клике делать запрос снова
- pollingInterval - Вторым параметром в хук можно передать объект , поле pollingInterval роеализует longpooling и задает интервал перезапросов
