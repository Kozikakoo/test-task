// Импортируем useMemo для мемоизации результата
import { useMemo } from "react";
import { ICard, SortType } from "../types/types"; // Типы: карточка продукта и тип сортировки

// Кастомный хук для сортировки массива продуктов по заданному типу сортировки
export const useSortedProducts = (products: ICard[], sortType: SortType) => {
  // Мемоизируем результат сортировки, чтобы не пересчитывать при каждом рендере
  const sorted = useMemo(() => {
    // Копируем исходный массив, чтобы не мутировать props
    const sortedCopy = [...products];

    // Выполняем сортировку в зависимости от выбранного типа
    switch (sortType) {
      case "alpha-asc":
        // Сортировка по алфавиту (А–Я), учитывая русскую локаль
        return sortedCopy.sort((a, b) => a.name.localeCompare(b.name, "ru"));
      case "alpha-desc":
        // Сортировка по алфавиту в обратном порядке (Я–А)
        return sortedCopy.sort((a, b) => b.name.localeCompare(a.name, "ru"));
      case "price-asc":
        // Сортировка по возрастанию цены
        return sortedCopy.sort((a, b) => a.price - b.price);
      case "price-desc":
        // Сортировка по убыванию цены
        return sortedCopy.sort((a, b) => b.price - a.price);
      default:
        // Если сортировка не выбрана — возвращаем оригинальный список
        return products;
    }
  }, [products, sortType]); // Зависимости: пересчитывать только при изменении данных или типа сортировки

  // Возвращаем отсортированный массив
  return sorted;
};
