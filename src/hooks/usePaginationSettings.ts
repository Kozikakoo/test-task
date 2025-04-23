// Импортируем хуки из React
import { useEffect, useState } from "react";

// Кастомный хук для управления количеством отображаемых карточек на экране
export const usePaginationSettings = () => {
  // Состояние для количества карточек, отображаемых сразу
  const [visibleCards, setVisibleCards] = useState(0);
  // Состояние для количества карточек, подгружаемых при клике "Показать ещё"
  const [loadMoreCount, setLoadMoreCount] = useState(0);

  // Функция, определяющая, сколько карточек показывать в зависимости от ширины экрана
  const updateCardCount = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1373) {
      // Для больших экранов — показываем больше карточек
      setVisibleCards(12);
      setLoadMoreCount(4);
    } else if (screenWidth >= 1050) {
      setVisibleCards(9);
      setLoadMoreCount(3);
    } else if (screenWidth >= 768) {
      setVisibleCards(8);
      setLoadMoreCount(2);
    } else {
      // Для мобильных — меньше карточек
      setVisibleCards(5);
      setLoadMoreCount(2);
    }
  };

  useEffect(() => {
    // Устанавливаем количество карточек при загрузке
    updateCardCount();

    // Обновляем при изменении размера окна (с небольшой задержкой)
    const resizeHandler = () => setTimeout(updateCardCount, 300);
    window.addEventListener("resize", resizeHandler);

    // Удаляем обработчик при размонтировании
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // Возвращаем значения и setter, если потребуется изменить visibleCards вручную
  return { visibleCards, loadMoreCount, setVisibleCards };
};
