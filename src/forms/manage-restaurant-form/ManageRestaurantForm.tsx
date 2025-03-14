// Importación de componentes y librerías necesarios para manejar el formulario y validación
import { Form } from "@/components/ui/form"; // Componente para envolver el formulario
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver para validar el formulario usando Zod
import { useForm } from "react-hook-form"; // Hook de React Hook Form para gestionar formularios
import { z } from "zod"; // Librería de validación Zod
import DetailsSection from "./DetailsSection"; // Componente de la sección de detalles
import { Separator } from "@/components/ui/separator"; // Componente para separar secciones del formulario
import CuisinesSection from "./CuisinesSection"; // Componente para la selección de cocinas
import MenuSection from "./MenuSection"; // Componente para agregar los items del menú
import ImageSection from "./ImageSection"; // Componente para agregar la imagen del restaurante
import LoadingButton from "@/components/LoadingButton"; // Componente para mostrar el botón de carga mientras se envía el formulario
import { Button } from "@/components/ui/button"; // Componente de botón
import { Restaurant } from "@/types"; // Tipos utilizados para gestionar los datos del restaurante
import { useEffect } from "react"; // Hook para manejar efectos secundarios

// Definición del esquema de validación con Zod para el formulario
const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "El nombre del Restaurante es requerido", // Validación para el nombre del restaurante
    }),
    city: z.string({
      required_error: "Ciudad es requerida", // Validación para la ciudad
    }),
    country: z.string({
      required_error: "País es requerido", // Validación para el país
    }),
    deliveryPrice: z.coerce.number({
      required_error: "El Precio de Envio es requerido", // Validación para el precio de envío
      invalid_type_error: "must be a valid number", // Validación para tipo de datos del precio de envío
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "El Tiempo Estimado de Entrega es requerido", // Validación para el tiempo estimado de entrega
      invalid_type_error: "Debe ser un número valido!", // Validación para tipo de datos del tiempo estimado
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Por Favor selecciona al menos un Item", // Validación para seleccionar al menos un tipo de cocina
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "El nombre es requerido"), // Validación para el nombre de cada item del menú
        price: z.coerce.number().min(1, "El precio es requerido"), // Validación para el precio de cada item del menú
      })
    ),
    imageUrl: z.string().optional(), // Campo para la URL de la imagen (opcional)
    imageFile: z
      .instanceof(File, { message: "la imagen es requerida" }) // Validación para el archivo de imagen (opcional)
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "La imagen es requerida", // Validación adicional para asegurar que se proporcione una imagen
    path: ["imageFile"], // Define el campo específico de la imagen
  });

// Tipo inferido del esquema de validación Zod para el formulario
type RestaurantFormData = z.infer<typeof formSchema>;

// Definición de las propiedades esperadas por el componente
type Props = {
  restaurant?: Restaurant; // Propiedad opcional para pasar un restaurante existente
  onSave: (restaurantFormData: FormData) => void; // Función que se llama al enviar el formulario
  isLoading: boolean; // Indicador de si el formulario está en proceso de carga
};

// Componente principal para gestionar el formulario de restaurante
const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  // Configuración del formulario con React Hook Form y Zod
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema), // Resolver de validación usando Zod
    defaultValues: {
      cuisines: [], // Valor predeterminado para las cocinas (vacío)
      menuItems: [{ name: "", price: 0 }], // Valor predeterminado para los items del menú
    },
  });

  // Efecto secundario para cargar los datos de un restaurante existente, si es proporcionado
  useEffect(() => {
    if (!restaurant) {
      return; // Si no hay un restaurante, no hacer nada
    }

    // Formatear el precio de envío y los precios del menú a enteros
    const deliveryPriceFormatted = parseInt(
      restaurant.deliveryPrice.toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt(item.price.toFixed(2)), // Formatear los precios de los items del menú
    }));

    // Actualizar los valores del formulario con los datos del restaurante
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant); // Resetear el formulario con los nuevos valores
  }, [form, restaurant]);

  // Función para manejar el envío del formulario
  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData(); // Crear un objeto FormData para enviar los datos

    // Agregar los valores del formulario al objeto FormData
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );

    // Agregar las cocinas seleccionadas al objeto FormData
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    // Agregar los items del menú al objeto FormData
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    // Si se seleccionó una imagen, agregarla al objeto FormData
    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    // Llamar a la función onSave para enviar el formulario
    onSave(formData);
  };

  return (
    <Form {...form}>
      {/* Contenedor del formulario */}
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Manejador para el envío del formulario
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        {/* Sección de detalles */}
        <DetailsSection />
        <Separator />
        {/* Sección de selección de cocinas */}
        <CuisinesSection />
        <Separator />
        {/* Sección del menú */}
        <MenuSection />
        <Separator />
        {/* Sección de imagen */}
        <ImageSection />
        {/* Botón de envío o botón de carga mientras se está procesando */}
        {isLoading ? <LoadingButton /> : <Button type="submit">Enviar</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
