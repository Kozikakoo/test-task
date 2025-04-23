// Импорт иконки корзины из библиотеки lucide-react
import { ShoppingCart } from "lucide-react";

// Импорт базовых утилит React и хуков Redux
import { FC } from "react";
import styles from "./Card.module.scss"; // SCSS-модуль для стилизации карточки
import { useDispatch } from "react-redux";

// Импорт действий и селекторов из Redux
import { addToCart } from "../../store/cart/cartSlice";
import { selectQuantityById } from "../../store/cart/cart.selector";
import { useAppSelector } from "../../store/hooks";

// Импорт компонента-счётчика, отображающего кнопки + и -
import { BtnCounter } from "../BtnCounter/BtnCounter";

// Тип пропсов карточки товара
interface ICardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  image: string; // URL изображения товара
  price: number; // Цена товара
  name: string; // Название товара
  id: number; // Уникальный идентификатор товара
}

// Карточка товара
export const Card: FC<ICardProps> = ({ image, price, name, id }) => {
  const dispatch = useDispatch();

  // Получаем количество товара в корзине по id
  const quantity = useAppSelector(selectQuantityById(id));

  // Обработчик кнопки "Купить"
  const handleClickBuy = () => {
    dispatch(addToCart({ id, name, price, image, quantity: 1 }));
  };

  return (
    <div className={styles.card}>
      {/* Изображение товара */}
      <img src={image} className={styles.card__img} alt="Изображение товара" />

      {/* Блок с названием и ценой */}
      <div className={styles.card__info}>
        <p className={styles.card__price}>{price} ₽</p>
        <p className={styles.card__name}>{name}</p>
      </div>

      {/* Если товара ещё нет в корзине — показываем кнопку "Купить" */}
      {quantity == 0 ? (
        <button onClick={handleClickBuy} className={styles.card__btn}>
          Купить <ShoppingCart />
        </button>
      ) : (
        // Если товар уже есть в корзине — показываем компонент-счётчик
        <BtnCounter id={id} />
      )}
    </div>
  );
};
