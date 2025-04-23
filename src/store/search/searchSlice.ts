// Импортируем необходимые функции и типы из Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Интерфейс для состояния поиска
interface SearchState {
  query: string; // строка запроса для поиска
}

// Начальное состояние — пустой запрос
const initialState: SearchState = {
  query: "",
};

// Создаём слайс с помощью Redux Toolkit
const searchSlice = createSlice({
  name: "search", // название слайса
  initialState, // начальное состояние
  reducers: {
    // Редьюсер для обновления строки запроса
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload; // Устанавливаем новый запрос
    },
  },
});

// Экспортируем экшен для использования в компонентах
export const { setQuery } = searchSlice.actions;

// Экспортируем редьюсер, чтобы подключить его в store
export default searchSlice.reducer;
