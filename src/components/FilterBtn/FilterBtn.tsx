// Импорт иконки стрелки вниз
import { ChevronDown } from "lucide-react";

// Импорт хуков и утилит
import { FC, RefObject, useRef, useState } from "react";
import styles from "./FilterBtn.module.scss";
import cn from "classnames";

// Тип сортировки
import { SortType } from "../../types/types";

// Кастомный хук для закрытия по клику вне блока
import { useOutsideClick } from "../../hooks/useOutsideClick";

// Тип пропсов компонента
interface IFilterBtnProps {
  setSortType: React.Dispatch<React.SetStateAction<SortType>>; // Функция для установки выбранного типа сортировки
}

// Компонент кнопки фильтра сортировки
export const FilterBtn: FC<IFilterBtnProps> = ({ setSortType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Состояние открытия/закрытия меню сортировки

  // Реф на контейнер кнопки и выпадающего меню
  const filterRef = useRef<HTMLDivElement>(null);

  // Закрытие меню сортировки по клику вне компонента
  useOutsideClick(filterRef as RefObject<HTMLElement>, () => setIsOpen(false));

  // Переключение видимости меню сортировки
  const toggleFilterBtn = () => {
    setIsOpen((prev) => !prev);
  };

  // Выбор типа сортировки и закрытие меню
  const handleClickSortType = (sortType: SortType) => {
    setSortType(sortType);
    setIsOpen(false);
  };

  return (
    <div className={styles.filterBtnContainer} ref={filterRef}>
      {/* Основная кнопка сортировки — отображается всегда */}
      <button
        className={cn(styles.filterBtn, styles.filterBtnAZ)}
        onClick={toggleFilterBtn}
      >
        А → Я
        <ChevronDown />
      </button>

      {/* Дополнительные кнопки сортировки — отображаются при isOpen */}
      {isOpen && (
        <>
          <button
            onClick={() => handleClickSortType("alpha-desc")}
            className={cn(styles.filterBtn, styles.filterBtnZA)}
          >
            Я → А
          </button>
          <button
            className={cn(styles.filterBtn, styles.filterBtnLow)}
            onClick={() => handleClickSortType("price-desc")}
          >
            Дешевле
          </button>
          <button
            className={cn(styles.filterBtn, styles.filterBtnUp)}
            onClick={() => handleClickSortType("price-asc")}
          >
            Дороже
          </button>
        </>
      )}
    </div>
  );
};
