import hero from "../assets/Images/hamburgWeed-2.jpg";

const Hero = () => {
  return (
    <div>
      {/* Imagen principal del Hero, con un ancho completo y altura máxima de 600px */}
      <img src={hero} className="w-full max-h-[600px] object-cover" />
    </div>
  );
};

export default Hero;
