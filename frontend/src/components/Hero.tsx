import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[100vh]">
      <img
        src="/images/hero.jpg"
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 space-y-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold mt-16">
          Summer trends
        </h1>
        <Link to="/products/new" className="no-underline hover:no-underline">
          <div className="text-white text-lg font-light border border-white px-4 py-2 bg-transparent hover:bg-white hover:bg-opacity-25 transition-colors duration-300 cursor-pointer mt-8 no-underline hover:no-underline">
            Shop our newest items
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
