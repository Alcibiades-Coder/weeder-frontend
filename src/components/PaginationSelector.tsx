import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"; // Importa los componentes de paginación desde el archivo de UI

type Props = {
  page: number; // Página actual
  pages: number; // Número total de páginas
  onPageChange: (page: number) => void; // Función que se llama cuando cambia la página
};

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  // Genera un arreglo de números de páginas basado en el total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Si la página actual no es la primera, muestra el botón "Anterior" */}
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(page - 1)} // Llama a la función onPageChange con la página anterior
            />
          </PaginationItem>
        )}

        {/* Mapea los números de página y crea los enlaces de paginación */}
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)} // Llama a la función onPageChange con el número de página correspondiente
              isActive={page === number} // Marca el enlace como activo si es la página actual
            >
              {number} {/* Muestra el número de la página */}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Si la página actual no es la última, muestra el botón "Siguiente" */}
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(page + 1)} // Llama a la función onPageChange con la página siguiente
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
