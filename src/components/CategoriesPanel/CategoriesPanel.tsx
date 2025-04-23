import styles from "./CategoriesPanel.module.scss";

import { CategoryLink } from "../CategoryLink/CategoryLink";

export const CategoriesPanel = () => {
  return (
    <aside className={styles.categories}>
      <h2 className={styles.categories__title}>Категории</h2>
      <ul className={styles.categories__list}>
        <li className={styles.categories__item}>
          <CategoryLink to="/food">Еда</CategoryLink>
        </li>
        <li className={styles.categories__item}>
          <CategoryLink to="/electronics">Электроника</CategoryLink>
        </li>
        <li className={styles.categories__item}>
          <CategoryLink to="/clothing">Одежда</CategoryLink>
        </li>
      </ul>
    </aside>
  );
};
