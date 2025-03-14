// Importación de los tipos y funciones necesarias de las bibliotecas externas
import { type ClassValue, clsx } from "clsx"; // 'clsx' es una utilidad para manejar clases condicionales en JavaScript
import { twMerge } from "tailwind-merge"; // 'tailwind-merge' se utiliza para combinar y optimizar clases de Tailwind CSS

// Función cn que combina clases de Tailwind de manera eficiente
export function cn(...inputs: ClassValue[]) {
  // Combina las clases pasadas como parámetros y las optimiza
  // 'clsx' ayuda a construir un string de clases condicionalmente
  // 'twMerge' se asegura de que las clases de Tailwind CSS se fusionen correctamente, resolviendo conflictos entre ellas
  return twMerge(clsx(inputs));
}
