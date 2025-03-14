// Importar los hooks y componentes necesarios
import { useSearchRestaurants } from "@/api/RestaurantApi"; // Hook para obtener los restaurantes según la búsqueda
import CuisineFilter from "@/components/CuisineFilter"; // Componente para filtrar restaurantes por tipo de cocina
import PaginationSelector from "@/components/PaginationSelector"; // Componente para seleccionar la página de resultados
import SearchBar, { SearchForm } from "@/components/SearchBar"; // Componente de barra de búsqueda
import SearchResultCard from "@/components/SearchResultCard"; // Componente para mostrar los resultados de los restaurantes
import SearchResultInfo from "@/components/SearchResultInfo"; // Componente para mostrar información de los resultados
import SortOptionDropdown from "@/components/SortOptionDropdown"; // Componente para seleccionar la opción de ordenación
import { useState } from "react"; // Hook de estado
import { useParams } from "react-router-dom"; // Hook para acceder a los parámetros de la URL

// Definir el tipo de estado para la búsqueda
export type SearchState = {
  searchQuery: string; // Consulta de búsqueda (por ejemplo, nombre del restaurante o tipo de cocina)
  page: number; // Número de la página de resultados
  selectedCuisines: string[]; // Cocinas seleccionadas para el filtro
  sortOption: string; // Opción de ordenación seleccionada
};

const SearchPage = () => {
  // Obtener la ciudad desde los parámetros de la URL
  const { city } = useParams();

  // Definir el estado inicial para la búsqueda
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "", // Consulta de búsqueda vacía inicialmente
    page: 1, // Página inicial 1
    selectedCuisines: [], // Sin filtros de cocina al principio
    sortOption: "bestMatch", // Ordenación inicial por "mejor coincidencia"
  });

  // Estado para controlar si el filtro de cocina está expandido
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Usar el hook para obtener los resultados de la búsqueda
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  // Función para cambiar la opción de ordenación
  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1, // Resetear la página al seleccionar una nueva opción de ordenación
    }));
  };

  // Función para actualizar las cocinas seleccionadas
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1, // Resetear la página al cambiar los filtros de cocina
    }));
  };

  // Función para cambiar la página de resultados
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  // Función para actualizar la consulta de búsqueda cuando el usuario la envía
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1, // Resetear la página al realizar una nueva búsqueda
    }));
  };

  // Función para reiniciar la búsqueda (limpiar filtros y consulta)
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1, // Resetear la página
    }));
  };

  // Si los resultados están cargando, mostrar un mensaje de carga
  if (isLoading) {
    <span>Loading ...</span>;
  }

  // Si no se encuentran resultados o no hay ciudad, mostrar un mensaje
  if (!results?.data || !city) {
    return <span>No se encontraron resultados</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        {/* Filtro de cocina, muestra las cocinas seleccionadas y permite cambiar los filtros */}
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={
            () => setIsExpanded((prevIsExpanded) => !prevIsExpanded) // Alternar la expansión del filtro
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        {/* Barra de búsqueda, con el texto y el manejador para enviar la consulta */}
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Busca por Tipo de Cocina o Nombre del Restaurante"
          onReset={resetSearch} // Función para resetear la búsqueda
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          {/* Información sobre los resultados, como el total de resultados encontrados */}
          <SearchResultInfo total={results.pagination.total} city={city} />
          {/* Menú desplegable para ordenar los resultados */}
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)} // Cambiar la opción de ordenación
          />
        </div>

        {/* Mostrar los resultados de búsqueda como tarjetas */}
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}

        {/* Selector de paginación, para navegar entre las páginas de resultados */}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage} // Cambiar la página de resultados
        />
      </div>
    </div>
  );
};

// Exportar el componente SearchPage
export default SearchPage;
