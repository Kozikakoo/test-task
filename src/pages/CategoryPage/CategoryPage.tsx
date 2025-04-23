import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card } from "../../components/Card/Card";
import styles from "./CategoryPage.module.scss";
import { api } from "../../api/axios.api";
import { BtnMore } from "../../components/BtnMore/BtnMore";
import { usePaginationSettings } from "../../hooks/usePaginationSettings";
import { FilterBtn } from "../../components/FilterBtn/FilterBtn";
import { useSortedProducts } from "../../hooks/useSortedProducts";
import { ICard, SortType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { searchCards } from "../../helpers/searchCards.helper";

const CategoryPage: FC = () => {
  // Получаем параметр категории из URL (например: 'food', 'electronics')
  const { category } = useParams();

  // Состояние для хранения карточек товаров текущей категории
  const [cards, setCards] = useState<ICard[]>([]);

  // Настройки пагинации:
  // visibleCards - сколько карточек показываем
  // loadMoreCount - сколько подгружать по кнопке "Еще"
  // setVisibleCards - функция изменения количества видимых карточек
  const { visibleCards, loadMoreCount, setVisibleCards } =
    usePaginationSettings();

  // Состояние для текущего типа сортировки (по умолчанию: A-Z)
  const [sortType, setSortType] = useState<SortType>("alpha-asc");

  // Получаем поисковый запрос из Redux store
  const query = useSelector((state: RootState) => state.search.query);

  // Сортируем карточки согласно выбранному типу сортировки
  const sortedProducts = useSortedProducts(cards, sortType);

  // Фильтруем карточки по поисковому запросу (если есть)
  const filteredAndSortedProducts = searchCards(sortedProducts, query);

  /**
   * Обработчик загрузки дополнительных карточек
   * Увеличивает количество отображаемых карточек на значение loadMoreCount
   */
  const handleLoadMore = () => {
    setVisibleCards((prev) => prev + loadMoreCount);
  };

  // Эффект для загрузки данных категории при изменении параметра category
  useEffect(() => {
    const fetchCategory = async () => {
      if (!category) return;

      try {
        // Запрашиваем данные категории с API
        const { data } = await api.get(`/${category}`);
        setCards(data);
        // Сбрасываем пагинацию при смене категории
        setVisibleCards(8);
      } catch (error) {
        console.error("Ошибка при загрузке категории:", error);
        // Здесь можно добавить обработку ошибок (например, показать уведомление)
      }
    };

    fetchCategory();
  }, [category]);

  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        {/* Кнопка фильтрации с передачей функции изменения сортировки */}
        <FilterBtn setSortType={setSortType} />

        {/* Рендерим карточки товаров с учетом:
            - текущей сортировки
            - поискового запроса
            - пагинации (только visibleCards элементов)
        */}
        {filteredAndSortedProducts.slice(0, visibleCards).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Показываем кнопку "Еще" только если есть что подгружать */}
      {visibleCards < filteredAndSortedProducts.length && (
        <BtnMore onClick={handleLoadMore} />
      )}
    </main>
  );
};

export default CategoryPage;
