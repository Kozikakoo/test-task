// Импорт корневого состояния Redux (RootState)
import { RootState } from "../store";

// Селектор для получения количества товара по его id
export const selectQuantityById = (id: number) => (state: RootState) => {
  // Ищем товар в корзине по id
  const item = state.cart.items.find((i) => i.id === id);

  // Если товар найден, возвращаем его количество, иначе 0
  return item?.quantity || 0; // Возвращаем 0, если товар не найден
};
