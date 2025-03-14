// Importación de dependencias necesarias
import { useForm } from "react-hook-form"; // Hook para manejar formularios
import { z } from "zod"; // Biblioteca de validación para esquemas
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver para integrar Zod con React Hook Form
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Componentes para manejar la estructura del formulario
import { Input } from "@/components/ui/input"; // Componente de entrada de texto
import LoadingButton from "@/components/LoadingButton"; // Componente para un botón de carga (cuando el formulario está enviando)
import { Button } from "@/components/ui/button"; // Componente de botón
import { User } from "@/types"; // Tipo de datos de usuario
import { useEffect } from "react"; // Hook de efecto para gestionar cambios en el ciclo de vida del componente

// Esquema de validación para el formulario usando Zod
const formSchema = z.object({
  email: z.string().optional(), // El email es opcional y solo se mostrará en modo visual
  name: z.string().min(1, "name is required"), // Nombre del usuario (requerido)
  addressLine1: z.string().min(1, "Address Line 1 is required"), // Dirección (requerida)
  city: z.string().min(1, "City is required"), // Ciudad (requerida)
  country: z.string().min(1, "Country is required"), // País (requerido)
});

// Inferir el tipo de datos basado en el esquema Zod
export type UserFormData = z.infer<typeof formSchema>;

// Tipos de las propiedades del componente
type Props = {
  currentUser: User; // Usuario actual (los datos del usuario a editar)
  onSave: (userProfileData: UserFormData) => void; // Función de guardado del perfil
  isLoading: boolean; // Indicador de carga (cuando el formulario está siendo enviado)
  title?: string; // Título del formulario
  buttonText?: string; // Texto del botón (por defecto "Enviar")
};

// Componente principal del formulario del perfil del usuario
const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "Perfil de Usuario", // Título por defecto
  buttonText = "Enviar", // Texto del botón por defecto
}: Props) => {
  // Inicialización del formulario con react-hook-form y validación con Zod
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema), // Resolver Zod para validación
    defaultValues: currentUser, // Valores por defecto obtenidos del usuario actual
  });

  // Efecto para resetear los valores del formulario cuando cambian los datos del usuario
  useEffect(() => {
    form.reset(currentUser); // Resetea los valores del formulario cuando el usuario actual cambia
  }, [currentUser, form]);

  return (
    <Form {...form}>
      {/* Formulario que se enviará al hacer submit */}
      <form
        onSubmit={form.handleSubmit(onSave)} // Acción al enviar el formulario
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        {/* Título y descripción del formulario */}
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            Revisa y Cambia la Información de tu Perfil de Usuario
          </FormDescription>
        </div>

        {/* Campo de Email */}
        <FormField
          control={form.control} // Vincula el campo con el control del formulario
          name="email" // Nombre del campo
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                {/* El campo de email es solo visual, por lo tanto está deshabilitado */}
                <Input {...field} disabled className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Campo de Nombre */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage /> {/* Muestra los mensajes de error si existen */}
            </FormItem>
          )}
        />

        {/* Sección de dirección (Dirección, Ciudad, País) en una fila de tres columnas */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Campo de Dirección */}
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Campo de Ciudad */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Campo de País */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Mostrar el botón de carga si está en proceso de envío, o el botón normal */}
        {isLoading ? (
          <LoadingButton /> // Botón con carga mientras se procesa
        ) : (
          <Button type="submit" className="bg-green-500">
            {buttonText} {/* Texto dinámico para el botón */}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
