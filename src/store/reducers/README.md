В ToolKit reducer => Slice

slice имеет имя , дефолтное значение и рудьюсеры
Обычно в редьюсере switchcase , но в тулкит , каждый case это отдельный reducer в reducers {}

```typescript

interface userState {
  users: IUser[]
  isLoading: boolean
  error: string
  count: number
}

const initialState: userState = {
  users: [],
  isLoading: false,
  error: '',
  count: 0,
}
export const userSlice = createSlice({
  name : 'user',
  initialState ,
  reducers {
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload
    },
  }
})
export default userSlice.reducer
```

App.tsx для создания кнопки и пробавления к count 10

```typescript
import React from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { userSlice } from './store/reducers/UseSlice'

const App = () => {
  const { count } = useAppSelector((state) => state.userReducer)
  const { increment } = userSlice.actions
  const dispatch = useAppDispatch()
  return (
    <div className='App'>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment(10))}>increment</button>
    </div>
  )
}

export default App
```

---

Асинхронный запрос
ActionCreator не возврщает action , он возвращает функцию которая принимает в себя dispatch и из этой функции будеи делать запросы
также обрабатывает 3 состояния (идет загрущка , загрузка удачна , ошибка)
все 3 состояния создаются сами в виде 3 редьюсеров

ActionCreators.ts

```typescript
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching())
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
    dispatch(userSlice.actions.usersFetchingSuccess(response.data))
  } catch (error) {
    dispatch(userSlice.actions.usersFetchingError((error as Error).message))
  }
}
```

UseSlice.ts

```typescript
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})
```

---

**reduxToolkit** позволяет оптимизировать работу с состояниями (идет загрущка , загрузка удачна , ошибка)

ActionCreators.ts :

```typescript
export const fetchUsers = createAsyncThunk(
  'user/ferchAll', // Название фанка
  async (_, thunkAPI) => {
    //Колбек для выполнения запроса
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
    return response.data
  }
)
```

---

Для того чтобы toolkit понял в каком состоянии приложение (идет загрузка , загрузка удачна , ошибка)
в UseSlice естьполе ExtraReducers. ToolKit Создает уникальные имена для состояний и делает actionCreator

UseSlice.ts

```typescript
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})
```

- fulfilled - Данные получены
- pending - Ожидание
- rejected - Ошибка

---
