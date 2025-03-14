import { zodResolver } from "@hookform/resolvers/zod"; // Importa el resolver de Zod para validaciones en react-hook-form
import { useForm } from "react-hook-form"; // Importa el hook principal para manejar formularios
import { z } from "zod"; // Importa Zod para definir el esquema de validación
import { Form, FormControl, FormField, FormItem } from "./ui/form"; // Importa componentes personalizados de formulario
import { Search } from "lucide-react"; // Importa el ícono de búsqueda de lucide-react
import { Input } from "./ui/input"; // Importa el componente de input personalizado
import { Button } from "./ui/button"; // Importa el componente de botón personalizado
import { useEffect } from "react"; // Importa el hook useEffect para manejar efectos secundarios

// Esquema de validación con Zod para el formulario
const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required", // Mensaje de error si el campo 'searchQuery' está vacío
  }),
});

// Tipo de datos para el formulario basado en el esquema Zod
export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void; // Función que se ejecuta cuando el formulario es enviado
  placeHolder: string; // Placeholder que se muestra en el input
  onReset?: () => void; // Función opcional para reiniciar el formulario
  searchQuery?: string; // Valor inicial de la consulta de búsqueda
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  // Inicializa el formulario usando react-hook-form con validaciones Zod
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema), // Usamos zodResolver para validar el formulario
    defaultValues: {
      searchQuery, // Establece el valor predeterminado de la búsqueda si se proporciona
    },
  });

  // Resetea el formulario cuando el valor de 'searchQuery' cambia
  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  // Función que maneja el reseteo del formulario
  const handleReset = () => {
    form.reset({
      searchQuery: "", // Resetea el valor de 'searchQuery' al valor vacío
    });

    if (onReset) {
      onReset(); // Si se pasa la función 'onReset', la ejecuta
    }
  };

  return (
    <Form {...form}>
      {/* El formulario de búsqueda */}
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Maneja el envío del formulario
        className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500" // Aplica un borde rojo si hay un error en 'searchQuery'
        }`}
      >
        {/* Icono de búsqueda visible en pantallas medianas y grandes */}
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-green-500 hidden md:block"
        />

        {/* Campo de formulario para 'searchQuery' */}
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0" // Estilos personalizados para el input
                  placeholder={placeHolder} // Placeholder personalizado
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Botón para limpiar el campo de búsqueda */}
        <Button
          onClick={handleReset} // Llama a la función handleReset para limpiar el formulario
          type="button"
          variant="outline"
          className="rounded-full"
        >
          Limpiar
        </Button>

        {/* Botón para enviar el formulario */}
        <Button type="submit" className="rounded-full bg-green-500">
          Buscar
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
