// Импортируем необходимые хуки React и утилиты
import { useEffect, useState } from "react";
import { api } from "../api/axios.api"; // Конфигурация axios для API-запросов
import { ICard } from "../types/types"; // Интерфейс карточки данных

// Кастомный хук для загрузки данных из всех категорий
export const useAllCategories = () => {
  // Локальное состояние для хранения всех карточек из разных категорий
  const [data, setData] = useState<ICard[]>([]);

  useEffect(() => {
    // Асинхронная функция для получения данных из всех категорий
    const getAll = async () => {
      try {
        // Параллельно запрашиваем данные из трёх категорий
        const [clothing, food, electronics] = await Promise.all([
          api.get("/clothing"),
          api.get("/food"),
          api.get("/electronics"),
        ]);

        // Объединяем все полученные данные в один массив
        const all = [...clothing.data, ...food.data, ...electronics.data];
        // Сохраняем объединённые данные в состоянии
        setData(all);
      } catch (err) {
        // Обработка ошибок при загрузке данных
        console.error("Ошибка загрузки категорий", err);
      }
    };

    // Вызываем функцию загрузки при монтировании компонента
    getAll();
  }, []);

  // Возвращаем объект с данными, чтобы использовать его в компонентах
  return { data };
};
