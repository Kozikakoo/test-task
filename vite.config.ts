// Импорт функции конфигурации Vite
import { defineConfig } from "vite";

// Плагин для поддержки React с JSX и fast refresh
import react from "@vitejs/plugin-react";

// Модуль path используется для создания абсолютных путей
import path from "path";

// Экспорт конфигурации Vite
export default defineConfig({
  // Подключаем React-плагин
  plugins: [react()],

  // Настройка alias'ов для удобного импорта
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Теперь можно импортировать из src через '@/'
    },
  },

  // Настройки для препроцессоров CSS
  css: {
    preprocessorOptions: {
      scss: {
        // Эти строки будут автоматически добавляться в каждый SCSS-файл
        additionalData: `
          @use "@/styles/variables.scss" as *; // Автоматический импорт SCSS-переменных
        `,
      },
    },
  },
});
