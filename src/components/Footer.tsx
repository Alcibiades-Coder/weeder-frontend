const Footer = () => {
  return (
    // Contenedor principal del pie de página con fondo verde y padding en el eje Y (arriba y abajo)
    <div className="bg-green-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Título con nombre del sitio web "Weeder.com" */}
        <span className="text-3xl text-white font-bold tracking-tight">
          Weeder.com
        </span>
        {/* Enlaces de política de privacidad y términos de servicio */}
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Politica de Privacidad</span>
          <span>Terminos del Servicio</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
