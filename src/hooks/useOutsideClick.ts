// Импортируем useEffect и тип RefObject из React
import { useEffect, RefObject } from "react";

// Кастомный хук для закрытия элемента при клике вне его и при нажатии Escape
export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>, // Ссылка на DOM-элемент, за которым нужно следить
  onClose: () => void // Функция, вызываемая при "внешнем" клике или Escape
) => {
  useEffect(() => {
    // Обработчик клика вне элемента
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, что клик был не внутри отслеживаемого элемента
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Обработчик нажатия клавиши Escape
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Назначаем обработчики событий при монтировании компонента
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    // Очищаем обработчики при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [ref, onClose]); // Зависимости: ссылка и функция закрытия
};
