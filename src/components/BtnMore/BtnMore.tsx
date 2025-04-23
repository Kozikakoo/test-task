import { FC } from "react";
import styles from "./BtnMore.module.scss";

interface IBtnMoreProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BtnMore: FC<IBtnMoreProps> = ({ ...props }) => {
  return (
    <button className={styles.btnMore} {...props}>
      <span>Показать ещё</span>
    </button>
  );
};
