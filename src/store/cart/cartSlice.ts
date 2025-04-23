// Импорт необходимых функций и типов из Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../types/types";

// Интерфейс для состояния корзины
interface ICartState {
  items: ICartItem[]; // массив всех товаров в корзине
}

// Начальное состояние корзины — пустая корзина
const initialState: ICartState = {
  items: [],
};

// Создаём слайс с помощью Redux Toolkit
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавление товара в корзину
    addToCart(state, action: PayloadAction<ICartItem>) {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        // Если товар уже есть, увеличиваем количество
        item.quantity += action.payload.quantity;
      } else {
        // Если товара нет, добавляем новый
        state.items.push({ ...action.payload });
      }
    },

    // Удаление товара из корзины по id
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    // Полная очистка корзины
    clearCart(state) {
      state.items = [];
    },

    // Изменение количества товара (delta — изменение: +1 или -1)
    changeQuantity(
      state,
      action: PayloadAction<{ id: number; delta: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        const newQuantity = item.quantity + action.payload.delta;

        // Не позволяем количеству становиться отрицательным
        if (newQuantity >= 0) {
          item.quantity = newQuantity;
        }
      }
    },
  },
});

// Экспортируем экшены для использования в компонентах
export const { addToCart, removeFromCart, clearCart, changeQuantity } =
  cartSlice.actions;

// Экспортируем редьюсер по умолчанию для подключения к store
export default cartSlice.reducer;
