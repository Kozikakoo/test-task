import { createBrowserRouter } from "react-router"; // Импорт функции для создания маршрутизатора
import ErrorPage from "../pages/ErrorPage/ErrorPage"; // Импорт страницы ошибки
import Layout from "../pages/Layout/Layout"; // Импорт компонента Layout
import Home from "../pages/Home/Home"; // Импорт компонента главной страницы
import CategoryPage from "../pages/CategoryPage/CategoryPage";

// Создание маршрутов для браузера с использованием createBrowserRouter
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: ":category", element: <CategoryPage /> }, // универсальный маршрут
    ],
  },
]);
