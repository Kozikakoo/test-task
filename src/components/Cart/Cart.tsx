// Импорт базовых утилит React и Redux
import { FC, RefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

// Стили
import styles from "./Cart.module.scss";

// Типизация пропса setIsOpenCart (из useState)
import { Dispatch } from "react";

// Иконка "крестик" из lucide-react
import { X } from "lucide-react";

// Действие для удаления товара из корзины
import { removeFromCart } from "../../store/cart/cartSlice";

// Вспомогательная функция для подсчёта общей суммы
import { amountPrices } from "../../helpers/amount.helper";

// Кастомный хук для закрытия корзины при клике вне её
import { useOutsideClick } from "../../hooks/useOutsideClick";

// Утилита classnames для динамического применения классов
import cn from "classnames";

// Компонент-счётчик +/-
import { BtnCounter } from "../BtnCounter/BtnCounter";

// Тип пропсов компонента корзины
interface ICartProps {
  isOpenCart: boolean; // Открыта ли корзина
  setIsOpenCart: Dispatch<React.SetStateAction<boolean>>; // Функция для изменения состояния
}

// Компонент корзины
export const Cart: FC<ICartProps> = ({ setIsOpenCart, isOpenCart }) => {
  const dispatch = useDispatch();

  // Получаем все товары в корзине из Redux стора
  const items = useSelector((state: RootState) => state.cart.items);

  // Реф для DOM-элемента корзины, чтобы отслеживать клики вне неё
  const cartRef = useRef<HTMLDivElement>(null);

  // Закрытие корзины при клике вне её области
  useOutsideClick(cartRef as RefObject<HTMLElement>, () =>
    setIsOpenCart(false)
  );

  // Удаление товара по id
  const handleClickRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={cn(styles.cart, {
        [styles.cartOpen]: isOpenCart, // Применяется, если корзина открыта
        [styles.cartClose]: !isOpenCart, // Применяется, если корзина закрыта
      })}
      ref={cartRef}
    >
      Корзина:
      {/* Список товаров в корзине */}
      {items.map((i) => (
        <div key={i.id} className={styles.cart__item}>
          <img
            className={styles.cart__img}
            src={i.image}
            alt="Изображение товара"
          />
          <div className={styles.cart__info}>
            <p className={styles.cart__name}>{i.name}</p>
            <p className={styles.cart__price}>{i.price} ₽</p>
            {/* Компонент-счётчик для управления количеством */}
            <BtnCounter id={i.id} />
          </div>
          {/* Кнопка удаления товара из корзины */}
          <X
            className={styles.cart__remove}
            onClick={() => handleClickRemoveProduct(i.id)}
          />
        </div>
      ))}
      {/* Общая сумма всех товаров */}
      <p className={styles.cart__amount}>Вся сумма: {amountPrices(items)} ₽</p>
      {/* Кнопка оформления заказа */}
      <button className={styles.cart__btn}>Купить</button>
      {/* Кнопка закрытия корзины */}
      <X className={styles.cart__close} onClick={() => setIsOpenCart(false)} />
    </div>
  );
};
