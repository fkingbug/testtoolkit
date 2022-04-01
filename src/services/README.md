**RTK query**

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: () => ({}),
})
```

- baseQuery - Линк для запроса
- endpoints - фунцкия которая возвращает объект

* fetchAllUsers - Название метода с помощью которого можно получать или изменять данные

- build.query - получение данных (GET)
- build.mutation - изменение данных (POST / PUT / DELETE)
