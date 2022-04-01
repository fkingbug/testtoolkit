При создания стора испоьзуется **combineReducers** для объединения всех редьюсеров в 1

Конфигурация стора :

```typescript
export const setupStore = () => {
  return configureStore({})
}
```

**reducer : rootReducer** - указываем рутовый редьюсер

---

Получение типа состояния

```typescript
export type RootState = ReturnType<typeof rootReducer>
```

Получение типа стора

```typescript
export type AppStore = ReturnType<typeof setupStore>
```

Полчение типа Dispatch

```typescript
export type AppDispatch = AppStore['dispatch']
```

---

Для регистрации редьюсера от RTK query необходимо передать его в rootReducer

```typescript
const rootReducer = combineReducers({
  userReducer,
  [postAPI.reducerPath]: postAPI.reducer,
})
```

и неоходимо добавить middleware

```typescript
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware),
  })
}
```

getDefaultMiddleware - дает возможность получить дефолтный Middleware
c помощью concat добавляем middleware которую получаем через postAPI
