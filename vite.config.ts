// Importación del módulo 'path' para trabajar con rutas de archivos
import path from "path";

// Importación de la función 'defineConfig' de Vite para definir la configuración
import { defineConfig } from "vite";

// Importación del plugin de React para Vite que usa SWC para la transpilación
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/ - Documentación de la configuración de Vite
export default defineConfig({
  // Plugins que se utilizarán en la configuración de Vite
  plugins: [react()],

  // Configuración de la resolución de módulos
  resolve: {
    // Definición de alias para poder usar '@' en lugar de rutas relativas
    alias: {
      // El alias '@' se resolverá a la carpeta './src' dentro del proyecto
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
