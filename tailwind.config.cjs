/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define el modo oscuro que se activa mediante la clase 'dark'
  darkMode: ["class"],

  // Archivos que Tailwind escaneará para encontrar las clases a generar
  content: [
    "./pages/**/*.{ts,tsx}", // Archivos dentro de la carpeta 'pages' con extensión ts/tsx
    "./components/**/*.{ts,tsx}", // Archivos dentro de 'components' con extensión ts/tsx
    "./app/**/*.{ts,tsx}", // Archivos dentro de 'app' con extensión ts/tsx
    "./src/**/*.{ts,tsx}", // Archivos dentro de 'src' con extensión ts/tsx
  ],

  // Prefijo vacío, no se agrega un prefijo personalizado a las clases generadas
  prefix: "",

  theme: {
    // Configuración de la clase contenedora en el centro de la página con relleno
    container: {
      center: true, // Centra el contenedor en la página
      padding: "2rem", // Relleno de 2rem en todos los lados
      screens: {
        "2xl": "1400px", // Tamaño de pantalla para '2xl'
      },
    },
    extend: {
      // Colores personalizados usando variables CSS
      colors: {
        border: "hsl(var(--border))", // Color del borde
        input: "hsl(var(--input))", // Color de entrada
        ring: "hsl(var(--ring))", // Color del anillo
        background: "hsl(var(--background))", // Color de fondo
        foreground: "hsl(var(--foreground))", // Color de primer plano
        primary: {
          DEFAULT: "hsl(var(--primary))", // Color primario por defecto
          foreground: "hsl(var(--primary-foreground))", // Color de primer plano primario
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Color secundario por defecto
          foreground: "hsl(var(--secondary-foreground))", // Color de primer plano secundario
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Color destructivo por defecto
          foreground: "hsl(var(--destructive-foreground))", // Color de primer plano destructivo
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Color atenuado por defecto
          foreground: "hsl(var(--muted-foreground))", // Color de primer plano atenuado
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Color de acento por defecto
          foreground: "hsl(var(--accent-foreground))", // Color de primer plano de acento
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Color del popover por defecto
          foreground: "hsl(var(--popover-foreground))", // Color de primer plano de popover
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Color de tarjeta por defecto
          foreground: "hsl(var(--card-foreground))", // Color de primer plano de tarjeta
        },
      },
      // Radios de borde personalizados usando variables CSS
      borderRadius: {
        lg: "var(--radius)", // Borde grande
        md: "calc(var(--radius) - 2px)", // Borde mediano
        sm: "calc(var(--radius) - 4px)", // Borde pequeño
      },
      // Definición de animaciones personalizadas usando keyframes
      keyframes: {
        "accordion-down": {
          from: { height: "0" }, // Inicia con altura 0
          to: { height: "var(--radix-accordion-content-height)" }, // Termina con la altura del contenido del acordeón
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" }, // Inicia con la altura del contenido del acordeón
          to: { height: "0" }, // Termina con altura 0
        },
      },
      // Animaciones asociadas a los keyframes definidos
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Animación de despliegue del acordeón
        "accordion-up": "accordion-up 0.2s ease-out", // Animación de colapso del acordeón
      },
    },
  },

  // Plugins adicionales de Tailwind CSS
  plugins: [require("tailwindcss-animate")], // Plugin para animaciones
};
