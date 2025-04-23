import { FC } from "react";
import img from "../../assets/error.png";
import { Link } from "react-router";
import styles from "./ErrorPage.module.scss";

const ErrorPage: FC = () => {
  return (
    <div className={styles.container}>
      <img src={img} alt="img" />
      <Link to={"/"} className={styles.link}>
        На главную
      </Link>
    </div>
  );
};

export default ErrorPage;
