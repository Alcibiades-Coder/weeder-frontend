import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = () => {
  return (
    <Button disabled>
      {" "}
      {/* El botón está deshabilitado mientras se carga */}
      {/* Icono de carga con animación de giro */}
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Cargando {/* Texto que aparece junto al icono */}
    </Button>
  );
};

export default LoadingButton;
