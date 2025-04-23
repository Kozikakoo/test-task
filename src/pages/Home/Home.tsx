import { FC, useState } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Home.module.scss";

// Хуки и вспомогательные функции
import { usePaginationSettings } from "../../hooks/usePaginationSettings";
import { BtnMore } from "../../components/BtnMore/BtnMore";
import { useAllCategories } from "../../hooks/useAllCategories";
import { ICard, SortType } from "../../types/types";
import { FilterBtn } from "../../components/FilterBtn/FilterBtn";
import { useSortedProducts } from "../../hooks/useSortedProducts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { searchCards } from "../../helpers/searchCards.helper";

const Home: FC = () => {
  // Получаем данные всех категорий через кастомный хук
  const { data } = useAllCategories();

  // Настройки пагинации: видимые карточки, шаг загрузки, функция изменения количества
  const { visibleCards, loadMoreCount, setVisibleCards } =
    usePaginationSettings();

  // Состояние для текущего типа сортировки
  const [sortType, setSortType] = useState<SortType>("alpha-asc");

  // Получаем поисковый запрос из Redux store
  const query = useSelector((state: RootState) => state.search.query);

  // Сортируем продукты согласно выбранному типу сортировки
  const sortedProducts = useSortedProducts(data, sortType);

  // Фильтруем отсортированные продукты по поисковому запросу
  const filteredAndSortedProducts = searchCards(sortedProducts, query);

  /**
   * Обработчик загрузки дополнительных карточек
   * Увеличивает количество видимых карточек на значение loadMoreCount
   */
  const handleLoadMore = () => {
    setVisibleCards((prevCount) => prevCount + loadMoreCount);
  };

  return (
    <main className={styles.home}>
      <div className={styles.grid}>
        {/* Кнопка фильтрации с передачей функции изменения типа сортировки */}
        <FilterBtn setSortType={setSortType} />

        {/* Рендерим карточки продуктов с учетом:
            - фильтрации по поиску
            - сортировки
            - пагинации (видимое количество) 
        */}
        {filteredAndSortedProducts
          ?.slice(0, visibleCards)
          .map((item: ICard) => (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>

      {/* Кнопка "Показать еще" отображается только если есть еще карточки для загрузки */}
      {visibleCards < filteredAndSortedProducts.length && (
        <BtnMore onClick={handleLoadMore} />
      )}
    </main>
  );
};

export default Home;
