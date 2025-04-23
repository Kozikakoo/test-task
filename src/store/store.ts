import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import searchReducer from "./search/searchSlice";

// Создание Redux-хранилища с помощью configureStore

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

// Тип, представляющий корневое состояние всего Redux-хранилища
// ReturnType автоматически выводит тип возвращаемого значения функции getState
export type RootState = ReturnType<typeof store.getState>;

// Тип для dispatch, используемый для вызова экшенов
// typeof store.dispatch автоматически определяет типизацию dispatch
export type AppDispatch = typeof store.dispatch;
