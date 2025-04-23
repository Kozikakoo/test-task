import { FC } from "react";
import { Outlet } from "react-router";
import { Header } from "../../components/Header/Header";

import styles from "./Layout.module.scss";
import { CategoriesPanel } from "../../components/CategoriesPanel/CategoriesPanel";

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <CategoriesPanel />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
