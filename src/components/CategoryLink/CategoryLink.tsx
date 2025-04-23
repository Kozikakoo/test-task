import { FC } from "react";
import cn from "classnames";
import styles from "./CategoryLink.module.scss";
import { NavLink } from "react-router";

interface CategoryLinkProps {
  to: string;
  children: React.ReactNode;
}

export const CategoryLink: FC<CategoryLinkProps> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(styles.categoryLink, { [styles.active]: isActive })
      }
    >
      {children}
    </NavLink>
  );
};
