// Импорт базовых утилит React и Redux
import { FC } from "react";
import styles from "./BtnCounter.module.scss"; // SCSS-модули для стилизации компонента
import { useDispatch } from "react-redux"; // Хук для отправки действий в Redux
import { useAppSelector } from "../../store/hooks"; // Кастомный useSelector с типизацией
import { selectQuantityById } from "../../store/cart/cart.selector"; // Селектор количества товара в корзине
import { changeQuantity, removeFromCart } from "../../store/cart/cartSlice"; // Действия для изменения количества и удаления из корзины

// Интерфейс пропсов. Наследуем все HTML-атрибуты div, кроме id (так как он у нас свой)
interface IBtnCounterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  id: number; // id товара
}

// Компонент-счётчик количества товаров в корзине
export const BtnCounter: FC<IBtnCounterProps> = ({ id, ...props }) => {
  const dispatch = useDispatch();

  // Получаем текущее количество товара с указанным id из стора
  const quantity = useAppSelector(selectQuantityById(id));

  // Обработка клика по минусу
  const handleClickMinus = (id: number) => {
    // Если после уменьшения количество станет 0 — удаляем товар из корзины
    if (quantity - 1 == 0) dispatch(removeFromCart(id));

    // В любом случае уменьшаем количество
    dispatch(changeQuantity({ id, delta: -1 }));
  };

  // Обработка клика по плюсу
  const handleClickPlus = (id: number) => {
    dispatch(changeQuantity({ id, delta: 1 }));
  };

  return (
    <div className={styles.btnCounter} {...props}>
      <button
        className={styles.btnCounterMinus}
        onClick={() => handleClickMinus(id)}
      >
        -
      </button>
      <p>{quantity}</p>
      <button
        className={styles.btnCounterPlus}
        onClick={() => handleClickPlus(id)}
      >
        +
      </button>
    </div>
  );
};
