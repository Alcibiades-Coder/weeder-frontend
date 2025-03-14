// Importación de componentes que se utilizarán en el Layout
import Footer from "@/components/Footer"; // Componente de pie de página
import Header from "@/components/Header"; // Componente de encabezado
import Hero from "@/components/Hero"; // Componente de sección Hero (generalmente un banner)

type Props = {
  children: React.ReactNode; // Propiedad para los elementos secundarios (contenido que se pasará al Layout)
  showHero?: boolean; // Propiedad opcional que controla si se muestra el Hero (banner)
};

// Componente Layout que envuelve el contenido principal de la página
const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Componente Header, siempre se muestra en la parte superior */}
      <Header />

      {/* Si showHero es verdadero, se muestra el componente Hero (banner) */}
      {showHero && <Hero />}

      {/* Contenedor principal que envuelve el contenido principal de la página */}
      <div className="container mx-auto flex-1 py-10">
        {children}{" "}
        {/* Contenido principal de la página, inyectado como 'children' */}
      </div>

      {/* Componente Footer, siempre se muestra al final de la página */}
      <Footer />
    </div>
  );
};

export default Layout;
