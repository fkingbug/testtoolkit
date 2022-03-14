Типизация useDispatch 

```typescript
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
```

Типизация useSelector
Помогает при получении данных , показывает reducer и поля в нем

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
```