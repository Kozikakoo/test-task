import { Search, ShoppingCart } from "lucide-react";
import styles from "./Header.module.scss";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}></div>
      <div className={styles.header__searchContainer}>
        {" "}
        <input className={styles.header__search} type="text" />
        <button className={styles.header__searchBtn}>
          <Search />
        </button>
      </div>

      <ShoppingCart className={styles.header__cart} />
    </div>
  );
};
