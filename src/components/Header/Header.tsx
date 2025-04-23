import { Search, ShoppingCart } from "lucide-react";
import styles from "./Header.module.scss";
import { FC, useState } from "react";
import { Cart } from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setQuery } from "../../store/search/searchSlice";
export const Header: FC = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}></div>
      <div className={styles.header__searchContainer}>
        {" "}
        <input
          className={styles.header__search}
          value={query}
          onChange={handleChange}
          type="text"
        />
        <button className={styles.header__searchBtn}>
          <Search />
        </button>
      </div>

      <ShoppingCart
        className={styles.header__cart}
        onClick={() => setIsOpenCart(!isOpenCart)}
      />
      {isOpenCart && (
        <Cart setIsOpenCart={setIsOpenCart} isOpenCart={isOpenCart} />
      )}
    </div>
  );
};
