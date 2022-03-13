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
```typescript
```