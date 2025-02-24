import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function Productos() {
  return (
    <main className=" text-[#4A3933] h-full p-4 flex flex-col overflow-hidden ">
      {/* Hero Section */}
      <div className="relative mt-4 h-[200px] ">
        <img
          src="https://cdn.usegalileo.ai/sdxl10/48b4f3fe-4f7e-4245-99a8-39375bf18e25.png"
          alt="Coffee cup illustration"
          className="object-cover w-full h-full rounded-[20px]"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-[20px] bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Disfruta del café en casa
          </h1>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex-1 max-w-6xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 h-full">
          <Link
            to="/brands"
            className=" md:w-[420px] xl:w-[600px] transform transition-all hover:scale-105"
          >
            <Card className="bg-[#8C7A6B] text-white h-[250px] flex flex-col justify-center items-center cursor-pointer">
              <CardContent className="flex flex-col items-center">
                <img width="35%" src="./public/undraw_coffee_7r49.svg" alt="Café" />
                <h2 className="text-3xl font-semibold text-center mb-2">
                  Marcas
                </h2>
                <p className="text-lg text-center">
                  Explora nuestra selección de las mejores marcas de café premium
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link
            to="/products-page"
            className="md:w-[420px] xl:w-[600px] transform transition-all hover:scale-105"
          >
            <Card className="bg-[#D4A574] text-white h-[250px] flex flex-col justify-center items-center cursor-pointer">
              <CardContent className="flex flex-col items-center">
                <img width="25%" src="./public/undraw_barista_wwfa.svg" alt="Barista" />
                <h2 className="text-3xl font-semibold text-center mb-2">
                  Productos
                </h2>
                <p className="text-lg text-center">
                  Descubre nuestra amplia variedad de productos y accesorios
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}