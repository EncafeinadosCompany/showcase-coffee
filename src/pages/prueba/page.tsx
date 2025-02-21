import { Link } from "react-router-dom";
import { Coffee, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Productos() {
  return (
    <main className="bg-[#F5E6D3] text-[#4A3933] h-full transition-all duration-700 overflow-y-auto">
      {/* Hero Section */}
      <div className="relative h-[250px] mb-12 ">
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
      <div className="max-w-6xl  mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <Link
            to="/brands"
            className="w-full md:w-[420px] xl:w-[600px]  transform transition-all hover:scale-105"
          >
            <Card className="bg-[#8C7A6B] text-white h-[300px] flex flex-col justify-center items-center cursor-pointer">
              <CardContent className="flex flex-col items-center">
                <img width={"50%"} src= "./public/undraw_coffee_7r49.svg"></img>
                <h2 className="text-3xl font-semibold text-center mb-4">
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
            className="w-full md:w-[420px] xl:w-[600px] transform transition-all hover:scale-105"
          >
            <Card className="bg-[#D4A574] text-white h-[300px] flex flex-col justify-center items-center cursor-pointer">
              <CardContent className="flex flex-col items-center">
                <img width={"30%"} src= "./public/undraw_barista_wwfa.svg"></img>
                <h2 className="text-3xl font-semibold text-center mb-4">
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
